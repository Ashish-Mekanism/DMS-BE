require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.API_DB_HOST,
  user: process.env.API_DB_USER,
  password: process.env.API_DB_PASSWORD,
  database: process.env.API_DB_DATABASE,
  port: process.env.API_DB_PORT,
  waitForConnections: true,
  //connectionLimit: process.env.DB_POOL_MAX, 
  queueLimit: 0,
  dateStrings: true,
});

// Check if the pool has successfully connected
pool.getConnection((err, connection) => {
  if (err) {
    console.error(" not Error connecting to MySQL:", err);
    return;
  }
  console.log("API MySQL connected successfully!");
  connection.release(); // Release the connection
});

// Export the pool with promises enabled
module.exports = pool.promise();
