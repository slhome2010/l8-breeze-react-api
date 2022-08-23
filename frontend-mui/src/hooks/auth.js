import useSWR, { useSWRConfig } from 'swr'
import axios from '@services/axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  let navigate = useNavigate();
  let params = useParams();

  const { cache } = useSWRConfig()
  const logger = (useSWRNext) => {
    return (key, fetcher, config) => {
      // Добавим регистратор в исходный fetcher.
      const extendedFetcher = (...args) => {
        console.log('SWR запрос:', key)
        return fetcher(...args)
      }
      // Выполняем хук с новым fetcher-ом.
      return useSWRNext(key, extendedFetcher, config)
    }
  }

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        mutate('/api/user')
      }),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      use: [logger]
    }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
    await csrf()
    setErrors([])
    axios
      .post('/register', props)
      .then(response => {
        console.log("register response: ", response)
        mutate()
        navigate(`/verify-email?resend=${btoa(response.data.status)}`)
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }


  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()
    setErrors([])
    setStatus(null)
    console.log("login request: ", props)
    axios
      .post('/login', props)
      .then(response => {

        console.log("login response: ", response)
        mutate()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .post('/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .post('/reset-password', { token: params.token, ...props })
      .then(response => navigate(`/login?reset=${btoa(response.data.status)}`))
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const verifyEmail = async ({ setErrors, setStatus, ...props }) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .get('/email/verify', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout')
      mutate()
    }
    window.location.pathname = '/login'
  }

  useEffect(() => {
    console.log('useEffect:', middleware, user)
    //console.log("auth user: ", user, "auth error: ", error)
    if (middleware === 'guest' && redirectIfAuthenticated && user?.email_verified_at) navigate(redirectIfAuthenticated)
    //if (middleware === 'guest' && redirectIfAuthenticated && !user?.email_verified_at) logout()
    if (middleware === 'auth' && error) logout()
    cache.clear()
  }, [user, error])

  console.log("useAuth user: ", user, "useAuth error: ", error)

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendEmailVerification,
    logout
  }
}
