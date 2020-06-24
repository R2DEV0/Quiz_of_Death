import React, {useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './AddQuiz.css';


export default (props) => {
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [right_answer, setRight_answer] = useState('');
    const [errors, setErrors] = useState([]);
    const [answerError, setAnswerError] = useState('');
    const [dropdownOpen, setOpen] = useState(false);
    // options dropdown button //
    const toggle = () => setOpen(!dropdownOpen);
    const TakeQuiz = (e) => {navigate('/quiz')};
    const Remove = (e) => {navigate('/edit')};
    const home = (e) => {navigate('/')};

    // submits new question form & redirects to edit page//
    const onSubmit = (e) => {
        e.preventDefault();
        if(answer1 === right_answer || answer2 === right_answer || answer3 === right_answer || answer4 === right_answer){
            const answers = [answer1, answer2, answer3, answer4]
            axios.post('http://localhost:8000/api/quiz', {
                question,
                answers,
                right_answer
            })
            .then(res=> {
                navigate('/edit')
            })
            .catch(err=> {
                const errorResponse = err.response.data.errors;
                const errorArr=[];

                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
        }
        else{
            setAnswerError('Your correct answer must match 1 of the 4 above')
        }
    };

    return(
        <div>
            <div className='btn-sm col-md-1 offset-md-10'>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret style={{background:'darkred', border: '1px solid red', textShadow: '2px 2px 4px red', color:'whitesmoke'}}> Options </DropdownToggle>
                    <DropdownMenu style={{background:'lightgray'}}>
                        <DropdownItem onClick={TakeQuiz}>Take a Quiz</DropdownItem>
                        <DropdownItem onClick={Remove}>Remove a Question</DropdownItem>
                        <DropdownItem disabled>Add a New Question</DropdownItem>
                        <DropdownItem onClick={home}>Welcome Page</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <div className='maindiv'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Question: </label>
                        <input type="text" className="form-control" placeholder='Add a new Question'onChange={(e)=> {setQuestion(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Enter 4 Options: </label>
                        <input type="text" className="form-control" placeholder='A' style={{marginBottom: '2px'}} onChange={(e)=> {setAnswer1(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder='B' style={{marginBottom: '2px'}} onChange={(e)=> {setAnswer2(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder='C' style={{marginBottom: '2px'}} onChange={(e)=> {setAnswer3(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder='D' onChange={(e)=> {setAnswer4(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Correct Answer: </label>
                        <input type="text" className="form-control" placeholder='Must match one of the 4 options above' onChange={(e)=> {setRight_answer(e.target.value)}}/>
                    </div>
                    <button className='btn btn-danger' style={{background:'darkred', textShadow: '2px 2px 4px red', color:'whitesmoke'}}>Submit</button>
                </form>
                {errors.map((error, idx)=> {
                    return(
                        <p style={{ color:'red', fontWeight:'bold', marginTop:'15px'}}key={idx}>{error}</p>
                    )
                })}
                {
                    answerError ?
                    <p style={{color:'red', fontWeight: 'bold', marginTop:'15px'}}>{ answerError }</p> :
                    ''
                }
            </div>
        </div>
    )
}