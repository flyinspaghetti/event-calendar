import React,{ useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Responsive.css';


import MyCalendar from './components/MyCalendar';
import SideNavBar from './components/SideNavBar';


function App() {

const [myStyle,setMyStyle]=useState({
    '--event-bg-': '#ee5011',
    '--theme-color':'#ff6a50',
  '--today-bg-color':'#fbd0c2',

  })
  const toggleStyle=()=>{
    if(myStyle["--theme-color"]==='#ff6a50'){
      setMyStyle({
        '--event-bg-color': '#9a6bff',
        '--theme-color':'#985bfa',
       '--today-bg-color':'#e7caff',
      })
    }
    if(myStyle["--theme-color"]=== '#985bfa'){
      setMyStyle({
        '--event-bg-color': '#ee5011',
        '--theme-color':'#ff6a50',
      })
    }
  }

  
  return (
   
    <div  className="app" style={myStyle}>
    <SideNavBar  toggleStyle={toggleStyle}/>
    <MyCalendar  className='p-4' style={myStyle} />

    </div>
  );
}

export default App;
