import React from 'react';
import {navigate} from '@reach/router';
import { Container} from 'reactstrap';
import Skull from '../skull.gif';
import './Main.css';


export default () => {

    const onClick = (e) =>{
        e.preventDefault();
        navigate('/quiz')
    }

    return(
        <Container>
            <div className='main'>
                <h2 style={{color:'red', textShadow: '2px 2px 4px red'}}>Welcome...</h2>
                <h3 style={{color:'red', textShadow: '2px 2px 4px red'}}>Are you ready for the test of your life?</h3>
                <img src={Skull} alt='skull' className='skull' />
                <div>
                    <button className='btn btn-danger btn-lg button' style={{fontWeight:'bold', background:'darkred', textShadow: '2px 2px 4px red', color:'whitesmoke' }} onClick={onClick}>ENTER IF YOU DARE</button>
                </div>
            </div>
        </Container>
    )
}