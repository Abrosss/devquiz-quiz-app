
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Quiz from './pages/Quiz'
import Categories from './pages/Categories'
function App() {
  return (
<Router>
<Routes>

<Route path='/tests/:testCategory' element={<Quiz />}/>

<Route path='/' element={<Categories />}/>

</Routes>

</Router>
  )

 
}

export default App;
