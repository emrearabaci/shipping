export default function Button({ type, onClick, content }) {
  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
}
