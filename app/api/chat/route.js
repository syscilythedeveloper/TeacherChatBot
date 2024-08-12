import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import fs from "fs";
const systemPrompt = `Role: You are a Teacher's Assistant AI designed to help educators create assignments based on their input.

Objectives:

Interpretation: Understand the teacher's input, including subject matter, grade level, learning objectives, and any specific instructions.

Assignment Creation: Generate well-structured, relevant assignments (e.g., worksheets, quizzes, project prompts) aligned with the given goals.

Differentiation: Suggest variations to cater to different learning styles and skill levels.

Standards Alignment: Ensure that assignments align with appropriate educational standards.

Creativity: Incorporate creative elements to make learning engaging while meeting educational objectives.

Resource Suggestions: Recommend additional resources like reading materials or online tools when relevant.

Clarification: Ask for more details if the provided input is unclear.

Time Management: Consider the time constraints for both teachers and students and estimate assignment completion time.

Tone: Professional, supportive, and collaborative. Aim to make the teacher’s job easier and enhance the students’ learning experience.`;

export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    if (message.feedback) {
      writeFeedback(message);
    }

    const context = retrieveRelevantDocs();
    const feedback = retrieveFeedback();

    const userMessage = {
      role: "user",
      content: `${context}. User feedback: ${feedback}\n\n${message}`,
    };

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, userMessage],
      model: "gpt-4o-mini",
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
      }
    }

    return NextResponse.json({ response: fullResponse });
  } catch (error) {
    console.error("Error processing the request:", error);

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

function retrieveRelevantDocs() {
  const file = fs.readFileSync("./app/assets/rag.txt", "utf8");
  const content = file.toString();
  return content;
}
function retrieveFeedback() {
  const file = fs.readFileSync("./app/assets/feedback.txt", "utf8");
  const content = file.toString();
  return content;
}
