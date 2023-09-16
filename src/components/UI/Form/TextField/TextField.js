import React, { useImperativeHandle, useRef } from 'react'
import styles from './TextField.module.css'

const TextField = React.forwardRef((props, ref) => {
  const { type, label, id, value, isValid, ...rest } = props
  let { classes } = props
  const inputRef = useRef()
  classes = `${styles.control} ${isValid === false ? styles.invalid : ''} ${classes}`
  const focus = () => {
    inputRef.current.focus()
  }
  useImperativeHandle(ref, () => {
    return {
      focus,
    }
  })

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input ref={inputRef} type={type} id={id} value={value} {...rest} />
    </div>
  )
})

TextField.defaultProps = {
  type: 'text',
  classes: '',
}

export default TextField
