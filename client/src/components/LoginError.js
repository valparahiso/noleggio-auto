import React from 'react'
import Toast from 'react-bootstrap/Toast'


const LoginError = (props)=>{

    return(
        <Toast onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide>
            <Toast.Header className="background-red">
                <strong className="mr-auto">Error!</strong>
            </Toast.Header>
            <Toast.Body>{props.error}</Toast.Body>
        </Toast>
    );
} 


export default LoginError;