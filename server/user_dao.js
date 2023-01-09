'use strict'

const db = require('./db');
const bcrypt = require('bcrypt');
const User = require('./user');

const createUser = function(row){
    return new User(row.id, row.nome, row.username, row.hash);
}

exports.getUser = function(username){
    return new Promise((resolve, reject)=>{
        const sql = "SELECT * FROM user WHERE username=?";
        db.all(sql,[username], (err, rows)=>{
            if(err) reject(err);
            else if(rows.length === 0) resolve(undefined);
            else resolve(createUser(rows[0]));
        })
    })
}

exports.checkPassword = function(user, password){
    return bcrypt.compareSync(password, user.hash);
}

exports.getUserById = function (id){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE id=?";
        db.all(sql, [id], (err,rows) => {
            if(err) reject(err);
            else if(rows.length === 0) resolve(undefined);
            else resolve(createUser(rows[0]));
        })
    })
}