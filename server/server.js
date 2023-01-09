const express = require('express');
const autoDao = require('./automobile_dao');
const userDao = require('./user_dao');
const noleggioDao = require('./noleggio_dao');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtSecret = 'sSIgFl9muPrLLn791ScliPmoTzS163H3MTykOKyyQKt9JfMVqAOPGWZlXN6zkXh';
const expireTime = 300;
const jwt = require('express-jwt');

const prices = {
    categoria : {
        A : 80,
        B : 70,
        C : 60,
        D : 50,
        E : 40
    },
    chilometri : {
        less50 : 0.95,
        more150 : 1.05
    },
    eta : {
        less25 : 1.05, 
        more65 : 1.10
    },
    guidatoriaddizionali : 1.15,
    assicurazione : 1.2,
    veicoli : 1.1,
    scontoNoleggio : 0.9,
}

const authErrorObj = {errors : [{
    'param' : 'Server',
    'msg' : 'Authorization error'
}]}


const PORT = 3001;
app = new express();

app.use(morgan('tiny'));
app.use(express.json()); 

//REST API Start here

//POST Login
app.post('/api/login', (req,res)=>{

    const username = req.body.username;
    const password = req.body.password; 

    userDao.getUser(username).then((user)=>{
        if(user === undefined){
            res.status(404).send({
                errors: [{'param': 'Server', 'msg': 'Invalid username'}]
            });
        } else {
            if(!userDao.checkPassword(user, password)){
                res.status(401).send({
                    errors: [{
                        'param':'Server',
                        'msg' : 'Wrong Password'
                    }]
                });
            } else{
                //Password correct!
                const token = jsonwebtoken.sign({user: user.id}, jwtSecret, {expiresIn : expireTime});
                res.cookie('token',token,{httpOnly: true, sameSite: true, maxAge: 1000*expireTime});
                res.json({id: user.id, nome: user.nome});
                
            }
        }

    }).catch((err)=>{ 
        new Promise((resolve)=>{setTimeout(resolve,1000)}).then(()=>res.status(401).json(authErrorObj));
    })
})

app.use(cookieParser());

//GET tutte le automobili
app.get('/api/automobili', (req,res)=>{
    autoDao.getAutomobili().then((automobili)=>{
        res.json(automobili);
    }).catch((err)=>{
        res.status(500).json({
            errors: [{'msg':err}],
        })
    });
    
})

//need to be authenticated
app.use(
    jwt({
        secret : jwtSecret,
        getToken : req=>req.cookies.token
    }) 
);

//POST logout
app.post('/api/logout', (req,res)=>{
    res.clearCookie('token').end();
})

app.use(function(err,req, res, next){
    if(err.name==='UnauthorizedError') res.status(401).json(authErrorObj);
})

//GET user
app.get('/api/user',(req,res)=>{
    const user = req.user && req.user.user;
    userDao.getUserById(user).then((user)=>{
        res.json({id:user.id,nome:user.nome});
    }).catch((err)=>{res.status(401).json(authErrorObj)});
})


//GET noleggi disponibili
app.get('/api/noleggi', (req,res)=>{
    if(!req.query.filterdatafine || !req.query.filterdatainizio || req.query.filterdatafine <= req.query.filterdatainizio)
    res.json({tot:0})
    autoDao.getNoleggi(req.query.filterdatainizio, req.query.filterdatafine, req.query.filtercategoria).then((row)=>res.json(row)).catch((err)=>{
        res.status(500).json({
            errors: [{'msg': err}]
        })
    });
})



