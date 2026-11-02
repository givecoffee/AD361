# Lab: Introduction to Testing and Static Testing

## Topics

- Static testing
- Manual code reviews
- Automated static analysis with `ESLint`
- Building tests with `Jest`

## Learning Objectives

- Perform a manual code review.
- Compare manual code reviews with automated static analysis.
- Perform the responsibilities of an author, reviewer, or scribe.
- Document identified defects and suggested fixes.
- Create tests using `Jest`.
- Identify testing objectives.
- Distinguish between root causes, errors, defects, and failures.

## Resources

- [Types of Static Testing](https://www.geeksforgeeks.org/software-engineering/types-of-static-testing/)
- [ESLint](https://eslint.org/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Getting Started with ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)

## Read First!

**Do not use AI tools for this activity.** This includes ChatGPT, Claude, Copilot, and similar tools. You will use AI-assisted tools later in this course. The purpose of this activity is to develop the skills needed to recognize when AI-generated information is incorrect and to prompt AI effectively.

# Deliverables

## Step 1: Review the Requirements

Review `receipt.ts` and its program requirements.

Do not fix any defects yet.

## Step 2: Create Tests

Create a test file named `receipt.test.ts`.

Write tests for the functions in `receipt.ts`. Your tests must include:

- **Happy-path test:** Tests a function using valid input and confirms that it produces the expected result.
- **Unhappy-path test:** Tests how a function responds to invalid input or an incorrect value.
- **Edge-case test:** Tests an unusual value or a value near the limits of the function's expected input.

## Step 3: Run the Tests

Run your tests:

```bash
npx jest receipt.test.ts
```

Take a screenshot of the results and save it in the `screenshots` folder.

The tests are not expected to pass at this stage.

## Step 4: Perform a Manual Code Review

Review `receipt.ts` without executing it.

Identify syntax errors, logic defects, unclear code, and places where the code does not meet the program requirements.

## Step 5: Create an Issue Log

Create a file named `issue_log.md`, following the same format used in LP02.

For each issue, include:

- Location
- Issue
- Explanation
- Suggested fix
- Status

Also identify at least one example of each of the following:

- Root cause
- Error
- Defect
- Failure

## Step 6: Run `ESLint`

Run automated static analysis on the original code:

```bash
npx eslint receipt.ts
```

Take a screenshot of the results and save it in the `screenshots` folder.

Add any issues identified by `ESLint` that your group missed to `issue_log.md`.

## Step 7: Correct the Code

Fix the identified issues and save the corrected code in a new file named `fixed_receipt.ts`.

Update the status of each corrected issue in `issue_log.md` to `Fixed`.

Update your tests so they import the functions from `fixed_receipt.ts`.

## Step 8: Run the Tests Again

Run the tests against the corrected code:

```bash
npx jest receipt.test.ts
```

Take a screenshot showing all tests passing and save it in the `screenshots` folder.

## What to Submit

1. Create and initialize a GitHub repository.
2. Add all group members as collaborators.
3. Commit and push the following:
   - `receipt.ts`
   - `fixed_receipt.ts`
   - `receipt.test.ts`
   - `issue_log.md`
   - The `screenshots` folder
4. Make sure the repository is public. Private repositories will not receive credit.
5. Every group member must submit the GitHub repository URL on Canvas.

## AI Transparency

AI was used to clean up this file.
