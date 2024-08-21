import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { db, execQuery, beginTransaction, commitTransaction, rollbackTransaction } from './app/db/db.js';

import { LoginAppCtrl, createUserCtrl } from './app/controller/authenticationController.js';
import {
    createProductCtrl,
    getProductByIdCtrl,
    updateProductCtrl,
    deleteProductCtrl,
    getAllProductsCtrl
} from './app/controller/productController.js';

// import {
//     createCartCtrl,
//     getCartByIdCtrl,
//     updateCartCtrl,
//     deleteCartCtrl,
//     getAllCartsCtrl
// } from './app/controller/cartController.js';

import {
    createFeedbackCtrl,
    getFeedbackByIdCtrl,
    updateFeedbackCtrl,
    deleteFeedbackCtrl,
    getAllFeedbacksCtrl
} from './app/controller/feedbackController.js';
import { getFeedbacksByProductIdCtrl } from './app/controller/feedbackController.js';


import {
    createOrderCtrl,
    getOrderByIdCtrl,
    updateOrderCtrl,
    deleteOrderCtrl,
    getAllOrdersCtrl
} from './app/controller/orderController.js';

import {
    createOrderDetailsCtrl,
    getOrderDetailsByIdCtrl,
    updateOrderDetailsCtrl,
    deleteOrderDetailsCtrl,
    getAllOrderDetailsCtrl
} from './app/controller/orderDetailsController.js';

import {
    createSeasonCtrl,
    getSeasonByIdCtrl,
    updateSeasonCtrl,
    deleteSeasonCtrl,
    getAllSeasonsCtrl
} from './app/controller/seasonController.js';

import { getCartWithProductDetailsCtrl } from './app/controller/cartController.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name
    }
});

const upload = multer({ storage: storage }).single('product_image');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Authentication routes
app.post("/green_nutrify/login", LoginAppCtrl);
app.post("/green_nutrify/register", createUserCtrl);

// Product routes
app.post('/green_nutrify/products', createProductCtrl);
app.get('/green_nutrify/products/:id', getProductByIdCtrl);
app.put('/green_nutrify/products/:id', updateProductCtrl);
app.delete('/green_nutrify/products/:id', deleteProductCtrl);
app.get('/green_nutrify/products', getAllProductsCtrl);

// Cart routes
// app.post('/green_nutrify/cart', createCartCtrl);
// app.get('/green_nutrify/cart/:id', getCartByIdCtrl);
// app.put('/green_nutrify/cart/:id', updateCartCtrl);
// app.delete('/green_nutrify/cart/:id', deleteCartCtrl);
// app.get('/green_nutrify/cart', getAllCartsCtrl);

// Feedback routes
app.post('/green_nutrify/feedback', createFeedbackCtrl);
app.get('/green_nutrify/feedback/:id', getFeedbackByIdCtrl);
app.put('/green_nutrify/feedback/:id', updateFeedbackCtrl);
app.delete('/green_nutrify/feedback/:id', deleteFeedbackCtrl);
app.get('/green_nutrify/feedback', getAllFeedbacksCtrl);
app.get('/green_nutrify/feedbacks/product/:product_id', getFeedbacksByProductIdCtrl);


// Order routes
app.post('/green_nutrify/orders', createOrderCtrl);
app.get('/green_nutrify/orders/:id', getOrderByIdCtrl);
app.put('/green_nutrify/orders/:id', updateOrderCtrl);
app.delete('/green_nutrify/orders/:id', deleteOrderCtrl);
app.get('/green_nutrify/orders', getAllOrdersCtrl);

// Order Details routes
app.post('/green_nutrify/order-details', createOrderDetailsCtrl);
app.get('/green_nutrify/order-details/:id', getOrderDetailsByIdCtrl);
app.put('/green_nutrify/order-details/:id', updateOrderDetailsCtrl);
app.delete('/green_nutrify/order-details/:id', deleteOrderDetailsCtrl);
app.get('/green_nutrify/order-details', getAllOrderDetailsCtrl);

// Season routes
app.post('/green_nutrify/seasons', createSeasonCtrl);
app.get('/green_nutrify/seasons/:id', getSeasonByIdCtrl);
app.put('/green_nutrify/seasons/:id', updateSeasonCtrl);
app.delete('/green_nutrify/seasons/:id', deleteSeasonCtrl);
app.get('/green_nutrify/seasons', getAllSeasonsCtrl);

// app.get('/green_nutrify/cart', getCartWithProductDetailsCtrl);


app.get('/green_nutrify/cart', (req, res) => {
    const userId = req.query.userId;

    
    if (!userId) {
        return res.status(400).json({ status: 400, message: 'Missing user_id' });
    }

    
    const sql = `
        SELECT cart.cart_id, cart.product_id, cart.quantity, 
               products.product_name, products.price, products.product_image
        FROM cart
        JOIN products ON cart.product_id = products.product_id
        WHERE cart.user_id = ?`;

  
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving cart details:', err);
            return res.status(500).json({ status: 500, message: 'Failed to retrieve cart details' });
        }
        res.status(200).json({ status: 200, data: results });
    });
});

