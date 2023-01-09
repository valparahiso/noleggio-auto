'use strict'

const Noleggio = require("./noleggio"); 
const db = require('./db');
const moment = require('moment');

//Create noleggio
const createNoleggio = function(row){
    return new Noleggio(row.id, row.userid, row.automobileid, row.datainizio, row.datafine, row.prezzo, row.guidatoriaddizionali, row.etaguidatore, row.assicurazione, row.chilometri);
}


exports.getNoleggiUser = function(userid){
    return new Promise((resolve, reject)=>{ 
        const sql = "SELECT COUNT(id) AS tot FROM noleggio WHERE userid =?";
        db.all(sql, [userid], (err, row)=>{
            if(err){
                console.log(err);
                reject(err); 
            } else{
                resolve(row[0]);
            }
        })
    })
}

exports.createNoleggio = function(noleggio){
    return new Promise((resolve, reject)=>{
        const sql = 'INSERT INTO noleggio(userid, automobileid, datainizio, datafine, prezzo, guidatoriaddizionali, etaguidatore, assicurazione, chilometri) VALUES (?,?,?,?,?,?,?,?,?)';
        noleggio.assicurazione = (noleggio.assicurazione===true) ? 1 : 0; 
        noleggio.datafine = moment(noleggio.datafine).format("YYYYMMDD");
        noleggio.datainizio = moment(noleggio.datainizio).format("YYYYMMDD")
        db.run(sql, [noleggio.user, noleggio.auto, noleggio.datainizio, noleggio.datafine, noleggio.prezzo, noleggio.guidatoriaddizionali, noleggio.etaguidatore, noleggio.assicurazione, noleggio.chilometri], function(err){
            if(err){
                console.log(err);
                reject(err);
            } else{
                console.log(this.lastID);
                resolve();
            }
        });
    })
}

exports.getPrenotazioni = function(userid, data){
    return new Promise((resolve, reject)=>{
        data = moment(data).format('YYYYMMDD');
        const sql = "SELECT * FROM noleggio WHERE userid=? AND datainizio>?";
        db.all(sql, [userid, data], (err, rows)=>{
            if(err) reject(err); 
            else if(rows.length===0) resolve(undefined);
            else{
                resolve(rows.map((noleggio)=> createNoleggio(noleggio)));
            }
        })
    })
}

exports.deleteNoleggio = function(id){
    return new Promise((resolve, reject)=>{
        const sql = 'DELETE FROM noleggio WHERE id=?'
        db.run(sql, [id], (err)=>{
            if(err){
                console.log(err);
                reject(err);
            } else{
                resolve(null);
            }
        })
    })
}

//GET terminati
exports.getNoleggiTerminati = function(userid){
    return new Promise((resolve, reject)=>{
        let today = moment().format("YYYYMMDD");
        const sql = "SELECT COUNT(*) as tot FROM noleggio WHERE userid=? AND datafine<?";
        db.all(sql, [userid, today], (err, row)=>{
            if(err) reject(err);
        
            else{
                resolve(row);
            }
        })
    })
}


//Get storico
exports.getStorico = function(id, data){
    return new Promise((resolve, reject)=>{ 
        data = moment(data).format("YYYYMMDD");
        console.log(data)

        const sql = "SELECT * FROM noleggio WHERE noleggio.datainizio <= ? AND noleggio.userid =?"

        db.all(sql, [data, id], (err, row)=>{
            if(err){
                console.log(err); 
                reject(err); 
            } else{              
                resolve(row); 
            }
        })
    })
}