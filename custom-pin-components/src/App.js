import { useState } from "react";
import "./App.css";
import Pin from "./Components/Pin";

//admin
function App() {
  const [pinInput, setPinInput] = useState(""); //12345

  return (
    <div className="App">
      <h1>React Pin</h1>
      <Pin length={5} perInputBox={3} setPin={setPinInput} />
      OTP is {pinInput}
    </div>
  );
}

export default App;
