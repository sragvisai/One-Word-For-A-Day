
import { useEffect, useState } from "react";

let reachedRowEnd = false;
// const component = [];

const GameBox = (props) => {

    console.log("Initializing gameBox " + JSON.stringify(props));
 
    let message = props["message"]["1"];
    let hintPOS = props["message"]["2"]["pos"];
    let hintDef = props["message"]["2"]["def"];

    console.log("Message "+message+" "+hintPOS+" "+hintDef);

    //splitting the message into characters

    const firstChar = message.charAt(0), secondChar = message.charAt(1);
    const thirdChar = message.charAt(2), fourthChar = message.charAt(3);
    const fifthChar = message.charAt(4);


    const [isSuccess, setisSusccess] = useState();
    const[isFailure, setisFailure] = useState();
    const[showHint,setShowHint] = useState(true);
    const [displayCount, setdisplayCount] = useState();

    let index = 1, rowIndex = 0, trialCount = 0;
    // isSuccess = false;

    //console.log("Initializing gameBox " + JSON.stringify(props) + " " + rowIndex + " " + isSuccess + " " + index);

    const keyPressed = (e) => {

        // e.preventDefault();
        // e.stopPropagation();

        let pressedChar = e.key;

        console.log("Key Pressed - Enter" + pressedChar);

        if ((/[a-zA-Z]/).test(pressedChar) && pressedChar.length === 1) {
            console.log("Inserting at " + index + " " + reachedRowEnd);
            let element = document.getElementById(String(index)) || null;
            if (!reachedRowEnd && element != null) {
                element.value = pressedChar;
                if (index % 5 === 0) {
                    reachedRowEnd = true;
                }
                index++;
            }

        } else if (pressedChar === 'Backspace') {

            if (index > 1) {
                console.log("Inside the backspace");
                let element = document.getElementById(String(index - 1)) || null;
                if (element != null && !(element.classList.contains("green") || element.classList.contains("red") || element.classList.contains("yellow"))) {
                    console.log("Deleting at" + index + " " + element.classList);
                    element.value = '';
                    index--;
                    reachedRowEnd = false;
                }
            }
        }
        console.log("Key Pressed - Exit");
    }

    //ref.addEventListener('keydown',keyPressed);

    useEffect(() => {

        document.addEventListener("keydown", keyPressed);
        // Unsubscribe on unmount
        return () => {
            document.removeEventListener("keydown", keyPressed
            );
        };
    }, []);


    function handleSubmit() {
        console.log("Handle Submit - Entry");
        //form the wordentered by users
        let first, second, third, fourth, fifth;
        first = document.getElementById(String((rowIndex * 5) + 1)) || null;
        second = document.getElementById(String((rowIndex * 5) + 2)) || null;
        third = document.getElementById(String((rowIndex * 5) + 3)) || null;
        fourth = document.getElementById(String((rowIndex * 5) + 4)) || null;
        fifth = document.getElementById(String((rowIndex * 5) + 5)) || null;

        //handle null exception or word length

        if (first == null || second == null || third == null || fourth == null || fifth == null)
            return;

        let wordEntered = first.value + second.value + third.value + fourth.value + fifth.value;

        if (wordEntered.length < 5) return;

        fetch(`http://localhost:8000/validate?param1=${wordEntered}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("validation result " + JSON.stringify(res));

                let isValid = res["1"] === "true" ? true : false;

                let rowNumber = "row" + String(rowIndex);
                let element = document.getElementById(rowNumber) || null;

                if (!isValid) {
                    element.classList.add("wordNotFound");
                    setTimeout(()=>{
                        element.classList.remove("wordNotFound");
                    },2000);
                    return;
                } else {
                    document.getElementById(rowNumber).classList.remove("wordNotFound");
                }
                console.log("Word Found")
                let count = 0;

                trialCount++;

                if (first.value === firstChar) {
                    first.className = "box green";
                    count++;
                } else if (first.value === firstChar || first.value === secondChar || first.value === thirdChar || first.value === fourthChar || first.value === fifthChar) {
                    first.classList.add("yellow");
                } else {
                    first.className = "box red";
                }

                if (second.value === secondChar) {
                    second.className = "box green";
                    count++;
                } else if (second.value === firstChar || second.value === secondChar || second.value === thirdChar || second.value === fourthChar || second.value === fifthChar) {
                    second.classList.add("yellow");
                } else
                    second.className = "box red";

                if (third.value === thirdChar) {
                    third.className = " box green";
                    count++;
                } else if (third.value === firstChar || third.value === secondChar || third.value === thirdChar || third.value === fourthChar || third.value === fifthChar) {
                    third.classList.add("yellow");
                } else
                    third.className = "box red";

                if (fourth.value === fourthChar) {
                    fourth.className = " box green";
                    count++;
                } else if (fourth.value === firstChar || fourth.value === secondChar || fourth.value === thirdChar || fourth.value === fourthChar || fourth.value === fifthChar) {
                    fourth.classList.add("yellow");
                } else
                    fourth.className = "box red";

                if (fifth.value === fifthChar) {
                    fifth.className = " box green";
                    count++;
                } else if (fifth.value === firstChar || fifth.value === secondChar || fifth.value === thirdChar || fifth.value === fourthChar || fifth.value === fifthChar) {
                    fifth.classList.add("yellow");
                } else
                    fifth.className = "box red";
                
                if (count === 5) {
                    setisSusccess(true);
                    setdisplayCount(trialCount);
                }
                 else if(trialCount === 5){
                    setisFailure(true);
                }
                else {

                    if(trialCount > 2){
                        document.getElementById("hint").style.display="flex";
                    }

                    let nextRow = "row" + String(rowIndex + 1);
                    console.log("Adding the visibility " + nextRow);
                    document.getElementById(nextRow).classList.add("visible");
                    reachedRowEnd = false;
                    rowIndex++;
                }
            });



        console.log("Handle Submit - Exit");
    }

    return (
        <div className='gameBox' id="boxplace">
            <div className="row" id="row0">
                <input type="text" id="1" className="box" readOnly={true} disabled={true}></input>
                <input type="text" id="2" className="box" disabled={true}></input>
                <input type="text" id="3" className="box" disabled={true}></input>
                <input type="text" id="4" className="box" disabled={true}></input>
                <input type="text" id="5" className="box" disabled={true}></input>
            </div>

            <div className="row" id="row1">
                <input type="text" id="6" className="box" disabled={true}></input>
                <input type="text" id="7" className="box" disabled={true}></input>
                <input type="text" id="8" className="box" disabled={true}></input>
                <input type="text" id="9" className="box" disabled={true}></input>
                <input type="text" id="10" className="box" disabled={true}></input>
            </div>

            <div className="row" id="row2">
                <input type="text" id="11" className="box" disabled={true}></input>
                <input type="text" id="12" className="box" disabled={true}></input>
                <input type="text" id="13" className="box" disabled={true}></input>
                <input type="text" id="14" className="box" disabled={true}></input>
                <input type="text" id="15" className="box" disabled={true}></input>
            </div>

            <div className="row" id="row3">
                <input type="text" id="16" className="box" disabled={true}></input>
                <input type="text" id="17" className="box" disabled={true}></input>
                <input type="text" id="18" className="box" disabled={true}></input>
                <input type="text" id="19" className="box" disabled={true}></input>
                <input type="text" id="20" className="box" disabled={true}></input>
            </div>

            <div className="row" id="row4">
                <input type="text" id="21" className="box" disabled={true}></input>
                <input type="text" id="22" className="box" disabled={true}></input>
                <input type="text" id="23" className="box" disabled={true}></input>
                <input type="text" id="24" className="box" disabled={true}></input>
                <input type="text" id="25" className="box" disabled={true}></input>
            </div>
            {
                showHint ? <div id="hint" className="hintClass">
                    <h3>Def: {hintDef}</h3>
                    <p>({hintPOS})</p>
                </div> : <div></div>
            }
            {
                isSuccess ? <p> You got it right!!! {displayCount}/5</p> : isFailure ? <p> Better luck next time !!</p> :
                    <button type='button' className="submitWord" onClick={handleSubmit}>Submit</button>
            }


        </div>
    )
}

export default GameBox;