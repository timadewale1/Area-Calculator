import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import '@/styles/index.css';
import '@/styles/calculator.css'; // Import your CSS file here
import { mantineTheme } from '@/styles/mantine-theme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
