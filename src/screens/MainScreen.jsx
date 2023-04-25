import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { db } from "../utils/firebase";
import { getDatabase, onValue, ref, set } from "firebase/database";
import buzzer1 from '../assets/buzzer1.wav'
import buzzer22 from '../assets/buzzer2.wav'
import TTS from "../components/TTS";
import logo from '../assets/logo.png'
import './style.css'
import { useNavigate } from "react-router";
import { AppState } from "../context/AppContext";
function Projects() {

    const { isChecked, setIsChecked, vibrations, fsminDistance, setfsMinDistance, fsmaxDistance, setFsMaxDistance, inputval1, setInputval1, inputval2, setInputval2,
        bsminDistance, setbsMinDistance, bsmaxDistance, setbsMaxDistance, inputval3, setInputval3, inputval4, setInputval4, speechpause, setSpeechpause, buzzer, setbuzzer, speechpause2, setSpeechpause2, buzzer2, setbuzzer2, frontsensor, backsensor, setfrontsensor, setbacksensor } = AppState();

    const [projects, setProjects] = useState([]);
    const [projects2, setProjects2] = useState([]);
    const { speak, cancel } = useSpeechSynthesis();


    const [manageDisance1, setManageDisance1] = useState(false)
    const [manageDisance2, setManageDisance2] = useState(false)

    const navigate = useNavigate();


    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            // execute commands for check state
            setfrontsensor(false)
            setbacksensor(false)
        } else {
            setTimeout(() => {
                setfrontsensor(true)
                setbacksensor(true)
            }, 400);
            setIsChecked(false);
            // execute commands for uncheck state
        }
    }


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
    useEffect(() => {
        const query = ref(db, "ultrasonic2");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {

                Object.values(data).map((project) => {
                    setProjects2(project);

                });
            }
        });
    }, []);

    useEffect(() => {
        const query = ref(db, "variables/fs1");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {

                Object.values(data).map((project) => {
                    setFsMaxDistance(project);

                });
            }
        });
    }, []);
    useEffect(() => {
        const query = ref(db, "variables/fs2");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {

                Object.values(data).map((project) => {
                    setfsMinDistance(project);

                });
            }
        });
    }, []);

    useEffect(() => {
        const query = ref(db, "variables/bs1");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {

                Object.values(data).map((project) => {
                    setbsMaxDistance(project);

                });
            }
        });
    }, []);
    useEffect(() => {
        const query = ref(db, "variables/bs2");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {

                Object.values(data).map((project) => {
                    setbsMinDistance(project);

                });
            }
        });
    }, []);

    const handlePause = () => {
        setbuzzer(false)
        speechpause ? setSpeechpause(false) : setSpeechpause(true)
        cancel()
    }
    const handleBuzzer = () => {
        setSpeechpause(false)
        buzzer ? setbuzzer(false) : setbuzzer(true)
    }

    const handlePause2 = () => {
        setbuzzer2(false)
        speechpause2 ? setSpeechpause2(false) : setSpeechpause2(true)
        cancel()
    }
    const handleBuzzer2 = () => {
        setSpeechpause2(false)
        buzzer2 ? setbuzzer2(false) : setbuzzer2(true)
    }

    const handleFrontSet1 = () => { return (setFsMaxDistance(inputval1), writeVariableData("fs1", inputval1)) }
    const handleFrontSet2 = () => { return (setfsMinDistance(inputval2), writeVariableData("fs2", inputval2)) }

    const handleBackSet1 = () => { return (setbsMaxDistance(inputval3), writeVariableData("bs1", inputval3)) }
    const handleBackSet2 = () => { return (setbsMinDistance(inputval4), writeVariableData("bs2", inputval4)) }


    const writeVariableData = (val, valData) => {
        const db = getDatabase();
        set(ref(db, 'variables/' + val), {
            val: parseInt(valData)
        });
    }

    useEffect(() => {
        if (!speechpause && frontsensor) {
            if (projects < fsmaxDistance && projects > fsminDistance) {
                speak({ text: `The object is ${Math.round(projects)} centimeters away` });
                if (vibrations === true) {
                    if ("vibrate" in navigator) {
                        navigator.vibrate(500);
                    }
                }
            } else {
                cancel()
            }
        }
    }, [projects]);


    useEffect(() => {
        if (!buzzer && frontsensor) {
            if (projects < fsmaxDistance && projects > fsminDistance) {
                const audio = new Audio(buzzer1);
                audio.play();

                if (vibrations) {
                    if ("vibrate" in navigator) {
                        navigator.vibrate(500);
                    }
                }
            } else {
                return
            }
        }
    }, [projects]);


    useEffect(() => {
        if (!speechpause2 && backsensor) {
            if (projects2 < bsmaxDistance && projects2 > bsminDistance) {
                speak({ text: `The object is ${Math.round(projects2)} centimeters backwards` });
                if (vibrations === true) {
                    if ("vibrate" in navigator) {
                        navigator.vibrate(500);
                    }
                }
            } else {
                cancel()
            }
        }
    }, [projects2]);


    useEffect(() => {
        if (!buzzer2 && backsensor) {
            if (projects2 < bsmaxDistance && projects2 > bsminDistance) {
                const audio = new Audio(buzzer22);
                audio.play();

                if (vibrations) {
                    if ("vibrate" in navigator) {
                        navigator.vibrate(500);
                    }
                }
            } else {
                return
            }
        }
    }, [projects2]);


    const toggleMD1 = () => {
        setManageDisance2(false)
        manageDisance1 ? setManageDisance1(false) : setManageDisance1(true)
    }
    const toggleMD2 = () => {
        setManageDisance1(false)
        manageDisance2 ? setManageDisance2(false) : setManageDisance2(true)
    }

    return (
        <div className="mainScreen slideAnim3">
            <div onClick={() => { navigate("/settings") }} className="settingIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
            </div>

            {/* ----------------------------SWITCH--------------------------------------- */}
            <div style={{ display: (frontsensor == true || backsensor == true) ? "none" : "", position: "absolute", bottom: "25%" }}>

                <label className="switch">
                    <input onChange={handleCheckboxChange} defaultChecked="checked" type="checkbox" />
                    <div className="button">
                        <div className="light" />
                        <div className="dots" />
                        <div className="characters" />
                        <div className="shine" />
                        <div className="shadow" />
                    </div>
                </label>
            </div>

            {/* ------------------------------------------------------------------------ */}
            <div className="componentsScreen">

                <div className="heading1" >
                    <img src={logo} alt="" style={{ height: "6rem" }} />
                    <div>Smart Shoes</div>
                </div>



                <div className="distance ">

                    <div style={{ display: (frontsensor == true && backsensor == true) ? "" : "none", fontSize: "1.2rem" }}>obstacle distance
                    </div>

                    <div style={{ justifyContent: (frontsensor == true && backsensor == true) ? "" : "center" }} className="distanceMeter">

                        <div className="sensorCards slideAnim" style={{ display: frontsensor ? "block" : "none", fontSize: "1.8rem" }}>
                            <div className="cardsHead" >
                                Front
                                <div onClick={toggleMD1} className="editsvg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                </div>
                            </div>
                            <hr />
                            <div style={{
                                display: "flex",
                                position: "relative",
                                height: '54%',
                                flexDirection: "column",
                                justifyContent: "space-around",
                                color: "whitesmoke"
                            }}>
                                <div style={{ fontSize: "4rem" }}>
                                    {Math.round(projects)}
                                </div>
                                <div>cm</div>
                                <div style={{ fontSize: "0.8rem" }}>
                                    <div>Max:{fsmaxDistance}</div>
                                    <div>Min:{fsminDistance}</div>
                                </div>

                            </div>
                        </div>


                        <div className="sensorCards slideAnim3" style={{ display: backsensor ? "block" : "none", fontSize: "1.8rem" }}>
                            <div className="cardsHead" >
                                Back
                                <div onClick={toggleMD2} className="editsvg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                </div>
                            </div>
                            <hr />
                            <div style={{
                                display: "flex",
                                position: "relative",
                                height: '54%',
                                flexDirection: "column",
                                justifyContent: "space-around",
                                color: "whitesmoke"
                            }}>
                                <div style={{ fontSize: "4rem" }}>
                                    {Math.round(projects2)}
                                </div>
                                <div>cm</div>
                                <div style={{ fontSize: "0.8rem" }}>
                                    <div>Max:{bsmaxDistance}</div>
                                    <div>Min:{bsminDistance}</div>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>

                <div style={{ display: (manageDisance1 || manageDisance2) ? "none" : "flex" }} className="mediaButtons slideAnim">
                    <div style={{ display: frontsensor ? "block" : "none" }}>
                        <button style={{ background: speechpause ? "#e91e63" : "" }} onClick={handlePause}>speech {speechpause ? "paused" : "On"}
                        </button><br />
                        <button style={{ background: buzzer ? "#e91e63" : "" }} onClick={handleBuzzer}>buzzer {buzzer ? "paused" : "On"}</button>
                    </div>

                    <div style={{ display: backsensor ? "block" : "none" }}>
                        <button style={{ background: speechpause2 ? "#e91e63" : "" }} onClick={handlePause2}>speech {speechpause2 ? "paused" : "On"}
                        </button><br />
                        <button style={{ background: buzzer2 ? "#e91e63" : "" }} onClick={handleBuzzer2}>buzzer {buzzer2 ? "paused" : "On"}</button>
                    </div>
                </div>




                <div style={{ display: manageDisance1 ? "flex" : "none" }} className="manageDistance slideAnim">
                    <div style={{ fontWeight: "bolder" }}>Manage distance for front sensor</div>
                    <div className="distanceInputs">
                        <input onChange={(e) => { setInputval1(e.target.value) }} class="input" placeholder="Maximum in cm" type="number" /><button onClick={handleFrontSet1} style={{ marginLeft: "2rem" }}>SET</button><br />
                    </div>
                    <div className="distanceInputs">
                        <input onChange={(e) => { setInputval2(e.target.value) }} class="input" placeholder="Minimum in cm" type="number" /><button onClick={handleFrontSet2} style={{ marginLeft: "2rem" }}>SET</button><br />
                    </div>
                </div>



                <div style={{ display: manageDisance2 ? "flex" : "none" }} className="manageDistance slideAnim">
                    <div style={{ fontWeight: "bolder" }}>Manage distance for Back sensor</div>
                    <div className="distanceInputs">
                        <input onChange={(e) => { setInputval3(e.target.value) }} class="input" placeholder="Maximum in cm" type="number" /><button onClick={handleBackSet1} style={{ marginLeft: "2rem" }}>SET</button><br />
                    </div>
                    <div className="distanceInputs">
                        <input onChange={(e) => { setInputval4(e.target.value) }} class="input" placeholder="Minimum in cm" type="number" /><button onClick={handleBackSet2} style={{ marginLeft: "2rem" }}>SET</button><br />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Projects;
