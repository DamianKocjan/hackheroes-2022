export interface Interaction {
  type: "LIKE" | "DISLIKE" | "SAD" | "ANGRY" | "LOVE" | "WOW";
  count: number;
}
