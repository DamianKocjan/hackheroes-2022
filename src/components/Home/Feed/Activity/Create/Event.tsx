import React from "react";
import { Input } from "../../../../shared/Input/Input";
import { Textarea } from "../../../../shared/Input/Textarea";
import { ActivityCreateData, HandleSetEventData } from "./types";

interface EventProps {
  data: ActivityCreateData["event"];
  handleSetData: HandleSetEventData;
}

export const Event: React.FC<EventProps> = ({ data, handleSetData }) => {
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
        <label htmlFor="description" className="sr-only">
          Your description
        </label>
        <Textarea
          name="description"
          id="description"
          placeholder="Your description..."
          value={data.description}
          onChange={(e) => handleSetData("description", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="border-b border-gray-200 focus-within:border-indigo-600">
          <label htmlFor="from" className="text-sm text-gray-500">
            From
          </label>
          <Input
            name="from"
            id="from"
            type="date"
            placeholder="From..."
            value={data.from}
            onChange={(e) => handleSetData("from", e.target.value)}
          />
        </div>
        <div className="border-b border-gray-200 focus-within:border-indigo-600">
          <label htmlFor="to" className="text-sm text-gray-500">
            To
          </label>
          <Input
            name="to"
            id="to"
            type="date"
            placeholder="To..."
            value={data.to}
            onChange={(e) => handleSetData("to", e.target.value)}
          />
        </div>
      </div>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <Input
          name="location"
          id="location"
          placeholder="Location..."
          value={data.location}
          onChange={(e) => handleSetData("location", e.target.value)}
        />
      </div>
    </>
  );
};
