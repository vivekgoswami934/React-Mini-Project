import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import PinInput from "./PinInput";

const Pin = ({ length, perInputBox = 1, setPin }) => {  //default parameter

  const [inputBoxLength] = useState(new Array(length).fill("")); // ["" , "" , ""]

  const [inputBoxValue] = useState(new Array(length).fill(""));

  const [isCorrect, setIsCorrect] = useState(false);


  const inputRef = useRef([]);

  const onChangeHandler = (e, index) => {
    inputBoxValue[index] = e.target.value;
    if (index < length - 1 && inputRef.current[index].value.length === perInputBox) {                       //
      inputRef.current[index + 1].focus();
    }
    setPin(inputBoxValue.join(""));

    if (inputBoxValue.join("") === "admin") {
      setIsCorrect(true);
    }
  };

  const backspaceHandler = (e, index) => {

    if (index > 0 && e.target.value === "") {
      inputRef.current[index - 1].focus();
    }
    inputBoxValue[index] = e.target.value;
    setPin(inputBoxValue.join(""));

    if (inputBoxValue.join("") !== "admin") {
      setIsCorrect(false);
    }

  };

  const handlePaste = (e) => {
    e.preventDefault();

    const data = e.clipboardData.getData("text").split("").filter((_, index) => index < length * perInputBox);

    console.log(data)

    let value = []

   

    for (let i = 0; i < length* perInputBox ; i += perInputBox) {
      let str = ""
      for (let j = i; j < perInputBox+i; j++) {
        str += data[j]
      }
      value.push(str)
    }

    console.log(value)

    // ["abc" , "def" , "ghi" , "ijk" , lmn]  abcdefghijklmno

    value.forEach((item, index) => {
      inputBoxValue[index] = item;

      inputRef.current[index].value = item;

      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });

  
    setPin(inputBoxValue.join(""))

  };



  return (
    <div onPaste={handlePaste} style={{border : "2px solid black"}}>
      {inputBoxLength.map((item, index) => {
        return (
          <PinInput
            ref={(inputRefElement) => {
              inputRef.current[index] = inputRefElement;
            }}
            // disabledBool={}
            correctPassword={isCorrect}
            key={index}
            onChangeHandler={(e) => onChangeHandler(e, index)}
            perInputBox={perInputBox}
            backspaceHandler={(e) => backspaceHandler(e, index)}
          />
        );
      })}
    </div>
  );
};

//focus -> .focus() -> DOM element -> useRef

export default Pin;

Pin.propTypes = {
  length: PropTypes.number.isRequired,
  perInputBox: PropTypes.number,
};

//isRequired

// <div ref={refenceVariable}></div>
// refenceVariable = div DOM element

// <button ref={buttonRef}>
// buttonRef = button DOM element

/*

inputRef =  <input 3 ref={inputRef}/>

<input 1  />

<input 2 />

<input 3 ref={inputRef}/>

*/

// let array = 'Masai', 'Masai school', 'Bangalore'


// e.target.value.length > 3 && 




//event bubbling  capturing