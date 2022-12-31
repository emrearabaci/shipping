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
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
