import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const exercises = sqliteTable("exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  family: text("family").notNull(), // e.g., "Warm-Up", "Knee/Quad"
  track: text("track").notNull(), // "build", "organize", "express"
  description: text("description"),
  videoUrl: text("video_url"),
  sets: text("sets"),
  reps: text("reps"),
  time: text("time"),
  rest: text("rest"),
  coachingCue: text("coaching_cue"),
  easierOption: text("easier_option"),
  harderOption: text("harder_option"),
  safetyNote: text("safety_note"),
});

export const sessionTemplates = sqliteTable("session_templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const sessionExercises = sqliteTable("session_exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull().references(() => sessionTemplates.id),
  exerciseId: text("exercise_id").notNull().references(() => exercises.id),
  order: integer("order").notNull(),
  sectionName: text("section_name").notNull(), // e.g., "Warm-Up", "Structural Capacity"
  timeBlock: text("time_block"), // e.g., "0:00–0:08"
});
