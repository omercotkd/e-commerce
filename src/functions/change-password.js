export const changePassword = async(newPassword) => {

    const data = new FormData();
    data.append("new_password", newPassword);

    const response = await fetch("/api/change-password" , { method: "POST", body: data });
    if(response.ok){
        return true;
    }else{
        return false;
    }

}

export const requestPasswordResetLink = async(email) => {
    const data = new FormData();
    data.append("email", email);

    const response = await fetch("/api/request-password-reset", { method: "POST", body: data });
    if(response.ok){
        return true;
    }else{
        return false;
    }
};