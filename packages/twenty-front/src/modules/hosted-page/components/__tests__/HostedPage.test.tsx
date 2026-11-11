import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { HostedPage } from '@/hosted-page/components/HostedPage';
import { HOSTED_PAGE_READY_TIMEOUT_MS } from '@/hosted-page/constants/HostedPageReadyTimeoutMs';

jest.mock('@/information-banner/components/InformationBannerWrapper', () => ({
  InformationBannerWrapper: () => null,
}));

const ERROR_MESSAGE = 'The page could not be loaded.';
const FRAME_SOURCE = '/platform/kontakter?q=anna';

const Address = () => <output>{useLocation().pathname}</output>;

const getFrame = () => document.querySelector('iframe') as HTMLIFrameElement;

const renderHostedPage = () => {
  render(
    <HelmetProvider>
      <I18nProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/shebang/kontakter?panel=%2Fx&q=anna']}>
          <Link to="/shebang/kontakter/7">Kontakt 7</Link>
          <Address />
          <Routes>
            <Route path="/shebang/*" element={<HostedPage />} />
            <Route path="*" element={<div>A page of Twenty</div>} />
          </Routes>
        </MemoryRouter>
      </I18nProvider>
    </HelmetProvider>,
  );

  const frame = getFrame();
  const postMessage = jest
    .spyOn(frame.contentWindow as Window, 'postMessage')
    .mockImplementation(() => {});

  return { frame, postMessage };
};

const sendFromFrame = (frame: HTMLIFrameElement, message: object) =>
  act(() => {
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { hostedPage: 1, ...message },
        origin: window.location.origin,
        source: frame.contentWindow,
      }),
    );
  });

const loadInFrame = (
  frame: HTMLIFrameElement,
  pathname: string,
  isHostedDocument = true,
) => {
  Object.defineProperty(frame, 'contentDocument', {
    value: {
      location: { pathname, search: '', hash: '' },
      querySelector: () => (isHostedDocument ? {} : null),
    },
  });
  fireEvent.load(frame);
};

describe('HostedPage', () => {
  afterEach(() => {
    jest.useRealTimers();
    document.documentElement.classList.remove('dark');
  });

  it('loads the hosted address once and sends later addresses as context', async () => {
    const { frame, postMessage } = renderHostedPage();
    const lastContext = () => postMessage.mock.lastCall?.[0];

    expect(frame.getAttribute('src')).toBe(FRAME_SOURCE);
    expect(frame.closest('[aria-busy]')).toHaveAttribute('aria-busy', 'true');

    sendFromFrame(frame, { type: 'ready' });

    expect(frame.closest('[aria-busy]')).toHaveAttribute('aria-busy', 'false');
    expect(postMessage).toHaveBeenLastCalledWith(
      {
        hostedPage: 1,
        type: 'context',
        path: FRAME_SOURCE,
        colorScheme: 'light',
        locale: 'en',
      },
      window.location.origin,
    );

    await userEvent.click(screen.getByRole('link', { name: 'Kontakt 7' }));

    expect(getFrame()).toBe(frame);
    expect(frame.getAttribute('src')).toBe(FRAME_SOURCE);
    expect(lastContext()).toMatchObject({ path: '/platform/kontakter/7' });

    document.documentElement.classList.add('dark');

    await waitFor(() =>
      expect(lastContext()).toMatchObject({ colorScheme: 'dark' }),
    );
  });

  it('opens a page of Twenty when the hosted page asks, without a frame', () => {
    const { frame } = renderHostedPage();

    sendFromFrame(frame, { type: 'navigate', path: '/object/person/1' });
    expect(screen.getByText('A page of Twenty')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('/object/person/1');
    expect(getFrame()).toBeNull();
  });

  it('shows the title and passes on the shortcut the hosted page sends', async () => {
    const { frame } = renderHostedPage();
    const pressedKeys: string[] = [];
    const recordKey = ({ type, ctrlKey, key }: KeyboardEvent) =>
      pressedKeys.push(`${type}:${ctrlKey ? 'ctrl+' : ''}${key}`);
    document.addEventListener('keydown', recordKey, { once: true });
    document.addEventListener('keyup', recordKey, { once: true });
    const modifiers = { metaKey: false, shiftKey: false, altKey: false };

    sendFromFrame(frame, { type: 'title', title: 'Kontakter' });
    sendFromFrame(frame, {
      ...modifiers,
      type: 'key',
      key: 'k',
      code: 'KeyK',
      ctrlKey: true,
    });

    expect(pressedKeys).toEqual(['keydown:ctrl+k', 'keyup:ctrl+k']);
    await waitFor(() => expect(document.title).toBe('Kontakter'));
  });

  it('replaces the frame with the page of Twenty it wandered to', () => {
    const { frame } = renderHostedPage();

    loadInFrame(frame, '/objects/people');

    expect(screen.getByText('A page of Twenty')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('/objects/people');
  });

  it('offers to try again when the loaded document is not a hosted page', async () => {
    const { frame } = renderHostedPage();

    loadInFrame(frame, '/platform/kontakter', false);

    expect(screen.getByText(ERROR_MESSAGE)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Open in its own tab' }),
    ).toHaveAttribute('href', FRAME_SOURCE);

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(getFrame()).not.toBe(frame);
    expect(getFrame().getAttribute('src')).toBe(FRAME_SOURCE);
  });

  it.each([
    ['gives up on a hosted page that never says it is ready', false],
    ['keeps a page that was ready before it finished loading', true],
  ])('%s', (_description, isReadyBeforeLoad) => {
    jest.useFakeTimers();
    const { frame } = renderHostedPage();

    if (isReadyBeforeLoad) {
      sendFromFrame(frame, { type: 'ready' });
    }
    loadInFrame(frame, '/platform/kontakter');
    act(() => jest.advanceTimersByTime(HOSTED_PAGE_READY_TIMEOUT_MS - 1));
    expect(screen.queryByText(ERROR_MESSAGE)).toBeNull();

    act(() => jest.advanceTimersByTime(1));
    expect(screen.queryAllByText(ERROR_MESSAGE)).toHaveLength(
      isReadyBeforeLoad ? 0 : 1,
    );
  });
});
