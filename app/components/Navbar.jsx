import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Navbar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Rambot AI</Typography>
            </Toolbar>
        </AppBar>
      </Box>
    )
}