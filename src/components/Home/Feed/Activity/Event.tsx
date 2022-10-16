import { Event } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useFormatRelativeDate } from "../../../../hooks/formatters/useFormatRelativeDate";
import { ModelData } from "../../../../types";
import { classNames } from "../../../../utils/classnames";
import { isToday } from "../../../../utils/date";
import { Avatar } from "../../../shared/Avatar";
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
  interactions,
  interactionsCount,
  _count,
}) => {
  const dateFormatter = useFormatRelativeDate();
  const formatedDate = useMemo(
    () => dateFormatter(createdAt),
    [createdAt, dateFormatter]
  );
  const [openCommentSection, setOpenCommentSection] = useState(false);

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
          <h3 className="text-lg">{title}</h3>
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
        </div>
      </Activity.Body>
      <Activity.Footer>
        <div className="flex flex-col">
          <div className="flex">
            <Interactions
              interactions={interactions}
              interactionsCount={interactionsCount}
              modelId={id}
              modelType="event"
            />
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
