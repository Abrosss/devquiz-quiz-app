
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import User from './context/User.jsx'
import Tests from './pages/AllTests'
import AllQuestions from "./pages/AllQuestions";
import EditableQuiz from "./pages/AdminPages/EditableQuiz";
import AddQuiz from './pages/AdminPages/AddQuiz'
import Login from "./pages/Login";

function App() {

  return (

<Router>
<Routes>
<Route path='/admin/tests/:quizID' element={<EditableQuiz />}/>
<Route path='/admin/tests/addTest' element={<AddQuiz/>}/>
<Route path='/admin/tests' element={<Tests/>}/>
<Route path='/tests/:quizID' element={<AllQuestions />}/>

<Route path='/login' element={<Login />}/>
<Route path='/' element={<Tests loggedIn={false} />}/>
</Routes>

</Router>

  )

 
}

export default App;
