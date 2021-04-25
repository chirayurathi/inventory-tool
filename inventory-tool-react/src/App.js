import React,{useState} from 'react'
import './App.css';
import Content from './containers/Content/Content';
import LoginPage from './containers/LoginPage/LoginPage'

function App() {
  const [AuthToken,setAuthToken] = useState(localStorage.getItem('AuthToken'))
  return (
    <div className="App">
      {AuthToken?<Content/>:<LoginPage setAuthToken={setAuthToken}/>}
    </div>
  );
}

export default App;
