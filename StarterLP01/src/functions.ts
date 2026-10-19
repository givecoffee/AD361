// AI transparency: AI was used to clean up and refactor this code.

export function isEven(num: number): boolean {
  return num % 2 === 0;
}

export function add(num1: number, num2: number): number {
  return num1 + num2;
}

export function divide(num1: number, num2: number): number {
  return num1 / num2;
}

export function palindrome(text: string): boolean {
  return text.toLowerCase() === text.toLowerCase().split("").reverse().join("");
}

export function countVowels(text: string): number {
  const vowels = "aeiouAEIOU";
  return [...text].filter((vowel) => vowels.includes(vowel)).length;
}

export function findMax(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Empty list");
  }

  let maximum = numbers[0];

  for (const number of numbers.slice(1)) {
    if (number > maximum) {
      maximum = number;
    }
  }

  return maximum;
}

export function removeDuplicates<T>(items: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
