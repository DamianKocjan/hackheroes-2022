import { Poll } from "@prisma/client";
import Link from "next/link";
import { Check } from "phosphor-react";
import React, { useMemo, useState } from "react";
import { useFormatRelativeDate } from "../../../../hooks/formatters/useFormatRelativeDate";
import { ModelData } from "../../../../types";
import { classNames } from "../../../../utils/classnames";
import { trpc } from "../../../../utils/trpc";
import { Avatar } from "../../../shared/Avatar";
import { CommentSection } from "./CommentSection";
import { Interactions } from "./Interactions";
import { Activity } from "./Layout";

export interface ActivityPollProps extends Poll, ModelData {}

export const ActivityPoll: React.FC<ActivityPollProps> = ({
  id,
  user,
  createdAt,
  title,
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

  const {
    data: pollOptions,
    isLoading: pollOptionsLoading,
    isError: pollOptionsError,
    error: pollOptionsErrorData,
    refetch,
  } = trpc.poll.options.useQuery({
    pollId: id,
  });

  const totalVotes = useMemo(
    () =>
      pollOptions?.result.reduce((acc, option) => acc + option._count.votes, 0),
    [pollOptions]
  );

  const { mutateAsync, isLoading } = trpc.poll.vote.useMutation({
    async onSuccess() {
      await refetch();
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
          <h3 className="text-lg">{title}</h3>
          <span className="prose-sm text-gray-900">{description}</span>
          <div>
            {pollOptionsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="mt-4 flex animate-pulse items-center justify-between"
                />
              ))
            ) : pollOptionsError ? (
              <div className="text-red-500">
                {pollOptionsErrorData?.message ||
                  pollOptionsErrorData.toString()}
              </div>
            ) : (
              pollOptions &&
              pollOptions.result.map((option) => (
                <button
                  key={option.id}
                  className="mt-2 flex w-full items-center justify-between rounded-md border border-gray-200 p-2 first-of-type:mt-4 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  onClick={async () =>
                    await mutateAsync({
                      optionId: option.id,
                      pollId: id,
                    })
                  }
                >
                  <span className="text-gray-900">{option.title}</span>
                  <span className="flex items-center gap-2 text-gray-500">
                    {option.votes.length > 0 && (
                      <Check className="h-5 w-5 text-indigo-600" />
                    )}
                    {option._count.votes > 0 && option._count.votes}
                  </span>
                </button>
              ))
            )}
            {totalVotes && totalVotes > 0 && (
              <p className="mt-2 text-gray-500">
                {totalVotes} {totalVotes === 0 ? "vote" : "votes"}
              </p>
            )}
          </div>
        </div>
      </Activity.Body>
      <Activity.Footer>
        <div className="flex flex-col">
          <div className="flex">
            <Interactions
              interactions={interactions}
              interactionsCount={interactionsCount}
              modelId={id}
              modelType="poll"
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
      {openCommentSection && <CommentSection model="poll" modelId={id} />}
    </Activity>
  );
};
