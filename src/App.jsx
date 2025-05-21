import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedCharacter, setAllowedCharacter] = useState(false);
  const [password, setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=> {    // useCallback hook cache a function definition between re-renders. it takes a function and dependency in form of array. dependency means what let the change in function. 
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(allowedNumber){
      str += "0123456789"
    }
    if(allowedCharacter){
      str += "!@#$^&*~+=`"
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)//to generate random values and +1 as it doesn't generate 0.
      pass += str.charAt(char)
    }
    setPassword(pass);
  }, [length,allowedNumber,allowedCharacter]) 

  const copyPasswordToClip = useCallback(() => { 
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);            //it select only 50 element      
    window.navigator.clipboard.writeText(password)}, [password])

  useEffect(() => {passwordGenerator(); }, [length, allowedNumber, allowedCharacter, passwordGenerator]);

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4  bg-blue-950 flex-auto '>
        <h1 className='text-white text-center mb-2 text-xl' >Password Generator</h1>
        <div className='flex showdow rounded-lg overflow-hidden mb-4 bg-slate-50 '>
          <input type="text" value={password} className='outline-none w-full py-0.5 px-3' placeholder='password' readOnly ref={passwordRef}/>     {/* have many use for example to highlight the copied text */}
          <button onClick={copyPasswordToClip} className='bg-blue-600 w-16 text-white px-3 py-1 shrink-0'>copy</button>
        </div>
        <div className='flex text=sm gap-x-3 text-orange-400'>
          <div className='flex item-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer ' onChange={(e)=>{setLength(e.target.value)}}/>                  { /* just like text ,,,range is also a tpye of input */}
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={setAllowedNumber} id='numberInput' onChange={()=>{ setAllowedNumber((previousvalue)=>!previousvalue)}} className='cursor-pointer' />                  
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={setAllowedCharacter} id='characterInput' onChange={()=>{ setAllowedCharacter((previousvalue)=>!previousvalue)}} className='cursor-pointer' />                  
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
        
     </div>
    </>
  )
}

export default App
