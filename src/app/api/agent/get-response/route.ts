import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

// Define types for the responses. Adjust these types if the actual response shape differs.
type RunsResponseType =
  | { data: any[] }
  | { data: { data: any[] } };

type MessagesResponseType =
  | { data: any[] }
  | { data: { data: any[] } };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");

  if (!threadId) {
    return NextResponse.json({ error: "Thread ID required" }, { status: 400 });
  }

  try {
    // Fetch runs and assert the type.
    const runsResponse = (await openai.beta.threads.runs.list(threadId)) as RunsResponseType;
    const runsArray = Array.isArray(runsResponse.data)
      ? runsResponse.data
      : (runsResponse.data?.data || []);
    const latestRun = runsArray[0];

    if (!latestRun) {
      return NextResponse.json({ status: "no run found", recommendations: [] });
    }

    if (latestRun.status !== "completed") {
      return NextResponse.json({ status: latestRun.status, recommendations: [] });
    }

    // Fetch messages and assert the type.
    const messagesResponse = (await openai.beta.threads.messages.list(threadId)) as MessagesResponseType;
    const messagesArray = Array.isArray(messagesResponse.data)
      ? messagesResponse.data
      : (messagesResponse.data?.data || []);
    const assistantMessage = messagesArray.find((msg: any) => msg.role === "assistant");

    if (!assistantMessage) {
      throw new Error("No assistant message found");
    }

    // Extract the content text from the assistant message.
    const contentText = Array.isArray(assistantMessage.content)
      ? assistantMessage.content[0].text.value
      : assistantMessage.content;

    // Try to parse the content as JSON.
    let recommendationsData;
    try {
      recommendationsData = JSON.parse(contentText);
    } catch (e) {
      // If direct parsing fails, try extracting JSON from markdown.
      const match = contentText.match(/```json\s*([\s\S]*?)\s*```/);
      if (!match) {
        throw new Error("Failed to parse response as JSON");
      }
      recommendationsData = JSON.parse(match[1]);
    }

    if (!recommendationsData?.recommendations?.length) {
      throw new Error("Invalid recommendations format");
    }

    return NextResponse.json({
      status: "completed",
      recommendations: recommendationsData.recommendations.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch recommendations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
