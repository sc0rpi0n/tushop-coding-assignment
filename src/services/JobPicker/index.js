const { parseInputFileToJson } = require("./inputParser");
const fs = require('fs');

/**
 * For the provided list of jobs object, retuns the selected jobs fox maximum profit.
 * 
 * @param {Array} jobs 
 * @returns 
 */
const jobScheduler = (jobs) => {
    //sort the jobs based on end time
    jobs.sort((a, b) => a.endTime - b.endTime);

    const dp = new Array(jobs.length).fill(0);
    const jobCount = new Array(jobs.length).fill(0);

    dp[0] = jobs[0].profit;
    jobCount[0] = 1;

    for (let i = 1; i < jobs.length; i++) {
        let includeProfit = jobs[i].profit;
        let includeCount = 1;
        let lastNonConflicting = -1;

        for (let j = i - 1; j >= 0; j--) {
            if (jobs[j].endTime <= jobs[i].startTime) {
                lastNonConflicting = j;
                break;
            }
        }

        if (lastNonConflicting != -1) {
            includeProfit += dp[lastNonConflicting];
            includeCount += jobCount[lastNonConflicting];
        }

        dp[i] = Math.max(dp[i - 1], includeProfit);
        jobCount[i] = dp[i] === dp[i - 1] ? jobCount[i - 1] : includeCount;
    }

    const totalProfit = dp[dp.length - 1];
    const totalJobs = jobCount[jobCount.length - 1];
    const remainingJobs = jobs.length - totalJobs;
    const remainingProfit = jobs.reduce((acc, job) => acc + job.profit, 0) - totalProfit;

    return [remainingJobs, remainingProfit];
};

/**
 * Run the Job Picker for the provided data in the data location.
 * 
 * @param {string} inputFileLocation 
 */
const run = (inputFileLocation) => {
    const outputFile = "../output/OutputJobPicker.txt";

    const returnJsonObj = parseInputFileToJson(inputFileLocation);
    let output = '';
    if (returnJsonObj.error !== '') {
        console.log(returnJsonObj.error);
        output = returnJsonObj.error + '\n';
    } else {
        const [remainingJobs, remainingProfit] = jobScheduler(returnJsonObj.jobs);
        output = `Remaining Tasks: ${remainingJobs}, Remaining Earnings: ${remainingProfit}\n`;
        console.log(output);
    }
    fs.writeFileSync(outputFile, output,{flag:'a+'});
};

module.exports = {run};