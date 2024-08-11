"use client";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CommentIcon from "@mui/icons-material/Comment";
import AccountIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
export default function Account() {
  const [value, setValue] = useState(2);
  const { isLoggedIn, isLoading, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("There was an error signing out. Please try again.");
    }
  };

  const goToChat = () => {
    router.push("/chat");
  };
  const goToHome = () => {
    router.push("/");
  };
  const goToAccount = () => {
    router.push("/account");
  };

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  if (!isLoggedIn) {
    router.push("/login");
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
        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Box
            sx={{
              width: "245px",
              height: "53px",
              //  top: '127px',
              //  left: '133px',
              // marginTop: '-500px',
              // marginLeft: '200px',
              position: "absolute",
              top: "70px",
              left: "120px",
              textAlign: "center",
              paddingTop: "10px",
              paddingBottom: "0px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "10px",
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
              position: "relative",
              top: "-50px",
              // left: '140px',
              // marginTop: '-150px',
              // marginLeft: '200px',
            }}
          >
            <Image src="/bot.png" alt="AI Bot" width={416} height={423} />
          </Box>
          <Box
            sx={{
              position: "relative",
              top: "-100px",
              left: "110px",
            }}
          >
            <Button
              type="button"
              onClick={handleLogout}
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
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Logout</span>
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
              onClick={handleLogout}
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
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Logout</span>
            </Button>
          </Box>
        </Box>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "rgb(217, 162, 22)",
            display: { xs: "flex", md: "none" },
          }}
        >
          <BottomNavigationAction icon={<CommentIcon />} onClick={goToChat} />
          <BottomNavigationAction icon={<HomeIcon />} onClick={goToHome} />
          {isLoggedIn && (
            <BottomNavigationAction
              icon={<AccountIcon />}
              onClick={goToAccount}
            />
          )}
        </BottomNavigation>
      </Box>
    </>
  );
}
