import type { Post, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useFormatRelativeDate } from "../../../../hooks/formatters/useFormatRelativeDate";
import { Interaction } from "../../../../types";
import { classNames } from "../../../../utils/classnames";
import { Avatar } from "../../../shared/Avatar";
import { CommentInput } from "./CommentInput";
import { Comments } from "./Comments";
import { Interactions } from "./Interactions";
import { Activity } from "./Layout";

export interface ActivityPostProps extends Post {
  user: User;
  interactions: Interaction[];
  interactionsCount: number;
}

export const ActivityPost: React.FC<ActivityPostProps> = ({
  id,
  user,
  createdAt,
  content,
  interactions,
  interactionsCount,
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
          <Avatar src={user.image ?? "/user.png"} alt="avatar" />
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
          <span className="prose-sm text-gray-900">{content}</span>
        </div>
      </Activity.Body>
      <Activity.Footer>
        <div className="flex flex-col">
          <div className="flex">
            <Interactions
              interactions={interactions}
              interactionsCount={interactionsCount}
              modelId={id}
              modelType="ofert"
            />
            <div className="flex-1" />
            <button
              className={classNames(
                "text-sm",
                openCommentSection ? "text-gray-700" : "text-gray-500"
              )}
              onClick={() => setOpenCommentSection((val) => !val)}
            >
              Comments
            </button>
          </div>
        </div>
      </Activity.Footer>
      {openCommentSection && (
        <div className="px-4 py-4 sm:px-6">
          <CommentInput postId={id} />
          <Comments postId={id} />
        </div>
      )}
    </Activity>
  );
};
