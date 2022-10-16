export interface Interaction {
  type: "LIKE" | "DISLIKE" | "SAD" | "ANGRY" | "LOVE" | "WOW";
  count: number;
}

export interface ModelData {
  user: User;
  interactions: Interaction[];
  interactionsCount: number;
  _count: {
    interactions: number;
    comments: number;
  };
}
