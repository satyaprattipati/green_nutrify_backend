import { db, execQuery } from "../db/db.js";

// Create a new order details entry
export const createOrderDetailsMdl = function (orderDetailsData, callback) {
    const { product_id, order_id } = orderDetailsData;

    const query = `
        INSERT INTO \`order_details\` (\`product_id\`, \`order_id\`)
        VALUES ('${product_id}', '${order_id}')
    `;

    return execQuery(db, query, callback);
};

// Get order details by ID
export const getOrderDetailsByIdMdl = function (id, callback) {
    const query = `SELECT * FROM order_details WHERE order_details_id = '${id}'`;
    return execQuery(db, query, callback);
};

// Update order details entry
export const updateOrderDetailsMdl = function (id, orderDetailsData, callback) {
    const { product_id, order_id } = orderDetailsData;

    const query = `
        UPDATE \`order_details\`
        SET \`product_id\` = '${product_id}', \`order_id\` = '${order_id}'
        WHERE \`order_details_id\` = '${id}'
    `;

    return execQuery(db, query, callback);
};

// Delete order details entry
export const deleteOrderDetailsMdl = function (id, callback) {
    const query = `DELETE FROM \`order_details\` WHERE \`order_details_id\` = '${id}'`;
    return execQuery(db, query, callback);
};

// Get all order details entries
export const getAllOrderDetailsMdl = function (callback) {
    const query = `SELECT * FROM order_details`;
    return execQuery(db, query, callback);
};
