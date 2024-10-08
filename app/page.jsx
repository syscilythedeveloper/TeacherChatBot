"use client";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import CommentIcon from "@mui/icons-material/Comment";
import AccountIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useUser } from "./contexts/userContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [value, setValue] = useState(1);
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const goToChat = () => {
    router.push("/chat");
  };
  const goToHome = () => {
    router.push("/");
  };
  const goToAccount = () => {
    router.push("/account");
  };
  const goToLogin = () => {
    router.push("/login");
  };

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (isLoggedIn) {
    goToChat();
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

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
            display: { xs: "block", md: "none" },
          }}
        >
          <Box
            sx={{
              width: "245px",
              height: "53px",
              position: "relative",
              top: "10px",
              left: "150px",
              backgroundColor: "whitesmoke",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Overpass, Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.72px",
                textAlign: "left",
              }}
            >
              Hello, I&apos;m Rambo. Your personal chat BOT. Happy to help :)
            </Typography>
          </Box>
          <Box>
            <Image src="/bot.png" alt="AI Bot" width={416} height={423} />
          </Box>
          <Box
            sx={{
              position: "relative",
              top: "-50px",
              left: "110px",
            }}
          >
            {/* section: login */}
            <Button
              type="button"
              sx={{
                width: "209px",
                height: "42px",
                borderRadius: "50px",
                opacity: "0px",
                backgroundColor: "rgb(227, 210, 165)",
                margin: "auto",
                marginTop: "15px",
                boxShadow: "0px 4px 10px rgb(221, 195, 128)",
                "&:hover": {
                  boxShadow: "0px 6px 15px rgb(221, 195, 128)",
                },
              }}
              onClick={goToLogin}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Login</span>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          {/* // section: */}
          <Box
            sx={{
              width: "245px",
              height: "53px",
              // marginTop: '-500px',
              // marginLeft: '200px',
              position: "relative",
              top: "10px",
              left: "300px",
              borderRadius: "10px",
              textAlign: "center",
              paddingTop: "10px",
              paddingBottom: "0px",
              paddingLeft: "10px",
              paddingRight: "10px",
              backgroundColor: "whitesmoke",
              // border: '1px solid red',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Overpass, Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.72px",
                textAlign: "left",
              }}
            >
              Hello, I&apos;m Rambo. Your personal chat BOT. Happy to help :)
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "-50px",
              // marginLeft: '100px',
            }}
          >
            <Image src="/bot.png" alt="AI Bot" width={416} height={423} />
          </Box>
          <Box
            sx={{
              position: "relative",
              top: "-40px",
              left: "110px",
            }}
          >
            <Button
              type="button"
              sx={{
                width: "209px",
                height: "42px",
                borderRadius: "50px",
                opacity: "0px",
                backgroundColor: "rgb(227, 210, 165)",
                margin: "auto",
                marginTop: "15px",
                boxShadow: "0px 4px 10px rgb(221, 195, 128)",
                "&:hover": {
                  boxShadow: "0px 6px 15px rgb(221, 195, 128)",
                },
              }}
              onClick={goToLogin}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Login</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
