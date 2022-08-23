import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAuth } from '@hooks/auth'
import { useState } from 'react'
import AuthSessionErrors from '@components/auth/AuthSessionErrors';
import AuthSessionStatus from '@components/auth/AuthSessionStatus';
import GuestLayout from '@layouts/GuestLayout'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  console.log('ForgotPassword')
  console.log(errors, status);
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    forgotPassword({ email: data.get('email'), setErrors, setStatus })
  }

  return (
    <GuestLayout >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot password?
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <AuthSessionStatus status={status} style={{marginBottom: '10px'}} />
        <AuthSessionErrors errors={errors} />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Email Password Reset Link
        </Button>
      </Box>
    </GuestLayout>
  );
}