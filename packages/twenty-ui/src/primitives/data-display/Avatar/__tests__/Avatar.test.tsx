import { runComponentConformance } from '@test-utilities/conformance/runComponentConformance';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type ReactNode } from 'react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from 'vitest';

import { ThemeProvider } from '@ui/theme';

import { Avatar } from '../Avatar';
import styles from '../Avatar.module.scss';
import { type AvatarProps } from '../types/AvatarProps';
import { type AvatarRootProps } from '../types/AvatarRootProps';

const AvatarRootWrapper = ({ children }: { children: ReactNode }) => (
  <Avatar.Root>{children}</Avatar.Root>
);

runComponentConformance({
  name: 'Avatar',
  element: <Avatar name="Jane" />,
  ownClassName: styles.root,
  refInstanceOf: HTMLSpanElement,
});

runComponentConformance({
  name: 'Avatar.Root',
  element: <Avatar.Root>Jane</Avatar.Root>,
  ownClassName: styles.root,
  refInstanceOf: HTMLSpanElement,
});

runComponentConformance({
  name: 'Avatar.Image',
  element: <Avatar.Image keepMounted alt="Jane" />,
  ownClassName: styles.image,
  refInstanceOf: HTMLImageElement,
  renderPropTagName: 'img',
  wrapper: AvatarRootWrapper,
});

runComponentConformance({
  name: 'Avatar.Fallback',
  element: <Avatar.Fallback>Jane</Avatar.Fallback>,
  ownClassName: styles.fallback,
  refInstanceOf: HTMLSpanElement,
  wrapper: AvatarRootWrapper,
});

