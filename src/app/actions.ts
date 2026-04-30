"use server";
import { db } from '../db';
import { players } from '../db/schema';

export async function savePlayerToDB(nickname: string) {
  try {
    // Insert the player into NeonDB
    await db.insert(players).values({
      nickname: nickname,
      language: 'spanish',
    });
    return { success: true };
  } catch (error) {
    // If the name already exists, the unique constraint will throw an error
    console.error("Database error:", error);
    return { success: false, error: 'Nickname might already be taken!' };
  }
}