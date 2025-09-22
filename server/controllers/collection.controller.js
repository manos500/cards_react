import { client } from "../connection.js";

export const getUserCollection = async (req, res, next) => {
  try {
    const userId = req.user.userId; // comes from JWT
    console.log("req.user in getUserCollection:", req.user);

    const result = await client.query(
      `SELECT c.*, ucc.unlocked
      FROM user_collection_cards ucc
      JOIN user_collection uc ON ucc.user_collection_id = uc.id
      JOIN cards c ON ucc.cards_id = c.id
      WHERE uc.user_id = $1;`,
    [userId]
);


    res.json(result.rows);
  } catch (err) {
    console.error("getUserCollection error:", err);
    res.status(500).json({ error: "Failed to fetch user collection" });
  }
};

