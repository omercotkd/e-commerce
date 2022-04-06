import checkNumbers from "./checkNumbers";

export const validEmail = (email) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }else{
        return false
    };
};

export const validPassword = (password) => {
    const numbers = /[0-9]/g;
    const letters = /[a-zA-Z]/g;

    if(password.length < 8 || password.length > 32){
        return false;
    }else if(! password.match(numbers)){
        return false;
    }else if(! password.match(letters)){
        return false;
    };
    
    return true;
};

/**
 * 
 * @param {phone} string 
 * @returns check if the provided string is a valid phone number in israel
 */
export const validPhoneNumber = async(phone) => {
    const clearPhone = phone.replaceAll("-", "");
    if(!(7 < clearPhone.length < 11)){
        return false;
    }else if(clearPhone.charAt(0) != "0"){
        return false;
    }else if(!checkNumbers(clearPhone)){
        return false;
    }else{
        return true;
    };
};