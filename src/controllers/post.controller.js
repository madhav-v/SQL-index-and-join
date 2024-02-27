const db = require("../config/db.config");

const PostsController = {
  createPost: async (req, res) => {
    try {
      const { user_id, content } = req.body;
      const query =
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *";
      const values = [user_id, content];
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const query = "SELECT * FROM posts";
      const result = await db.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const query = "SELECT * FROM posts WHERE post_id = $1";
      const result = await db.query(query, [post_id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const { content } = req.body;
      const query =
        "UPDATE posts SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE post_id = $2 RETURNING *";
      const values = [content, post_id];
      const result = await db.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const query = "DELETE FROM posts WHERE post_id = $1 RETURNING *";
      const result = await db.query(query, [post_id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(204).json({ msg: "post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PostsController;
