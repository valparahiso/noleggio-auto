'use strict'

var sqlite = require('sqlite3').verbose();
const DBSOURCE = './db/noleggio.db';

const db = new sqlite.Database(DBSOURCE, (err)=>{
    if(err){
        //Cannot open db
        console.error(err.message);
        throw err;
    }
});

module.exports = db;