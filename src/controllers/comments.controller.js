const db = require("../config/db.config");

const CommentsController = {
  createComment: async (req, res) => {
    try {
      const { user_id, post_id, content } = req.body;
      const query =
        "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *";
      const values = [user_id, post_id, content];
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCommentsForPost: async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const query = "SELECT * FROM comments WHERE post_id = $1";
      const result = await db.query(query, [post_id]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment_id = req.params.comment_id;
      const { content } = req.body;
      const query =
        "UPDATE comments SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE comment_id = $2 RETURNING *";
      const values = [content, comment_id];
      const result = await db.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment_id = req.params.comment_id;
      const query = "DELETE FROM comments WHERE comment_id = $1 RETURNING *";
      const result = await db.query(query, [comment_id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(204).json({ msg: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CommentsController;
