import React from 'react'
import {useHistory} from 'react-router-dom';

import {
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';


function Splash() {
    const history = useHistory();
    return (
        <div style={{ height: '100vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#1f4c98' }}>
            <Card style={{boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
                <CardBody>
                    <CardTitle tag="h1" style={{fontSize: '4rem'}}>The Weather App</CardTitle>
                    <CardSubtitle tag='h3' style={{fontFamily: 'Montserrat', fontStyle: 'italic', fontSize: '2.6rem', margin: '25px'}}>checkout what it's<br/> like outside</CardSubtitle>
                    <Button onClick={() => history.push('/login')}style={{marginTop: '50px', marginBottom: '25px', fontSize: '2rem'}} size='lg'>Get Started</Button> 
                </CardBody> 
           </Card>
        </div>
    )
}

export default Splash
