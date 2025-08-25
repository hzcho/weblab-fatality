import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnectDB, sequelize } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const startServer = async () => {
    try {
        await testConnectDB()
        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
};

startServer();