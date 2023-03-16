
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Quiz from './pages/Quiz'
function App() {
  return (
<Router>
<Routes>

<Route path='/tests/:testCategory' element={<Quiz />}/>



</Routes>

</Router>
  )

 
}

export default App;
