import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Filters extends React.Component{

    changeFilters(){
        this.props.onChange();
    }

    render(){ 
        return( 
            <Container className="cont2">
                <Row onChange={this.changeFilters.bind(this)}> 
                    <Col> 
                        <Card className="cardHeight background-std">
                            <Card.Body>
                                <Card.Title>Marca: </Card.Title>
                            <Form> 
                                <Container fluid>
                                         
                                    {this.props.marche.map((marca, index, array)=>{
                                        if(index%2 === 0){
                                            if(index === array.length-1)
                                            return(
                                                <Row key={index/2}>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={marca.nome} type="checkbox" id={"checkbox-"+marca.nome} key={marca.nome} defaultChecked={marca.checked}/> 
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            );
                                            else 
                                            return(
                                                <Row key={index/2}>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={marca.nome} type="checkbox" id={"checkbox-"+marca.nome} key={marca.nome} defaultChecked={marca.checked}/> 
                                                    </Col>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={array[index+1].nome} type="checkbox" id={"checkbox-"+ array[index+1].nome} key={array[index+1].nome} defaultChecked={array[index+1].checked}/> 
                                                    </Col>
                                                </Row>
                                            );
                                        }  return (<React.Fragment key={marca.nome}></React.Fragment>);
                                            
                                    })}  
                                </Container> 
                            </Form> 
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="background-std cardHeight">
                            <Card.Body>
                                <Card.Title>Categoria: </Card.Title>

                                <Form> 
                                <Container fluid>
                                         
                                    {this.props.categorie.map((categoria, index, array)=>{
                                        if(index%2 === 0){
                                            if(index === array.length-1)
                                            return(
                                                <Row key={index/2}>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={categoria.nome} type="checkbox" id={"checkbox-"+categoria.nome} key={categoria.nome} defaultChecked={categoria.checked}/> 
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            );
                                            else 
                                            return(
                                                <Row key={index/2}>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={categoria.nome} type="checkbox" id={"checkbox-"+categoria.nome} key={categoria.nome} defaultChecked={categoria.checked}/> 
                                                    </Col>
                                                    <Col>
                                                    <Form.Check className="checkboxFloat" label={array[index+1].nome} type="checkbox" id={"checkbox-"+ array[index+1].nome} key={array[index+1].nome} defaultChecked={array[index+1].checked}/> 
                                                    </Col>
                                                </Row>
                                            );
                                        }  return (<React.Fragment key={categoria.nome}></React.Fragment>);
                                            
                                    })}  
                                </Container> 
                            </Form> 
                            </Card.Body>
                        </Card> 
                    </Col>
                </Row>
              
            </Container>
        );
    }
}

export default Filters;