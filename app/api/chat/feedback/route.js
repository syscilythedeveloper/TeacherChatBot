import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CatchingPokemon } from "@mui/icons-material";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({
        error: "Message is required.",
      });
    }

    const response = writeFeedback(message);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing the request:", error);

    return NextResponse.json({
      error:
        "An error occurred while processing your request. Please try again later.",
    });
  }
}

function writeFeedback(mess) {
  const filePath = path.join(process.cwd(), "app/assets/feedback.txt");

  if (mess?.feedback == null && mess?.generatedIndex) {
    console.log("Deleting feedback");
    deleteFeedback(mess.generatedIndex, filePath);
    return {
      message: "Feedback deleted successfully",
      generatedIndex: null,
    };
  }

  // Use the provided index if it exists, otherwise generate a new one
  if (mess?.generatedIndex) {
    // If there's an existing index, delete the feedback
    deleteFeedback(mess.generatedIndex, filePath);
  }

  // Create a new feedback entry
  return createFeedback(mess, filePath);
}

function deleteFeedback(index, filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let lines = content.split("\n");
  let updatedContent = "";
  let found = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`[${index}]`)) {
      found = true; // Start skipping lines when the index is found
    }

    if (found && lines[i].includes("respond with the correct answer.")) {
      found = false; // Stop skipping lines after finding the end of the feedback
      continue; // Skip the current line as well (the one with the ending marker)
    }

    if (!found) {
      updatedContent += lines[i] + "\n";
    }
  }

  fs.writeFileSync(filePath, updatedContent.trim(), "utf8");

  return {
    message: "Feedback deleted successfully",
    generatedIndex: index,
  };
}
function createFeedback(mess, filePath) {
  const index = generateIndex();
  mess.generatedIndex = index;

  const feedbackEntry = `\n[${index}] For this question "${mess.message}" the bot response was "${mess.bot_response}" and the feedback was "${mess.feedback}". If bad, respond with the correct answer.\n\n`;

  fs.appendFileSync(filePath, feedbackEntry, "utf8");

  return {
    message: "New feedback added successfully",
    generatedIndex: index,
  };
}

function generateIndex() {
  return Date.now(); // Generate a unique index using the current timestamp
}
