import { createTodo, addTodo, countDone } from "./todoUtils";
import type { Todo } from "./todoUtils";

// createTodo has no ifs or loops, so one call runs every line
describe("createTodo statement coverage", () => {
  it("creates a todo object from the given text", () => {
    const todo = createTodo("Water the monstera");

    expect(todo.text).toBe("Water the monstera");
    // done is defaulted and hardcoded set to False so every new todo starts unfinished/undone
    expect(todo.done).toBe(false);
    // id comes from Date.now() and changes every millisecond,
    // so I can only check that it's a number, not the exact value
    expect(typeof todo.id).toBe("number");
  });
});

// addTodo has one if (!trimmed) so I need a test for each side of it
describe("addTodo branch coverage", () => {
  it("returns the list unchanged when the text is blank", () => {
    const todos: Todo[] = [];
    // only spaces on purpose, trim() turns this into "" which is falsy
    const result = addTodo(todos, "    ");

    expect(result).toEqual([]);
  });

  it("adds a new todo when the text is not blank", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, "Repot the pothos");

    expect(result).toHaveLength(1);
    // checking the text too, not just the length, so I know it added the right thing
    expect(result[0].text).toBe("Repot the pothos");
    expect(result[0].done).toBe(false);
  });
});

// countDone loops through the list, so test it running 0 times, once, and a few times
describe("countDone loop coverage", () => {
  it("returns 0 when the list is empty (loop runs zero times)", () => {
    const todos: Todo[] = [];

    expect(countDone(todos)).toBe(0);
  });

  it("counts one finished todo (loop runs once)", () => {
    // making todos by hand so I can set done to true myself
    const todos: Todo[] = [{ id: 1, text: "Water the monstera", done: true }];

    expect(countDone(todos)).toBe(1);
  });

  it("counts only the finished todos (loop runs several times)", () => {
    // mix of done and not done so both sides of the if inside the loop run
    const todos: Todo[] = [
      { id: 1, text: "Water the monstera", done: true },
      { id: 2, text: "Repot the pothos", done: false },
      { id: 3, text: "Mist the ferns", done: true },
    ];

    expect(countDone(todos)).toBe(2);
  });
});