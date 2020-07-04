import React,{ useState} from 'react';
import './App.css';
import { Router } from '@reach/router'
import EditQuiz from './views/EditQuiz';
import AddQuiz from './views/AddQuiz';
import Quiz from './views/Quiz';
import Results from './views/Results';
import ParticlesBg from 'particles-bg';
import Main from './views/Main';

function App() {
  const [count, setCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <div className='col-sm-12 col-md-12 offset-md-6 col-lg-12 offset-lg-6'>
            <h3 className='title'> QUIZ of DEATH </h3>
            <Router>
              <Main path='/'/>
              <Quiz path='/quiz' count={count} setCount={setCount} setWrongCount={setWrongCount} wrongCount={wrongCount}/>
              <EditQuiz path='/edit'/>
              <AddQuiz path='/add'/>
              <Results path='/results' count={count} wrongCount={wrongCount}/>
            </Router>
        </div>
      </div>
  );
}

export default App;
