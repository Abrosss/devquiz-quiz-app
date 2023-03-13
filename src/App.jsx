
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Test from './Test'
import Categories from './Categories'

function App() {
  return (
<Router>
<Routes>
<Route path='/tests/:testCategory' element={<Test />}/>
<Route path='/categories' element={<Categories />}/>


</Routes>

</Router>
  )

 
}

export default App;
