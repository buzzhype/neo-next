// src/app/api/agent/chat/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

// Define types for run responses
type RunResponse = {
  id: string;
  status: string;
  // ... include other properties if needed
};

type MessageContent = {
  type: string;
  text?: { value: string };
};

type Message = {
  role: string;
  content: string | MessageContent[];
};

// Define a proper type for the messages list response
interface MessageListResponse {
  data: Message[];
}

export async function POST(request: Request) {
  try {
    const { threadId, message } = await request.json();

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

    // 2. Create a run
    const runResponse = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      instructions:
        "You are a helpful real estate assistant. Provide informative and natural responses about neighborhoods and properties.",
    });

    // 3. Poll for completion
    let runStatus = runResponse.status;
    let attempts = 0;
    const maxAttempts = 60; // Increase if needed
    let currentRun = runResponse;

    while (
      runStatus !== "completed" &&
      runStatus !== "failed" &&
      attempts < maxAttempts
    ) {
      // Wait 1 second between checks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // Retrieve the latest status of the run
        const statusResponse = await openai.beta.threads.runs.retrieve(
          threadId,
          currentRun.id,
        );
        runStatus = statusResponse.status;
        currentRun = statusResponse;
        console.log(`Run status: ${runStatus}, attempt: ${attempts}`);
      } catch (err) {
        console.error("Error checking run status:", err);
      }
      attempts++;
    }

    if (runStatus === "failed") {
      throw new Error("Assistant run failed");
    }

    if (runStatus !== "completed") {
      throw new Error("Assistant run timed out");
    }

    // 4. Retrieve the latest message (assumed to be the assistant's reply)
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

    // 5. Extract and format the message content
    let messageContent = "";
    if (Array.isArray(lastMessage.content)) {
      messageContent = lastMessage.content
        .filter((content) => content.type === "text")
        .map((content) => content.text?.value || "")
        .join("\n");
    } else {
      messageContent = String(lastMessage.content);
    }

    // 6. Return the formatted response
    return NextResponse.json({
      response: messageContent,
      status: "success",
    });
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
