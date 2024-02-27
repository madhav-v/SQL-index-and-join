const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const createTablesQueries = [
  `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    post_id INTEGER REFERENCES posts(post_id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS likes (
    like_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    post_id INTEGER REFERENCES posts(post_id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_username ON users(username)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_user_id ON posts(user_id)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_post_id ON comments(post_id)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_user_id_post_id ON likes(user_id, post_id)
  `,
];

const createTables = async () => {
  const client = await pool.connect();
  try {
    for (const query of createTablesQueries) {
      await client.query(query);
      console.log("Table created successfully");
    }
  } catch (error) {
    console.error("Error creating table:", error.stack);
  } finally {
    client.release();
  }
};

createTables();

module.exports = pool;
