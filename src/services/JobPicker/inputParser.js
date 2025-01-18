const { error } = require('console');
const fs = require('fs');
const { parseTimeToMinutes } = require('../../lib/timeUtils');

const parseInputFileToJson = (inputFile) => {
    let returnJsonObj = {
        jobs: [],
        error: ''
    };
    try {
        const fileContents = fs.readFileSync(inputFile, 'utf8');
        const lines = fileContents.trim().split('\n');
        let dataCount = 0;

        const n = parseInt(lines[0], 10);
        if (isNaN(n)) {
            returnJsonObj.error = 'First line of the file cannot be empty. It should be the n for first data set.';
        }
        if (!numberOfJobConstraintCheckOk(n)) {
            returnJsonObj.error = 'Data in position ' + dataCount + ' has issues. Invalid value for number of job '+n+'.';
        }
        if (returnJsonObj.error == '') {
            for (let i = 0; i < n; i++) {
                dataCount++;
                const startTime = parseTimeToMinutes(lines[1 + i * 3]);
                const endTime = parseTimeToMinutes(lines[2 + i * 3]);
                const profit = parseInt(lines[3 + i * 3], 10);

                if (startTime === -1 || endTime === -1 || isNaN(profit) || startTime >= endTime) {
                    returnJsonObj.error = 'Data in position ' + dataCount + ' has issues. Invalid time or profit value provided.';
                    break;
                }
                returnJsonObj.jobs.push({ startTime, endTime, profit });
            }
        }
    } catch (error) {
        returnJsonObj.error = 'Invalid file: ' + inputFile;
    }
    return returnJsonObj;
};

const numberOfJobConstraintCheckOk = (n) => {
    return (n > 0 || n <= 100);
};

module.exports = { parseInputFileToJson };