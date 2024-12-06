import pool from "../config/db.config.js"

const checkUser = async (email, username) => {
  const userFound = await pool.query(
    "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1 OR username = $2)",
    [email, username]
  );
  
  return userFound.rows[0].exists;
}

export default checkUser;