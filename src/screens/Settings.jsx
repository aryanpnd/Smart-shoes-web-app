import React from "react";
import './style2.css'
import { useNavigate } from "react-router";
import { AppState } from "../context/AppContext";
import { getDatabase, ref, set } from "firebase/database";


function Settings() {

    const navigate = useNavigate();
    const { vibrations,setVibrations,speechpause, setSpeechpause,buzzer, setbuzzer,buzzer2, setbuzzer2,speechpause2, setSpeechpause2,voiceState, setVoiceState,frontsensor, setfrontsensor,backsensor, setbacksensor,Motor1, setMotor1,Motor2, setMotor2 } = AppState()

    const writeVariableData=(val,valData) =>{
        const db = getDatabase();
        set(ref(db, 'variables/'+val), {
            val:valData
        });
      }
     
      const handleFrontSensor = ()=>{
        frontsensor?setfrontsensor(false):setfrontsensor(true)
        frontsensor?writeVariableData("fsensor",0):writeVariableData("fsensor",1)
      }
      const handleBackSensor = ()=>{
        backsensor?setbacksensor(false):setbacksensor(true)
        backsensor?writeVariableData("bsensor",0):writeVariableData("bsensor",1)
      }
      const handleMotor1 = ()=>{
        Motor1?setMotor1(false):setMotor1(true)
        Motor1?writeVariableData("Motor1",0):writeVariableData("Motor1",1)
      }
      const handleMotor2 = ()=>{
        Motor2?setMotor2(false):setMotor2(true)
        Motor2?writeVariableData("Motor2",0):writeVariableData("Motor2",1)
      }



    const handleVoices = ()=>{
        setSpeechpause(true)
        setbuzzer(true)
        setSpeechpause2(true)
        setbuzzer2(true)
        setVoiceState(false)
    }

    return (
        <div className='settingScreen slideAnim3 '>

            <div className="settingTopbar ">
                <div onClick={() => { navigate("/") }} className="backIcon"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <g id="Complete">
                        <g id="arrow-left">
                            <g>
                                <polyline data-name="Right" fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
                                <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} x1="21.5" x2="4.8" y1={12} y2={12} />
                            </g>
                        </g>
                    </g>
                </svg></div>

                <div className="settingHeading">
                    Settings
                </div>

                <div>

                </div>
            </div>
            <hr />

            <div className="settingOptions">

                <div className="options">
                    <h2>1</h2>
                    <h2>Vibration</h2>
                    <button style={{ background: vibrations ? "#88bf49" : "#e91e63" }} onClick={() => { vibrations ? setVibrations(false) : setVibrations(true) }}>{vibrations ? "On" : "Off"}</button>
                </div>

                <div className="options">
                    <h2>2</h2>
                    <h2>Front Sensor</h2>
                    <button style={{ background: frontsensor ? "#88bf49" : "#e91e63" }} onClick={handleFrontSensor}>{frontsensor ? "On" : "Off"}</button>
                </div>

                <div className="options">
                    <h2>3</h2>
                    <h2>Back Sensor</h2>
                    <button style={{ background: backsensor ? "#88bf49" : "#e91e63" }} onClick={handleBackSensor}>{backsensor ? "On" : "Off"}</button>
                </div>

                <div className="options">
                    <h2>4</h2>
                    <h2>Motors 1</h2>
                    <button style={{ background: Motor1 ? "#88bf49" : "#e91e63" }} onClick={handleMotor1}>{Motor1 ? "On" : "Off"}</button>
                </div>

                <div className="options">
                    <h2>5</h2>
                    <h2>Motor 2</h2>
                    <button style={{ background: Motor2 ? "#88bf49" : "#e91e63" }} onClick={handleMotor2}>{Motor2 ? "On" : "Off"}</button>
                    {/* <div className="toggle-switch">
                        <input className="toggle-input" id="toggle5" type="checkbox" />
                        <label className="toggle-label" htmlFor="toggle5" />
                    </div> */}
                </div>

                <div className="options">
                    <h2>6</h2>
                    <h2>Voice Alerts</h2>
                    <button style={{ background: (buzzer === false || speechpause === false ||speechpause2==false ||buzzer2==false) ? "#88bf49" : "#e91e63" }} onClick={handleVoices}>{(buzzer === false || speechpause === false ||speechpause2==false ||buzzer2==false) ? "On" : "Off"}</button>
                </div>

            </div>



        </div>

    )
}

export default Settings