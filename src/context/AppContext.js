import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [vibrations, setVibrations] = useState(false);
    const [fsminDistance, setfsMinDistance] = useState(0)
    const [fsmaxDistance, setFsMaxDistance] = useState(0)
    const [bsminDistance, setbsMinDistance] = useState(0)
    const [bsmaxDistance, setbsMaxDistance] = useState(0)
    const [inputval1, setInputval1] = useState()
    const [inputval2, setInputval2] = useState()
    const [inputval3, setInputval3] = useState()
    const [inputval4, setInputval4] = useState()
    const [speechpause, setSpeechpause] = useState(true)
    const [buzzer, setbuzzer] = useState(false)
    const [speechpause2, setSpeechpause2] = useState(true)
    const [buzzer2, setbuzzer2] = useState(false)
    const [voiceState, setVoiceState] = useState(false)
    const [frontsensor, setfrontsensor] = useState(false)
    const [backsensor, setbacksensor] = useState(false)
    const [Motor1, setMotor1] = useState(false)
    const [Motor2, setMotor2] = useState(false)

  return (
    <AppContext.Provider
      value={{isChecked, setIsChecked,vibrations,setVibrations,fsminDistance,setfsMinDistance,fsmaxDistance,setFsMaxDistance,bsminDistance, setbsMinDistance,bsmaxDistance, setbsMaxDistance,inputval1,setInputval1,inputval2, setInputval2,inputval3, setInputval3,inputval4, setInputval4,speechpause, setSpeechpause,buzzer, setbuzzer,speechpause2, setSpeechpause2,buzzer2, setbuzzer2,voiceState, setVoiceState,frontsensor, setfrontsensor,backsensor, setbacksensor,Motor1, setMotor1,Motor2, setMotor2
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;