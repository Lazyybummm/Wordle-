import { useEffect, useRef, useState } from "react";

const WORD_LIST = ["PLANT", "CRANE", "WHEEL", "BINGO", "DRAWN", "CANDY", "GHOST"];

function getRandomWord() {
  const idx = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[idx];
}

function computecolours(randomword,userguessed){
  const userguessedup=userguessed.toUpperCase();
  const results=[];
  for(let i=0;i<5;i++){
    if(randomword[i]===userguessedup[i]){
      console.log("inside if")
      results[i]={"char":userguessed[i],color:"green"}
    }
    else{
      results[i]={"char":userguessed[i],color:"gray"};
    }
  }

  for(let i=0;i<5;i++){
    if(results[i].color==="green"){
      continue;
    }
    for(let j=0;j<5;j++){
      if(results[i].char.toUpperCase()===randomword[j]){
        results[i].color="orange"
        break;
      }

    }
  }
  return results;
}



function App(){
  const [randomword,setrandomword]=useState('');
  const [userguessed,setuserguess]=useState('')
  const [guessses,setguesses]=useState(0);
  const [status,setstatus]=useState(false);
  const[ui,setui]=useState([])
  const inputref=useRef()
  useEffect(()=>{
    const word= getRandomWord();
    setrandomword(word);
  },[])
  function userguess(inputref,e){
    e.preventDefault()
    const userword=inputref.current.value;
    setuserguess(userword);
    console.log(userword)
    if(userword.length!=5){
      alert("word should have five letters!")
    }
    else{
      if(guessses==5){
        alert("thats al{l the guesses you will have ")
        window.location.reload();
      }
      setguesses(c=>c+1)
      console.log(userguessed);
      const coloured=computecolours(randomword,userword)
      console.log(coloured);
      let flag=1;
      for(let i=0;i<coloured.length;i++){
        if(coloured[i].color!="green"){
           flag=0
           break;
        }
      }
      if(flag==1){
        setstatus(true);
      }
      else{
        setstatus(false);
      }
      
      setui((prev)=>[...prev,coloured])

    }
  }
  return <>
  {status?<center><h2>you have guessed the word</h2></center>:ui.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: "10px" }}>
          {row.map((item, i) => (
            <span key={i} style={{ color: item.color }}>{item.char}</span>
          ))}
        </div>
      ))}
<form onSubmit={(e) => userguess(inputref, e)}>
  <input ref={inputref} />
  <button type="submit">Submit</button>
</form>
</>
}
export default App