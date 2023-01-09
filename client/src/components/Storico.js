import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Storico extends React.Component{

    componentDidMount(){
        this.props.onRender(); 
    }
    render(){
        return(
            
        <Container className="cardMargin">
            <Row> 
                <Col>
                    <Card className="background-std">
                        <Card.Title className="cardMargin" >Storico noleggi: </Card.Title>
                        <Card.Body>
                        {
                        (this.props.storico.length > 0) ?
                        <Table responsive bordered hover size="sm" striped>
                        <thead className="background-drk">
                                <tr> 
                                    <th>Categoria Auto</th>
                                    <th>Data di inizio</th> 
                                    <th>Data di fine</th>
                                    <th>Chilometri</th>
                                    <th>Età guidatore</th>
                                    <th>Guidatori Addizionali</th>
                                    <th>Assicurazione</th>
                                    <th>Prezzo</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {this.props.storico.map((noleggio)=>{ 
                                 
                                    return(
                                        <tr key={noleggio.id} >
                                            <td style={{verticalAlign:"middle"}}>{this.props.automobili.filter((auto)=>auto.id === noleggio.automobileid)[0].categoria}</td>
                                            <td style={{verticalAlign:"middle"}}>{noleggio.datainizio}</td>
                                            <td style={{verticalAlign:"middle"}}>{noleggio.datafine}</td>  
                                            <td style={{verticalAlign:"middle"}}>{noleggio.chilometri + " Km"}</td>
                                            <td style={{verticalAlign:"middle"}}>{noleggio.etaguidatore + " anni"}</td>
                                            <td style={{verticalAlign:"middle"}}>{noleggio.guidatoriaddizionali}</td>
                                            <td style={{verticalAlign:"middle"}}>{(noleggio.assicurazione===true) ? "Sì" : "No"}</td>  
                                            <td style={{verticalAlign:"middle"}}>{parseFloat(noleggio.prezzo.toFixed(2)) + " €"}</td>
                                        </tr>
                                    ); 

                                })} 
                            </tbody> 
                        </Table>
                        : "NESSUNO STORICO PRESENTE"
                        }
                        </Card.Body>
                    </Card>  
                </Col>
            </Row>
        </Container>   
        );

    } 
}

export default Storico;