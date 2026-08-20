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

    db.close();
}

async function saveUrlObjDb(urlObj) {
    const db = getDbClient();

    const sql = `
        insert into url (key, full_url, short_url, created_at) 
        values (?, ?, ?, CURRENT_TIMESTAMP)
        returning *
    `;

    const params = [urlObj.key, urlObj.fullUrl, urlObj.shortUrl];
    let data;

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });

        db.close();
    }).catch((err) => {
        if (err.message.includes('SQLITE_CONSTRAINT')) {
            console.error('This url has already been used. Please try another unique one.');
        } else {
            console.error(err.message);
        }
    });
}

async function getDbStoredUrl(key) {
    const db = getDbClient();

    const sql = 'SELECT * FROM url WHERE key = ?';

    let data;
    return new Promise((resolve, reject) => {
        db.get(sql, [key], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });

    db.close();
}

module.exports = { getDbClient, createUrlTable, saveUrlObjDb, getDbStoredUrl };