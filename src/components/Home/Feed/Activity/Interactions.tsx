import React, { useMemo } from "react";
import { useNumberFormatter } from "../../../../hooks/formatters/useNumberFormatter";
import { Interaction } from "../../../../types";

interface InteractionsProps {
  modelId: string;
  modelType: "ofert" | "post" | "event" | "poll";
  interactions: Interaction[];
  interactionsCount: number;
}

export const Interactions: React.FC<InteractionsProps> = ({
  interactions,
  interactionsCount,
  modelId,
  modelType,
}) => {
  const formatNumber = useNumberFormatter();
  const formattedInteractionsNumber = useMemo(
    () => formatNumber.format(interactionsCount),
    [interactionsCount, formatNumber]
  );

  return (
    <div>
      <div className="flex -space-x-1 overflow-hidden">
        {interactions
          .filter((interaction) => interaction.count > 0)
          .map((interaction) => (
            <button
              key={`${modelType}-${modelId}-${interaction.type}`}
              title={interaction.count.toString()}
            >
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt={interaction.type}
              />
            </button>
          ))}
      </div>
      <span className="ml-2">{formattedInteractionsNumber}</span>
    </div>
  );
};