app.post('/green_nutrify/cart', (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    
    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ status: 400, message: 'Missing required fields' });
    }

   
    const checkSql = `
        SELECT * FROM cart
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(checkSql, [user_id, product_id], (err, results) => {
        if (err) {
            console.error('Error checking cart for existing item:', err);
            return res.status(500).json({ status: 500, message: 'Failed to check cart' });
        }

        if (results.length > 0) {
            
            return res.status(409).json({ status: 409, message: 'Item already in cart' });
        }

        
        const insertSql = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
        `;

        db.query(insertSql, [user_id, product_id, quantity], (err, result) => {
            if (err) {
                console.error('Error inserting into cart:', err);
                return res.status(500).json({ status: 500, message: 'Failed to add item to cart' });
            }
            res.status(200).json({ status: 200, message: 'Item added to cart successfully', data: result });
        });
    });
});

app.delete('/green_nutrify/cart', (req, res) => {
    const { user_id, product_id } = req.body;

    
    if (!user_id || !product_id) {
        return res.status(400).json({ status: 400, message: 'Missing required fields' });
    }

    
    const sql = `
        DELETE FROM cart
        WHERE user_id = ? AND product_id = ?
    `;


    db.query(sql, [user_id, product_id], (err, result) => {
        if (err) {
            console.error('Error removing item from cart:', err);
            return res.status(500).json({ status: 500, message: 'Failed to remove item from cart' });
        }

        if (result.affectedRows === 0) {
            
            return res.status(404).json({ status: 404, message: 'Item not found in cart' });
        }

        res.status(200).json({ status: 200, message: 'Item removed from cart successfully' });
    });
});

// API endpoint to update the quantity of an item in the cart
app.put('/green_nutrify/cart', (req, res) => {
    const { user_id, product_id, quantity } = req.body;


    if (!user_id || !product_id || typeof quantity !== 'number') {
        return res.status(400).json({ status: 400, message: 'Missing required fields or invalid quantity' });
    }


    const sql = `
        UPDATE cart
        SET quantity = ?
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(sql, [quantity, user_id, product_id], (err, result) => {
        if (err) {
            console.error('Error updating cart quantity:', err);
            return res.status(500).json({ status: 500, message: 'Failed to update cart quantity' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: 'Cart item not found' });
        }
        res.status(200).json({ status: 200, message: 'Cart item quantity updated successfully' });
    });
});

app.put('/green_nutrify/cart/batch', (req, res) => {
    const updates = req.body.updates;

    if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ status: 400, message: 'Invalid updates data' });
    }

    beginTransaction((err, connection) => {
        if (err) {
            return res.status(err.status || 500).json(err);
        }

        const updatePromises = updates.map(update => {
            const { user_id, product_id, quantity } = update;
            const sql = `
                UPDATE cart
                SET quantity = ?
                WHERE user_id = ? AND product_id = ?
            `;
            return new Promise((resolve, reject) => {
                connection.query(sql, [quantity, user_id, product_id], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        });

        Promise.all(updatePromises)
            .then(() => {
                commitTransaction(connection, (err, result) => {
                    if (err) {
                        return res.status(err.status || 500).json(err);
                    }
                    res.status(200).json(result);
                });
            })
            .catch(err => {
                rollbackTransaction(connection, (rollbackErr, result) => {
                    if (rollbackErr) {
                        return res.status(rollbackErr.status || 500).json(rollbackErr);
                    }
                    res.status(500).json({ status: 500, message: 'Failed to update cart' });
                });
            });
    });
});


app.post('/green_nutrify/purchases', (req, res) => {
    const { purchase_date, user_id, total_amount } = req.body;


    if (!purchase_date || !user_id || !total_amount) {
        return res.status(400).json({ status: 400, message: 'Missing required fields' });
    }


    const insertPurchaseSql = `
        INSERT INTO purchase (purchase_date, user_id, total_amount)
        VALUES (?, ?, ?)
    `;

    db.query(insertPurchaseSql, [purchase_date, user_id, total_amount], (err, result) => {
        if (err) {
            console.error('Error inserting purchase:', err);
            return res.status(500).json({ status: 500, message: 'Failed to add purchase' });
        }

        const deleteCartSql = `
            DELETE FROM cart
            WHERE user_id = ?
        `;

        db.query(deleteCartSql, [user_id], (err, result) => {
            if (err) {
                console.error('Error deleting cart items:', err);
                return res.status(500).json({ status: 500, message: 'Purchase added, but failed to clear cart' });
            }

            res.status(200).json({ status: 200, message: 'Purchase added and cart cleared successfully' });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
