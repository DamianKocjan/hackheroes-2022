import type { NextPage } from "next";
import { Container } from "../common/Container";
import { Feed } from "./Feed";
import { GetBackToTop } from "./GetBackToTop";

export const Home: NextPage = () => {
  return (
    <Container title="Home">
      <div className="py-4">
        <GetBackToTop />
        <Feed />
      </div>
    </Container>
  );
};
