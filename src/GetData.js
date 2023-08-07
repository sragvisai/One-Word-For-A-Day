import { useEffect, useState } from 'react';
import GameBox from './GameBox';

const GetData = () => {

    console.log("GET DATA initialized");

    const [message,setMessage] = useState("");

    let ReceivedData;
        useEffect(()=>{
            fetch("http://localhost:8000/message")
              .then((res) => res.json())
              .then((data) => {
                  ReceivedData = data;
                  console.log("Received "+JSON.stringify(ReceivedData));
                  setMessage(ReceivedData["1"]);
              })
              
          }, []);

    return (
        <div className='main'>
            <div className='title'>
                {/* <h1>{message}</h1> */}
            </div>

           <GameBox message = {message}></GameBox>
        </div>
        
    )


}

export default GetData;


// point user to the first entry box on any click of characters
// on refresh you should stay on the page itself
// validation of input
