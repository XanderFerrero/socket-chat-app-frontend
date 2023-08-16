import { useState, useEffect,useRef } from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

function App() {
  const [texts, setTexts] = useState([])
  const [text, setText] = useState("")
  let [username, setUserName] = useState("")
  const textRef = useRef();
  
  useEffect(() => {
    textRef.current.scrollTop = textRef.current.scrollHeight;
  },[texts])




  const submit = (e) => {
    e.preventDefault();
    socket.emit("post-text", {text:text, username:username})
    setText("")
  }



  socket.on("post-text", data => {
    setTexts([...texts,data])
  })


  return (
    <>

    <form onSubmit={submit}>
      <input placeholder="name" value={username} onChange={(e) => setUserName(e.target.value)}  required></input>
      <input value={text} onChange={(e) => {setText(e.target.value)}} required placeholder="text"></input>
      
      <button>Submit</button>
    </form>

      <div id="message-container" ref={textRef}>
      {
        texts.map(text => {
          return <h3>{text.username}: {text.text}</h3>
        })
      }
      </div>
    </>
  )
}

export default App
