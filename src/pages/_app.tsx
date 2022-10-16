// src/pages/_app.tsx
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppType } from "next/app";
import Head from "next/head";
import { Footer } from "../components/App/Footer";
import { Nav } from "../components/App/Nav";
import { NProgress } from "../components/App/NProgress";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DefaultSeo
        defaultTitle="E-Osiedle"
        titleTemplate="%s | E-Osiedle"
        description="E-Osiedle website"
      />

      <NProgress />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
