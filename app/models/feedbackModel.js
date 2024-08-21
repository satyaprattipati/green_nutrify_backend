import { db, execQuery } from "../db/db.js";

// Create a new feedback entry
export const createFeedbackMdl = function (feedbackData, callback) {
    const { user_id, product_id, rating, comments } = feedbackData;

    const query = `
        INSERT INTO \`feedback\` (\`user_id\`, \`product_id\`, \`rating\`, \`comments\`)
        VALUES ('${user_id}', '${product_id}', '${rating}', '${comments}')
    `;

    return execQuery(db, query, callback);
};

// Get feedback by ID
export const getFeedbackByIdMdl = function (id, callback) {
    const query = `SELECT * FROM feedback WHERE feedback_id = '${id}'`;
    return execQuery(db, query, callback);
};

// Update feedback entry
export const updateFeedbackMdl = function (id, feedbackData, callback) {
    const { user_id, product_id, rating, comments } = feedbackData;

    const query = `
        UPDATE \`feedback\`
        SET \`user_id\` = '${user_id}', \`product_id\` = '${product_id}', \`rating\` = '${rating}', \`comments\` = '${comments}'
        WHERE \`feedback_id\` = '${id}'
    `;

    return execQuery(db, query, callback);
};

// Delete feedback entry
export const deleteFeedbackMdl = function (id, callback) {
    const query = `DELETE FROM \`feedback\` WHERE \`feedback_id\` = '${id}'`;
    return execQuery(db, query, callback);
};

// Get all feedback entries
export const getAllFeedbacksMdl = function (callback) {
    const query = `SELECT * FROM feedback`;
    return execQuery(db, query, callback);
};
