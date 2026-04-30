import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const players = pgTable('players', {
  id: serial('id').primaryKey(),
  nickname: text('nickname').notNull().unique(),
  language: text('language').default('spanish').notNull(),
  // jsonb will store the array of card IDs they learned from the Sage
  unlockedCards: jsonb('unlocked_cards').default([]), 
  createdAt: timestamp('created_at').defaultNow(),
});