import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_"
    for (let i=1; i <= length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      setPassword(pass)
    }
  }, [length, charAllowed, numAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, charAllowed])

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className='w-full h-screen bg-gray-800'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-orange-500'>
        <h1 className='text-white text-center my-3'> Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password'
          readOnly ref={passwordRef}/> 
          <button className='outline-none bg-violet-600 text-white px-3 py-0.5 shrink-0' 
          onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input type="range" min={4} max={16} value={length} 
            className='cursor-pointer' 
            onChange={(e)=>{setLength(e.target.value)}} />
            <label htmlFor="length">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox" defaultChecked = {numAllowed} onChange={()=>{setNumAllowed((prev) => !prev)}}/>
            <label htmlFor="number">Numbers </label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox" defaultChecked = {charAllowed} onChange={()=>{setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="character">Characters </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
