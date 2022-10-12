import type { Comment as PComment, User } from "@prisma/client";
import React from "react";

interface CommentProps extends PComment {
  user: User;
}

export const Comment: React.FC<CommentProps> = (props) => {
  return <div>{JSON.stringify(props)}</div>;
};
