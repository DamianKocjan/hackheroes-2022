export interface Interaction {
  type: "LIKE" | "HAHA" | "SAD" | "ANGRY" | "LOVE" | "WOW";
  count: number;
}

export interface ModelData {
  user: User;
  _count: {
    interactions: number;
    comments: number;
  };
}
