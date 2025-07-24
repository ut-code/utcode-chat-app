import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    assigner: v.string(),
  }),
  channels: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }),
  messages: defineTable({
    channelId: v.id("channels"),
    content: v.string(),
    author: v.string(),
    createdAt: v.number(),
  }).index("by_channel", ["channelId"]),
  ...authTables,
});
