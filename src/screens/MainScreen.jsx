// import React, { useEffect, useState } from "react";
// import { useSpeechSynthesis } from "react-speech-kit";
// import { db } from "../utils/firebase";
// import { onValue, ref } from "firebase/database";
// import buzzer1 from '../assets/buzzer1.wav'
// import TTS from "../components/TTS";

// function Projects() {
//     const [projects, setProjects] = useState([]);
//     const { speak, cancel } = useSpeechSynthesis();
//     const [minDistance, setMinDistance] = useState(5)
//     const [maxDistance, setMaxDistance] = useState(30)
//     const [speechpause, setSpeechpause] = useState(false)
//     const [buzzer, setbuzzer] = useState(false)

//     useEffect(() => {
//         const query = ref(db, "ultrasonic");
//         return onValue(query, (snapshot) => {
//             const data = snapshot.val();

//             if (snapshot.exists()) {
//                 Object.values(data).map((project) => {
//                     setProjects(project);
//                 });
//             }
//         });
//     }, []);

//     const handlePause = () => {
//         speechpause?setSpeechpause(false):setSpeechpause(true)
//         cancel()
//     }
//     const handleBuzzer = () => {
//         buzzer?setbuzzer(false):setbuzzer(true)
//     }

//     useEffect(() => {
//         if (!speechpause) {
//             if (projects < maxDistance || projects > minDistance) {
//                 speak({ text: `The object is ${projects} centimeters away` });
//             } else {
//                 cancel()
//             }
//         }
//     }, [projects]);

//     useEffect(() => {
//         if (!buzzer) {
//             if (projects < maxDistance || projects > minDistance) {
//                 const audio = new Audio(buzzer1);
//                 audio.play();
//             } else {
//                 return
//             }
//         }
//     }, [projects]);

//     console.log(projects)

//     return (
//         <div >
//             <h1>{projects}</h1>
//             <button onClick={handlePause}>pause speech</button>
//             <button onClick={handleBuzzer}>pause buzzer</button>
//         </div>
//     );
// }

// export default Projects;



import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import buzzer1 from '../assets/buzzer1.wav'
import TTS from "../components/TTS";
import logo from '../assets/logo.png'
import './style.css'
function Projects() {
    const [projects, setProjects] = useState([]);
    const { speak, cancel } = useSpeechSynthesis();
    const [minDistance, setMinDistance] = useState(5)
    const [maxDistance, setMaxDistance] = useState(30)
    const [inputval1, setInputval1] = useState()
    const [inputval2, setInputval2] = useState()
    const [speechpause, setSpeechpause] = useState(true)
    const [buzzer, setbuzzer] = useState(false)

    useEffect(() => {
        const query = ref(db, "ultrasonic");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                
                Object.values(data).map((project) => {
                    setProjects(project);
                    
                });
            }
        });
    }, []);

    const handlePause = () => {
        speechpause ? setSpeechpause(false) : setSpeechpause(true)
        cancel()
    }
    const handleBuzzer = () => {
        buzzer ? setbuzzer(false) : setbuzzer(true)
    }

    const handleSet1 = ()=>{setMaxDistance(inputval1)}
    const handleSet2 = ()=>{setMinDistance(inputval2)}

    useEffect(() => {
        if (!speechpause) {
            if (projects < maxDistance && projects > minDistance) {
                speak({ text: `The object is ${Math.round(projects)} centimeters away` });
            } else {
                cancel()
            }
        }
    }, [projects]);

    useEffect(() => {
        if (!buzzer) {
            if (projects < maxDistance || projects > minDistance) {
                const audio = new Audio(buzzer1);
                audio.play();
            } else {
                return
            }
        }
    }, [projects]);

    console.log(projects)

    return (
        <div className="mainScreen">
            <div className="componentsScreen">

                <div className="heading1" >
                    <img src={logo} alt="" style={{height:"6rem"}}/>
                    <div>Smart Shoes</div>
                </div>

                <div className="distance">
                    <div style={{fontSize:"1.2rem"}}>obstacle distance</div>
                    <div style={{fontSize:"4.8rem"}}>{(projects < maxDistance && projects > minDistance)?
                    Math.round(projects):""
                    } cm</div>
                </div>

                <div className="mediaButtons">
                    <button onClick={handlePause}>{speechpause? "play":"pause"} speech</button><br />
                    <button onClick={handleBuzzer}>{buzzer? "play":"pause"} buzzer</button>
                </div>

                <div className="manageDistance">
                    <div style={{fontWeight:"bolder"}}>Manage distance</div>
                    <div className="distanceInputs">
                        <input onChange={(e)=>{setInputval1(e.target.value)}} class="input" placeholder="Maximum in cm" type="number" /><button onClick={handleSet1} style={{marginLeft:"2rem"}}>SET</button><br />
                    </div>
                    <div className="distanceInputs">
                        <input onChange={(e)=>{setInputval2(e.target.value)}} class="input" placeholder="Minimum in cm" type="number" /><button onClick={handleSet2} style={{marginLeft:"2rem"}}>SET</button><br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
