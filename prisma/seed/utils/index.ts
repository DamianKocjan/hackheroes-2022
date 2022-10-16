import type { Condition } from "@prisma/client";

export function randomCondition(): Condition {
  const conditions = ["NEW", "USED", "UNKNOWN"];
  return conditions[Math.floor(Math.random() * conditions.length)] as Condition;
}
