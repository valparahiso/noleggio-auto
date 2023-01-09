import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {username:"", password:""}
    }

    onChangeUsername = (event)=>{
        this.setState({username:event.target.value});
    }
 
    onChangePassword = (event)=>{
        this.setState({password:event.target.value});
    }

    handleSubmit = (event, onLogin) => {
        event.preventDefault();
        onLogin(this.state.username, this.state.password);
    }

    render(){
        return(
            <Card className="background-std">
                <Card.Body>
                    <Card.Title>Login: </Card.Title> 
                    <Form method="POST" onSubmit={(event) => this.handleSubmit(event,this.props.handleSubmit)}> 
                        <Form.Group>
                            <Form.Label className="checkboxFloat">Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" required autoFocus onChange={(ev)=>this.onChangeUsername(ev)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="checkboxFloat">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required autoFocus onChange={(ev)=>this.onChangePassword(ev)} />
                        </Form.Group>
                        
                        <Button variant="secondary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Login;