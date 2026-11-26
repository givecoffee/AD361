# Week 5 (Fixed)

Small Todo List application. Very small and easy to get started with white box testing. There isn't a required backend and most of the test is on the one component. (Making three test suites for the main functions)

### Reading the code initially (todoUtils.ts)

Reminders about making test cases for a block that checks for a specific behavior, test suites are a block that combines related test cases, and a test file can contain many test cases or suites (generally organized around the function, component, or feature being tested) and it is important to organize these properly and name your files in a way that they can be detected in whatever language you're choosing.

Opened todo-app > src > todoUtils.ts before making the .test.ts file. We will be making three suites, no routing, backend, etc. todoUtils.ts has the Todo type defined and comes with these three functions (one suite per function):

createTodo(text) builds new todo object
addTodo(todos, text) adds todo to the list, UNLESS it is blank 
countDone(todos) will loop over the list and count how many of the todos are finished

React component is in src/App.tsx with input, add button, a X of Y done counter to keep track, a checkbox for each 'todo'. Will use the three functions above.

### Setup 

To install this env with this setup:

```
npm install
```

Test file created by adding .test.ts to the end of todoUtils (only testing this file)

Run it with:
```
npm test
```


### Statement Coverage

createTodo is the first function to test. It takes in one parameter, which is a string. It returns as a Todo type and the expectation is that you will get an object with the id, number, the text string, and a boolean of whether it is done or not (true/false), and return will build that object. 

Current time of when the Todo is logged with Date.now(). Unsure about the formatting of this until we test it but we'll go ahead and dive in. No if, loops or multiple required returns from the function so there isn't any other paths you could side track onto. Now, did every line of code run at least once during our test?Each call to the function takes the exact same path, so every single call can run every statement (looking like 100% statement coverage). 

As a reminder to myself: while hovering over the code in the Visual Studio Code IDE, I was able to see the format for the Date.now() function exactly, and it is a long series of numbers because it is a unique date down to the millisecond.

![[/screenshots/datenowBreakdown.png]]

Test I wrote for createTodo:

```
import { createTodo, addTodo, countDone } from "./todoUtils";
import type { Todo } from "./todoUtils";

// createTodo has no ifs or loops, so one call runs every line
describe("createTodo statement coverage", () => {
  it("creates a todo object from the given text", () => {
    const todo = createTodo("Water the monstera");

    expect(todo.text).toBe("Water the monstera");
    // done is hardcoded to false so every new todo starts unfinished
    expect(todo.done).toBe(false);
    // id comes from Date.now() and changes every millisecond,
    // so I can only check that it's a number, not the exact value
    expect(typeof todo.id).toBe("number");
  });
});
```

The text should come back exactly how I passed it in, and done should always start as false since that part is hardcoded. For the id I can't check for an exact number because Date.now() changes every millisecond, so if I hardcoded one the test would fail the next time I ran it. Instead I just check that the id is a number. The imports for addTodo, countDone and the Todo type are already at the top for the next two suites.

Ran npm test and it passed.

#### Branch Coverage

Branch coverage is checking that every possible outcome of a decision (like an if) ran at least once. addTodo has one if statement so there are two outcomes to hit.

```
export function addTodo(todos: Todo[], text: string): Todo[] {
  const trimmed = text.trim();
  if (!trimmed) {
    return todos;
  }
  return [...todos, createTodo(trimmed)];
}
```

First it trims the text, which takes off any spaces at the start and end. Then if (!trimmed) checks if anything is left. An empty string counts as falsy in JavaScript so !"" is true, which means blank or only spaces goes into the if and returns the list the way it was. If there's real text it skips the if and makes a new array with the old todos plus a new one from createTodo. It uses the spread operator (...todos) so the original list doesn't get changed, it hands back a new one.
So one test with only spaces and one test with real text.

```
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
```

I used only spaces for the blank test instead of an empty string since that's the case where trim() actually matters. For the valid test it's not enough to check that the list got longer, I also check the text so I know it actually added what I gave it.

#### Loop Coverage

Loop coverage is making sure a loop works when it runs zero times, one time, and a bunch of times, because a lot of bugs happen at those edges.

```
export function countDone(todos: Todo[]): number {
  let count = 0;
  for (const todo of todos) {
    if (todo.done) {
      count++;
    }
  }
  return count;
}
```

It starts count at 0, goes through every todo in the list, and adds one every time a todo is done. There's also an if inside the loop so that's another branch to hit both sides of. An empty list means the loop never runs and should return 0, one finished todo means it runs once and should return 1, and a mixed list runs a few times and hits both the done and not done side of the if.

```
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
```

I made these todo objects by hand instead of using createTodo so I could set done to true myself and use simple ids like 1, 2, 3. It also keeps these tests only about countDone, so if createTodo broke these wouldn't fail because of it.
### Coverage 

There wasn't a coverage script in package.json, so it gave me a missing script error. Added this under scripts:

```
"coverage": "jest --coverage"
```


All files, statements, branch, functions, and lines were ran at 100% Coverage.
