import React, { useMemo } from "react";
import { useFormatRelativeDate } from "../../../../hooks/formatters/useFormatRelativeDate";
import { Avatar } from "../../../shared/Avatar";
import { Interactions } from "./Interactions";
import { Activity } from "./Layout";

export const ActivityOfert: React.FC = () => {
  const dateFormatter = useFormatRelativeDate();
  const formatedDate = useMemo(
    () => dateFormatter(new Date()),
    [dateFormatter]
  );

  return (
    <Activity>
      <Activity.Navbar>
        <div className="flex">
          <Avatar src="https://i.pravatar.cc/150?img=1" alt="avatar" />
          <div className="ml-4 flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              Jane Cooper
            </span>
            <span className="text-sm text-gray-500">{formatedDate}</span>
          </div>
        </div>
      </Activity.Navbar>
      <Activity.Body>
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">Oferta</span>
          <span className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quod, voluptates, quia, voluptas quae voluptatem quibusdam
            voluptatibus quidem quos natus quas. Quisquam, quae. Quisquam
            voluptates, quia, voluptas quae voluptatem quibusdam voluptatibus
            quidem quos natus quas. Quisquam, quae.
          </span>
        </div>
      </Activity.Body>
      <Activity.Footer>
        <div className="flex flex-col">
          <div className="flex">
            <Interactions
              interactions={[]}
              interactionsCount={0}
              modelId="1"
              modelType="ofert"
            />
            <div className="flex-1"></div>
            <button className="text-sm text-gray-500">Comment</button>
          </div>
        </div>
      </Activity.Footer>
    </Activity>
  );
};
