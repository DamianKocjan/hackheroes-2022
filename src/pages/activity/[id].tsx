import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ActivityDetail } from "../../components/ActivityDetail";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default ActivityDetail;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();
  const id = params?.id as string;

  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      type: true,
    },
  });

  if (!activity) {
    return {
      notFound: true,
    };
  }

  let activityDetail = null;
  if (activity.type === "ofert") {
    activityDetail = await prisma.ofert.findUnique({
      where: { id },
      include: {
        user: true,
        _count: {
          select: {
            interactions: true,
            comments: true,
          },
        },
      },
    });

    if (activityDetail) {
      activityDetail.price = parseFloat(activityDetail.price);
    }
  } else if (activity.type === "post") {
    activityDetail = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        _count: {
          select: {
            interactions: true,
            comments: true,
          },
        },
      },
    });
  } else if (activity.type === "event") {
    activityDetail = await prisma.event.findUnique({
      where: { id },
      include: {
        user: true,
        _count: {
          select: {
            interactions: true,
            comments: true,
            interestedInEvent: true,
          },
        },
      },
    });

    activityDetail.from = activityDetail.from.toISOString();
    activityDetail.to = activityDetail.to.toISOString();
  } else {
    activityDetail = await prisma.poll.findUnique({
      where: { id },
      include: {
        user: true,
        _count: {
          select: {
            interactions: true,
            comments: true,
          },
        },
      },
    });
  }

  if (!activityDetail) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      activity: {
        ...activityDetail,
        type: activity.type,
        createdAt: activityDetail?.createdAt.toISOString(),
        updatedAt: activityDetail?.updatedAt.toISOString(),
      },
    },
  };
};
