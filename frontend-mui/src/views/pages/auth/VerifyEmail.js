import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GuestLayout from '@layouts/GuestLayout'
import { useAuth } from '@hooks/auth'
import { useState } from 'react'
import {Link} from 'react-router-dom';

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
      
        <div className="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you
            verify your email address by clicking on the link we just
            emailed to you? If you didn't receive the email, we will
            gladly send you another.
        </div>
        {status === 'verification-link-sent' && (
          <div className="mb-4 font-medium text-sm text-green-600">
              A new verification link has been sent to the email
              address you provided during registration.
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <Button 
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }} 
            onClick={() => resendEmailVerification({ setStatus })}>
              Resend Verification Email
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}            
            onClick={logout}>
              Logout
          </Button>
        </div>
      
    </GuestLayout>
  )
}

export default VerifyEmail
