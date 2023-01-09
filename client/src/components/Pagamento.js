import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Pagamento extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            nome : "",
            carta: "",
            prezzo: this.props.prezzo,
            cvv :"",
            mese:"",
            anno:""
        }
    }

    updateField = (name, value) =>{
        this.setState({[name]:value});
    } 

    pagamento = (event, onPagamento) =>{
        event.preventDefault();
        onPagamento(this.state);
    }

    render(){
        return(
            <Card className="cardMargin background-std">
                <Card.Body>
                    <Card.Title>Inserire i dati della carta: </Card.Title> 
                    <br/> 
                    <Form method="POST" onSubmit={(event)=>this.pagamento(event, this.props.pagamento)}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Titolare Carta</Form.Label>
                                <Form.Control type="text" name="nome" required autoFocus onChange={(ev)=>this.updateField(ev.target.name, ev.target.value)} value = {this.state.nome}/>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Numero di Carta</Form.Label>
                                <Form.Control type="tel" name="carta" required pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" placeholder="1234 1234 1234 1234" onChange={(ev)=>this.updateField(ev.target.name, ev.target.value)} value = {this.state.carta}/>
                            </Form.Group>
                        </Form.Row>
                        

                        <Form.Row>
                            
                            <Form.Group as={Col}>
                            <Form.Label>Mese di Scadenza</Form.Label>
                                <Form.Control name="mese" type="number" min="1" max="12" multiple placeholder="MM" required onChange={(ev)=>this.updateField(ev.target.name, ev.target.value)} value = {this.state.mese}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Anno di Scadenza</Form.Label>
                                <Form.Control name="anno" type="number" min="2020" max="3000" multiple placeholder="YYYY" required onChange={(ev)=>this.updateField(ev.target.name, ev.target.value)} value = {this.state.anno}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control name="cvv" type="number" min="100" max="999" multiple placeholder="CVV" required onChange={(ev)=>this.updateField(ev.target.name, ev.target.value)} value = {this.state.cvv}/>
                            </Form.Group> 

                        </Form.Row>
                    
                    <Form.Group className="cardMargin">
                        <Button variant="secondary" size="lg" type="submit">{"Paga " + parseFloat(this.props.prezzo).toFixed(2) + " €"}</Button> 
                    </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
           
        );
    }
}

export default Pagamento;