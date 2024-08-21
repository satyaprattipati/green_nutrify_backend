import {
    createFeedbackMdl,
    getFeedbackByIdMdl,
    updateFeedbackMdl,
    deleteFeedbackMdl,
    getAllFeedbacksMdl
} from '../models/feedbackModel.js';
import { getFeedbacksByProductIdMdl } from '../models/feedbackModel.js';

// Controller to create a new feedback entry
export const createFeedbackCtrl = (req, res) => {
    const feedbackData = {
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        rating: req.body.rating,
        comments: req.body.comments
    };

    createFeedbackMdl(feedbackData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to create the feedback entry" });
        }
        res.status(201).json({ status: 201, message: "Feedback entry created successfully" });
    });
};

// Controller to get feedback entry by ID
export const getFeedbackByIdCtrl = (req, res) => {
    const { id } = req.params;

    getFeedbackByIdMdl(id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update feedback entry
export const updateFeedbackCtrl = (req, res) => {
    const { id } = req.params;
    const feedbackData = req.body;

    updateFeedbackMdl(id, feedbackData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to update the feedback entry" });
        }
        res.status(200).json({ status: 200, message: "Feedback entry updated successfully" });
    });
};

// Controller to delete feedback entry
export const deleteFeedbackCtrl = (req, res) => {
    const { id } = req.params;

    deleteFeedbackMdl(id, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to delete the feedback entry" });
        }
        res.status(200).json({ status: 200, message: "Feedback entry deleted successfully" });
    });
};

// Controller to get all feedback entries
export const getAllFeedbacksCtrl = (req, res) => {
    getAllFeedbacksMdl((err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to get feedbacks by product ID
export const getFeedbacksByProductIdCtrl = (req, res) => {
    const { product_id } = req.params;

    getFeedbacksByProductIdMdl(product_id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error', error: err });
        }
        res.status(200).json({ status: 200, data: results });
    });
};
