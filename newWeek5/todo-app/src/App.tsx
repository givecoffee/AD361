import { useState } from "react";
import { addTodo, countDone, type Todo } from "./todoUtils";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const handleAdd = () => {
    setTodos(addTodo(todos, text));
    setText("");
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={handleAdd}>Add</button>

      <p>
        {countDone(todos)} of {todos.length} done
      </p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
