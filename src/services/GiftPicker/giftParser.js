const fs = require('fs');

const parseInputFileToGiftsJson = (inputFile) => {
    let returnJsonObj = {
        gifts: [],
        error: ''
    };
    try {
        const data = fs.readFileSync(inputFile, 'utf8');
        const lines = data.split('\n');
        for (const line of lines) {
            const parts = line.trim().split(':');
            if (parts.length === 2) {
                const name = parts[0].trim();
                const price = parseInt(parts[1].trim());
                if (!isNaN(price)) {
                    returnJsonObj.gifts.push({ name, price });
                } else {
                    returnJsonObj.error = 'Invalid price: ' + parts[1].trim();
                }
            } else {
                returnJsonObj.error = 'Invalid data : ' + line;
            }
        }
    } catch (error) {
        returnJsonObj.error = 'Invalid file: ' + inputFile;
    }
    return returnJsonObj;
}

module.exports = { parseInputFileToGiftsJson };
