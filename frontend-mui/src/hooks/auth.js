import useSWR from 'swr'
import axios from '@services/axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


export const useAuth = ({ middleware, redirectIfAuthenticated, initiator } = {}) => {
  const apiUrl = '/api/user';
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
 // const [loggedIn, setLoggedIn] = useState(false);
  const [isVeryfied, setIsVeryfied] = useState(false);
 
 /*  const { cache } = useSWRConfig() */

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

  const { data: user, error, mutate, isValidating } = useSWR(apiUrl, () =>
    axios
      .get(apiUrl)
      .then(response => { 
        setIsVeryfied( Boolean(response.data?.email_verified_at) )
        //console.log('response apiUser:', isVeryfied )
        return response.data
      })
      .catch(error => {
        if (error.response.status !== 409) throw error
        mutate(apiUrl)
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      errorRetryCount: 2,
      //refreshInterval: 1000,
      use: [logger]
    }
  )
  //console.log('After response apiUser:', isVeryfied )
 /*  const isLoading = Boolean(!user && !error)
  const isVeryfied = Boolean(user?.email_verified_at) */

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
    await csrf()
    setErrors([])
    axios
      .post('/register', props)
      .then(response => {
        //console.log('register response: ', response.data.status)
        mutate(apiUrl)
        navigate('/verify-email')
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
    //console.log('login request: ', props)
    axios
      .post('/login', props)
      .then(response => {
        //console.log('login response: ', response.status)
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
  
  const logout = async () => {
    if (!error) {
      await axios.post('/logout')
      mutate(apiUrl)
    }
    window.location.pathname = '/login'    
  }

  useEffect(() => {
    //console.log('useEffect', 'middleware:', middleware, 'user:', user?.email)
    console.table({ 'initiator': initiator, 'middleware': middleware, 'user': user?.email, 'error': error?.message,  },)
    setIsLoading( Boolean(!user && !error) )

    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      //console.log('Veryfied:', user.email_verified_at, Boolean(user.email_verified_at), isVeryfied)
      if (isVeryfied) navigate(redirectIfAuthenticated)
      else navigate('/verify-email')     
    }
    if (middleware === 'auth' && error)  logout()    
  }, [user, error])

  /* console.table({ 'user': user?.email, 'error': error?.message, 'isValidating': isValidating, 'isLoading': isLoading, 'isVeryfied': isVeryfied }, ['user']) */
 // console.table({ 'user': user?.email, 'error': error?.message, 'initiator': initiator, },)

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    //verifyEmail,
    resendEmailVerification,
    logout,
    isLoading,
    isVeryfied
  }
}
