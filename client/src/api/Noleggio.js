
import moment from 'moment';

class Noleggio{
    constructor(id, userid, automobileid, datainizio, datafine, prezzo, guidatoriaddizionali, etaguidatore, assicurazione, chilometri){
        if(id) this.id = id;
        this.userid = userid;
        this.automobileid = automobileid;
        this.datainizio = moment(datainizio.toString()).format("DD/MM/YYYY");
        this.datafine = moment(datafine.toString()).format("DD/MM/YYYY"); 
        this.prezzo = prezzo;
        this.guidatoriaddizionali = guidatoriaddizionali;
        this.etaguidatore = etaguidatore;
        this.assicurazione = assicurazione;
        this.chilometri = chilometri;
    }
}

export default Noleggio;