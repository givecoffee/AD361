# Learning Practice: Black-Box Testing, Part 2

## Topics

- Decision table testing
- State transition testing

## Learning Objectives

- Build a decision table.
- Identify conditions and actions.
- Build test cases from a decision table.
- Identify application states, events, and transitions.
- Create a state transition table.
- Build test cases that cover transitions and events.

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
- A new valid reservation begins in the `Pending` state.
- Successful payment moves it from `Pending` to `Confirmed`.
- Failed payment moves it from `Pending` to `Cancelled`.
- A confirmed reservation can move to `Checked In` on its check-in date.
- A checked-in reservation moves to `Completed` after checkout.
- A pending or confirmed reservation may be cancelled.
- A cancelled or completed reservation cannot change states.
- Invalid state transitions raise an `InvalidStateError`.

## Resources

- [Decision Table Testing — GeeksforGeeks](https://www.geeksforgeeks.org/software-engineering/decision-table-based-testing-in-software-testing/)
- [State Transition Testing — GeeksforGeeks](https://www.geeksforgeeks.org/software-engineering/state-transition-testing/)

## Step 1: Identify Conditions and Actions

Review the reservation requirements and identify:

- Five conditions that affect whether a reservation is accepted.
- Five actions that may occur based on those conditions.

<details>
<summary>Examples</summary>

### Condition Examples

- The check-in and checkout dates are valid.
- The reservation is between 1 and 31 nights.
- The reservation includes between 1 and 12 guests.
- Every requested night is available.
- The reservation includes more than five guests.

### Action Examples

- Create the reservation.
- Calculate the standard reservation price.
- Add the extra guest fee.
- Raise a `ValueError`.
- Raise an `UnavailableError`.

</details>

## Step 2: Create a Decision Table

Create a decision table containing at least six relevant combinations of conditions and their expected actions.

Use:

- `T` for true
- `F` for false
- `-` when the condition does not affect the result
- `X` when an action should occur

Your table should follow this structure:

| Conditions and Actions         | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 |
| ------------------------------ | :----: | :----: | :----: | :----: | :----: | :----: |
| Dates are valid                |        |        |        |        |        |        |
| Number of nights is valid      |        |        |        |        |        |        |
| Number of guests is valid      |        |        |        |        |        |        |
| Requested nights are available |        |        |        |        |        |        |
| More than five guests          |        |        |        |        |        |        |
| **Create reservation**         |        |        |        |        |        |        |
| **Calculate standard price**   |        |        |        |        |        |        |
| **Add extra guest fee**        |        |        |        |        |        |        |
| **Raise `ValueError`**         |        |        |        |        |        |        |
| **Raise `UnavailableError`**   |        |        |        |        |        |        |

<details>
<summary>Example table</summary>

| Conditions and Actions             | Rule 1 | Rule 2 |
| ---------------------------------- | :----: | :----: |
| Valid check-in and checkout dates? |   T    |   T    |
| Between 1 and 31 nights?           |   T    |   T    |
| Between 1 and 12 guests?           |   T    |   T    |
| Every requested night available?   |   T    |   T    |
| More than five guests?             |   F    |   T    |
| **Create reservation**             |   X    |   X    |
| **Calculate standard price**       |   X    |   X    |
| **Add extra guest fee**            |        |   X    |
| **Raise `ValueError`**             |        |        |
| **Raise `UnavailableError`**       |        |        |

- **Rule 1:** Create a valid reservation for five or fewer guests without an extra guest fee.
- **Rule 2:** Create a valid reservation for more than five guests and add the extra guest fee.

</details>

## Step 3: Create Decision Table Test Cases

Create at least one test case for every rule in your decision table. If your table contains six rules, you must create at least six test cases.

Each test case must include:

- Test-case ID
- Conditions
- Input values
- Expected action
- Expected price or exception

<details>
<summary>Example test case</summary>

### TC01: Valid Reservation With No Extra Guest Fee

- **Check-in:** October 1
- **Checkout:** October 4
- **Number of guests:** 3
- **Availability:** Every requested night is available.
- **Expected Result:** The reservation is created.
- **Expected Price:** `$650`
  - Three nights at $200: `$600`
  - One-time cleaning fee: `$50`

</details>

## Step 4: Identify Reservation States and Events

- Identify five possible reservation states.
- Identify five events that may cause the reservation to change states.

<details>
<summary>Examples</summary>

### Reservation States

- `Pending`
- `Confirmed`
- `Checked In`
- `Completed`
- `Cancelled`

### Events That Change Reservation States

- Payment succeeds
- Payment fails
- Guest cancels
- Guest checks in
- Guest checks out

</details>

## Step 5: Create a State Transition Table

Document the expected result of each event from each relevant state.

Your table must include at least:

- Six valid state transitions
- Three invalid state transitions
- Nine transitions total

Use the following structure:

| Current State | Event            | Expected State | Expected Result          |
| ------------- | ---------------- | -------------- | ------------------------ |
| Pending       | Payment succeeds | Confirmed      | Reservation is confirmed |
|               |                  |                |                          |

<details>
<summary>Example table</summary>

| Current State | Event                      | Expected State | Expected Result                                          |
| ------------- | -------------------------- | -------------- | -------------------------------------------------------- |
| Pending       | Payment succeeds           | Confirmed      | The reservation is confirmed.                            |
| Pending       | Payment fails              | Cancelled      | The reservation is cancelled and the dates are released. |
| Confirmed     | Guest checks in            | Checked In     | The guest is checked in.                                 |
| Checked In    | Guest checks out           | Completed      | The reservation is completed.                            |
| Confirmed     | Guest cancels              | Cancelled      | The reservation is cancelled and the dates are released. |
| Cancelled     | Guest attempts to check in | Cancelled      | An `InvalidStateError` is raised.                        |
| Completed     | Guest attempts to cancel   | Completed      | An `InvalidStateError` is raised.                        |

</details>

## Step 6: Create State Transition Test Cases

Create test cases that cover:

- Every valid state transition, for a minimum of six test cases
- At least three invalid state transitions
- At least one complete reservation sequence
- At least one cancellation sequence

You must create at least 11 state transition test cases in total.

<details>
<summary>Example table</summary>

| Test ID | Starting State | Event                      | Expected State | Expected Result                   | Transition Type |
| ------- | -------------- | -------------------------- | -------------- | --------------------------------- | --------------- |
| ST01    | Pending        | Payment succeeds           | Confirmed      | The reservation is confirmed.     | Valid           |
| ST02    | Cancelled      | Guest attempts to check in | Cancelled      | An `InvalidStateError` is raised. | Invalid         |

</details>

## What to Submit

1. Create and initialize a GitHub repository.
2. Commit and push your work to the repository.
3. Make sure the repository is public. Private repositories will not receive credit.
4. Submit the repository URL on Canvas.

## AI Transparency

AI was used in the creation of this file.
