import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Confetti from 'react-confetti';
import './results.css';


export default (props) => {
    const{ count, wrongCount } = props;
    const [dropdownOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    // options dropdown button //
    const toggle = () => setOpen(!dropdownOpen);
    const TakeQuiz = (e) => {navigate('/quiz')};
    const Remove = (e) => {navigate('/edit')};
    const NewQuestion = (e) => {navigate('/add')};
    const home = (e) => {navigate('/')};

    // renders message based on score //
    useEffect(() =>{
        if(count < 3){
            setMessage('Wow, you suck!');
        };
        if(count > 2 && count < 5){
            setMessage('You did ok..');
        };
        if(count === 5){
            setMessage('Great Job!')
        }
    },[count]);

    return(
        <div>
            <Confetti width='900px' height='900px'/>
            <div className='btn-sm col-md-1 offset-md-10'>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret style={{background:'darkred', border:'1px solid red', textShadow: '2px 2px 4px red', color:'whitesmoke'}}> Options </DropdownToggle>
                    <DropdownMenu style={{background:'lightgray'}}>
                        <DropdownItem onClick={TakeQuiz}>Take a Quiz</DropdownItem>
                        <DropdownItem onClick={Remove}>Remove a Question</DropdownItem>
                        <DropdownItem onClick={NewQuestion}>Add a New Question</DropdownItem>
                        <DropdownItem onClick={home}>Welcome Page</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <div style={{marginTop:'10%', textAlign:'center', background:'white', padding: '15px', borderRadius:'8px'}}> 
                <h2 className='score'>You got {count} out of 5 correct!</h2>
                <h3 className='message'>{message}</h3>
            </div>
        </div>
    )

}
