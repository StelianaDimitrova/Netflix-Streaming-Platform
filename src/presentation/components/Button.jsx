export default function Button({ customClassName, title = "", onClick }) {
  return <button className={customClassName} onClick={onClick}>{title}</button>;
}
