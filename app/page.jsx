import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Box
        sx={{
          backgroundColor: 'rgb(221, 195, 129)',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '392px', height: '240px' }}>
        </Box>
      </Box>
    </>
  );
}
