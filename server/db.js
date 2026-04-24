const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my_db.db');
const fs = require('fs');
const path = require('path');

const initDb = () => {
    const sql = fs.readFileSync(path.join(__dirname, 'data.sql'), 'utf-8');

    db.run(sql, (err) => {
        if (err) {
            console.error('Error executing SQL file:', err.message);
        } else {
            console.log('SQL file executed successfully');
        }
    });
}

module.exports = { db, initDb };
