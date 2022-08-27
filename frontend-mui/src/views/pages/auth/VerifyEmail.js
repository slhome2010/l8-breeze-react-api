import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GuestLayout from '@layouts/GuestLayout'
import { useAuth } from '@hooks/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    initiator: 'VerifyEmail'
  })
  const [status, setStatus] = useState(null)

  return (
    <GuestLayout>      
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Verify Email
      </Typography>
      <Box sx={{ m: 2 }}>
      <Typography color="text.secondary" variant="body2">
        Thanks for signing up! Before getting started, could you
        verify your email address by clicking on the link we just
        emailed to you? If you didn't receive the email, we will
        gladly send you another.
      </Typography>
      </Box>
      {status === 'verification-link-sent' && (
        <Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography color="text.primary.light" variant="body2">
            A new verification link has been sent to the email
            address you provided during registration.
          </Typography>
        </Box>
        </Box>
      )}
      <Stack direction="row" spacing={2}>
      <Button
        type="button"
        variant="outlined"
        endIcon={<SendIcon />}
        /* sx={{ mt: 3, mb: 2 }} */
        onClick={() => resendEmailVerification({ setStatus })}>
        Resend Verification Email
      </Button>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        /* sx={{ mt: 3, mb: 2, ml: 3 }} */
        onClick={logout}>
        Logout
      </Button>
    </Stack>    
    </GuestLayout>
  )
}

export default VerifyEmail
