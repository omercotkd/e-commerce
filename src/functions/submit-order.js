export const submitOrder = async(comments) => {
    const data = new FormData();
    data.append("comments", comments)
    const response = await fetch("/api/submit-order", { method: "POST", body: data }); 
    if(response.status == 200){
        return true;
    }else{
        return false;
    }

};