import Navbar from "./components/navbar/Navbar"
import {Routes,Route} from "react-router-dom"
import Homepage from "./pages/homepage/Homepage"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
    </Routes>
    </>
  )
}

export default App
