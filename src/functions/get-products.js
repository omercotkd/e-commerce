const getProducts = async() => {
    return fetch("/api/get-products")
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err)
        return "error";
    });
        
};

export default getProducts;