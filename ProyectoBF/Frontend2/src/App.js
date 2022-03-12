import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import bgvideo from "./video/pexels-polina-tankilevitch-5585939.mp4"

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

function App() {
    return (
        <>
            <AppContainer>
                <AccountBox />
            </AppContainer>

            <div className='banner' >
                <video
                    id="videoBG" poster="./img/poster.png"
                    autoPlay
                    loop
                    muted
                >
                    <source src={bgvideo} type="video/mp4"></source>
                </video>
            </div>
        </>

    );
}


export default App;
