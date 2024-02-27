const db = require("../config/db.config");

const LikesController = {
  likePost: async (req, res) => {
    try {
      const { user_id, post_id } = req.body;
      const query =
        "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *";
      const values = [user_id, post_id];
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  unlikePost: async (req, res) => {
    try {
      const like_id = req.params.like_id;
      const query = "DELETE FROM likes WHERE like_id = $1 RETURNING *";
      const result = await db.query(query, [like_id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Like not found" });
      }
      res.status(204).json({ msg: "Like Deleted" });
    } catch (error) {
      console.error("Error unliking post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = LikesController;
