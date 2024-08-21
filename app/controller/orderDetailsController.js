import {
    createOrderDetailsMdl,
    getOrderDetailsByIdMdl,
    updateOrderDetailsMdl,
    deleteOrderDetailsMdl,
    getAllOrderDetailsMdl
} from '../models/orderDetailsModel.js';

// Controller to create a new order details entry
export const createOrderDetailsCtrl = (req, res) => {
    const orderDetailsData = {
        product_id: req.body.product_id,
        order_id: req.body.order_id
    };

    createOrderDetailsMdl(orderDetailsData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to create the order details entry" });
        }
        res.status(201).json({ status: 201, message: "Order details entry created successfully" });
    });
};

// Controller to get order details by ID
export const getOrderDetailsByIdCtrl = (req, res) => {
    const { id } = req.params;

    getOrderDetailsByIdMdl(id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update order details entry
export const updateOrderDetailsCtrl = (req, res) => {
    const { id } = req.params;
    const orderDetailsData = req.body;

    updateOrderDetailsMdl(id, orderDetailsData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to update the order details entry" });
        }
        res.status(200).json({ status: 200, message: "Order details entry updated successfully" });
    });
};

// Controller to delete order details entry
export const deleteOrderDetailsCtrl = (req, res) => {
    const { id } = req.params;

    deleteOrderDetailsMdl(id, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to delete the order details entry" });
        }
        res.status(200).json({ status: 200, message: "Order details entry deleted successfully" });
    });
};

// Controller to get all order details entries
export const getAllOrderDetailsCtrl = (req, res) => {
    getAllOrderDetailsMdl((err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};
