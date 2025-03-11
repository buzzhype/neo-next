import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client with the beta header enabled.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

// Updated system prompt to include lat, lng, and funFacts
const SYSTEM_PROMPT = `You are a real estate expert. 
Based on the provided user preferences (in JSON format), 
generate exactly 5 neighborhood recommendations with the following JSON schema:

{
  "recommendations": [
    {
      "name": string,
      "description": string,
      "matchScore": number,  // 0-100
      "averagePrice": number,
      "transitScore": number,  // 0-100
      "walkScore": number,     // 0-100
      "keyFeatures": string[],
      "trivia": string,
      "lat": number,           // neighborhood's latitude
      "lng": number,           // neighborhood's longitude
      "funFacts": string[]     // an array of interesting tidbits
    }
  ]
}
No extra text, just a valid JSON object in the above format.`;

export async function POST(request: Request) {
  try {
    // Get the user preferences from the request
    const preferences = await request.json();
    console.log("Received preferences:", preferences);

    // Create an assistant using the GPT-4o Assistants API
    const assistant = await openai.beta.assistants.create({
      name: "Real Estate Agent",
      instructions: SYSTEM_PROMPT, // Our updated system prompt
      model: "gpt-4o",
    });
    if (!assistant || !assistant.id) {
      throw new Error("Assistant creation failed: no id returned");
    }
    console.log("Assistant created:", assistant.id);

    // Create a new conversation thread
    const thread = await openai.beta.threads.create();
    if (!thread || !thread.id) {
      throw new Error("Thread creation failed: no id returned");
    }
    console.log("Thread created:", thread.id);

    // Post the user preferences as a message in the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: JSON.stringify(preferences, null, 2),
    });
    console.log("User message sent.");

    // Start a run on the thread with the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });
    console.log("Run created:", run.id);

    // Return the thread and run IDs so that the UI can poll for the response
    return NextResponse.json({ threadId: thread.id, runId: run.id });
  } catch (error) {
    console.error("API Error in create-thread:", error);
    return NextResponse.json(
      {
        error: "Failed to generate recommendations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
