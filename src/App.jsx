
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import { useEffect } from "react";
import User from './context/User.jsx'



import Tests from './pages/AllTests/AllTests'
import AllQuestions from "./pages/AllQuestions/AllQuestions";
import QuizPage from "./pages/User/QuizPage/QuizPage";
import AddQuiz from './pages/AddQuiz/AddQuiz'
import Login from "./pages/Login/Login";
import { useState } from "react";
function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <User>
<Router>
<Routes>
<Route path='/admin/tests/:quizID' element={<AllQuestions />}/>
<Route path='/admin/tests/addTest' element={<AddQuiz/>}/>
<Route path='/admin/tests' element={<Tests/>}/>
<Route path='/tests/:quizID' element={<AllQuestions />}/>

<Route path='/login' element={<Login />}/>
<Route path='/' element={<Tests loggedIn={false} />}/>
</Routes>

</Router>
</User>
  )

 
}

export default App;
