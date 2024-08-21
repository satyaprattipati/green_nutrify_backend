import { db, execQuery } from "../db/db.js";

// Create a new season entry
export const createSeasonMdl = function (seasonData, callback) {
    const { season_name } = seasonData;

    const query = `
        INSERT INTO \`seasons\` (\`season_name\`)
        VALUES ('${season_name}')
    `;

    return execQuery(db, query, callback);
};

// Get a season by ID
export const getSeasonByIdMdl = function (id, callback) {
    const query = `SELECT * FROM seasons WHERE season_id = '${id}'`;
    return execQuery(db, query, callback);
};

// Update a season entry
export const updateSeasonMdl = function (id, seasonData, callback) {
    const { season_name } = seasonData;

    const query = `
        UPDATE \`seasons\`
        SET \`season_name\` = '${season_name}'
        WHERE \`season_id\` = '${id}'
    `;

    return execQuery(db, query, callback);
};

// Delete a season entry
export const deleteSeasonMdl = function (id, callback) {
    const query = `DELETE FROM \`seasons\` WHERE \`season_id\` = '${id}'`;
    return execQuery(db, query, callback);
};

// Get all season entries
export const getAllSeasonsMdl = function (callback) {
    const query = `SELECT * FROM seasons`;
    return execQuery(db, query, callback);
};
