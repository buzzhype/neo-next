import { NextResponse } from "next/server";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function POST(request: Request) {
  try {
    const { threadId, message } = await request.json();

    // *** 1) Call OpenAI with stream=true
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 500,
          temperature: 0.7,
          stream: true, // <--- IMPORTANT
        }),
      },
    );

    if (!openAIResponse.ok) {
      return NextResponse.json(
        { error: `OpenAI request failed: ${openAIResponse.status}` },
        { status: 500 },
      );
    }

    // *** 2) Convert the OpenAI response into a streaming text response
    const textStream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        const parser = createParser(
          (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === "event") {
              const data = event.data;
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const token = json.choices?.[0]?.delta?.content;
                if (token) {
                  controller.enqueue(new TextEncoder().encode(token));
                }
              } catch (e) {
                controller.error(e);
              }
            }
          },
        );

        // This will read the chunks from OpenAI's response
        for await (const chunk of openAIResponse.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });

    // *** 3) Return the text stream back
    return new NextResponse(textStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.error("Error in streaming route:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
