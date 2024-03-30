import Header from "./components/Header.js";
import Player from "./components/Player.js";
import TimerChallenge from "./components/TimerChallenge.js";
import "./index.css";
function App() {
    return (
        <>
            <div id="content">
                <Header />
                <Player />
                <div id="challenges">
                    <TimerChallenge title={"Easy"} targetTime={1} />
                    <TimerChallenge title={"Not Easy"} targetTime={5} />
                    <TimerChallenge title={"Getting tough"} targetTime={10} />
                    <TimerChallenge title={"Pros Only"} targetTime={15} />
                </div>
            </div>
        </>
    );
}

export default App;
