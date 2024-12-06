import pool from "./db.config.js";

const dbConn = () => {

  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("==> Database connection error:", err.stack);
    } else {
      console.log("==> Database connected successfully at:", res.rows[0].now);
    }
  });

}

export default dbConn;