'use strict'

const Automobile = require("./automobile"); 
const db = require('./db');
const moment = require('moment');

//Create automobile
const createAutomobile = function(row){
    return new Automobile(row.id, row.categoria, row.marca, row.modello);
}

//Get tutte le auto
exports.getAutomobili = function(){
    return new Promise((resolve, reject)=>{
        const sql = "SELECT * FROM automobile";
        db.all(sql, [], (err, rows)=>{
            if(err){
                reject(err);
            } else{
                let automobili = rows.map((row) => createAutomobile(row));
                resolve(automobili);
            }
        })
    })
}

//Get numero di auto possibili per il noleggio scelto
exports.getNoleggi = function(datainizio, datafine, categoria){
    return new Promise((resolve, reject)=>{ 
        datafine = moment(datafine).format("YYYYMMDD");
        datainizio = moment(datainizio).format("YYYYMMDD");

        const sql = "SELECT id, COUNT(*) as tot FROM automobile WHERE automobile.categoria=? AND id NOT IN (SELECT automobileid FROM noleggio WHERE datafine>=? AND datainizio<=?)";
        db.all(sql, [categoria, datainizio, datafine], (err, row)=>{
            if(err){
                console.log(err); 
                reject(err); 
            } else{                
                resolve(row[0]);
            }
        })
    })
}

exports.getCountAutomobiliByCategoria = function(categoria){
    return new Promise((resolve, reject)=>{ 

        const sql = "SELECT COUNT(*) as tot FROM automobile WHERE categoria=?"

        db.all(sql, [categoria], (err, row)=>{
            if(err){
                console.log(err); 
                reject(err); 
            } else{              
                resolve(row); 
            }
        })
    })

}
