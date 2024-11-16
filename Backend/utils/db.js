
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "7090",
    database: process.env.DB_NAME || "farmer"
});

// Connect to the database
con.connect(function(err) {
    if (err) {
        console.error("Connection error: ", err);  // Log the exact error
    } else {
        console.log("Connected to the database.");
    }
});

export default con;

