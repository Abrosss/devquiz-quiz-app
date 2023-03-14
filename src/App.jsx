
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Test from './Test'
import Categories from './Categories'
import AddTheme from "./AddTheme";
function App() {
  return (
<Router>
<Routes>
<Route path='/addTest' element={<AddTheme />}/>
<Route path='/tests/:testCategory' element={<Test />}/>
<Route path='/categories' element={<Categories />}/>


</Routes>

</Router>
  )

 
}

export default App;
