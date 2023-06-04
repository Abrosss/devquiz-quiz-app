
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import { useEffect } from "react";
import User from './context/User.jsx'
import Cookies from 'js-cookie';


import Tests from './pages/AllTests/AllTests'
import AllQuestions from "./pages/AllQuestions/AllQuestions";
import AddQuiz from './pages/AddQuiz/AddQuiz'
import Login from "./pages/Login/Login";
import { useState } from "react";
function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const authToken = Cookies.get('auth_token');

    if (authToken) {
      setLoggedIn(true)
   
    } 
  }, []);
  return (
    <User>
<Router>
<Routes>
<Route path='/admin/tests/:quizID' element={<AllQuestions loggedIn={true} />}/>
<Route path='/admin/tests/addTest' element={<AddQuiz/>}/>
<Route path='/admin/tests' element={<Tests loggedIn={true} />}/>
<Route path='/tests/:quizID' element={<AllQuestions />}/>
<Route path='/tests' element={<Tests />}/>
<Route path='/login' element={<Login />}/>
</Routes>

</Router>
</User>
  )

 
}

export default App;
