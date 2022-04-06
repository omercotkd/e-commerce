import jwtDecode from "jwt-decode";
import sign from "jwt-encode";

const getCartItemsFromApi = async () => {
    const response = await fetch("/api/get-cart-items")
    const responseJSON = await response.json();

    return responseJSON.cart;
};

const setCartItemsWithApi = (cart) => {
    const data = new FormData();
    data.append("cart", cart);
    return fetch("/api/set-cart-items", { method: "POST", body: data })

};

/**
 * 
 * @param {List} prevCart
 * @param {Number} id
 * @param {String} name
 * @param {Number} amount
 * @param {Number} price
 * @returns a new cart with the new item, and if the item exsits will update the amount
 */
export const addCartItem = async (prevCart, id, name, amount, price) => {

    const tokenCode = "cartItems";

    let newItem = true;

    let data = [];

    // checks if the item already exsits and if so will only update the amount
    data = prevCart.map(item => {
        if (item.name == name) {
            newItem = false;
            return { ...item, amount: item.amount + amount };
        } else {
            return item;
        };
    });

    // if the item is a new item will add it to the cart
    if (newItem) {
        data = [...prevCart, { id: id, name: name, amount: amount, price: price }];
    };

    return sign(data, tokenCode);


};

/**
 * 
 * @param {Boolean} user 
 * @returns If a user is loged will get the cart from the api else from local storge
 */
export const getCartItems = async (user) => {

    let cartItems = "";

    if (user) {
        cartItems = await getCartItemsFromApi()
    } else {
        cartItems = localStorage.getItem("cart");
    }
    if (cartItems) {

        return jwtDecode(cartItems);

    } else {

        return false;
    };

};

/**
 * 
 * @param {List} cartItems 
 * @returns calculte the total price of a cart
 */
export const getTotalPrice = (cartItems) => {

    if (cartItems) {
        let total = 0
        for (const i in cartItems) {
            total += cartItems[i].amount * cartItems[i].price;
        };

        return total;
    } else {
        return false;
    };
};

/**
 * 
 * @param {Boolean} user
 * @param {JWT} cartItems 
 * @returns set the a new cart 
 */
export const setCartItems = (user, cartItems) => {
    if (user) {
        setCartItemsWithApi(cartItems);
    } else {
        localStorage.setItem("cart", cartItems)
    }
};


/**
 * 
 * @param {List} cart1
 * @param {List} cart2
 * @returns A list that combiand the two carts into one(if there are duplicate items will add the amount)
 */
export const mergeCarts = async(cart1, cart2) => {
    // make a new list that has both the carts
    let data = [...cart1, ...cart2];

    const mergedCart = Array.from(new Set(data.map(s => s.name)))
        .map(nam => {
            return {
                ...data.filter(f => f.name === nam)[0],
                amount: data.filter(s => s.name === nam).map(quen => quen.amount).reduce((partialSum, a) => partialSum + a, 0)
            }
        });

    return mergedCart;
};


// const cartOne = [{ name: "test1", amount: 5, price: 50}, { name: "test2", amount: 3, price: 50 }, { name: "test4", amount: 1, price: 50 }, { name: "test6", amount: 2 , price: 50}];
// const cartTwo = [{ name: "test3", amount: 2, price: 50 }, { name: "test1", amount: 7, price: 50}, { name: "test5", amount: 80, price: 50 }, { name: "test6", amount: 6 , price: 50}];




