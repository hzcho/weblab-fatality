import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnectDB, sequelize } from "./config/db.js";
import routes from './src/routes/index.js';
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import apiKeyMiddleware from "./src/middleware/apiKeyMiddleware.js";
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import morganLogger from './src/middleware/morganLogger.js';

dotenv.config();

const app = express();

const swaggerDocument = load(readFileSync('./deployment/swagger.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors()); 
app.use(morganLogger);
app.use(apiKeyMiddleware);
app.use('/api', routes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.status(404).json({ message: "Неправильный путь" });
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