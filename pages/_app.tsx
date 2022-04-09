import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "styled/theme";
import GlobalStyle from "styled/global";
import MainHeader from "components/ui/organisms/main-header/main-header.server";
import MainFooter from "components/ui/organisms/main-footer/main-footer.server";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MainHeader />
      <Component {...pageProps} />
      <MainFooter />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
