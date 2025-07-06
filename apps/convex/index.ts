export { api } from "./src/convex/_generated/api.js";
export type { Id } from "./src/convex/_generated/dataModel.js";

import type { DataModel } from "./src/convex/_generated/dataModel.js";
export type Task = DataModel["tasks"]["document"];

export type Query<T> =
  | {
      isLoading: true;
      error: undefined;
      data: undefined;
    }
  | {
      isLoading: false;
      error: Error;
      data: undefined;
    }
  | {
      isLoading: false;
      error: undefined;
      data: T;
    };
