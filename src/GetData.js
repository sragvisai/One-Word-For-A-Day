import { useEffect, useState } from 'react';
import GameBox from './GameBox';

const GetData = () => {

    console.log("GET DATA initialized");

    const [message, setMessage] = useState("");
    const [showBoxes, setshowBoxes] = useState(false);

    let ReceivedData;
    useEffect(() => {
        fetch("http://localhost:8000/message")
            .then((res) => res.json())
            .then((data) => {
                ReceivedData = data;
                console.log("Received " + JSON.stringify(ReceivedData));
                setMessage(ReceivedData);
                setshowBoxes(true);
            })

    }, []);

    return (
        <div className='main'>

            { showBoxes ? (
                <GameBox message={message}></GameBox>) : (
                <div></div>
            )
            }
        </div>

    )


}

export default GetData;


// point user to the first entry box on any click of characters
// on refresh you should stay on the page itself
// validation of input
