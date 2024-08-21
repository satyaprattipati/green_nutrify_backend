import {
    createOrderMdl,
    getOrderByIdMdl,
    updateOrderMdl,
    deleteOrderMdl,
    getAllOrdersMdl
} from '../models/orderModel.js';

// Controller to create a new order entry
export const createOrderCtrl = (req, res) => {
    const orderData = {
        user_id: req.body.user_id,
        order_date: req.body.order_date,
        total_cost: req.body.total_cost
    };

    createOrderMdl(orderData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to create the order entry" });
        }
        res.status(201).json({ status: 201, message: "Order entry created successfully" });
    });
};

// Controller to get an order by ID
export const getOrderByIdCtrl = (req, res) => {
    const { id } = req.params;

    getOrderByIdMdl(id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update an order entry
export const updateOrderCtrl = (req, res) => {
    const { id } = req.params;
    const orderData = req.body;

    updateOrderMdl(id, orderData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to update the order entry" });
        }
        res.status(200).json({ status: 200, message: "Order entry updated successfully" });
    });
};

// Controller to delete an order entry
export const deleteOrderCtrl = (req, res) => {
    const { id } = req.params;

    deleteOrderMdl(id, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to delete the order entry" });
        }
        res.status(200).json({ status: 200, message: "Order entry deleted successfully" });
    });
};

// Controller to get all order entries
export const getAllOrdersCtrl = (req, res) => {
    getAllOrdersMdl((err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};
