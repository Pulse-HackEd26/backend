import { db } from './dbConnection.js';
import cors from "cors";
import express from "express";

const app = express();

//config cors
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`This app is running on port ${PORT}`));

app.post("/sendForm", async (req, res) => {
    try {
        const burnoutScore = req.body.burnoutScore;
        const query = await db.query(
            `INSERT INTO burnoutRating (burnoutScore) VALUES ($1)`,
            [burnoutScore]
        );
        res.json({ status: "success", values: burnoutScore });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.get('/readForm', async (req, res) => {
    try {
        const query = await db.query(`SELECT * FROM burnoutRating ORDER BY id DESC LIMIT 20;`);
        res.json(query.rows);
    } catch (error) {
        console.log("db error: ", error);
        res.status(500).json({ Error: error.message });
    }
});

