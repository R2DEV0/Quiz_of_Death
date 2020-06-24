import React, {useState, useEffect} from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './editQuiz.css';


export default (props) => {
    const [quiz, setQuiz] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    // options dropdown button //
    const toggle = () => setOpen(!dropdownOpen);
    const TakeQuiz = (e) => {navigate('/quiz')};
    const NewQuestion = (e) => {navigate('/add')};
    const home = (e) => {navigate('/')};

    // shows all questions in database for review //
    useEffect(()=> {
        axios.get('http://localhost:8000/api/quiz')
        .then(res=> {
            setQuiz(res.data);
            setLoaded(true);
        })
    }, [setQuiz]);

    // delete question button //
    const onClick =(id) => {
        axios.delete(`http://localhost:8000/api/quiz/${id}`)
            .then(res => {
                setQuiz(quiz.filter(quiz => quiz._id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div>
            <div className='btn-sm col-md-1 offset-md-10'>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret style={{background:'darkred', border: '1px solid red', textShadow: '2px 2px 4px red', color:'whitesmoke'}}> Options </DropdownToggle>
                    <DropdownMenu style={{background:'lightgray'}}>
                        <DropdownItem onClick={TakeQuiz}>Take a Quiz</DropdownItem>
                        <DropdownItem disabled>Remove a Question</DropdownItem>
                        <DropdownItem onClick={NewQuestion}>Add a New Question</DropdownItem>
                        <DropdownItem onClick={home}>Welcome Page</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <div className='list'>
                <h3 style={{color:'whitesmoke', textAlign:'center', textShadow: '2px 2px 4px red'}}>Remove a Question</h3>
                {loaded && quiz.map((test, i) => {return <div key={i} className='questions'>
                    <p>Question: <strong>{test.question}</strong></p>
                    <button className='btn btn-danger btn-sm col-md-1 offset-md-11' style={{background:'darkred', border:'1px solid red', textShadow: '2px 2px 4px red', color:'whitesmoke'}}onClick={(e) => {onClick(test._id)}} >Delete</button>    
                </div>})}
            </div>
        </div>
    )
}