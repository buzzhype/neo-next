// src/app/api/agent/check-status/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");
  const runId = searchParams.get("runId");

  if (!threadId || !runId) {
    return NextResponse.json(
      { error: "threadId and runId are required" },
      { status: 400 },
    );
  }

  try {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);

    if (run.status === "completed") {
      // Get the latest message
      const messages = await openai.beta.threads.messages.list(threadId, {
        limit: 1,
        order: "desc",
      });

      return NextResponse.json({
        status: "completed",
        message: messages.data[0],
      });
    }

    return NextResponse.json({ status: run.status });
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 },
    );
  }
}
