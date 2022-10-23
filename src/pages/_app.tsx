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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <DefaultSeo
        defaultTitle="This Place"
        titleTemplate="%s | This Place"
        description="This place is neighborhood social network, in which you can share your thoughts, ideas, and experiences."
      />

      <NProgress />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
