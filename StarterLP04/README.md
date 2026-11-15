Decision Table Testing and State Transition Testing for North Vacation Booking

**Purpose:** An application that allows users to list their homes as vacation rentals and allows guests to make reservations.

Instructions.md will include the reservation requirements list, condition examples, space to elaborate and review on which conditions affect whether the reservations are accepted, and actions that could occur based on those conditions. Conditions are the inputs or variables we put into the "machine" that will determine what decisions are made, and the actions are the result of those combinations of conditions.

Side note: Going into this, I remember a lot of it was in JavaScript/TypeScript so I am sticking with those conventions. I have changed up how I will be drafting decision tables, test cases, and other documentation to be more consistent with that. This will affect how I describe boolean names as well, as they go with "is" or "has" and functions start off a little differently from C or other languages. This change will actually make it read more like plain English and possibly easier to follow for demonstrative purposes as well.

### Step 1: Identify Conditions and Actions 
 
When going through the list of requirements on Instructions.md (included in this repo), you have to stop and ask if this is a thing that need be "checked" or something that actually happens. 

First requirement as an example was "Must be between 1 and 31 nights" and it is checking if it is in a valid range, so this is a CONDITION. On the other hand, the other requirement "invalid reservation information raises a ValueError" is more along the lines of something that happens, so this is an ACTION. Keeping this in mind and working through the list, there are times where you have both a condition and an action. "Each guest over five costs an additional $25 per night" is both checking if there are more than five guest, and if so, the action is the added fee being tacked onto the total. 

THE CONDITIONS (what is being checked?)

| ID  | Name             | Condition                                      | True                | False                                                                              |
| --- | ---------------- | ---------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| C1  | isDateOrderValid | Check-in date is before the checkout date      | Checkin < Checkout  | Checkin > Checkout                                                                 |
| C2  | isNightsValid    | Nights between 1-31                            | 1-31 nights         | equal or less than 0 or more than 32 nights                                        |
| C3  | isGuestsValid    | Guests between 1-12                            | 1-12 guessts        | equal or less than 0 guests or equal to or more than 13 guests (since 12 is valid) |
| C4  | isAvailable      | All nights in the selected range are available | Every night is open | At least one of the nights is booked                                               |
| C5  | hasExtraGuests   | More than 5 guests                             | 6-12 guests         | 1-5 guests                                                                         |

THE ACTIONS (what is happening?)

| ID  | Name                     | Action                                              |
| --- | ------------------------ | --------------------------------------------------- |
| A1  | throwValueError          | throw ValueError                                    |
| A2  | throwUnavailableError    | throw UnavailableError                              |
| A3  | createPendingReservation | Create Reservation in Pending  state                |
| A4  | chargeBaseCost           | $200 multiplied by nights + $50 cleaning fee        |
| A5  | addGuestSurcharge        | $25 multiplied by (guests - 5) multiplied by nights |


Remember: addGuestSurcharge (rule applies to more than 5 guests) and by factoring it into the equation you don't need a lot of complex logic. TypeScript does NOT have the ValueError built in so I will have to create error classes myself that extend from Error and include a more descriptive indication of which error was thrown. This can all be added later, but is something to note is important to add on early. (Throwback to one of the first lessons where we tracked errors this way using Jest and to check which ones were thrown) Admittedly, coming from a Java background initally, I found the constructor to be useful in customizing these error classes.

All input is validated before availability is even checked so in the case that C1, C2, or C3 is FALSE -> then only A1 (Action 1) runs and C4 (isAvailable) does not even need to be checked. 

### Step 2: We're making a Decision Table

Six relevant combinations of conditions and the expected actions: 
T = true
F = false
~ = condition does NOT affect the result 
O = action should occur (keeping this a little different from using X for invalid states)

We have the five conditions but they are binary (only have two choices) so there are 32 possible communications. With only binary results though, there are many areas to merge redundant results and so we will probably end up with less. To weed out some of the unnecessary ones, we could start by checking what combinations are impossible. Because all input is validated before we even check for availability, we can weed out the combinations where one of those conditions fail because it won't change the outcome anyways. You also cannot have bookings with 0 nights, or having checkin dates on or after the checkout date as it must be a complete night and we do not have time machines. 

What remains is a more simplified decision table with six rules:

|                             | R1  | R2  | R3  | R4  | R5  | R6  |
| --------------------------- | --- | --- | --- | --- | --- | --- |
| C1 isDateOrderValid         | F   | T   | T   | T   | T   | T   |
| C2 isNightsValid            | ~   | F   | T   | T   | T   | T   |
| C3 isGuestsValid            | ~   | ~   | F   | T   | T   | T   |
| C4 isAvailable              | ~   | ~   | ~   | F   | T   | T   |
| C5 hasExtraGuests           | ~   | ~   | ~   | ~   | F   | T   |
| A1 throwsValueError         | O   | O   | O   |     |     |     |
| A2 throwUnavailableError    |     |     |     | O   |     |     |
| A3 createPendingReservation |     |     |     |     | O   | O   |
| A4 chargeBaseCost           |     |     |     |     | O   | O   |
| A5 addGuestSurcharge        |     |     |     |     |     | O   |

