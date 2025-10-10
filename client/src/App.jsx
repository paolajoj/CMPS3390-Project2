import {useEffect, useState} from "react";


function App() {
  const [message,setMessage] = useState ("loading........");

  
  useEffect(() => {
    fetch("http://localhost:3001/")
    .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("not able to connect to backend right now "));
  })


  return (
    <div>
      <h1>Da finance tracker</h1>
        <p>Hello world, this means the React frontend is working...</p> 
    </div>
  );
}
export default App;
//original stuff archived incase