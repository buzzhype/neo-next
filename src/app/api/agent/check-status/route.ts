// src/app/api/agent/check-status/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client with the beta header enabled
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

// Define type for message content
type MessageContent = {
  type: string;
  text?: { value: string };
};

// Define type for a message
type Message = {
  role: string;
  content: string | MessageContent[];
};

// Define response type for messages list
interface MessageListResponse {
  data: Message[];
}

// Define response types for the API
interface RunCheckInProgressResponse {
  status: string;
}

interface RunCheckCompletedResponse {
  status: string;
  response: string;
}

interface RunCheckErrorResponse {
  error: string;
  details?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");
  const runId = searchParams.get("runId");

  // Validate required parameters
  if (!threadId) {
    return NextResponse.json(
      { error: "threadId is required" },
      { status: 400 },
    );
  }

  if (!runId) {
    return NextResponse.json({ error: "runId is required" }, { status: 400 });
  }

  try {
    console.log(`Checking run status: ${runId} for thread: ${threadId}`);

    // Get the current status of the run
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);

    // If still processing, just return the status
    if (run.status !== "completed") {
      return NextResponse.json({
        status: run.status,
      } as RunCheckInProgressResponse);
    }

    // If completed, fetch the latest message
    const messagesResponse = (await openai.beta.threads.messages.list(
      threadId,
      {
        limit: 1,
        order: "desc",
      },
    )) as MessageListResponse;

    // Get the first message
    const messagesArray = messagesResponse.data || [];
    const lastMessage = messagesArray[0];

    if (!lastMessage || lastMessage.role !== "assistant") {
      throw new Error("No assistant response found");
    }

    // Extract and format the message content
    let messageContent = "";
    if (Array.isArray(lastMessage.content)) {
      messageContent = lastMessage.content
        .filter((content) => content.type === "text")
        .map((content) => content.text?.value || "")
        .join("\n");
    } else {
      messageContent = String(lastMessage.content);
    }

    console.log(`Retrieved response for run: ${runId}`);

    // Return the completed response with the assistant's message
    return NextResponse.json({
      status: "completed",
      response: messageContent,
    } as RunCheckCompletedResponse);
  } catch (error) {
    console.error("Check run API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to check run status",
        details: error instanceof Error ? error.message : "Unknown error",
      } as RunCheckErrorResponse,
      { status: 500 },
    );
  }
}
