**Summary:** Use the North Vacation Booking requirements to create a test plan for the application.

**Purpose:** Practice defining the scope, objectives, resources, risks, test approach, entry and exit criteria, schedule, and communication needed to guide testing.

## 1. Context

What are we testing? We want users to be able to pick rentals, choose a date, how many guests that are staying, create the booking, and see the bookings confirmed. This has to be done BEFORE release. Reservations rules from previous weeks have already been defined and they will be numbered so they can be paired with test cases and referred back to easily.

Rules:

- R1. A stay must be between 1 and 31 nights.
- R2. A booking has to have between 1 and 12 guests.
- R3. Each night has a base charge of $200
- R4. Every booking has a one-time $50 cleaning fee
- R5. Every guest that exceeds over five (5) will add $25 per night
- R6. Check-in date has to be before the checkout date.
- R7. Checkout day cannot be the same as a checkin date.
- R8. Every night in the range booked has to be available.
- R9. Bad inputs will raise a ValueError
- R10. Unavailable dates raise the UnavailableError
- R11. A new booking will start off in Pending
- R12. This new booking will show up in the user's booking list
- R13. Increasing, decreasing, or resetting the values does not affect that they should remain in the allowed "range", the values must be kept within this

For example, to check that R3, R4, and R5 work together: a 3 night stay with 6 guests should be 3 x $200 = $600, plus the $50 cleaning fee, plus 1 extra guest x $25 x 3 nights = $75, so $725 total. I wrote this out because the extra guest fee is charged _per night_, which is the kind of thing that is easy to get wrong in the code (and honestly easy to get wrong in my head too).

|Section|Description|
|---|---|
|Test objective 1|Confirm that a user can create a valid booking (rental, dates, guests) and see it in their booking list as Pending|
|Test objective 2|Confirm that invalid bookings are blocked: bad dates, too many/too few nights or guests, and unavailable dates are all rejected|
|In scope|rental selection, check-in/checkout dates, guest count, price total, creating a booking, booking list, increase/decrease/reset buttons|
|Out of scope|payment processing, user accounts/login, emails or notifications, host side of the app, performance/load testing|
|Test basis|rules R1-R13 above, the user stories for booking, the source code from previous weeks|
|Assumption|the rules above are final and will not change during this release|
|Constraint|testing has to be finished within one week before release, and I am the only tester|

NOTE: Out of scope does not mean those features do not matter, it just means they are not part of _this_ release so we are not spending time on them right now. Payment would honestly need its own whole test plan.

## 2. Roles and Responsibilities

Even on a small project, testing is not just one person clicking around. Someone has to decide what matters, someone has to fix what breaks, and someone has to test it.

|Role|Responsibilities|When Involved|Communication|
|---|---|---|---|
|Tester|writes the test plan, designs and runs test cases, logs defects, writes the reports|the whole time, from planning to the final report|reports defects to the developer, progress to the product owner|
|Developer|builds the features, fixes defects, writes/keeps the unit tests passing|before testing (testable build) and during (fixes)|gets defect reports from the tester, tells the tester when a fix is in|
|Product owner|owns the rules R1-R13, decides priority, decides if the release is ready to go|start (reviewing requirements) and end (sign off)|answers rule questions from the tester and developer, gets the completion report|

## 3. Test Approach

This is the "how" part. I tried to match each part of the app to the technique that fits it best, using the ones we have practiced in previous weeks instead of picking random ones.

Test levels:

- Component testing: the booking rules on their own (dates, guests, price, errors)
- Component integration testing: the booking form talking to the booking list
- System testing: the whole flow from picking a rental to seeing the booking confirmed

Test types:

- Functional testing: does it do what the rules say
- Regression testing: re-running the tests after every fix so nothing that used to work breaks
- Usability (light): are the error messages clear enough that a user knows what to fix

|Test Area|Test Level or Type|Technique|Manual or Automated|Deliverable|
|---|---|---|---|---|
|Nights + guests (R1, R2)|Component, functional|Boundary value analysis|Automated|Jest test file|
|Price total (R3, R4, R5)|Component, functional|Equivalence partitioning + decision table|Automated|Jest test file|
|Dates (R6, R7, R8, R10)|Component, functional|Decision table|Automated|Jest test file|
|Bad inputs (R9)|Component, functional|Equivalence partitioning (invalid groups)|Automated|Jest test file|
|Booking status (R11, R12)|System, functional|State transition testing|Manual|Test cases + test results|
|Increase/decrease/reset (R13)|Component integration|Boundary value analysis|Manual + automated|Test cases + Jest test file|
|Full booking flow|System, regression|Exploratory + checklist|Manual|Test results + defect reports|

For boundary values, the edges are where I expect bugs. For R1 that means testing 0, 1, 31, and 32 nights. For R2 it is 0, 1, 12, and 13 guests. For R5 it is 5 guests (no extra fee) vs 6 guests (first extra fee). If 31 is accepted and 32 is rejected, the rule is working.

Deliverables:

- test cases (with IDs like BOOK-01 so they can be traced back to a rule)
- automated test files
- test results
- coverage report
- defect reports (GitHub issues)
- test completion report

## 4. Test Requirements

What do I actually need before I can test this?

- Test environment: the app running locally from the GitHub repo (main branch), with a fresh copy of the sample rental data before each test run so old bookings do not mess with the final results
- Browsers/devices: Chrome (main), Firefox (personal browser and good alternative), and one mobile size using Chrome DevTools
- Tools: VS Code, Node + npm, Jest, Git/GitHub, GitHub Actions, linters, Chrome DevTools, Obsidian for notes(?)
- Make sure Test data is ready and seeded:
    - at least 2 rentals, one with some dates already booked (needed to test R8 and R10)
    - date ranges for 1, 31, and 32 nights
    - guest counts of 0, 1, 5, 6, 12, and 13
    - bad inputs like blank fields, negative numbers, letters in the guest field, checkout before check-in
