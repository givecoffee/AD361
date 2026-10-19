# StarterLP03 Test Cases README (see Personal Notes for more info) 

## TEST CASES
Any of the inputs that are not listed will be close to the baselines used, and for valid cases the postcondition is that the reservation is booked, saved, and that night is no longer available. Let's assume for cases with errors that the reservation is NOT saved, fees are not added or charged, and the calendar doesn't change/update or is altered. 

Below are the test case IDs so we can trace them better, their classification according to what they organized, the partition, inputs, and the expected results. This can be used as a guide for the test cases and can be helpful if requirements change or tests need to be adjusted.

| ID   | Classification | Partition                      | Input                                           | Expected Result                                                                |
| ---- | -------------- | ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| TC01 | # of Nights    | Invalid, low                   | Check-in 11/19/26, checkout 11/19/26            | ValueError                                                                     |
| TC02 | # of Nights    | Valid                          | Check in 11/19/26, checkout 11/26/26 (7 nights) | ACCEPTED, total will be $1450                                                  |
| TC03 | # of nights    | Invalid, too high              | Check in 11/19/26, checkout 11/19/27 ( a year)  | ValueError                                                                     |
| TC04 | # of guests    | Invalid, too low               | 0 guests                                        | ValueError                                                                     |
| TC05 | # of guests    | Valid, standard $ fee          | 3 guests                                        | ACCEPTED, no guest fee so total $650                                           |
| TC06 | # of guests    | VALID, add'l fee               | 8 guests                                        | ACCEPTED, guest fee $25 per so 8 guests is additional $225, total becomes $875 |
| TC07 | # of guests    | INVALID, too high              | 13 guests                                       | ValueError                                                                     |
| TC08 | Dates          | VALID order                    | checkin at 11/04, checkout 11/07 (3 nights)     | ACCEPTED, 3 nights, total is $650                                              |
| TC09 | Dates          | INVALID, same day              | Checkin 11/04, checkout 11/04                   | ValueError                                                                     |
| TC10 | Dates          | INVALID, reversed              | Checkin 11/05. checkout 11/04                   | ValueError                                                                     |
| TC11 | Availability   | Available                      | 11/1, 11/2, and 11/3 open                       | Accepted, total is $650                                                        |
| TC12 | Availability   | Unavailable                    | 11/1 is booked already                          | UnavailableError                                                               |
| TC13 | Availability   | Checkout day is already booked | 11/1-11/2 are open but 11/3 is booked           | Accepted (checkout can be booked on this day) and total is $650                |
| TC14 | Cleaning fee   | VALID reservation              | 3 guests, standard baseline                     | ACCEPTED, $50 is charged only once - total is $650                             |
| TC15 | Cleaning fee   | INVALID reservation            | 0 guests                                        | ValueError, no fee is charged                                                  |
| TC16 | Cleaning fee   | Unavailable reservation        | 11/2 is booked                                  | UnavailableError, and no fee is charged                                        |

Example Scenario for a Given/When/Then for underage input:

Given that I am on the home page,
And I am "12" years old
When I try to enter my age
Then the booking screen will reject access

Let's say another rule is a user can only book 1-10 rooms at a time. We need to partition the range that is valid, and the two sides of the range that are invalid (less than 1, or greater than 10)

Coverage = partitions tested divided by the partitions identified multiplied by 100%

In this case, there are 16 partitions and five (5) different classifications with a test case for each. Each input tests one partition, coverage is 16/16 which completes 100% coverage.

Every single combination of nights and guests can take 372 test cases, because there is a max of 31 days in a month and guest limits are up to 12. 

31x12 = 372 

https://www.geeksforgeeks.org/software-engineering/equivalence-partitioning-method/

### AI Statement 

I will use AI to clean up this document in the future but currently was formatted and written in markdown using Obsidian alongside the lecture material. 
