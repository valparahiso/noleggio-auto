import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Automobili extends React.Component{

    render(){
        return(
            
        <Container>
            <Row> 
                <Col sm="12">
                    <Card className="background-std">
                        <Table responsive bordered hover size="sm">
                            <thead className="background-drk">
                                <tr> 
                                    <th>Marca</th> 
                                    <th>Modello</th>
                                    <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.automobili.map((auto)=>{
                                 
                                    if(this.props.marche.filter(marca => marca.nome === auto.marca)[0].checked && 
                                    this.props.categorie.filter(categoria => categoria.nome === auto.categoria)[0].checked)  
                                    return(
                                        <tr key={auto.marca + auto.modello}>
                                            <td>{auto.marca}</td>
                                            <td>{auto.modello}</td>
                                            <td>{auto.categoria}</td>
                                        </tr>
                                    );

                                    return (<React.Fragment key={auto.marca + auto.modello}></React.Fragment>)
                                })} 
                            </tbody> 
                        </Table>
                    </Card> 
                </Col>
            </Row>
        </Container>   
        );

    } 
}

export default Automobili;