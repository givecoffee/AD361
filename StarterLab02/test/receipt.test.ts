
import { test, expect } from "@jest/globals";
import { tax, total } from "../src/fixed_receipt.ts";
import { deleteItem } from "../src/fixed_receipt.ts";

// happy-path test
// test a function using valid input and confirm it produces expected result
// testing subtotal calculation (without tax)

test("subtotal adds up all item prices", () => {
  expect(total()).toBeCloseTo(47.49);
});

// unhappy path test 
// how a function responds to invalid inputs/incorrect value
// try to delete an item that does not exist in the list
// pop() removes the last item from the list so last item added as the 'expect'
test("deleteItem with item not on list", () => {
  const list = deleteItem("banana");
  expect(list).toContainEqual({ name: "avocado oil", price: 10.0 });
});

// edge case test - test an unusual value or near the boundary of valid input
// let's try to have a 0% tax rate (wouldn't ZERO tax be nice??)

test("total with 0% tax rate", () => {
  const result = tax(0);
  expect(result).toBeCloseTo(47.49);
});




