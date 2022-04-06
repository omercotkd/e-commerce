/**
 * 
 * @param {String} string 
 * @returns checks if a string can be convarted to a float or integer
 */
const checkNumbers = (string) => {
    const floatNumber = /^\d+\.\d+$/;
    const intNumber = /^\d+$/;
    if (intNumber.test(string)|| floatNumber.test(string) || string.length === 0){
        return true;
    }else {
        return false;
    }
};

export default checkNumbers;