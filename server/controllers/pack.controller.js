import { client } from "../connection.js";

export const getPacks = async (req, res, next) => {
    try {
        const result = await client.query('SELECT * FROM packs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}