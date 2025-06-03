// src/types/index.ts
export type User = {
  id: string;
  name: string;
  email: string;
  plan: "basic" | "classic" | "premium" | "executive";
  // other user fields
};

export type Plan = {
  id: "basic" | "classic" | "premium" | "executive";
  name: string;
  price: number;
  features: string[];
};