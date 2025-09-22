import { client } from "../connection.js";

export const getCards = async (req, res, next) => {
    try {
        const result = await client.query('SELECT * FROM cards');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const unlockCards = async (req, res, next) => {
  try {
    const userId = req.user?.userId; // comes from JWT middleware
    const { cardId } = req.body;

    if (!userId || !cardId) {
      return res.status(400).json({ message: "Missing userId or cardId" });
    }

    console.log("Unlocking card", { userId, cardId });

    const result = await client.query(
      `
      UPDATE user_collection_cards ucc
      SET unlocked = TRUE
      FROM user_collection uc
      WHERE ucc.user_collection_id = uc.id
        AND uc.user_id = $1
        AND ucc.cards_id = $2
      RETURNING ucc.cards_id, ucc.unlocked;
      `,
      [userId, cardId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Card not found for this user" });
    }

    res.status(200).json({
      message: "Card unlocked successfully",
      card: result.rows[0],
    });
  } catch (err) {
    console.error("UnlockCards error:", err);
    res
      .status(500)
      .json({ message: "Failed to unlock card", error: err.message });
  }
};


