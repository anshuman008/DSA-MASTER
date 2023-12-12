
import { BrowserRouter as ROuter,Routes,Route } from "react-router-dom"
import HomePage from "./components/Home"
import QueList from "./components/QuePage"
function App() {


  return (
    <>
    <ROuter>
      <Routes>
        <Route  path="/" Component={HomePage}/>
        <Route path="/:id" Component={QueList}/>
      </Routes>
    </ROuter>
    </>
  )
}

export default App
