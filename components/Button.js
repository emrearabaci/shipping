/* Styles */
import styles from '../styles/components/Button.module.scss';
export default function Button({ type, onClick, content }) {
  return (
    <button className={`${styles.button}`} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
