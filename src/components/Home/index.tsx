import type { NextPage } from "next";
import Link from "next/link";
import { Container } from "../common/Container";

export const Home: NextPage = () => {
  return (
    <Container title="Home">
      <h1>Home</h1>
      <Link href="/wdadw">
        <a>wadwda</a>
      </Link>
    </Container>
  );
};
