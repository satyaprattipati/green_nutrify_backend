import {
    createSeasonMdl,
    getSeasonByIdMdl,
    updateSeasonMdl,
    deleteSeasonMdl,
    getAllSeasonsMdl
} from '../models/seasonModel.js';

// Controller to create a new season entry
export const createSeasonCtrl = (req, res) => {
    const seasonData = {
        season_name: req.body.season_name,
        description: req.body.description
    };

    createSeasonMdl(seasonData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to create the season entry" });
        }
        res.status(201).json({ status: 201, message: "Season entry created successfully" });
    });
};

// Controller to get season entry by ID
export const getSeasonByIdCtrl = (req, res) => {
    const { id } = req.params;

    getSeasonByIdMdl(id, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update season entry
export const updateSeasonCtrl = (req, res) => {
    const { id } = req.params;
    const seasonData = req.body;

    updateSeasonMdl(id, seasonData, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to update the season entry" });
        }
        res.status(200).json({ status: 200, message: "Season entry updated successfully" });
    });
};

// Controller to delete season entry
export const deleteSeasonCtrl = (req, res) => {
    const { id } = req.params;

    deleteSeasonMdl(id, (err, results) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Failed to delete the season entry" });
        }
        res.status(200).json({ status: 200, message: "Season entry deleted successfully" });
    });
};

// Controller to get all season entries
export const getAllSeasonsCtrl = (req, res) => {
    getAllSeasonsMdl((err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        res.status(200).json({ status: 200, data: results });
    });
};
