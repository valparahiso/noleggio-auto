import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class Noleggi extends React.Component{

    render(){
        if(this.props.noleggio.risultati > 0)
        
        return(   
        <Container className="noPadding">   
            <Row>    
                <Col>
                    <Card className="background-std cardMargin">
                        <Card.Title className="cont1">Auto Disponibili: </Card.Title>
                        <Card.Body className="bodyFont">
                            {this.props.noleggio.risultati}
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card className="background-std cardMargin">
                        <Card.Title className="cont1">Prezzo: </Card.Title>
                        <Card.Body className="bodyFont">
                            {parseFloat(this.props.noleggio.prezzo).toFixed(2) + " €"}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-md-center cardMargin">
                <Col sm="4">       
                    <Link to="/pagamento">                
                        <Button variant="secondary" size="lg" as="input" readOnly block value="Noleggia Ora!"/>
                    </Link>       
                </Col>
            </Row>
        </Container>
        );

        else if(this.props.noleggio.risultati === 0) return (
        <Container className="noPadding">   
                <Card className="background-std cardMargin">
        <Card.Title className="cont1" >{"Nessun veicolo di categoria '" + this.props.noleggio.categoria + "' per le date selezionate"}</Card.Title>
                </Card>
        </Container>);
        else return(<></>)
    }
}

export default Noleggi;