import MainScreen from "./screens/MainScreen"
import "./App.css"
import { Route, Routes } from "react-router";
import Settings from "./screens/Settings";
import { AppState } from "./context/AppContext";

function App() {
  const { vibrations } = AppState();
console.log(vibrations)
  return (

    <div className="App" >
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
    </div>
  );
}

export default App;
