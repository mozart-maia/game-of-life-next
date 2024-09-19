"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [checkboxListState, setCheckboxListState] = useState(Array(1681).fill(false));
  const [time, setTime] = useState(0);
  const [intervalRunning, setIntervalRunning] = useState<any>(false);

  function handleChangeCheckbox(index:number) {
    const nextCheckbox = checkboxListState.map((c:any,i:any) => {
      if (i === index){
        c =  !c;
      }
      return c;
    });   
    setCheckboxListState(nextCheckbox);
  }

  function updateGame(cells: any) {
    const newCells = cells.map((c: any,i:any) => {
      let neighbour = 0;
      //left
      if (cells[i-1]){
        neighbour += 1;
      }
      //right
      if (cells[i+1]){
        neighbour += 1;
      }
      //bottom
      if (cells[i+58]){
        neighbour += 1;
      }
      //bottom-right
      if (cells[i+59]){
        neighbour += 1;
      }
      //bottom-left
      if (cells[i+57]){
        neighbour += 1;
      }
      //top-right
      if (cells[i-57]){
        neighbour +=1;
      }
      //top
      if (cells[i-58]){
        neighbour +=1;
      }
      //top-left
      if (cells[i-59]){
        neighbour +=1;
      }

      if (c) {
        if (neighbour < 2 || neighbour > 3){
          c = false;
        }
        return c 
      } else {
        if (neighbour === 3){
          c = true;
        }   
        return c;
      }
      
    })
    setCheckboxListState(newCells);   
  }

  useEffect(() => {
    //in this interval I will keep updating the values of checkbox grid
    const interval = setInterval(() => {
      if (intervalRunning){
        updateGame(checkboxListState);
        setTime(time + 1);
      }        
    }, 500);

    //Clearing the interval
    return () => clearInterval(interval);
}, [time]);


  function handleStartInterval(){
    setIntervalRunning(true) 
    setTime(time+1);   
  }

  function handleClearInterval(){
    setIntervalRunning(false);
    setTime(0);
  }


  useEffect(() => {
    renderCheckbox();
  },[])

  function renderCheckbox() {
    const listCheckbox = [];
    //in resolution 1024/768 works as square (almost)
    for(let i=0; i<=1681; i++){
      listCheckbox.push(<input type="checkbox" key={`${i}`} id={`${i}`} checked={checkboxListState[i]} onChange={e => handleChangeCheckbox(Number(e.target.id))} />);
          }   
    return listCheckbox;
  }


  return (
    <main className="h-screen w-full bg-slate-300">
      <div className="justify-center">{time}</div>
      <div className=" grid grid-cols-2">
        <button onClick={handleStartInterval} className="border border-slate-900 rounded-md bg-green-500 hover:bg-green-400 ">Start</button>
        <button onClick={handleClearInterval} className="border border-slate-900 rounded-md bg-yellow-500 hover:bg-yellow-400">Pause</button>

      </div>
      <div className="bg-blue-700 m-auto w-3/4 p-1">
        { renderCheckbox() }
      </div>      
    </main>
  );
}
