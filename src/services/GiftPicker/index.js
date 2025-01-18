const fs = require('fs');

const { parseInputFileToGiftsJson } = require("./giftParser");

/**
 * 
 * @param {Array} goodies 
 * @param {number} employees 
 * @returns 
 */
const findMinDifference = (goodies, employees) => {

    goodies.sort((a, b) => a.price - b.price); // Sort by price

    let minDiff = Infinity;
    let minDiffGoodies = [];

    for (let i = 0; i <= goodies.length - employees; i++) {
        const diff = goodies[i + employees - 1].price - goodies[i].price;
        if (diff < minDiff) {
            minDiff = diff;
            minDiffGoodies = goodies.slice(i, i + employees);
        }
    }

    return {
        minDiff,
        goodies: minDiffGoodies,
    };
}

/**
 * Run the Job Picker for the provided data in the data location.
 * 
 * @param {string} inputFileLocation 
 * @param {number} noOfEmployees
 */
const run = (inputFileLocation, noOfEmployees) => {
    const outputFile = "./output/OutputGiftPicker.txt";
    let output = '';

    const returnObj = parseInputFileToGiftsJson(inputFileLocation);
    if (returnObj.error !== '') {
        output = returnObj.error + '\n';
    } else {
        if (noOfEmployees > returnObj.gifts.length) {
            output = "Error: Number of employees cannot be greater than the number of goodies.";
        }else{
            const result = findMinDifference(returnObj.gifts, noOfEmployees);
            output = `The goodies that are selected for distribution are:\n`;
            for (const goodie of result.goodies) {
                output += `${goodie.name}: ${goodie.price}\n`;
            }
            output += `And the difference between the chosen goodie with highest price and the lowest price is ${result.minDiff}\n`;
        }
    }
    console.log(output);
    fs.writeFileSync(outputFile, output, { flag: 'a+' });
};

module.exports = { run };