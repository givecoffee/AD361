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

test("isEven num even", () => {
  expect(isEven(10)).toBe(true);
});

test("isEven num odd", () => {
  expect(isEven(11)).toBe(false);
});

test("palindrome is palindrome", () => {
  expect(palindrome("tacocat")).toBe(true);
});

test("palindrome is not palindrome", () => {
  expect(palindrome("cat")).toBe(false);
});

test("countVowels counts vowels", () => {
  expect(countVowels("hello")).toBe(2);
});

test("countVowels counts no vowels", () => {
  expect(countVowels("rhythm")).toBe(0);
});

test("findMax finds maximum number", () => {
  expect(findMax([1, 2, 3, 4, 5])).toBe(5);
});

test("findMax finds maximum number with negative numbers", () => {
  expect(findMax([-1, -2, -3, -4, -5])).toBe(-1);
});

test("removeDuplicates removes duplicate numbers", () => {
  expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test("add adds two numbers", () => {
  expect(add(2, 3)).toBe(5);
});

test("divide divides two numbers", () => {
  expect(divide(10, 2)).toBe(5);
});

// This test is intentionally failing to demonstrate error handling

test("countVowels has vowels", () => {
  expect(countVowels("hello world")).toBe(300);
});