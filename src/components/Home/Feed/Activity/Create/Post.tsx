import React from "react";
import { Input } from "../../../../shared/Input/Input";
import { Textarea } from "../../../../shared/Input/Textarea";
import { ActivityCreateData, HandleSetPostData } from "./types";

interface PostProps {
  data: ActivityCreateData["post"];
  handleSetData: HandleSetPostData;
}

export const Post: React.FC<PostProps> = ({ data, handleSetData }) => {
  return (
    <>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <Input
          name="title"
          id="title"
          placeholder="Your title..."
          value={data.title}
          onChange={(e) => handleSetData("title", e.target.value)}
        />
      </div>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label htmlFor="content" className="sr-only">
          Your content
        </label>
        <Textarea
          name="content"
          id="content"
          placeholder="Your content..."
          value={data.content}
          onChange={(e) => handleSetData("content", e.target.value)}
        />
      </div>
    </>
  );
};
