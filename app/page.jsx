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
          <Typography
            variant='h1'
            sx={{
              display: { xs: 'flex', sm: 'flex' },
              textShadow: '8px 2px 4px rgba(213, 159, 23, 0.5)',
              textAlign: 'center',
              fontFamily: 'Rampart One, Roboto, sans-serif',
            }}
          >
            RamBot AI
          </Typography>
        </Box>
        <Box
          component='form'
          sx={{
            width: '393px',
            height: '551px',
            gap: '0px',
            borderRadius: '50px',
            opacity: '0px',
            backgroundColor: 'rgb(240, 246, 232)',
            display: {xs: 'none', sm: 'flex'},
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1.875rem',
              fontWeight: '400',
              marginTop: '40px',
              marginLeft: '30px',
            }}
          >
            Login
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1rem',
              fontWeight: '400',
              marginLeft: '30px',
              marginBottom: '20px'
            }}
          >
            Don&apos;t have an account?{' '}
            <span style={{ color: 'rgb(221, 178, 60)' }}>Sign up</span>
          </Typography>

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            type='email'
            autoComplete='email'
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-root': {
                borderBottom: '2px solid black',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                padding: '7px 14px',
              },
              width: '300px',
              marginLeft: '30px',
            }}
          />
          <TextField
            margin='normal'
            required
            // fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            autoComplete='password'
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-root': {
                borderBottom: '2px solid black',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                padding: '7px 14px',
              },
              width: '300px',
              marginLeft: '30px',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1rem',
              fontWeight: '400',
              marginLeft: '30px',
            }}
          >
            <span style={{ color: 'rgb(221, 178, 60)' }}>Forgot Password?</span>
          </Typography>
          <Button
            sx={{
              width: '209px',
              height: '42px',
              // top: '652px',
              // left: '91px',
              // gap: '0px',
              borderRadius: '50px',
              opacity: '0px',
              backgroundColor: 'rgb(227, 210, 165)',
              // marginTop: '10px',
              // marginLeft: '30px'
              margin: 'auto',
              marginTop: '15px',
              boxShadow: '0px 4px 10px rgb(221, 195, 128)',
                '&:hover': {
                  boxShadow: '0px 6px 15px rgb(221, 195, 128)',
                },
            }}
          >
            <span style={{ color: 'black', fontWeight: 'bold'}}>Login</span>
          </Button>
        </Box>
        <Box
          component='form'
          sx={{
            width: '393px',
            height: '410px',
            gap: '0px',
            borderRadius: '50px',
            opacity: '0px',
            backgroundColor: 'rgb(240, 246, 232)',
            display: {xs: 'flex', sm: 'none'},
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1.875rem',
              fontWeight: '400',
              marginTop: '40px',
              marginLeft: '30px',
            }}
          >
            Login
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1rem',
              fontWeight: '400',
              marginLeft: '30px',
              marginBottom: '20px'
            }}
          >
            Don&apos;t have an account?{' '}
            <span style={{ color: 'rgb(221, 178, 60)' }}>Sign up</span>
          </Typography>

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            type='email'
            autoComplete='email'
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-root': {
                borderBottom: '2px solid black',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                padding: '7px 14px',
              },
              width: '300px',
              marginLeft: '30px',
            }}
          />
          <TextField
            margin='normal'
            required
            // fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            autoComplete='password'
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-root': {
                borderBottom: '2px solid black',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                padding: '7px 14px',
              },
              width: '300px',
              marginLeft: '30px',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Overpass, Roboto, sans-serif',
              fontSize: '1rem',
              fontWeight: '400',
              marginLeft: '30px',
            }}
          >
            <span style={{ color: 'rgb(221, 178, 60)' }}>Forgot Password?</span>
          </Typography>
          <Button
            sx={{
              width: '209px',
              height: '42px',
              // top: '652px',
              // left: '91px',
              // gap: '0px',
              borderRadius: '50px',
              opacity: '0px',
              backgroundColor: 'rgb(227, 210, 165)',
              // marginTop: '10px',
              // marginLeft: '30px'
              margin: 'auto',
              marginTop: '15px',
              boxShadow: '0px 4px 10px rgb(221, 195, 128)',
                '&:hover': {
                  boxShadow: '0px 6px 15px rgb(221, 195, 128)',
                },
            }}
          >
            <span style={{ color: 'black', fontWeight: 'bold'}}>Login</span>
          </Button>
        </Box>
        {/* <Box
          sx={{
            width: '393px',
            height: '551px',
            // top: '301px',
            // left: '-100px',
            gap: '0px',
            borderRadius: '50px',
            opacity: '0px',
            backgroundColor: 'rgb(240, 246, 232)',
            display: {xs: 'flex', sm: 'none'}
          }}
        ></Box> */}
      </Box>
    </>
  );
}
