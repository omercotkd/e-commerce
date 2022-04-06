export const checkUserState = async() => {
    const response = await fetch("/api/check-if-user-logged-in");
    if(response.status === 304){
        return true;
    }else{
        return false;
    }
};

export const getUserData = async() => {
    const response = await fetch("/api/get-user-data");
    if(!response.ok){
        return false;
    };
    const data = await response.json();
    return data;
};