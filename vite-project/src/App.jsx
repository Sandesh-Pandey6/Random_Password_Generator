import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{ 
    let pass = ""
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed){
      str += "0123456789"
    }
    if (charAllowed){
      str += "!@#$%^&*()_+"
    }

    for(let i=1; i < length; i++) {
      const char = Math.floor(Math.random()* str.length +1)
      pass += str.charAt(char)

    }

    setPassword(pass)








  },[length, numberAllowed, charAllowed])

const copyPasswordToClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
 passwordRef.current?.select()
},[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator])

  return (
    < >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center min-h-screen bg-black">
  <div className="relative w-full max-w-xl shadow-lg rounded-lg px-4 py-6 bg-gray-900">
    <h1 className="text-3xl font-bold text-white mb-4">Password Generator</h1>
    <div className="flex items-center shadow rounded-lg overflow-hidden">
      <input 
       
        type="text" 
        value={password}
        className="outline-none w-full py-2 px-3 bg-white text-gray-500 text-lg rounded-lg shadow-md" 
        placeholder="Password" 
        readOnly 
        ref={passwordRef}
      /> 

      <button onClick={copyPasswordToClipboard}
      className='my-2 mx-2 font-bold'>copy</button>


    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex item-center ga--x-1'>
        <input
        type="range"
        min={5}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label className='text-red-700'>length: {length}</label>
      </div>
      <div className='flex item-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() =>{setNumberAllowed((prev)=>!prev);}}
        />
        <label className='text-red-700' htmlFor="NumperInput" >Number</label>
      </div>
      <div className='flex item-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="charInput"
        onChange={() =>{setCharAllowed((prev)=>!prev);}}
        />
        <label className='text-red-700' htmlFor="NumperInput" >Checkbox</label>

      </div>
    </div>

  </div>
</div>
    </>
  )
}

export default App
