
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import './styles.css'




import Tests from './pages/AllTests/AllTests'
import QuizPage from "./pages/AllQuestions/QuizPage";
import AddQuiz from './pages/AddQuiz/AddQuiz'
function App() {
  return (
<Router>
<Routes>
<Route path='/admin/tests/:quizID' element={<QuizPage isAdmin={true} />}/>
<Route path='/admin/tests/addTest' element={<AddQuiz/>}/>
<Route path='/admin/tests' element={<Tests isAdmin={true} />}/>
<Route path='/tests/:quizID' element={<QuizPage isAdmin={false} />}/>
<Route path='/tests' element={<Tests isAdmin={false} />}/>

</Routes>

</Router>
  )

 
}

export default App;
