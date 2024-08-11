"use client";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CommentIcon from "@mui/icons-material/Comment";
import AccountIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import { auth, newMessage } from "@/firebase";
import { toast } from "react-toastify";
export default function Chat() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const { isLoggedIn, isLoading, messages, setMessages } = useUser();
  const [message, setMessage] = useState("");

  const [messageSend, setMessageSend] = useState("");
  const goToChat = () => {
    router.push("/chat");
  };
  const goToHome = () => {
    router.push("/");
  };
  const goToAccount = () => {
    router.push("/account");
  };
  const handleSendMessage = async (mess) => {
    if (mess === "") return;

    console.log("sending message: ", mess);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: mess, sender: auth.currentUser.displayName },
    ]);
    setMessage("");

    const bot_response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: mess }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!bot_response.ok) {
      console.error("Error sending message: ", bot_response);
      toast.error("Error sending message");
    }

    const db_submit_response = await newMessage(auth.currentUser.uid, mess);

    if (db_submit_response.status === "error") {
      console.error("Error submitting message to db");
      toast.error("Error submitting message to db");
    }
    console.log("bot response to database: ", db_submit_response);
    console.log("bot response data", data);
    const data = await bot_response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.response, sender: "bot" },
    ]);
  };

  return (
    <>
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
            overflowY: "auto",
            padding: "10px",
            border: "1px solid rgb(203, 203, 203)",
            borderRadius: "8px",
            // marginBottom: '20px',
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  msg.sender === "user" ? "white" : "rgb(217, 162, 22)",
                borderRadius: "10px",
                padding: "10px",
                margin: "5px 0",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </Box>
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
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "10px",
          }}
        >
          {/* <EmojiEmotionsOutlinedIcon
          sx={{ color: 'rgb(227, 185, 80)', cursor: 'pointer' }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        /> */}
          {/* {showEmojiPicker && (
          <Picker
            onSelect={addEmoji}
            style={{ position: 'absolute', bottom: '60px', right: '20px' }}
          />
        )} */}
          <TextField
            margin="normal"
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
              marginLeft: "25px",
              marginRight: "25px",
            }}
          />
          <Button type="submit" sx={{ marginTop: "-15px" }}>
            <SendOutlinedIcon sx={{ color: "rgb(227, 185, 80)" }} />
          </Button>
        </Box>
      </Box>
    </>
  );
}
