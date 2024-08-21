import { db, execQuery } from "../db/db.js";

// Create a new cart entry
export const createCartMdl = function (cartData, callback) {
    const { user_id, product_id, quantity } = cartData;
    const query = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
    `;
    return execQuery(db, query, [user_id, product_id, quantity], callback);
};

// Get a cart entry by ID
export const getCartByIdMdl = function (id, callback) {
    const query = `SELECT * FROM cart WHERE cart_id = '${id}'`;
    return execQuery(db, query, callback);
};

// Update a cart entry
export const updateCartMdl = function (id, cartData, callback) {
    const { product_id, quantity } = cartData;
    const query = `
        UPDATE \`cart\`
        SET \`product_id\` = '${product_id}', \`quantity\` = '${quantity}'
        WHERE \`cart_id\` = '${id}'
    `;
    return execQuery(db, query, callback);
};

// Delete a cart entry
export const deleteCartMdl = function (id, callback) {
    const query = `DELETE FROM \`cart\` WHERE \`cart_id\` = '${id}'`;
    return execQuery(db, query, callback);
};

// Get all cart entries
export const getAllCartsMdl = function (callback) {
    const query = `SELECT * FROM cart`;
    return execQuery(db, query, callback);
};

export const getCartWithProductDetailsMdl = function (userId, callback) {
    const query = `
        SELECT cart.cart_id, cart.product_id, cart.quantity, 
               products.product_name, products.price, products.product_image
        FROM cart
        JOIN products ON cart.product_id = products.product_id
        WHERE cart.user_id = ?
    `;
    
    console.log("Executing query:", query);
    console.log("With parameters:", [userId]);

    execQuery(db, query, [userId], (err, results) => {
        if (err) {
            console.error("Error in getCartWithProductDetailsMdl:", err);
        } else {
            console.log("Query results:", results);
        }
        callback(err, results);
    });
};