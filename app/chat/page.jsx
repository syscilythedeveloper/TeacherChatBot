"use client";
import { Typography, CircularProgress, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import { auth, newMessage, updateMessage } from "@/firebase";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import { ThumbDown } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
export default function Chat() {
  const router = useRouter();
  const { isLoggedIn, isLoading, messages, setMessages } = useUser();
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSendMessage = async (mess) => {
    if (mess === "") return;
    setSendingMessage(true);
    try {
      console.log("sending message: ", mess);
      let bot_response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: mess }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!bot_response.ok) {
        console.error("Error getting bot response: ", bot_response);
        toast.error("Error getting bot response. Check OPENAI key has credits");
        cleanChat();
        return;
      }

      bot_response = await bot_response.json();

      const data = {
        sender: "user",
        message: mess,
        bot_response: bot_response.response,
        timestamp: new Date(),
      };

      const db_submit_response = await newMessage(auth.currentUser.uid, data);

      if (db_submit_response.status === "error") {
        console.error("Error submitting message to db");
        toast.error("Error submitting message to db");
      }
      console.log("bot response to database: ", db_submit_response);
      console.log("bot response data", data);

      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      console.error("Error sending message: ", error);
      toast.error("Error sending message");
    } finally {
      cleanChat();
    }
  };

  function cleanChat() {
    setSendingMessage(false);
    setMessage("");
  }

  async function handleFeedback(index, good) {
    // Create a copy of the messages array
    const newMessages = [...messages];

    // Get the specific message to update
    const mess = newMessages[index];
    const feedback = mess.feedback;

    // Toggle or set the feedback
    if (feedback) {
      mess.feedback = null;
    } else {
      mess.feedback = good ? "good" : "bad";
    }

    // Send the updated message to the server
    const response = await fetch("/api/chat/feedback", {
      method: "POST",
      body: JSON.stringify({ message: mess }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response
    const result = await response.json();
    if (response.ok) {
      console.log("Feedback updated: ", result.message);
    } else {
      console.error("Feedback update failed: ", result.error);
    }

    // Update the generatedIndex with the one returned from the server
    mess.generatedIndex = result.generatedIndex;

    // Update the messages array with the updated message
    newMessages[index] = mess;

    // Assuming you have a state setter function like setMessages
    updateMessage(auth.currentUser.uid, mess);

    setMessages(newMessages);
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3">Loading...</Typography>
      </Box>
    );
  }

  if (!isLoggedIn) {
    router.push("/login");
    return;
  }

  return (
    <>
      <Toast />
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgb(239, 245, 231), rgb(198, 184, 162))",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Navbar />
        <Box
          sx={{
            // backgroundColor: 'white',
            // border: '1px solid black',
            borderRadius: "50px",
            // padding: '10px',
          }}
        >
          <Image src="/bot.png" alt="AI Bot" width={50} height={50} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            width: "300px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid rgb(203, 203, 203)",
              borderRadius: "8px",
            }}
          >
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "5px 0",
                    maxWidth: "70%",
                  }}
                >
                  {msg.message}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: "flex-end",
                      backgroundColor: "rgb(217, 162, 22)",
                      borderRadius: "10px",
                      padding: "10px",
                      margin: "5px 0",
                      maxWidth: "70%",
                    }}
                    onContextMenu={(e) => handleRightClick(index, e)}
                  >
                    {msg.bot_response}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      right: "calc(-100% + 68px)",
                      display: "flex",
                    }}
                  >
                    <IconButton onClick={() => handleFeedback(index, true)}>
                      <ThumbUpIcon
                        sx={
                          msg.feedback === "good"
                            ? { color: "green" }
                            : { color: "black" }
                        }
                        style={{ width: "14px", height: "14px" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleFeedback(index, false)}>
                      <ThumbDown
                        sx={
                          msg.feedback === "bad"
                            ? { color: "red" }
                            : { color: "black" }
                        }
                        style={{ width: "14px", height: "14px" }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(message.trim());
            }}
            sx={{
              backgroundColor: "white",
              width: "300px",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              alignContent: "center",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <TextField
              required
              id="message"
              name="message"
              type="text"
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              sx={{
                "& .MuiInputBase-root": {
                  border: "2px solid rgb(251, 251, 251)",
                  borderRadius: "50px",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& .MuiInputBase-input": {
                  padding: "7px 14px",
                },
                width: "300px",
              }}
            />
            <Button
              type="submit"
              disabled={sendingMessage}
              endIcon={
                sendingMessage ? (
                  <CircularProgress size={20} />
                ) : (
                  <SendOutlinedIcon sx={{ color: "rgb(227, 185, 80)" }} />
                )
              }
            ></Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