describe('Avatar composition', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('omits shorthand click handlers while retaining the Root contract', () => {
    expectTypeOf<AvatarProps>().not.toHaveProperty('onClick');
    expectTypeOf<AvatarRootProps>().toHaveProperty('onClick');
  });

  it('keeps Root presentational when a click handler is supplied', async () => {
    const handleClick = vi.fn();
    const avatarRef = createRef<HTMLSpanElement>();

    render(
      <ThemeProvider colorScheme="light">
        <Avatar.Root
          name="Jane"
          aria-label="Profile avatar"
          ref={avatarRef}
          onClick={(event) => {
            expectTypeOf(event.currentTarget).toEqualTypeOf<
              EventTarget & HTMLSpanElement
            >();
            handleClick(event.currentTarget);
          }}
        >
          <Avatar.Fallback aria-hidden>J</Avatar.Fallback>
        </Avatar.Root>
      </ThemeProvider>,
    );

    const avatar = screen.getByLabelText('Profile avatar');

    expect(avatar.tagName).toBe('SPAN');
    expect(avatarRef.current).toBe(avatar);
    expect(avatar).not.toHaveAttribute('role');
    expect(avatar).not.toHaveAttribute('tabindex');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    await userEvent.click(avatar);

    expect(handleClick).toHaveBeenCalledWith(avatar);
  });

  it('preserves native owner callbacks, disabled behavior and ref targets', async () => {
    const buttonRef = createRef<HTMLButtonElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const handleButtonClick = vi.fn();
    const handleLinkClick = vi.fn();

    render(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="Jane"
          ref={buttonRef}
          render={
            <button
              type="button"
              aria-label="Open profile"
              onClick={(event) => {
                expectTypeOf(event.currentTarget).toEqualTypeOf<
                  EventTarget & HTMLButtonElement
                >();
                handleButtonClick(event.currentTarget);
              }}
            />
          }
        />
        <Avatar
          name="Jane"
          render={
            <button
              type="button"
              disabled
              aria-label="Disabled profile"
              onClick={handleButtonClick}
            />
          }
        />
        <Avatar.Root
          ref={linkRef}
          render={
            <a
              href="/people/jane"
              aria-label="View Jane"
              onClick={(event) => {
                event.preventDefault();
                expectTypeOf(event.currentTarget).toEqualTypeOf<
                  EventTarget & HTMLAnchorElement
                >();
                handleLinkClick(event.currentTarget);
              }}
            />
          }
        >
          <Avatar.Fallback>Jane</Avatar.Fallback>
        </Avatar.Root>
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', { name: 'Open profile' });
    const disabledButton = screen.getByRole('button', {
      name: 'Disabled profile',
    });
    const link = screen.getByRole('link', { name: 'View Jane' });

    expect(buttonRef.current).toBe(button);
    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute('type', 'button');
    expect(disabledButton).toBeDisabled();
    expect(linkRef.current).toBe(link);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(link).toHaveAttribute('href', '/people/jane');

    await userEvent.click(button);

    expect(handleButtonClick).toHaveBeenCalledWith(button);

    await userEvent.click(disabledButton);

    expect(handleButtonClick).toHaveBeenCalledTimes(1);

    await userEvent.click(link);

    expect(handleLinkClick).toHaveBeenCalledWith(link);
  });

  it('preserves caller fallback content, native props, handlers and render refs', async () => {
    const fallbackRef = createRef<HTMLDivElement>();
    const handleClick = vi.fn();

    const { rerender } = render(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="Jane"
          fallbackProps={{
            children: <strong>Unavailable</strong>,
            role: 'status',
            'aria-label': 'Profile unavailable',
            render: <div />,
            ref: fallbackRef,
            onClick: (event) => handleClick(event.currentTarget),
          }}
        />
      </ThemeProvider>,
    );

    const fallback = screen.getByRole('status', {
      name: 'Profile unavailable',
    });

    expect(screen.getByText('Unavailable')).toBeVisible();
    expect(screen.queryByText('J')).not.toBeInTheDocument();
    expect(fallbackRef.current).toBe(fallback);
    expect(fallbackRef.current).toBeInstanceOf(HTMLDivElement);

    await userEvent.click(fallback);

    expect(handleClick).toHaveBeenCalledWith(fallback);

    rerender(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="Jane"
          imageProps={{ alt: 'Jane' }}
          fallbackProps={{ children: null }}
        />
      </ThemeProvider>,
    );

    expect(screen.getByRole('img', { name: 'Jane' })).toBeEmptyDOMElement();

    for (const fallbackSemantics of [
      { role: 'status' as const },
      { 'aria-label': 'Portrait unavailable' },
      { 'aria-labelledby': 'portrait-fallback-label' },
    ]) {
      rerender(
        <ThemeProvider colorScheme="light">
          <span id="portrait-fallback-label">Portrait unavailable</span>
          <Avatar
            fallbackProps={{ children: 'Unavailable', ...fallbackSemantics }}
          />
        </ThemeProvider>,
      );

      expect(screen.getByText('Unavailable')).not.toHaveAttribute(
        'aria-hidden',
      );
    }

    rerender(
      <ThemeProvider colorScheme="light">
        <Avatar
          fallbackProps={{
            children: 'Unavailable',
            role: 'status',
            'aria-label': 'Portrait unavailable',
            'aria-hidden': true,
          }}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it.each(['aria-label', 'aria-labelledby'] as const)(
    'preserves fallback semantics supplied through render with %s',
    (labelAttribute) => {
      const fallbackRef = createRef<HTMLSpanElement>();
      const fallbackLabel =
        labelAttribute === 'aria-label'
          ? 'Portrait unavailable'
          : 'portrait-fallback-label';
      const fallbackRender = (
        <span role="img" {...{ [labelAttribute]: fallbackLabel }} />
      );
      render(
        <ThemeProvider colorScheme="light">
          <span id="portrait-fallback-label">Portrait unavailable</span>
          <Avatar
            fallbackProps={{
              render: fallbackRender,
              ref: fallbackRef,
              children: 'NA',
            }}
          />
        </ThemeProvider>,
      );

      const fallback = screen.getByRole('img', {
        name: 'Portrait unavailable',
      });

      expect(fallback).toHaveTextContent('NA');
      expect(fallback).not.toHaveAttribute('aria-hidden');
      expect(fallbackRef.current).toBe(fallback);
    },
  );

  it('lets a fallback render function own its semantics and preserves explicit hiding', () => {
    const { rerender } = render(
      <ThemeProvider colorScheme="light">
        <Avatar
          fallbackProps={{
            render: (props) => (
              <span {...props} role="img" aria-label="Portrait unavailable" />
            ),
            children: 'NA',
          }}
        />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('img', { name: 'Portrait unavailable' }),
    ).toHaveTextContent('NA');

    rerender(
      <ThemeProvider colorScheme="light">
        <Avatar
          fallbackProps={{
            render: (
              <span role="img" aria-label="Portrait unavailable" aria-hidden />
            ),
            children: 'NA',
          }}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('NA')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is decorative by default and uses explicit image alternative text for its fallback', () => {
    const { rerender } = render(
      <ThemeProvider colorScheme="light">
        <Avatar name="Jane" imageProps={{ alt: 'Jane portrait' }} />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('img', { name: 'Jane portrait' }),
    ).toHaveTextContent('J');

    rerender(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="Jane"
          src="/jane.png"
          imageProps={{ keepMounted: true }}
        />
      </ThemeProvider>,
    );

    expect(screen.getByAltText('')).toHaveAttribute('alt', '');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('J')).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes the fallback delay through the shorthand', () => {
    vi.useFakeTimers();

    render(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="Jane"
          imageProps={{ alt: 'Jane' }}
          fallbackProps={{ delay: 100 }}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByRole('img', { name: 'Jane' })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(100));

    expect(screen.getByRole('img', { name: 'Jane' })).toHaveTextContent('J');
  });

  it('shares rendered image loading, error and replacement state with its fallback', () => {
    const imageRef = createRef<HTMLImageElement>();
    const handleLoadingStatusChange = vi.fn();
    const handleLoad = vi.fn();
    const handleError = vi.fn();
    const imageProps = {
      alt: 'Jane',
      keepMounted: true,
      ref: imageRef,
      onLoadingStatusChange: handleLoadingStatusChange,
      onLoad: handleLoad,
      onError: handleError,
      loading: 'lazy',
      crossOrigin: 'anonymous',
    } as const;
    const { rerender } = render(
      <ThemeProvider colorScheme="light">
        <Avatar name="Jane" src="/jane.png" imageProps={imageProps} />
      </ThemeProvider>,
    );

    const image = screen.getByAltText<HTMLImageElement>('Jane');

    expect(imageRef.current).toBe(image);
    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('crossorigin', 'anonymous');
    expect(image).toHaveAttribute('alt', 'Jane');
    expect(image).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('img', { name: 'Jane' })).toHaveTextContent('J');
    expect(handleLoadingStatusChange).toHaveBeenLastCalledWith('loading');

    fireEvent.load(image);

    expect(handleLoad).toHaveBeenCalledTimes(1);
    expect(handleLoadingStatusChange).toHaveBeenLastCalledWith('loaded');
    expect(screen.getByRole('img', { name: 'Jane' })).toBe(image);
    expect(screen.queryByText('J')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider colorScheme="light">
        <Avatar name="Jane" src="/replacement.png" imageProps={imageProps} />
      </ThemeProvider>,
    );

    expect(imageRef.current).toBe(image);
    expect(image).toHaveAttribute('src', '/replacement.png');
    expect(handleLoadingStatusChange).toHaveBeenLastCalledWith('loading');
    expect(screen.getByRole('img', { name: 'Jane' })).toHaveTextContent('J');

    fireEvent.error(image);

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleLoadingStatusChange).toHaveBeenLastCalledWith('error');
    expect(image).toHaveAttribute('data-error');
    expect(image).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('img', { name: 'Jane' })).toHaveTextContent('J');
  });
});