RULE SUMMARY:
R1 - Dates are backwards or on the same exact day, throws ValueError
R2 - Dates are in correct order but the stay is too long, throws ValueError
R3 - Dates are correct, but guest count is out of normal range, throws ValueError
R4 - Everything is valid, but a night is already booked, throws UnavailableError
R5 - Booking is valid with 1-5 guests, reservation is in Pending phase, and cost is base + cleaning fee
R6 - Booking is valid with 6-12 guests. Reservation is in Pending phase, and the cost is base + cleaning fee + guest surcharge

### Step 3: Decision Table Test Cases

Now after the decision table has been made, we can make a test case for each rule from above. I will call these TC01-TC06 although it is not the best for more expansive suites but cover the rules outlined and then there will be six additional test cases that hopefully will catch some of the "one-offs". Using requirements as a guide we can look for any issues or weird bugs. 

(TC01): Check-in date is the Same day as checkout date 
Rule this applies to: R1 
- Conditions: C1 must be F 
- Check-in: November 1 
- Check-out: November 1 
- Number of guests: 2
- Availability: Every requested night is available 
- Expected actions: A1 throws 'throwValueError' 
- Expected results: 'ValueError' is thrown and no reservation is created

(TC02): Staying longer than 31 nights
Rule 2
- Conditions: C1 must be True, C2 must be False
- Check-in: November 1
- Checkout: December 2 (32 nights)
- Number of guests: 3
- Availability: Every requested night is available
- Expected actions: A1 throwValueError
- Expected results: ValueError is thrown, and no reservation is created.

(TC03): Too many guests
Rule 3
- Conditions: C1 must be True, C2 must be True, C3 must be False
- Check-in: November 1
- Checkout: November 4
- Number of guests: 13
- Availability: Every requested night is available.
- Expected Action: A1 'throwValueError'
- Expected Result: 'ValueError' thrown and no reservation is created 

(TC04): Requested night is already booked
Rule 4
- Conditions: C1= True, C2 = T, C3 = T, C4 = F
- Check-in: November 1
- Checkout: Novemeber 4
- Number of guests: 3
- Availability: Nov. 2 is already booked.
- Expected Action: A2 throwUnavailableError
- Expected Result: the UnavailableError is thrown and no reservation is created.

(TC05): Valid reservation meets guest limit and does not need a fee
Rule 5
- Conditions: C1 = True, C2=True, C3=True, C4=True, C5=False 
- Check-in: Nov 1
- Checkout: Nov 4
- Number of guests: 5
- Availability: Every requested night is available.
- Expected Actions: Action 3 createPendingReservation, Action 4 -> chargeBaseCost
- Expected Result: The reservation is created in Pending
- Expected Prices: TOTAL: $650 - (3) three night at $200 each night would be $600, plus $50 cleaning fee

(TC06): Valid Reservation with one extra guest
Rule 6
- Conditions: C1 = True, C2 = T, C3 = T, C4 = T, C5 = T
- Check-in: October 1
- Checkout: October 4
- Number of guests: 6
- Availability: Every requested night is available.
- Expected Actions: A3 `createPendingReservation`, A4 `chargeBaseCost`, A5 `addGuestSurcharge`
- Expected Result: The reservation is created in `Pending`.
- Expected Price: TOTAL $725 -three (3) nights at $200 is $600 
	- One extra guest is 25 per night
	- so 25x3= 75
	- 600+50 one time cleaning fee + 75 guest fee


BOUNDARY TESTS:

| ID   | Rule | What it tests                          | Check-in  to Checkout | Guests | Availability    | Expected Result                              |
| ---- | ---- | -------------------------------------- | --------------------- | ------ | --------------- | -------------------------------------------- |
| TC07 | R5   | Longest valid stay (31 nights)         | Nov 1 - Dec 1         | 1      | All open        | Created, `$6,250` (31 × $200 + $50)          |
| TC08 | R5   | Shortest valid stay duration (1 night) | Nov 1 - Nov 2         | 1      | All open        | Created, `$250` ($200 + $50)                 |
| TC09 | R6   | Most guests allowed (12)               | Nov 1 - Nov4          | 12     | All open        | Created, `$1,175` ($600 + 7 × $25 × 3 + $50) |
| TC10 | R3   | guests below the minimum (0)           | Nov 1- Nov 4          | 0      | All open        | ValueErro                                    |
| TC11 | R1   | Checkout is before check-in            | Nov 4 - Nov 1         | 3      | All open        | ValueError                                   |
| TC12 | R5   | Checkout night isn’t counted           | Nov 1 - nov 4         | 3      | Nov 4 is booked | Created, `$650`                              |
### Step 4: identify reservation states and events

States will be referred to as S1, S2, etc.

