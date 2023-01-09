import Automobile from './Automobile';
import User from './User';
import Noleggio from './Noleggio';
const baseURL = "/api";

async function getAutomobili(){
    let url = '/automobili';
    const response = await fetch(baseURL + url);
    const automobiliJson = await response.json();
    if(response.ok){
        return automobiliJson.map((auto)=> { 
            return new Automobile(auto.id, auto.categoria, auto.marca, auto.modello)
        });
    } else throw automobiliJson;
}

async function isAuthenticated(){
    let url = '/user';
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok) return new User(userJson.id, userJson.nome); 
    else throw response.err;
}


async function userLogin(username, password){
    return new Promise((resolve, reject)=>{
        let url='/login';
        fetch(baseURL + url, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username:username, password:password})
        }).then((response)=>{
            if(response.ok) response.json().then((user)=>{resolve(new User(user.id, user.nome))})
            else {response.json().then((obj)=>{reject(obj)}).catch((err)=>{reject({
                errors: [{
                    param: "Application",
                    msg: "Cannot parse server response"
                }]
            })})}
        }).catch((err)=>{reject({
            errors:[{
                    param:"Server",
                    msg:"Cannot communicate"
                }]
        })})
    })
}

async function userLogout(){
    return new Promise((resolve, reject)=>{
        fetch(baseURL + '/logout',{
            method:'POST',
        }).then((response)=>{
            if(response.ok){
                resolve(null);
            } else{
                response.json().then((obj)=>{reject(obj)}).catch((err)=>{reject({errors:[{
                    param: "Application",
                    msg: "Cannot parse server response"
                }]})})
            }
        })
    })
}

async function getNoleggi(datainizio, datafine, categoria){
    let url ='/noleggi'
    const filterdatainizio = '?filterdatainizio=' + datainizio;
    const filterdatafine = '&filterdatafine=' + datafine;
    const filtercategoria = '&filtercategoria=' + categoria; 
    const response = await fetch(baseURL + url + filterdatainizio + filterdatafine + filtercategoria);
    const noleggiJson = await response.json();
    if(response.ok){
        return noleggiJson;
    } else {
        let err = {status : response.status, errObj : noleggiJson}
        throw err; 
    }

}

async function getPrezzo(userid, noleggio){
    let url ='/prezzo'
    let filters = '?userid=' + userid;
    filters += '&categoria=' + noleggio.categoria;
    filters += '&chilometri=' + noleggio.chilometri;
    filters += '&etaguidatore=' + noleggio.etaguidatore;
    filters += '&guidatoriaddizionali=' + noleggio.guidatoriaddizionali;
    filters += '&assicurazione=' + noleggio.assicurazione;
    filters += '&risultati=' + noleggio.risultati;
    filters += '&giorni=' + noleggio.giorni;
    const response = await fetch(baseURL + url + filters);
    const prezzoJson = await response.json();
    if(response.ok){
        console.log(prezzoJson)
        return prezzoJson.prezzo;
    } else {
        let err = {status : response.status, errObj : prezzoJson}
        throw err;
    }

}

async function pagamento(pagamento){
    return new Promise((resolve, reject)=>{
        fetch(baseURL + '/pagamento', {
            method : 'POST', 
            headers :{
                'Content-Type':'application/json',
            },
            body : JSON.stringify(pagamento), 
        }).then((response)=>{
        if(response.ok){
            resolve(null);
        } else {
            response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function addNoleggio(noleggio){
    return new Promise((resolve, reject)=>{
        fetch(baseURL + "/noleggio", {
            method: "POST",
            headers: {
                'Content-Type':'application/json', 
            },
            body: JSON.stringify(noleggio),
        }).then((response)=>{
            if(response.ok){
                resolve(null);
            } else{
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    })
}

async function getPrenotazioni(userid, data){
    console.log(userid);
    console.log(data);
    let url = '/prenotazioni';
    url += '?filteruser=' + userid;
    url += '&filterdate=' + data;
    const response = await fetch(baseURL + url);
    const noleggiJson = await response.json();
    if(response.ok){
        return noleggiJson.map((noleggio)=> new Noleggio(noleggio.id, noleggio.userid, noleggio.automobileid, noleggio.datainizio, noleggio.datafine, noleggio.prezzo, noleggio.guidatoriaddizionali, noleggio.etaguidatore, noleggio.assicurazione, noleggio.chilometri))
    } else {
        let err = {status: response.status, errObj:noleggiJson};
        throw err;
    }
}

async function deleteNoleggio(id){
    return new Promise((resolve, reject)=>{
        fetch(baseURL + "/noleggio/" + id, { 
            method : "DELETE"
        }).then((response)=>{
            if(response.ok) resolve(null);
            else{
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    })

}


async function getStorico(id, data){


    let url = '/storico';
    url += '?filteruser=' + id;
    url += '&filterdate=' + data;
    const response = await fetch(baseURL + url);
    const noleggiJson = await response.json();
    if(response.ok){
        
        return noleggiJson.map((noleggio)=> new Noleggio(noleggio.id, noleggio.userid, noleggio.automobileid, noleggio.datainizio, noleggio.datafine, noleggio.prezzo, noleggio.guidatoriaddizionali, noleggio.etaguidatore, noleggio.assicurazione, noleggio.chilometri))
    
    } else {
        let err = {status: response.status, errObj:noleggiJson};
        throw err;
    }
}

const API = {getAutomobili, isAuthenticated, userLogin, userLogout, getNoleggi, getPrezzo, pagamento, addNoleggio, getPrenotazioni, deleteNoleggio, getStorico}
export default API; 