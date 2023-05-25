
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import './styles.css'




import Tests from './pages/AllTests/AllTests'
import AllQuestions from "./pages/AllQuestions/AllQuestions";
import AddQuiz from './pages/AddQuiz/AddQuiz'
function App() {
  return (
<Router>
<Routes>
<Route path='/admin/tests/:quizID' element={<AllQuestions isAdmin={true} />}/>
<Route path='/admin/tests/addTest' element={<AddQuiz/>}/>
<Route path='/admin/tests' element={<Tests isAdmin={true} />}/>
<Route path='/tests/:quizID' element={<AllQuestions isAdmin={false} />}/>
<Route path='/tests' element={<Tests isAdmin={false} />}/>

</Routes>

</Router>
  )

 
}

export default App;
