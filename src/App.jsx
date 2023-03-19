
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Quiz from './pages/Quiz/QuizPage'
import AllTests from './pages/AllTests/AllTests'
import Login from "./pages/Login/Login";
import AddTheme from "./pages/AddTest/AddTheme";
import EditTest from "./pages/EditTest/EditTest";
function App() {
  return (
<Router>
<Routes>
<Route path='/tests/edit/:testId' element={<EditTest />}/>
<Route path='/tests/:testCategory' element={<Quiz />}/>
<Route path='/login' element={<Login />}/>
<Route path='/addTest' element={<AddTheme />}/>
<Route path='/' element={<AllTests />}/>

</Routes>

</Router>
  )

 
}

export default App;
