import { GetServerSideProps } from "next";
import { Landing } from "../components/Landing";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

export default Landing;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
