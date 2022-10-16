import type { NextPage } from "next";
import { Container } from "../common/Container";
import { Activity } from "../shared/Activity";
import { Feed } from "../shared/Feed";
import { GetBackToTop } from "../shared/GetBackToTop";

export const ActivityDetail: NextPage = ({ activity }: any) => {
  return (
    <Container title="Home">
      <div className="py-4">
        <div className="mx-auto mb-8 grid max-w-xl">
          <Activity {...activity} />
        </div>
        <GetBackToTop />
        <Feed exclude={activity.id} />
      </div>
    </Container>
  );
};
