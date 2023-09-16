import React, { useContext, useEffect, useReducer, useState } from 'react'

import Card from '../UI/Card/Card'
import styles from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    }
  }

  return {
    value: '',
    isValid: false,
  }
}

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.length > 7,
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.length > 7,
    }
  }

  return { ...prevState }
}

const Login = () => {
  const [email, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })
  const [formIsValid, setFormIsValid] = useState(false)
  const { isValid: emailIsValid } = email
  const { isValid: passwordIsValid } = password
  const ctx = useContext(AuthContext)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value })
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value })
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    ctx.onLogin(email.value, password.value)
  }

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div className={`${styles.control} ${email.isValid === false ? styles.invalid : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${styles.control} ${password.isValid === false ? styles.invalid : ''}`}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
