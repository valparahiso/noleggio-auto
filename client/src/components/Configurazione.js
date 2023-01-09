import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

class Configurazione extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            chilometri : 50,
            etaguidatore: 18,
            datainizio: "", 
            datafine: "",
            guidatoriaddizionali: 0,
            categoria: "A",
            assicurazione : false,
        };

    } 

    getNoleggi(event, bool){ 
    
        let datainizio = (event.target.name === 'datainizio') ? event.target.value : this.state.datainizio;
        let datafine = (event.target.name === 'datafine') ? event.target.value : this.state.datafine;
        let chilometri = (event.target.name === 'chilometri') ? event.target.value : this.state.chilometri;
        let etaguidatore = (event.target.name === 'etaguidatore') ? event.target.value : this.state.etaguidatore;
        let guidatoriaddizionali = (event.target.name === 'guidatoriaddizionali') ? event.target.value : this.state.guidatoriaddizionali;
        let categoria = (event.target.name === 'categoria') ? event.target.value : this.state.categoria;
        let assicurazione = (event.target.name === 'assicurazione') ? event.target.checked : this.state.assicurazione;
 
        this.props.getRisultati(moment(datainizio).format('YYYYMMDD'), moment(datafine).format('YYYYMMDD'), categoria, chilometri, etaguidatore, guidatoriaddizionali, assicurazione, bool);
        
    }

    updateField(event){   
        
        if(event.target.name === "assicurazione") 
        {
            this.setState({
                [event.target.name] : event.target.checked});   
                event.target.setCustomValidity("");  
        } 
        else{
            event.preventDefault(); 
            this.setState({
                [event.target.name] : event.target.value});  
                event.target.setCustomValidity("");  
        
            if(!event.currentTarget.checkValidity()) {
                event.currentTarget.reportValidity(); 
            } 
            else if(event.target.name === 'datainizio' || event.target.name === 'datafine'){
                
                if(!moment(event.target.value).isAfter(moment())){ 
                    event.target.setCustomValidity("Inserire una data futura"); 
                    event.currentTarget.reportValidity();
                } else if (event.target.name==='datainizio' && this.state.datafine!=="" && this.state.datafine!==undefined && !moment(this.state.datafine).isAfter(event.target.value)){
                    event.target.setCustomValidity("La data di inizio deve essere precedente alla data di fine"); 
                    event.currentTarget.reportValidity();
                } else if (event.target.name==='datafine' && this.state.datainizio!=="" && this.state.datainizio!==undefined && !moment(event.target.value).isAfter(this.state.datainizio)){
                    event.target.setCustomValidity("La data di fine deve essere successiva alla data di inzio"); 
                    event.currentTarget.reportValidity();
                } else{
                    if(moment(document.getElementsByName("datainizio")[0].value).isAfter(moment())){
                        document.getElementsByName("datainizio")[0].setCustomValidity("");
                    }
                    
                    if(moment(document.getElementsByName("datafine")[0].value).isAfter(moment())){
                        document.getElementsByName("datafine")[0].setCustomValidity("");
                    } 
                    
                }
                        
            } 
        }

        let bool = true;
        for(let key of Object.keys(this.state)){
            if(key!=="assicurazione")
            bool = bool && document.getElementsByName(key)[0].checkValidity();
        }
        
        this.getNoleggi(event, bool);
        

    }
 

    render(){
        return(
            <Card className="cardMargin background-std">
                <Card.Body>
                    <Card.Title>Seleziona la configurazione per il noleggio: </Card.Title> 
                    <br/>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="datainizio">
                                <Form.Label>Data di inizio</Form.Label>
                                <Form.Control type="date" name="datainizio" value={this.state.datainizio} onChange={(ev)=>this.updateField(ev)} required autoFocus/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="datafine">
                                <Form.Label>Data di fine</Form.Label>
                                <Form.Control type="date" name="datafine" value={this.state.datafine} onChange={(ev)=>this.updateField(ev)} required />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="etaguidatore">
                                <Form.Label>Età del guidatore:</Form.Label>
                                <Form.Control type="number" min="18" max="100" name="etaguidatore" value={this.state.etaguidatore} onChange={(ev)=>this.updateField(ev)} required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="guidatoriaddizionali">
                                <Form.Label>Numero di guidatori addizionali</Form.Label>
                                <Form.Control type="number" min="0" max="5" name="guidatoriaddizionali" value={this.state.guidatoriaddizionali} onChange={(ev)=>this.updateField(ev)} required/>
                            </Form.Group>
                        </Form.Row>
                        

                        <Form.Row>
                            <Form.Group as={Col} controlId="categoria">
                                <Form.Label>Categoria Auto:</Form.Label>
                                <Form.Control as="select" className="mr-sm-2" name="categoria" value={this.state.categoria} onChange={(ev)=>this.updateField(ev)} required>
                                {this.props.categorie.map((categoria)=>{
                                    return <option key={categoria.nome} value={categoria.nome}>{categoria.nome}</option>
                                })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="chilometri">
                                <Form.Label>{"Chilometri al giorno:  "+this.state.chilometri + " Km"}</Form.Label>
                                <Form.Control type="range" min="10" max="500" step="10" name="chilometri" value={this.state.chilometri} onChange={(ev)=>this.updateField(ev)} />
                                
                            </Form.Group> 

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="assicurazione">
                                    <Form.Check type="switch" label="Assicurazione Extra" name="assicurazione" checked={this.state.assicurazione} onChange={(ev)=>this.updateField(ev)}/>   
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Configurazione;