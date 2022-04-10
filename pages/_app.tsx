import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import theme from "styled/theme";
import GlobalStyle from "styled/global";
import MainHeader from "components/ui/organisms/main-header/main-header.server";
import MainFooter from "components/ui/organisms/main-footer/main-footer.server";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainHeader />
        <Component {...pageProps} />
        <MainFooter />
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
