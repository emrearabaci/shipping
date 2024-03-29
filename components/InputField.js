/* Styles */
import styles from '../styles/components/InputField.module.scss';
export default function InputField({
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled
}) {
  return (
    <input
      className={`${styles.input}`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
