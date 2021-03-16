import React from 'react'
import {useHistory} from 'react-router-dom';
import splash from '../splash.jpeg';

import {
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';


function Splash() {
    const history = useHistory();
    return (
        <div style={{ backgroundImage: `url(${splash})`, backgroundPosition: 'center', height: '100vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#1f4c98' }}>
            <Card>
                <CardBody>
                    <CardTitle tag="h1">The Weather App</CardTitle>
                    <CardSubtitle tag='h3' style={{fontFamily: 'Montserrat', fontStyle: 'italic', margin: '25px'}}>checkout what it's<br/> like outside</CardSubtitle>
                    <Button onClick={() => history.push('/login')}style={{marginTop: '50px', marginBottom: '25px'}} size='lg'>Get Started</Button> 
                </CardBody> 
           </Card>
        </div>
    )
}

export default Splash
