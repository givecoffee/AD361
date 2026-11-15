**Summary:** Choose a website and design tests for one or two of its features using equivalence partitioning, decision tables, and state transitions.  
**Purpose:** Practice turning a website’s expected behavior into test cases without looking at its source code.  
**Tools:** Web browser, a text editor for your tables and test cases, Git, GitHub.

For this assignment, I have chosen Spotify since I use it everyday. It also has great examples of state changes and many features I could pick from to test. In this case, I will discuss the sign-up page on the browser and practice taking expected behaviors and designing test cases. 

## Deliverables 

### Step 1: Select a website

https://www.spotify.com
Features to test: login (initial feature) which can highlight state changes
### Step 2: Equivalence Partitioning

It is important that because it is impossible to test every possible input, we split the inputs into groups where the system will produce the same behavior. Each group will have their own representative value i.e rae@gmail.com will work just as well as bob@gmail.com. Every rule will have their expectations outlined for what inputs will follow the rule (thus valid) and the ones that will ultimately break it (invalid). Instead of just doing email and the birthday, I also included the password as rules for those can be very specific such as a certain amount of characters, the length of the password, etc. 

An example of the password partitions:
(for this purpose, more than 6 characters long and a minimum of 1 number)

| Partition                                               | Valid? | Example       |
| ------------------------------------------------------- | ------ | ------------- |
| Shorter than required length                            | NO     | abc99         |
| Meets every rule                                        | YES    | redlobster12! |
| Long enough but missing the required char type (number) | NO     | redlobster!   |
| Empty input                                             | NO     |               |

Once you know the rules, in this case what the password should require, then you can write partitions. These groups represent a whole range of inputs that should produce the same results. When signing up for an account, multiple rules are being checked at once such as a valid email address name@email.com, the password rules to ensure account safety, and a valid date of birth in the right format. 

### Step 3: Decision Table Testing

For example, if the passwords (minimum 6 chars long, 1 number) are being checked to see if they are valid, then we need to list the conditions to actually check against. ID will correspond to Condition 1, Conditions 2, (C1, C2, etc)

CONDITIONS
(what are we checking against?)

| ID  | Condition                          |
| --- | ---------------------------------- |
| C1  | minimum 1 letter (cannot be empty) |
| C2  | 1 number                           |
| C3  | minimum of 6 chars long            |

ACTIONS 
(what does the system do as a response)

| ID  | Action                                       |
| --- | -------------------------------------------- |
| A1  | accepts password, user can continue          |
| A2  | display error: "Need 1 letter minimum"       |
| A3  | display error: "Need 1 number minimum"       |
| A4  | display error: "Need at least 6 chars total" |


Once we know the conditions, the expected actions, we can map out what to expect from the groups of inputs. Below is a table with the corresponding conditions (C1, C2, C3) and actions (A1, A2, A3, A4). Policies/rules are in place to show what the test cases would be, what expected results you get in return, and why it happens. 
Instead of listing them as Test Case 1, I went with a "PW-01" so that it is easier for me to know that these are for Password Test Cases. 

| Test Case | Rule | Password inputted | Why?                                    | Expected result                                   |
| --------- | ---- | ----------------- | --------------------------------------- | ------------------------------------------------- |
| PW-01     | R1   | mangofiesta15     | has min 6 chars + 1 num                 | Accepted, user can continue                       |
| PW-02     | R2   | chips80           | has only 7 chars + although has 2 nums  | Rejected, display error about length              |
| PW-03     | R3   | ceremony          | has min 8 chars but no required numeral | Rejected, display error about lack of number      |
| PW-04     | R4   | salsa             | only 5 chars, does not have number      | Rejected, display lack of length + lack of number |
| PW-05     | R5   | 821739812738      | 12 chars, no letters                    | Rejected, display lack of letter(s)               |
| PW-06     | R6   | 8090@             | 5 chars, no letters                     | Rejected, lack of letter + lack of length         |
| PW-07     | R7   | (space bar spam)  | many chars, no letter/number etc        | Rejected, needs letters + 1 number                |
| PW-08     | R8   |                   | Fails all rules                         | Rejected, all 3 errors (no length, chars, number) |
### Step 4: State Transition Testing

For a sign up flow where you are inputting your email, DOB, setting as password, etc. you will go through a multi-step flow where the page you are starting on can determine what options you have readily available. For example, if not already signed in or owning an account, you must create one. Once signed in, you will have different options available such as log out. A state is where the system currently is and an event is triggered when a user does something. The in between is handled by state transitions where the event is moving from one state to another. Below are a few tables to document every state, every event, and all the combinations of what happens from left to right and everything in between. (And this is how you catch invalid combinations and errors before it ever goes live)

Spotify's sign in screen has multiple stages so let's start with email, password, and what happens once you are setting up your profile initially. (Also, the dreadful terms and conditions we all ignore) and every step until the account is officially created and in the system. 

STATES

| ID  | State              | What you see                                                                   |
| --- | ------------------ | ------------------------------------------------------------------------------ |
| S0  | Email              | "Sign up" + email form input                                                   |
| S1  | Password           | Step 1 /3: create password                                                     |
| S2  | Profile            | Step 2/3: name, DOB                                                            |
| S3  | T & C              | Step 3/3: long terms and conditions page, agree option and then SIGN UP        |
| S4  | Account is created | Signed in, brought to the spotfiy web page or redirected to download page/ app |

EVENTS

