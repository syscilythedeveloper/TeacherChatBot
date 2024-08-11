"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import { useUser } from "@/contexts/userContext";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-toastify";

export default function Navbar() {
  const { isLoggedIn, setUser } = useUser();
  const pathname = usePathname();

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

  return (
    <>
      <Box
        sx={{
          // flexGrow: 1,
          width: "100vw",
          display: "flex",
        }}
      >
        <AppBar
          position="static"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "rgb(239, 245, 231)",
          }}
        >
          <Toolbar>
            {/* <Typography variant='h6' sx={{ color: 'black' }}>
              Rambot AI
            </Typography> */}
          </Toolbar>
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '500px',
            }}
          >
            <Button>
              <Typography variant='h6' sx={{ color: 'black' }}>
                Text
              </Typography>
            </Button>
            <Button>
              <Typography variant='h6' sx={{ color: 'black' }}>
                Home
              </Typography>
            </Button>
          </Box> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isLoggedIn && pathname === "/chat" && (
              <Button onClick={handleLogout}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Logout
                </Typography>
              </Button>
            )}
            <Badge badgeContent={" "} color="rgb(188, 191, 180)">
              <NotificationsIcon sx={{ color: "rgb(188, 191, 180)" }} />
            </Badge>
            <SettingsIcon sx={{ color: "rgb(188, 191, 180)" }} />
          </Box>
        </AppBar>
      </Box>
      {/* <Box
        sx={{
          flexGrow: 1,
          width: '100vw',
          display: { xs: 'block', md: 'none' },
        }}
      >
        <AppBar
          position='static'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'rgb(239, 245, 231)',
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: 'black' }}>Rambot AI</Typography>
          </Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Badge badgeContent={' '} color='rgb(188, 191, 180)'>
              <NotificationsIcon sx={{ color: 'rgb(188, 191, 180)' }} />
            </Badge>
            <SettingsIcon sx={{ color: 'rgb(188, 191, 180)' }} />
          </Box>
        </AppBar>
      </Box> */}
    </>
  );
}
