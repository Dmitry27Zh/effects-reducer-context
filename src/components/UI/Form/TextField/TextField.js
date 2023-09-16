import styles from './TextField.module.css'

const TextField = (props) => {
  const { type, label, id, value, isValid, ...rest } = props
  let { classes } = props
  classes = `${styles.control} ${isValid === false ? styles.invalid : ''} ${classes}`

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} {...rest} />
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
  classes: '',
}

export default TextField
