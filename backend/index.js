import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
};

startServer();