//GET prezzo
app.get('/api/prezzo', (req,res)=>{
    const userid = req.query.userid;
    const categoria = req.query.categoria;
    const chilometri = req.query.chilometri;
    const etaguidatore = req.query.etaguidatore;
    const guidatoriaddizionali = req.query.guidatoriaddizionali;
    const assicurazione = req.query.assicurazione;
    const risultati = req.query.risultati;
    const giorni = req.query.giorni;

      
    let prezzo = prices.categoria[categoria] * giorni;
    //console.log("prezzo solo categoria : " + prezzo);
    if(chilometri>150) prezzo = prezzo * prices.chilometri.more150;
    //console.log("prezzo +150km : " + prezzo);
    if(chilometri<50) prezzo = prezzo * prices.chilometri.less50;
    //console.log("prezzo -50km : " + prezzo);
    if(etaguidatore<25) prezzo = prezzo * prices.eta.less25;
    //console.log("prezzo -25eta : " + prezzo);
    if(etaguidatore>65) prezzo = prezzo * prices.eta.more65;
    //console.log("prezzo +65eta : " + prezzo);
    if(guidatoriaddizionali > 0) prezzo = prezzo * prices.guidatoriaddizionali;
    //console.log("prezzo guidatoreadd : " + prezzo);
    if(assicurazione === "true") prezzo = prezzo * prices.assicurazione;
    //console.log("prezzo assicurazione : " + prezzo + " " + assicurazione); 

    autoDao.getCountAutomobiliByCategoria(categoria).then((row)=>{
        if(risultati < 0.1 * row[0].tot){
            prezzo = prezzo * prices.veicoli;
            //console.log("prezzo veicoli : " + prezzo + " " + row[0].tot);
        }
        
    }).catch((err)=>{
        res.status(500).json({
            errors: [{'msg': err}]
        })
    });

    noleggioDao.getNoleggiTerminati(userid).then((row)=>{
        if(row[0].tot >= 3){
            prezzo = prezzo * prices.scontoNoleggio;
            //console.log("prezzo scontoNoleggio : " + prezzo + " " + row[0].tot); 
        }

        res.json({prezzo :prezzo})
        
    }).catch((err)=>{
        res.status(500).json({
            errors: [{'msg': err}]
        })
    });
})


//POST pagamento
app.post('/api/pagamento', (req,res)=>{
    const pagamento = req.body;
    if(!pagamento || !pagamento.nome || !pagamento.carta || !pagamento.cvv || !pagamento.mese || !pagamento.anno || !pagamento.prezzo) res.status(400).end();
    else {
        console.log("NOME TITOLARE: " + pagamento.nome);
        console.log("NUM CARTA: " + pagamento.carta);
        console.log("CVV: " + pagamento.cvv);
        console.log("MESE SCADENZA: " + pagamento.mese);
        console.log("ANNO SCADENZA: " + pagamento.anno);
        console.log("PREZZO " + pagamento.prezzo);
        res.status(201).end();
    }
})


//POST CREATE Noleggio
app.post('/api/noleggio', (req,res)=>{

    const noleggio = req.body;
    if(!noleggio) res.status(400).end();
    else{
        noleggioDao.createNoleggio(noleggio).then(()=>res.status(201).end()).catch((err)=>{
            res.status(500).json({errors: [{'param':'Server','msg':err}]})
        })
    }
})


//GET PRENOTAZIONI
app.get('/api/prenotazioni', (req, res)=>{
    const data = req.query.filterdate;
    const userid = req.query.filteruser;
    noleggioDao.getPrenotazioni(userid, data).then((noleggi)=>{
        if(noleggi === undefined || noleggi.length === 0)
        res.json([])
        else
        res.json(noleggi);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            errors:[{'msg':err}]
        })
    })

})


//DELETE Noleggio
app.delete('/api/noleggio/:id', (req,res)=>{
    noleggioDao.deleteNoleggio(req.params.id).then((resolve)=>{
        res.status(204).end() 
    }).catch((err)=>res.status(500).json({
        errors:[{'param':'Server', 'msg':err}]
    }));
})

//GET storico noleggi
app.get('/api/storico', (req,res)=>{
    const data = req.query.filterdate;
    const userid = req.query.filteruser;
    noleggioDao.getStorico(userid, data).then((storico)=>{
        if(storico===undefined || storico.length === 0)
        res.json([]);
        else
        res.json(storico);
    }).catch((err)=>{
        console.log(err); 
        res.status(500).json({
            errors:[{'msg':err}]
        })
    })

})





app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));