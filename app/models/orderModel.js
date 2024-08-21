import { db, execQuery } from "../db/db.js";

// Create a new order entry
export const createOrderMdl = function (orderData, callback) {
    const { user_id, order_date, total_cost } = orderData;

    const query = `
        INSERT INTO \`orders\` (\`user_id\`, \`order_date\`, \`total_cost\`)
        VALUES ('${user_id}', '${order_date}', '${total_cost}')
    `;

    return execQuery(db, query, callback);
};

// Get an order by ID
export const getOrderByIdMdl = function (id, callback) {
    const query = `SELECT * FROM orders WHERE order_id = '${id}'`;
    return execQuery(db, query, callback);
};

// Update an order entry
export const updateOrderMdl = function (id, orderData, callback) {
    const { user_id, order_date, total_cost } = orderData;

    const query = `
        UPDATE \`orders\`
        SET \`user_id\` = '${user_id}', \`order_date\` = '${order_date}', \`total_cost\` = '${total_cost}'
        WHERE \`order_id\` = '${id}'
    `;

    return execQuery(db, query, callback);
};

// Delete an order entry
export const deleteOrderMdl = function (id, callback) {
    const query = `DELETE FROM \`orders\` WHERE \`order_id\` = '${id}'`;
    return execQuery(db, query, callback);
};

// Get all order entries
export const getAllOrdersMdl = function (callback) {
    const query = `SELECT * FROM orders`;
    return execQuery(db, query, callback);
};
