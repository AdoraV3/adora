import { db } from "@/db";
import { Voice, voice } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getVoice(voiceId: Voice["id"]) {
  return db.query.voice.findFirst({
    where: eq(voice.id, voiceId),
  });
}

export async function getVoices() {
  return db.query.voice.findMany();
}
