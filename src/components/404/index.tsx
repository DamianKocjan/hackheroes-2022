import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { Footer } from "./Footer";
import { Main } from "./Main";

// TODO: improve page and fix image size
export const NotFound: NextPage = () => {
  return (
    <>
      <NextSeo title="Not found" />
      <div className="flex min-h-full flex-col bg-white lg:relative">
        <div className="flex flex-grow flex-col">
          <Main />
          <Footer />
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            alt=""
            layout="fill"
          />
        </div>
      </div>
    </>
  );
};