STATES:

| ID  | State      |
| --- | ---------- |
| S1  | Pending    |
| S2  | Confirmed  |
| S3  | Checked In |
| S4  | Completed  |
| S5  | Cancelled  |

Note: S4 and S5 cannot be changed as they are final aka "terminal" - nothing can change these two.

EVENTS:

| ID  | Event            | From...              | To         |
| --- | ---------------- | -------------------- | ---------- |
| E1  | Payment succeeds | Pending              | Confirmed  |
| E2  | Payment fails    | Pending              | Cancelled  |
| E3  | Guest cancels    | Pending or Confirmed | Cancelled  |
| E4  | GUest checks in  | Confirmed            | Checked in |
| E5  | Guest checks out | Checked in           | Completed  |

### Step 5: Create a State Transition Table

The expected result of each event from each of the relevant states. Six valid state transactions, three invalid state transitions and in total nine (9) transitions provided.

| Current State | Event                                             | Expected State | Expected Result                                                                    |
| ------------- | ------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| Pending       | Payment succeeds                                  | Confirmed      | The reservation is confirmed.                                                      |
| Pending       | Payment fails                                     | Cancelled      | The reservation is cancelled and the dates are released back into available dates. |
| Pending       | Guest cancels                                     | Cancelled      | The reservation is cancelled and the dates are released.                           |
| Confirmed     | Guest cancels                                     | Cancelled      | The reservation is cancelled and the dates are released.                           |
| Confirmed     | Guest checks in (on check-in date)                | Checked In     | The guest is checked in.                                                           |
| Checked In    | Guest checks out                                  | Completed      | The reservation is completed.                                                      |
| Pending       | Guest attempts to check in                        | Pending        | An InvalidStateError is thrown.                                                    |
| Confirmed     | Guest attempts to check in (before check-in date) | Confirmed      | An InvalidStateError is thrown.                                                    |
| Checked In    | Guest attempts to cancel                          | Checked In     | An InvalidStateErroris thrown.                                                     |
| Cancelled     | Guest attempts to check in                        | Cancelled      | An InvalidStateError is thrown.                                                    |
| Completed     | Guest attempts to cancel                          | Completed      | An InvalidStateError is thrown.                                                    |
|               |                                                   |                |                                                                                    |

### Step 6: State Transition Test Cases

| Test ID | Starting State | Event                                                         | Expected State | Expected Result                                                               | Transition Type   |
| ------- | -------------- | ------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------- | ----------------- |
| ST01    | Pending        | Payment succeeds                                              | Confirmed      | The reservation is confirmed.                                                 | Valid             |
| ST02    | Pending        | Payment fails                                                 | Cancelled      | The reservation is cancelled and the dates are released.                      | Valid             |
| ST03    | Pending        | Guest cancels                                                 | Cancelled      | The reservation is cancelled and the dates are released.                      | Valid             |
| ST04    | Confirmed      | Guest cancels                                                 | Cancelled      | The reservation is cancelled and the dates are released.                      | Valid             |
| ST05    | Confirmed      | Guest checks in on check-in date                              | Checked In     | The guest is checked in.                                                      | Valid             |
| ST06    | Checked In     | Guest checks out                                              | Completed      | The reservation is completed.                                                 | Valid             |
| ST07    | Pending        | Guest attempts to check in                                    | Pending        | An InvalidStateError is thrown.                                               | Invalid           |
| ST08    | Confirmed      | Guest attempts to check in the day before check-in            | Confirmed      | An InvalidStateError is thrown.                                               | Invalid           |
| ST09    | Cancelled      | Guest attempts to check in                                    | Cancelled      | An InvalidStateError is thrown.                                               | Invalid           |
| ST10    | Completed      | Guest attempts to cancel                                      | Completed      | An InvalidStateErro is thrown.                                                | Invalid           |
| ST11    | Pending        | Payment succeeds, Guest checks in , Guest checks out          | Completed      | The reservation goes through every step and is completed.                     | Complete sequence |
| ST12    | Pending        | Payment succeeds, Guest cancels, Guest attempts to check in.. | Cancelled      | The reservation is cancelled, and the later check-in throws InvalidStateError |                   |

### Personal Notes

Making the decision table and then the state transition table seemed excessive at first, but then I realized that given certain inputs we can figure out the actions needed or what happens next, but the ST tables themselves allows us to answer "okay, now that x happened, what possibilities can happen next?" Because there are invalid state transitions and they have the ability to break the booking system, these become increasingly important to expose rather than following the tried and true "happy path" you get sucked into pursuing right out of the gate. No need to test everything, just what will behave differently. TEST OUTCOMES. Once the table is laid out and the logic is tested, they can be translated to real code a lot easier. Up until this point, I have found that testing is not just a step that comes at the end of building something, but it can be planned from the beginning.

## AI Transparency 

Ai was used to generate boundary test cases, state transition test cases, and check for inconsistencies with requirements and the chosen conditions.
