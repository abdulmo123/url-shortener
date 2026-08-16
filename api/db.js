const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

let client;

function getDbClient() {
    const dbPath = path.join(__dirname, 'test.db');

    client = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to SQLite database.');
        }
    });

    return client;
}


async function createUrlTable() {
    const db = getDbClient();

    const sql = path.join(__dirname, 'data.sql');
    const query = fs.readFileSync(sql, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
    });

    db.exec(query, (err) => {
        if (err) {
            console.log('Failed to create URL table!');
        } else {
            console.log('URL table created successfully!')
        }
    });
}


async function saveUrl(urlObj) {
    const db = getDbClient();

    
    console.log('im about to save this dude ...', urlObj);
}

module.exports = { getDbClient, createUrlTable, saveUrl };