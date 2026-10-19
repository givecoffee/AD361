# Learning Practice: Introduction to Testing with TypeScript

## Topics

- `Jest`

## Learning Objectives

- Create tests using `Jest`
- Identify testing objectives
- Distinguish between root cause, error, defect, and failure

## Resources

- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Getting Started with ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)

## Deliverables

### 0. Set Up

- Create a project folder:

  ```bash
  mkdir LP01
  cd LP01
  ```

- Verify that Node.js is installed:

  ```bash
  node --version
  ```

  If Node.js is not installed, install it from [nodejs.org](https://nodejs.org/).

- Create a Node project:

  ```bash
  npm init -y
  ```

- Install `Jest`, `ts-jest`, and TypeScript:

  ```bash
  npm install --save-dev jest ts-jest typescript
  ```

- Create the Jest config:

  ```bash
  npx ts-jest config:init
  ```

- Create a `tsconfig.json` file:

  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true
    },
    "include": ["src", "tests"]
  }
  ```

- Verify the installation:

  ```bash
  npx jest --version
  ```

- Take a screenshot of your terminal showing that `Jest` is installed. Save it in the `screenshot` folder.

- Note: add `node_modules/` to a `.gitignore` file before you push

## Step 1: Review the Code

- The first step is to understand the code you are testing.
- Do **not** fix any bugs. However, if you notice any bugs, feel free to write them down as notes for later.
- Read:
- [Using Matchers](https://jestjs.io/docs/using-matchers)
- [Getting Started with Jest](https://jestjs.io/docs/getting-started)

## Step 2: Import Functions and `Jest`

- Import `test` and `expect` from `@jest/globals`.
- Import the functions from `src/functions.ts`.
- Note: You will not write tests for every function in this activity. Additionally this is an introduction to Jest, better practices and more complex examples will be added througout the course.

<details>
<summary>Solution</summary>

```typescript
import { test, expect } from "@jest/globals";

import {
  isEven,
  add,
  divide,
  palindrome,
  countVowels,
  findMax,
  removeDuplicates,
} from "../src/functions";
```

</details>

## Step 3: Write Your First Tests for `isEven`

- Write a test for `isEven` that checks whether an even number returns `true`.
- Write a test for `isEven` that checks whether an odd number returns `false`.
- Run the tests with `npx jest` to confirm they are working.

<details>
<summary>Solution</summary>

```typescript
test("isEven num even", () => {
  expect(isEven(10)).toBe(true);
});

test("isEven num odd", () => {
  expect(isEven(11)).toBe(false);
});
```

</details>

## Step 4: Write Tests for `palindrome`

- Write a test for `palindrome` using a palindrome.
- Write a test for `palindrome` using a word that is not a palindrome.
- Run the tests with `npx jest` to confirm they are working.

<details>
<summary>Solution</summary>

```typescript
test("palindrome is palindrome", () => {
  expect(palindrome("tacocat")).toBe(true);
});

test("palindrome is not palindrome", () => {
  expect(palindrome("cat")).toBe(false);
});
```

</details>

## Step 5: Write Tests for `countVowels`

- Write a test that correctly identifies the number of vowels in a word containing vowels.
- Write a test that correctly identifies `0` vowels in a word without vowels.
- Run the tests with `npx jest` to confirm they are working.

<details>
<summary>Solution</summary>

```typescript
test("countVowels has vowels", () => {
  expect(countVowels("hello world")).toBe(3);
});

test("countVowels has no vowels", () => {
  expect(countVowels("myths")).toBe(0);
});
```

</details>

## Step 6: Break a test

- Break one of your tests so it fails
- Take a screenshot and put it in the screenshot folder
- Run the tests with `npx jest` to confirm you broke a test.

<details>
<summary>Solution</summary>

```typescript
test("countVowels has vowels", () => {
  expect(countVowels("hello world")).toBe(300);
});
```

</details>

## What to Submit

1. Create and initialize a new GitHub repository.
2. Commit and push your work to the repository.
3. Make sure the repository is public. Private repositories will not receive credit.
4. Submit the GitHub repository URL on Canvas.

## AI Transparency

AI was used to clean up and refactor this file.
