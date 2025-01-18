
/**
 * 
 * Given the time string of format HHMM, checks if the provided string is valid, converts and returns
 * minutes integer value.
 * 
 * @param {String} timeStr 
 * @returns Minutes | -1 for error
 */
const parseTimeToMinutes = (timeStr) => {
    
    const hours = parseInt(timeStr.slice(0, 2), 10);
    const minutes = parseInt(timeStr.slice(2), 10);
    
    //Check if valid hours and minutes value provided
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return -1;

    return hours * 60 + minutes;
};

module.exports = {parseTimeToMinutes};
