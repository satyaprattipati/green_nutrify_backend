import mysql from "mysql";

// Create a connection pool with a limit of 100 connections
export const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'green_nutrify'
});

// Function to execute a query, either using a callback or a Promise
export const execQuery = function (pool, query, params = [], callback) {
    if (callback && typeof callback === "function") {
        // Using callback pattern
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error obtaining database connection:", err);
                callback(err, null);
                return;
            }

            connection.query(query, params, (err, results) => {
                connection.release(); // Release the connection back to the pool
                if (err) {
                    console.error("Error executing query:", err);
                    callback(err, null);
                    return;
                }
                callback(null, results);
            });
        });
    } else {
        // Using Promise pattern
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error("Error obtaining database connection:", err);
                    reject({ status: 500, message: "Internal server error - connection issue" });
                    return;
                }

                connection.query(query, params, (err, results) => {
                    connection.release(); // Release the connection back to the pool
                    if (err) {
                        console.error("Error executing query:", err);
                        reject({ status: 500, message: "Internal server error - query issue" });
                        return;
                    }
                    resolve(results);
                });
            });
        });
    }
};
