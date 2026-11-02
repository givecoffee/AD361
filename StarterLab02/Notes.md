Given: receipt.ts 
Deliverables: test files (happy path, unhappy path, and an edge case)

Happy Path - Test the function using a VALID input and confirm that it produces the expected result
Unhappy Path - tests how the functions responds to INVALID inputs 
Edge Case - something unusual, or a value near the limits of the expected inputs

After running the tests, I will save/screenshot the results and review the code afterwards. Identify any obvious errors, logical defects, cluttered code, and straight spaghetti. 

ISSUE LOG
Include:
- Location
- Issue
- Explanation
- Suggested fix
- Status (open or resolved)

One example of one of the following:
- Root cause
- Error 
- Defect
- Failure

Run a static analysis on 'receipt.ts' and record results. Add issues that are identified by the linter. Use imported functions from 'fixed_receipt.ts' and run the tests again against corrected code. 

Deliverables: 

- github repo 
- group members as collaborators
- commits and pushes for the following files:
	- receipt.ts
	- fixed_receipt.ts
	- receipt.test.ts
	- issue_log.md
	- screenshots folder with results saved

Program requirements:

- Items can be added to the grocery list.
- Items can be deleted from the grocery list.
- The subtotal is calculated without tax.
- The total is calculated with tax.
- A receipt can be printed.

Starting off, the main directory now has a /test/receipt.test.ts file where the three main tests will be included. 

Logic for the basic tests are below:

HAPPY PATH TEST
I will test for a valid input, considering that one of the requirements for the program can calculate a subtotal without tax, this was the first test implemented.

To test the subtotal, the item list below has the included prices so we can work out what WOULD be the correct answer:

```
const ITEMS = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  ,
  { name: "avocado oil", price: 10.0 },
];
```

Included is the function for total:

```
export function total() {
  for (const i of 3) {
    total = total + ITEMS[i]["price"];
  }
  return total;
}
```

If you add up 21.99 + 8.75 + 6.75 + 10.0 = 47.49

I ran into an issue where I was using toBe rather than toBeCloseTo and realized decimals technically can have really long and precise values (i.e 75.89999999 rather than how monetary values work - $75.90)

UNHAPPY PATH TEST
Here I will intentionally insert an invalid input to test. We know that we have a few items such as eggs, sandwich, etc. We should check for something NOT in the list such as a banana and try to delete it using the given delete function.

the function included for deleteItem is:

```
export function deleteItem(name: string) {
  const idx = ITEMS.indexOf("name");
  ITEMS.pop();
  return ITEMS;
}
```

By trying to delete the banana from the list but also putting an expect for an item that IS there, it should return that the item is not there after 'deletion'

EDGE CASE TEST

If we had a 0% tax rate (which would be amazing) then the price should be near the subtotal. Since total was already imported, I just tested this out of convenience to ensure that this is tested on the lower end. If we were provisioning the tests and the range was 0-100, this would be the lower end and 100 would be the higher end where the 100% tax rate would essentially double the price of the item because 100% of the value would be added on. 

```test("total with 0% tax rate", () => {
  const result = total(0);
  expect(result).toBeCloseTo(47.49);
});
```

In this case, I just did 0% to see if it equals the subtotal after running it. The tests did not pass and I included 'tax' function to be safe even though not included in the 0% edge case test. There were a lot of errors in the code and so the test suite did not run. This is where I had to perform a manual code review to see what was going on under the hood with receipt.ts. 

MANUAL CODE REVIEW:

GitHub Issue was created for receipt.ts to find any common or obvious errors that made it difficult to meet the program requirements listed earlier. 

Each issue should include:
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

Issue #1 was created after seeing the error log (jest-results.png) in the included screenshots. The code did not compile, there are extra commas, the errors are thrown for expected ":" and ","

Each issue created were condensed by error type i.e syntax, logic, spaghetti noodles, or obstacles to meeting the program requirements. I labeled them all bug and would normally have a test branch, but this week I will just use the main repo and push changes there.

ISSUE #1 - https://github.com/givecoffee/AD361/issues/1
ISSUE #2 - https://github.com/givecoffee/AD361/issues/2 
ISSUE #3 - https://github.com/givecoffee/AD361/issues/3
ISSUE #4 - https://github.com/givecoffee/AD361/issues/4
ISSUE #5 - https://github.com/givecoffee/AD361/issues/5

CODE CORRECTIONS: new file created fixed_receipt.ts, code pushed to repo and then GitHub issues updated to reflect new status. 
