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
        const createdAt = Date.now();
        const burnoutScore = req.body.burnoutScore;
        const userName = req.body.userName;
        const query = await db.query(
            `INSERT INTO burnoutrating (burnoutscore, username, created_at) VALUES ($1, $2, $3)`,
            [burnoutScore, userName, createdAt]
        );
        res.json({ status: "success", values: burnoutScore });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.get('/readForm', async (req, res) => {
    try {
        const query = await db.query(`SELECT * FROM burnoutrating ORDER BY id DESC LIMIT 20;`);
        res.json(query.rows);
    } catch (error) {
        console.log("db error: ", error);
        res.status(500).json({ Error: error.message });
    }
});

app.post("/readUser", async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        const query = await db.query(
            `INSERT INTO usertable (username, password) VALUES ($1, $2)`,
            [userName, password]
        );
        res.json({ status: "success", values:userName });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});
