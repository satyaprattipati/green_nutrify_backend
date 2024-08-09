import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { LoginAppCtrl, createUserCtrl } from './app/controller/authenticationController.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Define routes
app.post("/green_nutrify/login", LoginAppCtrl);
app.post("/green_nutrify/register", createUserCtrl);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
