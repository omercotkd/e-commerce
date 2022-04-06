export const getUserOrders = async() => {
    const response = await fetch("/api/get-user-orders");
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return false;
    }
    
};
