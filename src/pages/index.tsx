import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DynamicHome = dynamic(
  () => import("../components/Home").then((mod) => mod.Home),
  {
    ssr: false,
  }
);
const DynamicLanding = dynamic(
  () => import("../components/Landing").then((mod) => mod.Landing),
  {
    ssr: false,
  }
);

export default function Home() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <DynamicLanding />;
  }
  return <DynamicHome />;
}
