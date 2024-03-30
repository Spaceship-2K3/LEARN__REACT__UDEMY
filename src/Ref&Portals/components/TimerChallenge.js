import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
    const timer = useRef();
    const dialog = useRef();
    // todo : xem thời gian còn lại
    const [timeRemaining, seTimeRemaining] = useState(targetTime * 1000);
    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        seTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            seTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                remainingTime={timeRemaining}
                targetTime={targetTime}
                onReset={handleReset}
            />

            <div className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timeIsActive ? "active" : undefined}>
                    {timeIsActive ? "Time is running" : " Timer inactive"}
                </p>
            </div>
        </>
    );
};

export default TimerChallenge;
