import { db, execQuery } from "../db/db.js";

// Model function to create a new product entry
export const createProductMdl = function (productData, callback) {
    const {
        product_name,
        price,
        description,
        product_image,
        season_id
    } = productData;

    const query = `
        INSERT INTO \`products\` (
            \`product_name\`,
            \`price\`,
            \`description\`,
            \`product_image\`,
            \`season_id\`
        ) VALUES (
            '${product_name}',
            '${price}',
            '${description}',
            '${product_image}',
            '${season_id}'
        )
    `;

    if (callback && typeof callback === "function") {
        execQuery(db, query, function (err, results) {
            callback(err, results);
        });
    } else {
        return execQuery(db, query);
    }
};

// Model function to get a product entry by ID
export const getProductByIdMdl = function (id, callback) {
    const query = `SELECT * FROM products WHERE product_id = '${id}'`;

    if (callback && typeof callback === "function") {
        execQuery(db, query, function (err, results) {
            callback(err, results);
        });
    } else {
        return execQuery(db, query);
    }
};

// Model function to update a product entry
export const updateProductMdl = function (id, updatedProductData, callback) {
    const {
        product_name,
        price,
        description,
        product_image,
        season_id
    } = updatedProductData;

    const query = `
        UPDATE \`products\`
        SET 
            \`product_name\` = '${product_name}',
            \`price\` = '${price}',
            \`description\` = '${description}',
            \`product_image\` = '${product_image}',
            \`season_id\` = '${season_id}'
        WHERE 
            \`product_id\` = '${id}'
    `;

    if (callback && typeof callback === "function") {
        execQuery(db, query, function (err, results) {
            callback(err, results);
        });
    } else {
        return execQuery(db, query);
    }
};

// Model function to delete a product entry
export const deleteProductMdl = function (id, callback) {
    const query = `DELETE FROM \`products\` WHERE \`product_id\` = '${id}'`;

    if (callback && typeof callback === "function") {
        execQuery(db, query, function (err, results) {
            callback(err, results);
        });
    } else {
        return execQuery(db, query);
    }
};

// Model function to get all product entries
export const getAllProductsMdl = function (callback) {
    const query = `SELECT p.product_id, p.product_name, p.description, p.price, p.product_image, s.season_name FROM products p JOIN seasons s ON p.season_id = s.season_id;
`;

    if (callback && typeof callback === "function") {
        execQuery(db, query, function (err, results) {
            callback(err, results);
        });
    } else {
        return execQuery(db, query);
    }
};
