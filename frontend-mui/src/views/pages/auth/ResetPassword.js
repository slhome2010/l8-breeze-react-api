import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AuthSessionErrors from '@components/auth/AuthSessionErrors';
import AuthSessionStatus from '@components/auth/AuthSessionStatus';
import GuestLayout from '@layouts/GuestLayout';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useAuth } from "@hooks/auth";


export default function ResetPassword() {
  const params = useParams()
  const { resetPassword } = useAuth({
    middleware: 'guest',
    initiator: 'ResetPassword'
  })
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  /* const submitForm = event => {
    event.preventDefault()
    resetPassword({
      email,
      password,
      password_confirmation,
      setErrors,
      setStatus
    })
  } */

  useEffect(() => {
    setEmail(params.email || '')
  }, [params.email])
  console.log('ResetPassword')
  console.log(params)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    resetPassword({
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      setErrors,
      setStatus
    })
  };

  return (
    <GuestLayout >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <AuthSessionStatus status={status} style={{ marginBottom: '10px' }} />
        <AuthSessionErrors errors={errors} style={{ marginBottom: '10px' }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password_confirmation"
              label="Password confirm"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </GuestLayout>
  );
}