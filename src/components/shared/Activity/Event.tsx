import { Event } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useFormatRelativeDate } from "../../../hooks/formatters/useFormatRelativeDate";
import { ModelData } from "../../../types";
import { classNames } from "../../../utils/classnames";
import { isToday } from "../../../utils/date";
import { trpc } from "../../../utils/trpc";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { CommentSection } from "./CommentSection";
import { Interactions } from "./Interactions";
import { Activity } from "./Layout";

export interface ActivityEventProps extends Event, ModelData {}

export const ActivityEvent: React.FC<ActivityEventProps> = ({
  id,
  user,
  createdAt,
  title,
  from,
  to,
  location,
  description,
  _count,
}) => {
  createdAt = new Date(createdAt);
  from = new Date(from);
  to = new Date(to);
  const dateFormatter = useFormatRelativeDate();
  const formatedDate = useMemo(
    () => dateFormatter(new Date(createdAt)),
    [createdAt, dateFormatter]
  );
  const [openCommentSection, setOpenCommentSection] = useState(false);

  const { data, refetch } = trpc.event.isInterestedIn.useQuery({ eventId: id });
  const { mutateAsync } = trpc.event.interestedIn.useMutation({
    onSuccess() {
      refetch();
    },
  });

  return (
    <Activity>
      <Activity.Navbar>
        <div className="flex">
          <Avatar src={user.image} alt="avatar" />
          <div className="ml-4 flex flex-col">
            <Link
              href={`/user/${user.id}`}
              className="text-sm font-medium text-gray-900"
            >
              {user.name}
            </Link>
            <span className="text-sm text-gray-500">{formatedDate}</span>
          </div>
        </div>
      </Activity.Navbar>
      <Activity.Body>
        <div className="flex flex-col">
          <h3 className="text-lg">
            <Link href={`/activity/${id}`}>{title}</Link>
          </h3>
          <span className="-mt-1 text-sm text-gray-500">
            <time dateTime={from.toLocaleString()}>
              {isToday(from)
                ? from.toLocaleTimeString()
                : from.toLocaleDateString()}
            </time>
            {" - "}
            <time dateTime={to.toLocaleString()}>
              {isToday(to) ? to.toLocaleTimeString() : to.toLocaleDateString()}
            </time>
            , {location}
          </span>
          <span className="prose-sm text-gray-900">{description}</span>
          {data !== undefined && (
            <Button
              type="button"
              className="mt-2"
              onClick={async () =>
                await mutateAsync({
                  eventId: id,
                })
              }
            >
              {data ? "I'm interest in event!" : "Interested in event?"}
            </Button>
          )}
        </div>
      </Activity.Body>
      <Activity.Footer>
        <div className="flex flex-col">
          <div className="flex">
            <Interactions modelId={id} model="event" />
            <div className="flex-1" />
            <button
              className={classNames(
                "text-sm",
                openCommentSection ? "text-gray-700" : "text-gray-500"
              )}
              onClick={() => setOpenCommentSection((val) => !val)}
            >
              {_count.comments} Comments
            </button>
          </div>
        </div>
      </Activity.Footer>
      {openCommentSection && <CommentSection model="event" modelId={id} />}
    </Activity>
  );
};