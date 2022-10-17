import React from "react";

interface FeedProps {
  exclude?: string;
  filters?: {
    title?: string;
    condition?: "NEW" | "USED" | "UNKNOWN";
    minPrice?: number;
    maxPrice?: number;
    category?: string;
  };
}

export const Feed: React.FC<FeedProps> = () => {
  return <div>Feed</div>;
};
