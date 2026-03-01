Estimated Reading Time
This snippet automatically calculates the estimated reading time of an article based on the word count of the content.

How to use this code
Output Structure:

reading_time: Returns an integer representing the estimated minutes.

Logic and Adjustments
Changing the speed: To modify the assumed reading speed, locate the reading_time line:

expression: "ceil(word_count / 150)" (Slower reading).

expression: "ceil(word_count / 250)" (Faster reading).
