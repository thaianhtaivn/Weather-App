import './App.css';
import {Routes,Route} from "react-router-dom";
import Left from './components/Left';
import Middle from './components/Middle';
import Right from './components/Right';
import About from './components/About';
import Message from './components/Message';
import { useState } from 'react';
import Home from './components/Home';

function App() {
  
  const [day, setDay] = useState(new Date().toLocaleDateString().replace(/\//g,""));

  return (
    <div className="App app-container container-fluid">
      <div className="row main-row">

        <Left></Left>

          <Routes>
            <Route path="/" element={ <Home/> } exact></Route>
            <Route path={"/dashboard/:date"} element={<Middle day={day}/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="*" element={<Message/>}></Route>
          </Routes>
        
        <Right setDay={setDay}></Right>

      </div>
    </div>
  );
}

export default App;
