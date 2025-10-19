import {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from './Views/Home'
import History from './Views/History'
import Transactions from './Views/Transactions'
import Settings from './Views/Settings'
import Add from './Views/Add'
import Edit from './Views/Edit'

function App() {
  const [message,setMessage] = useState ("loading........");


  useEffect(() => {
    fetch("http://localhost:3001/")
    .then((res) => res.text())
    .then((data) => setMessage(data))
    .catch(() => setMessage("not able to connect to backend right now"));
  }, []);

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
//original stuff archived incase
