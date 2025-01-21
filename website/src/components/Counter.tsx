import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count()}</p>
    </div>
  );
}
