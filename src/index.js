const JobPicker = require('./services/JobPicker');


console.log("Starting JobPicker Test 1");
const jobsFile1 = "../input/jobs/InputQ1Eg1.txt";
JobPicker.run(jobsFile1);
console.log("JobPicker finished Test 1");



console.log("Starting JobPicker Test 2");
const jobsFile2 = "../input/jobs/InputQ1Eg2.txt";
JobPicker.run(jobsFile2);
console.log("JobPicker finished Test 2");