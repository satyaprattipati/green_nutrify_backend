import {
    createCartMdl,
    getCartByIdMdl,
    updateCartMdl,
    deleteCartMdl,
    getAllCartsMdl
} from '../models/cartModel.js';
import { getCartWithProductDetailsMdl } from '../models/cartModel.js';

// Controller to create a new cart entry
export const createCartCtrl = (req, res) => {
    const cartData = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    };

    createCartMdl(cartData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to create the cart entry" });
        }
        res.status(201).json({ status: 201, message: "Cart entry created successfully" });
    });
};

// Controller to get a cart entry by ID
export const getCartByIdCtrl = (req, res) => {
    const { id } = req.params;

    getCartByIdMdl(id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update a cart entry
export const updateCartCtrl = (req, res) => {
    const { id } = req.params;
    const cartData = req.body;

    updateCartMdl(id, cartData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to update the cart entry" });
        }
        res.status(200).json({ status: 200, message: "Cart entry updated successfully" });
    });
};

// Controller to delete a cart entry
export const deleteCartCtrl = (req, res) => {
    const { id } = req.params;

    deleteCartMdl(id, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to delete the cart entry" });
        }
        res.status(200).json({ status: 200, message: "Cart entry deleted successfully" });
    });
};

// Controller to get all cart entries
export const getAllCartsCtrl = (req, res) => {
    getAllCartsMdl((err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};


// Controller to get cart entries with product details
export const getCartWithProductDetailsCtrl = (req, res) => {
    getCartWithProductDetailsMdl((err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};