import { Event, Ofert, Poll, Post } from "@prisma/client";
import React from "react";
import { ActivityOfert } from "./Ofert";
import { ActivityPost, ActivityPostProps } from "./Post";

type PartialOfert = Partial<Ofert>;
type PartialPost = Partial<Post>;
type PartialEvent = Partial<Event>;
type PartialPoll = Partial<Poll>;

type ActivityType = "ofert" | "post" | "event" | "poll";

export interface ActivityProps
  extends PartialOfert,
    PartialPost,
    PartialEvent,
    PartialPoll {
  id: string;
  type: ActivityType;
}

export const Activity: React.FC<ActivityProps> = ({ type, ...props }) => {
  if (type === "ofert") {
    return <ActivityOfert />;
  } else if (type === "event") {
    return <div>Event</div>;
  } else if (type === "poll") {
    return <div>Poll</div>;
  }
  return <ActivityPost {...(props as ActivityPostProps)} />;
};
