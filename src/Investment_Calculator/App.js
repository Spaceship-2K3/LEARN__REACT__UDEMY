import "./index.css";
import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";
import { useState } from "react";
function App() {
    // todo : state de quan ly cac truong nhap input
    // ? tai sao lai can phai life up state len nhi
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    const inputIsValid = userInput.duration >= 1;

    const handleChange = (inputIdentifier, newValue) => {
        setUserInput((prevUserInput) => {
            return {
                ...prevUserInput,
                [inputIdentifier]: +newValue,
            };
        });
    };
    return (
        <>
            <Header />
            <UserInput onChange={handleChange} userInput={userInput} />
            {!inputIsValid && (
                <p className="center">
                    Please enter a duration greater than zero.
                </p>
            )}
            {inputIsValid && <Results input={userInput} />}
        </>
    );
}

export default App;
