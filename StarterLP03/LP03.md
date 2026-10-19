# Learning Practice: Black-Box Testing, Part 1

## Topics

- Black-box testing
- Equivalence partitioning
- Valid and invalid partitions
- Test-case design

## Learning Objectives

By the end of this activity, you will be able to:

- Design tests from requirements without viewing the application code.
- Identify test classifications and their valid and invalid partitions.
- Select representative values from each equivalence partition.
- Create test cases with clearly defined inputs and expected results.
- Explain how equivalence partitioning reduces the number of tests needed.

## Resources

- [Equivalence Partitioning Method](https://www.geeksforgeeks.org/software-engineering/equivalence-partitioning-method/)

## Project Requirements

Black-box testing involves designing tests without examining the application's internal code. For this Learning Practice, you will not receive application code. Instead, you will review the following requirements and design test cases based on the application's expected behavior.

### Application

**Name:** North Vacation Booking

**Purpose:** An application that allows users to list their homes as vacation rentals and allows guests to make reservations.

### Reservation Requirements

- A reservation must be between 1 and 31 nights, inclusive.
- A reservation must include between 1 and 12 guests, inclusive.
- The reservation costs $200 per night.
- Every valid reservation includes a one-time $50 cleaning fee.
- Each guest over five costs an additional $25 per night.
- The check-in date must be before the checkout date.
- The number of nights is calculated as `checkout date - check-in date`.
- The checkout date is not counted as a reserved night.
- Every night in the requested date range must be available.
- Invalid reservation information raises a `ValueError`.
- An unavailable reservation raises an `UnavailableError`.

# Deliverables

## Step 1: Identify the Equivalence Partitions

Complete the following process:

1. **Identify the test classifications:** Determine which inputs, conditions, or calculated values need to be tested.
2. **Define the ranges or conditions:** Identify the valid and invalid conditions for each classification.
3. **Divide the values into equivalence partitions:** Group values that should be handled in the same way.
4. **Select representative values:** Choose at least one value from each partition.

(GeeksforGeeks, 2026)

## Step 2: Create Equivalence Partition Tables

Create an equivalence partition table for each of the following classifications:

- Number of nights
- Number of guests
- Check-in and checkout dates
- Availability

<details>
<summary>Example table</summary>

| Classification   | Partition             | Range or Condition  | Expected Result                     |
| ---------------- | --------------------- | ------------------- | ----------------------------------- |
| Number of guests | Invalid low           | Fewer than 1 guest  | `ValueError`                        |
| Number of guests | Valid, standard rate  | 1–5 guests          | No additional guest fee             |
| Number of guests | Valid, additional fee | 6–12 guests         | Additional $25 per guest, per night |
| Number of guests | Invalid high          | More than 12 guests | `ValueError`                        |

</details>

## Step 3: Write the Test Cases

- Write at least one test case for each partition in your equivalence partition tables.
- Each test case must include:
  - Test-case ID
  - Classification
  - Partition
  - Input
  - Expected result

### Example: TC01, Valid Standard Number of Guests

- **Classification:** Number of guests
- **Partition:** Valid, standard rate
- **Input:** `3` guests
- **Expected Result:** The reservation is accepted, and no additional guest fee is added.

## What to Submit

1. Create and initialize a GitHub repository.
2. Add your completed equivalence partition tables and test cases to `README.md`.
3. Commit and push your work to the repository.
4. Make sure the repository is public. Private repositories will not receive credit.
5. **Every group member must submit the GitHub repository URL on Canvas.**

## AI Transparency

AI was used to clean up this file.

## Citation

GeeksforGeeks. (2026, July 3). _Equivalence partitioning method_. https://www.geeksforgeeks.org/software-engineering/equivalence-partitioning-method/