describe('Avatar company logo', () => {
  const twentyIcons = (domain: string) => `https://twenty-icons.com/${domain}`;
  const google = (domain: string) =>
    `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  const pictureWidths = new Map<string, number>();
  const requests: string[] = [];

  beforeEach(() => {
    requests.length = 0;
    vi.stubGlobal(
      'Image',
      class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        naturalWidth = 0;
        complete = false;
        referrerPolicy = '';
        crossOrigin: string | null = null;

        set src(url: string) {
          requests.push(`${this.referrerPolicy || 'referrer'} ${url}`);
          queueMicrotask(() => {
            this.naturalWidth = pictureWidths.get(url) ?? 0;
            this.complete = true;
            (this.naturalWidth > 0 ? this.onload : this.onerror)?.();
          });
        }
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderLogo = (name: string, domain: string) =>
    render(
      <ThemeProvider colorScheme="light">
        <Avatar
          name={name}
          src={twentyIcons(domain)}
          imageProps={{ alt: name }}
        />
      </ThemeProvider>,
    );

  const expectPicture = (name: string, url: string) =>
    waitFor(() =>
      expect(screen.getByRole('img', { name })).toHaveAttribute('src', url),
    );

  it('shows the logo from Twenty and never asks the second source', async () => {
    pictureWidths.set(twentyIcons('volvo.com'), 64);
    renderLogo('Volvo', 'volvo.com');

    await expectPicture('Volvo', twentyIcons('volvo.com'));
    expect(requests).toEqual([`referrer ${twentyIcons('volvo.com')}`]);
  });

  it('shows the second logo, asked without a referrer, when Twenty has none', async () => {
    pictureWidths.set(google('ericsson.com'), 64);
    renderLogo('Ericsson', 'ericsson.com');

    await expectPicture('Ericsson', google('ericsson.com'));
    expect(new Set(requests)).toEqual(
      new Set([
        `referrer ${twentyIcons('ericsson.com')}`,
        `no-referrer ${google('ericsson.com')}`,
      ]),
    );
  });

  it('asks the second source without a referrer whatever policy the caller gave', async () => {
    pictureWidths.set(google('afry.se'), 64);
    render(
      <ThemeProvider colorScheme="light">
        <Avatar
          name="AFRY"
          src={twentyIcons('afry.se')}
          imageProps={{ alt: 'AFRY', referrerPolicy: 'unsafe-url' }}
        />
      </ThemeProvider>,
    );

    await expectPicture('AFRY', google('afry.se'));
    expect(requests).toContain(`unsafe-url ${twentyIcons('afry.se')}`);
    expect(
      requests.filter((request) => request.endsWith(google('afry.se'))),
    ).toEqual(expect.arrayContaining([`no-referrer ${google('afry.se')}`]));
    expect(requests).not.toContain(`unsafe-url ${google('afry.se')}`);
    expect(screen.getByRole('img', { name: 'AFRY' })).toHaveAttribute(
      'referrerpolicy',
      'no-referrer',
    );
  });

  it.each([
    ['answers its 16-pixel placeholder', 'westcode.se', 16],
    ['fails too', 'nowhere.example', 0],
  ])('keeps the letter when the second source %s', async (_, domain, width) => {
    pictureWidths.set(google(domain), width);
    renderLogo('Westcode', domain);

    await waitFor(() =>
      expect(requests).toContain(`no-referrer ${google(domain)}`),
    );
    await act(async () => {});

    const avatar = screen.getByRole('img', { name: 'Westcode' });

    expect(avatar).toHaveTextContent('W');
    expect(avatar).not.toHaveAttribute('src');
  });

  it('starts the next avatar of the same company with the second logo', async () => {
    pictureWidths.set(google('sca.se'), 64);
    const { unmount } = renderLogo('SCA', 'sca.se');
    await expectPicture('SCA', google('sca.se'));
    unmount();
    requests.length = 0;

    renderLogo('SCA', 'sca.se');

    await expectPicture('SCA', google('sca.se'));
    expect(requests).toEqual([`no-referrer ${google('sca.se')}`]);
  });
});
