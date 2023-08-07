import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import GetData from './GetData';

function App() {

  //Declaring a click handler
  const [clicked,setClicked] = useState(false);
  

  const onClickHandler = () => {

    console.log("Inside the click handler");
    setClicked(true);

  }
  
  return (
    <div className="App">
      {
        !clicked ? (
          <div className='initial'>
        <header>
      </header>
      <button onClick={onClickHandler} className='startPlaying' >Click to Play!!</button>
          </div>
        
        ) : (
          <div className='alreadyClicked'>
            <p>Lets play!!!</p>
          {/* <Routes>
            <Route path="/login" element={<Login/>}></Route>
          </Routes> */}

          {/* <p><Link to="/login">Login</Link></p> */}
          <GetData></GetData>
            
          </div>
          
        )
      }
    </div>
  );
}

export default App;