- Access: read/write access to the repo so I can push test files and open issues
- People/training: the developer to walk me through how the booking data is stored and reset, and the product owner available to answer questions about the rules

NOTE: The test data is basically my equivalence partitions and boundary values from earlier stage turned into actual values. 

## 5. Risk Register

Risk level comes from likelihood x impact. Product risks are about the app itself being wrong, and project risks are about the testing process getting derailed.

|Risk|Type|Likelihood|Impact|Mitigation|
|---|---|---|---|---|
|A user can book dates that are already booked (double booking)|Product risk|Medium|High|prioritize R8/R10 tests first, test overlapping ranges, not just exact matches|
|The price total is wrong when there are more than 5 guests|Product risk|Medium|High|decision table for R3-R5, check the math by hand for each case|
|A user can book with checkout on the same day or before check-in|Product risk|Medium|High|decision table for R6/R7, include same day and reversed dates in test data|
|Increase/decrease buttons let the value go past the allowed range|Product risk|Medium|Medium|boundary tests on R13, click past the min and max on purpose|
|The build is not ready or keeps breaking, so testing starts late|Project risk|Medium|High|smoke test the build first (entry criteria), keep the schedule flexible|
|I am the only tester and run out of time|Project risk|Medium|Medium|test high risk areas first so the most important stuff is covered if time runs out|

Personal note: The double booking one is ranked first because if that goes wrong, it is a real world problem (two families showing up to the same house) and not just a wrong number on a screen.

## 6. Entry Criteria

These have to be true before I start running tests. Each one is a yes/no so there is no debate about whether we are ready.

|Type|Criterion|
|---|---|
|Entry|The app runs locally from the main branch with no startup errors|
|Entry|A quick smoke test passes: the booking form loads and one valid booking can be created|
|Entry|All existing unit tests pass|
|Entry|Test cases for R1-R13 are written and reviewed|
|Entry|Test data (rentals, booked dates, guest counts) is loaded and can be reset|
|Entry|Jest is installed and runs|

## 7. Exit Criteria

These decide when testing is done. I tried to make every one of these measurable, so there is an actual number or a clear yes/no.

|Type|Criterion|
|---|---|
|Exit|100% of high priority test cases have been run (anything tied to R1, R2, R6, R7, R8)|
|Exit|At least 90% of all planned test cases have been run|
|Exit|Every rule R1-R13 has at least one test case that passed (100% requirements coverage)|
|Exit|0 critical and 0 high severity defects are still open|
|Exit|At least 80% statement coverage on the booking logic|
|Exit|Regression tests pass after the last fix|

NOTE: If the release deadline hits before all of this is done, testing can still stop, but only if the product owner looks at what is left and agrees to accept the risk. That decision goes in the completion report.

## 8. Test Schedule

One week, and each activity depends on the one before it. The dependency column is what keeps me from writing test cases before I even understand the rules.

|Activity|Responsible Role|Time|Dependency|
|---|---|---|---|
|Review requirements R1-R13|Tester and product owner|Day 1|requirements are available|
|Design test cases + prepare test data|Tester|Day 2|requirements have been reviewed|
|Set up environment + smoke test|Tester and developer|Day 2|testable build is on main|
|Write automated tests (Jest)|Tester and developer|Day 3|test cases are designed|
|Run tests (high risk areas first)|Tester|Day 3-4|entry criteria are met|
|Log defects + fix them|Tester and developer|Day 3-5|tests have been run|
|Retest fixes + regression testing|Tester|Day 5-6|fixes are pushed|
|Write test completion report + sign off|Tester and product owner|Day 7|exit criteria are met (or risk accepted)|

## 9. Communication Plan

Testing does not help much if nobody hears about the results. The audience changes what goes in the message: the developer needs the steps to reproduce a bug, while the product owner mostly wants to know if we are on track.

|Information|Audience|Method|Frequency|
|---|---|---|---|
|Test progress (run/passed/failed)|Project team|Daily stand-up|Daily|
|Defect report|Developer|GitHub issue|When a defect is found|
|Fix is ready to retest|Tester|GitHub issue comment|When a fix is pushed|
|Blockers (build broken, env down)|Developer, product owner|Team chat|Right away|
|Rule questions|Product owner|Team chat|As needed|
|Test completion report|Product owner, team|Markdown file in the repo|Once, at the end of testing|

Each defect report includes: an ID, which rule it breaks (what rule number), steps to reproduce, expected vs actual result, severity, and a screenshot if it helps.

Personal Note: Putting this together, I realized it is what everything else depends on. The rules from previous assignments and tables, my partitions and boundaries became the test data, and the risk register decides what gets tested first. The entry and exit criteria were the most useful part for me, because they turn "are we ready?" and "are we done?" into something tangible to checkl against. 

## AI Disclosure

I start with writing notes during lectures, swap to make notes on Obsidian ([an example](https://github.com/givecoffee/AD361/blob/main/LP07/Lab%2007%20test%20planning_261115_235244.pdf) of where it starts) when I need to make tables or reference previous assignments, and use AI assistance to format and organize the information so it is easier for others to read and understand. I use prompts such as "format this in markdown and with organized tables so the information is easier to follow" as well as building review quizzes from my own notes to respond to. This info is saved in a knowledge base I can use to review all of my personal insights, challenges, etc in one place. 
