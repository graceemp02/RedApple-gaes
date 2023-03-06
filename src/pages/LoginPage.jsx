/** @format */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LoginBanner from '../assets/loginBanner.jpg';
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import { Button, TextField, Grid, Typography, Box, Paper, CssBaseline, Link } from '@mui/material';
import ResetPasswordDialog from '../components/reset/ResetPasswordDialog';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit'>Iamredapple.com</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginPage() {
  const navigate = useNavigate();
  const id = localStorage.getItem('gaes_id');
  const [dialog, setdialog] = useState(false);
  useEffect(() => {
    if (id) {
      console.log('Already Login');
      navigate('/');
    }
  }, []);

  const emailRef = useRef();
  const pwdRef = useRef();

  const [userError, setUserError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    userError && setUserError(false);
    pwdError && setPwdError(false);
    let formData = new FormData();
    formData.append('username', emailRef.current.value);
    formData.append('password', pwdRef.current.value);
    await axios
      .post('login.php', formData)
      .then(result => {
        const res = result.data['res'];
        if (res === 'true') {
          localStorage.setItem('gaes_id', result.data.id);
          navigate('/');
        } else if (res === 'Password is Incorrect') setPwdError(true);
        else {
          setUserError(true);
        }
      })
      .catch(error => console.log(error));
  };
  const handleForgot = () => {
    setdialog(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component='main'
        sx={{ height: '100vh', overflow: 'hidden', minHeight: '350px' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: `url(${LoginBanner})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: t =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img className='logologin' src={Logo} alt='logo' />

            <Typography component='h1' variant='h3'>
              Login
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                error={userError && true}
                margin='normal'
                inputRef={emailRef}
                required
                fullWidth
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                helperText={userError && 'Username Does not Exist'}
              />
              <TextField
                error={pwdError && true}
                margin='normal'
                inputRef={pwdRef}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                helperText={pwdError && 'Password Incorrent'}
              />
              <br />
              {/* Change with Button Tag. Start from below */}
              <Grid container>
                <Grid item xs>
                  <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Login In
                  </Button>
                </Grid>
                <Grid item>
                  <Link onClick={handleForgot} sx={{ cursor: 'pointer' }} variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              {/* End Here */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        {dialog && <ResetPasswordDialog />}
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
