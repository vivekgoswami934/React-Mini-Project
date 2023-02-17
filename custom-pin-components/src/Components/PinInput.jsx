import React, { forwardRef } from "react";

const PinInput = forwardRef(
  (
    {
      perInputBox,
      onChangeHandler,
      correctPassword,
      disabledBool,
      backspaceHandler,
    },
    ref
  ) => {
    const handleKeyUp = (e) => {
      //if the user has clicked on the backspace button,
      //then invoke the backspaceHandler
      //else the default onChangeHandler
      if (e.keyCode === 8) {
        //backspace logic
        backspaceHandler(e);
      } else {
        onChangeHandler(e);
      }
    };

    return (
      <input
        className={correctPassword && "green"}
        ref={ref}
        maxLength={perInputBox}
        onKeyUp={handleKeyUp}
        disabled={disabledBool}
        //   onChange={onChangeHandler}
      />
    );
  }
);

export default PinInput;
