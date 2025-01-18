const JobPicker = require('./services/JobPicker');
const GiftPicker = require('./services/GiftPicker');

// Job Picker Tests
console.log("Starting Job Picker Test 1");
const jobsFile1 = "./input/jobs/InputQ1Eg1.txt";
JobPicker.run(jobsFile1);
console.log("JobPicker finished Test 1\n");

console.log("Starting Job Picker Test 2");
const jobsFile2 = "./input/jobs/InputQ1Eg2.txt";
JobPicker.run(jobsFile2);
console.log("JobPicker finished Test 2\n");


console.log("Starting Job Picker Test 3");
const jobsFile3 = "./input/jobs/InputQ1Eg3.txt";
JobPicker.run(jobsFile3);
console.log("JobPicker finished Test 3\n\n\n");

// Gift Picker Tests
const giftFile1 = "./input/gifts/giftsQ2Eg1.txt";

console.log("Starting Gift Picker Test 1");
GiftPicker.run(giftFile1, 4);
console.log("JobPicker finished Test 1\n");

console.log("Starting Gift Picker Test 2");
GiftPicker.run(giftFile1, 6);
console.log("JobPicker finished Test 2\n");

console.log("Starting Gift Picker Test 3");
GiftPicker.run(giftFile1, 2);
console.log("JobPicker finished Test 3\n");