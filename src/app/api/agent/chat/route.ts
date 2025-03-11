// src/app/api/agent/chat/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client with the beta header enabled
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

// Define proper types for request and response
interface ChatRequest {
  threadId: string;
  message: string;
}

interface ChatResponse {
  runId: string;
  status: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { threadId, message } = (await request.json()) as ChatRequest;

    // Validate required fields
    if (!threadId) {
      return NextResponse.json(
        { error: "threadId is required" },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    console.log(`Processing message for thread ${threadId}`);

    // 1. Add the user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // 2. Create a run but don't wait for completion
    const runResponse = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      instructions:
        "You are a helpful real estate assistant. Provide informative and natural responses about neighborhoods and properties.",
    });

    console.log(`Run created with ID: ${runResponse.id}`);

    // 3. Immediately return the run ID for client-side polling
    return NextResponse.json({
      runId: runResponse.id,
      status: "processing",
    } as ChatResponse);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
