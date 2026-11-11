export type HostedPageContextMessage = {
  hostedPage: 1;
  type: 'context';
  path: string;
  colorScheme: 'light' | 'dark';
  locale: string;
};