| ID  | Event                          |
| --- | ------------------------------ |
| E1  | Click NEXT after valid input   |
| E2  | Click NEXT after invalid input |
| E3  | Click BACK arrow               |
| E4  | Click SIGN UP                  |

STATE TRANSITION TABLE

| Current State/Event    | E1 (valid)  | E2 (invalid) | E3 (back) | E4 (sign up) |
| ---------------------- | ----------- | ------------ | --------- | ------------ |
| S0 Email               | S1 (step 1) | S0 +error    | X         | X            |
| S1 Password            | S2          | S1 + error   | S0        | X            |
| S2 profile             | S3          | S2 + ERROR   | S1        | X            |
| S3 T&C                 | X           | X            | S2        | S4           |
| S4 Account is created! | X           | X            | X         | X            |

NOTE: If the system is deisgned to keep you on the same step to show you an error and allow you to correct it, it can remain in the same state and that is totally valid. (read: self-transitions) and X is used in the table to show that this would be an invalid transition. If you are using the back button (E3) after an account already exists, this would be an invalid transition because you should NOT go back into the sign up form and make a new account.

X1, X2, X3, X4 are (X) Invalid transitions 1-4. From the table above these would be:
INVALID TRANSITIONS

| INVALID TRANSITION (X#) | State + Event            | Why does this matter?                                            |
| ----------------------- | ------------------------ | ---------------------------------------------------------------- |
| X1                      | S0 + back button         | this is the first step, there is nothing to go "Back" to         |
| X2                      | S1/S2 + sign up button   | Cannot create an account without finishing all steps             |
| X3                      | S4 + browser button back | Must not reopen the form or use info to create duplicate account |
| X4                      | S4 + refresh in browser  | Must not submit thew signup from again (repetitive)              |

TEST CASES

Earlier, I made test cases on specifically the password rules. The following test cases will tie the email, password, and DOB/profile rules together. I spent some time trying to understand what naming conventions to use for these test cases, as you can get really descriptive, or it can be misleading if you are naming a test case after state transitions with the states themselves. In this case, I decided  to be very descriptive in this table since it is combining a lot of knowledge from earlier in this document and I did not want there to be any confusion (as I found myself getting confused myself). After looking at other repositories and articles, it seems that this helps QA teams track and label tests based on the features a lot easier.

Below is a more comprehensive table with the test cases and their respective names, what states they cover (invalid ones marked as X), the starting screen/phase, the steps taken and inputs entered, and the expected results from those inputs. TEST CASE DESC will describe what that test case is designed to do as well. I put rae@gmail.com as tester email but you can use whatever.


| ID        | Test Case Desc                                                                                   | Covers | Start       | Steps                               | Expected Result                                                               |
| --------- | ------------------------------------------------------------------------------------------------ | ------ | ----------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| SIGNUP-01 | Valid email will advance to password entry                                                       | S0-S1  | Email       | Enter rae@gmail.com, click Next     | Password Step                                                                 |
| SIGNUP-02 | Invalid email will stay on Email                                                                 | S0-S0  | Email       | Enter rae@, press Next              | Stay on Email, error: "Invalid Email!"                                        |
| SIGNUP-03 | Valid password will advance to Profile (DOB)                                                     | S1-S2  | Password    | Enter mangofiesta12, press Next     | Profile Step                                                                  |
| SIGNUP-04 | Too short of a password will stay on Password                                                    | S1-S1  | Password    | Enter chips80, press Next           | Stay on Password step, error: "Password too short!"                           |
| SIGNUP-05 | Pressing BACK from Password will keep the email locked in (so it does not have to be re-entered) | S1-S0  | Password    | Click BACK button                   | Email Step, keeps Email info still filled in                                  |
| SIGNUP-06 | Valid DOB/Profile will advance to T&C                                                            | S2-S3  | Profile     | Name: Rae, DOB 1/1/2000, press Next | T&C Step                                                                      |
| SIGNUP-07 | UNderage DOB will stay on Profile                                                                | S2-S2  | Profile     | DOB 11/1/2026 (few weeks old), Next | Stay on Profile, error: "Age minimum not met"                                 |
| SIGNUP-08 | Pressing BACK from Profile will keep the Password                                                | S2-S1  | Profile     | Click BACK button                   | Password Step, password still entered                                         |
| SIGNUP-09 | Pressing BACK from T&C will keep Profile info                                                    | S3-S2  | T&C         | Click BACK button                   | Profile Step, info is still filled in                                         |
| SIGNUP-10 | SIGN UP will create the account                                                                  | S3-S4  | T&C         | Click SIGN UP                       | Account is created, and user is signed in                                     |
| SIGNUP-11 | Pressing BACK after SIGNUP will block a duplicate profile from being made                        | X3     | Acc Created | Click BACK button on browser        | Form is not reopened, no second account is accidentalyl created               |
| SIGNUP-12 | Refreshing the page after SIGNUP will block a "resubmission" or re-entry of data                 | X4     | Acc Created | REFRESH the browser page            | Stay signed in, do not try to create a duplicate account or submit data again |
This helps paint a complete picture of what states are covered in each step, what results are expected, and descriptions to follow when executing the tests. Keep in mind, X are invalid states. Some of the test cases are reused from the passwords earlier and helped me understand test suites and how they can be beneficial. For some security reasons, though, some forms would not keep passwords entered after they refresh or press back on a page but that is a whole other ball game. (I went down a rabbithole with this one)
