

class Noleggio{
    constructor(id, userid, automobileid, datainizio, datafine, prezzo, guidatoriaddizionali, etaguidatore, assicurazione, chilometri){
        if(id) this.id = id;

        this.userid = userid;
        this.automobileid = automobileid;
        this.datainizio = datainizio;
        this.datafine = datafine;
        this.prezzo = prezzo;
        this.guidatoriaddizionali = guidatoriaddizionali;
        this.etaguidatore = etaguidatore; 
        this.assicurazione = (assicurazione === 1) ? true : false;
        this.chilometri = chilometri;
    }
}

module.exports = Noleggio;