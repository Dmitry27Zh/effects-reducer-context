import React, { useEffect, useReducer, useState } from 'react'

import Card from '../UI/Card/Card'
import styles from './Login.module.css'
import Button from '../UI/Button/Button'

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

const Login = (props) => {
  const [email, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })
  const [inputPassword, setInputPassword] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setFormIsValid(email.value.isValid && inputPassword.trim().length > 7)
  //   }, 1000)

  //   return () => {
  //     clearTimeout(timerId)
  //   }
  // }, [inputEmail, inputPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value })
    setFormIsValid(email.isValid && password.isValid)
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value })
    setFormIsValid(email.isValid && password.isValid)
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(email.value, inputPassword)
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
