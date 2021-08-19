import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Check if Your Birthday Is Palindrome</h1>
      <p>Please enter birthday date </p>

      <input type="date" />

      <button>Check</button>
      <strong id="result"></strong>
    </div>
  );
}
