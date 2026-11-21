# Lab: Exploratory and White Box Testing

## Topics

- Exploratory testing
- White box testing
- Statement coverage
- Code coverage
- React component testing

## Learning Objectives

- Perform a focused exploratory testing session.
- Examine source code to identify statements, branches, and loops.
- Design white box tests based on the internal structure of an application.
- Test React state changes and user interactions.
- Use a coverage report to evaluate test coverage.
- Compare tests created before and after viewing the source code.

# Deliverables

## Step 1: Exploratory Testing

Run the counter application without looking at the source code.

Write a short testing charter that describes what you plan to investigate.

Record at least **five actions or combinations of actions** you tried. For each one, include:

- What you did
- What you expected
- What happened
- Whether the test passed or failed

<details>
<summary>Example exploratory testing table</summary>

| Action                | Expected Result            | Actual Result | Pass or Fail |
| --------------------- | -------------------------- | ------------- | ------------ |
| Select Increment once | The count increases by one |               |              |
|                       |                            |               |              |

</details>

## Step 2: Examine the Source Code

After completing your exploratory testing, examine the source code in `App.tsx`.

Identify:

- The starting value of `count`
- The statements that change `count`
- The user action that causes each statement to execute
- Any branches or loops in the code

Explain whether branch coverage and loop coverage apply to this component.

## Step 3: Create the Test File

Create the following test file:

```text
src/App.test.tsx
```

Use React Testing Library to render the component and interact with its buttons.

Your tests should use:

- `render` to render the component
- `screen` to find elements
- `fireEvent` or `userEvent` to select buttons
- Jest assertions to verify the displayed count

Organize your tests inside a `describe` block.

## Step 4: Test the Starting State

Write a test that verifies the component's initial state.

Confirm that:

- The component displays `Count: 0`
- The Increment button appears
- The Decrement button appears
- The Reset button appears

## Step 5: Test Statement Coverage

Write tests that execute each statement that changes the count.

Include tests that verify:

- Increment changes the count from `0` to `1`
- Decrement changes the count from `0` to `-1`
- Reset changes the count back to `0`

The Reset test must first change the count to a value other than `0`.

## Step 6: Test a Sequence of Actions

Write at least **one additional test** that performs multiple actions in sequence.

For example, you could:

- Increment several times
- Decrement after incrementing
- Reset after several changes
- Continue using the buttons after resetting

Check the displayed count after each important action.

## Step 7: Run the Tests

Run your test suite:

```bash
npm test
```

Include a screenshot showing the completed test run.

## Step 8: Review Code Coverage

Run Jest with code coverage enabled:

```bash
npm test -- --coverage
```

Record the coverage percentages reported for `App.tsx`:

| Coverage Type | Percentage |
| ------------- | ---------- |
| Statements    |            |
| Branches      |            |
| Functions     |            |
| Lines         |            |

Include a screenshot of the coverage report.

Briefly explain:

- Which parts of the component your tests executed
- Whether any statements remained untested
- Why the component may report few or no branches
- Whether you believe the percentage alone proves that the component works correctly

## Step 9: Compare the Two Approaches

Write a short comparison of your exploratory and white box testing.

Include:

- One test idea you discovered through exploratory testing
- One test idea you discovered by reading the source code
- How viewing the code changed your testing
- One limitation of each approach

## What to Submit

1. Create and initialize a GitHub repository.
2. Commit and push your work to the repository.
3. Make sure the repository is public. Private repositories will not receive credit.

## AI Transparency

AI was used to help create portions of this file and to clean up its writing and formatting.
