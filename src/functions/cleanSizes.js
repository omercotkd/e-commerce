/**
 * 
 * @param {string} string 
 * @returns a valid "size" string if possible, if not will return false
 */
const cleanSizes = (string) => {
    if (! string){
        return "true";
    };
    const sizesList = string.split(",").map( item => item.trim()).filter(item => (item != ""));

    if( sizesList.length <= 1 ){
        return false;
    }else{
        return sizesList.join(",");
    }
  
};

export default cleanSizes;