import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './quiz.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default (props) => {
    const [dropdownOpen, setOpen] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [pick, setPick] = useState([]);
    const {count, setCount} = props;
    const {wrongCount, setWrongCount} = props;


    // options dropdown button //
    const toggle = () => setOpen(!dropdownOpen);
    const Remove = (e) => {navigate('/edit')};
    const NewQuestion = (e) => {navigate('/add')};
    const home = (e) => {navigate('/')};

    // Displays random questions when rendered & and resets count//
    useEffect(() => {
        axios.get('http://localhost:8000/api/quiz')
            .then(res => {
                let theQuiz = []
                while(theQuiz.length < 5){
                    let number = (Math.floor(Math.random() * (res.data.length-1)));
                    for(let i=0; i<theQuiz.length; i++){
                        if(theQuiz[i] === res.data[number] || theQuiz[i] === undefined){
                            number = (Math.floor(Math.random() * (res.data.length-1)));
                            continue;
                        }
                        else{
                            break;
                        }
                    }
                    theQuiz.push(res.data[number])
                }
                setQuiz(theQuiz);
                setCount(0);
                setLoaded(true);

                confirmAlert({
                    title: 'Confirm Readiness',
                    message: 'Are you sure you want to do this?',
                    buttons: [
                        {label: "Yes, I'm so READY!",},
                        {label: "No, I'm too scared",
                            onClick: () => navigate('/')
                        }
                    ]
                });
            })
            .catch(err => console.log(err));
    },[setCount]);

    // tracks users answer selections & disables answer once selected //
    const onClick = (target,idx,test) => {
        setPick([...pick, idx]);
        target.disabled='true'
        if(idx === test.right_answer){
            setCount(count+1)
        }
        if(idx !== test.right_answer){
            setWrongCount(wrongCount+1)
        }
    }
    const submit = (e) =>{
        e.preventDefault();
        navigate('/results')
    };

    return(
        <div className="container">
            <div className='btn-md col-md-1 offset-md-10'>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret style={{background:'darkred', border:'1px solid red', textShadow: '2px 2px 4px red', color:'whitesmoke'}}> Options </DropdownToggle>
                    <DropdownMenu style={{background:'lightgray'}}>
                        <DropdownItem disabled>Take a Quiz</DropdownItem>
                        <DropdownItem onClick={Remove}>Remove a Question</DropdownItem>
                        <DropdownItem onClick={NewQuestion}>Add a New Question</DropdownItem>
                        <DropdownItem onClick={home}>Welcome Page</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            {loaded && <div>
                {quiz.map((test, i) => {return <div key={i} className='test'>
                    <p className='question'>{test.question}</p>
                    {test.answers.map((idx, i)=>{return <button key={i} className='btn btn-secondary btn-sm buttons' 
                    value={idx} style={{fontWeight:'bold', padding: '5px', marginRight: '5px', marginTop:'5px', color:'whitesmoke', minWidth:'120px'}} onClick={(e)=>{onClick(e.target,idx,test)}}> {idx} </button>})}
                </div> })}
                <button className='btn btn-danger btn-md col-6 offset-3' style={{fontWeight:'bold', fontSize:'18px', border:'1px solid red', padding:'10px', marginTop: '1%', background:'darkred', textShadow: '2px 2px 4px red', color:'whitesmoke'}} onClick={submit}>Submit</button>
            </div>}
        </div>
    )
}