import React, { useState, useEffect } from 'react'
import { useSubjectContext } from '../Contexts/SubjectContext'
import SubjectDetailsHistory from './SubjectDetailsHistory'
import { isToday } from '../utils/datecheck'

function SubjectDetails() {
  const today = new Date()
  const [calender, setCalender] = useState(`${today.getFullYear()}-${today.getMonth()+1<10?'0':''}${today.getMonth()+1}-${today.getDate()}`)
  const {cardDetail, setCardDetail} = useSubjectContext()
  const [details,setDetails] = useState(null)

  //check why it's was not working with earlier logic????????????
  useEffect(() => {
  // Only run this if we actually have a valid cardDetail
  if (cardDetail) {
    const data = JSON.parse(localStorage.getItem('data'))
    // Update state based on the selected card
    setDetails(data.subjects[cardDetail.index])
  }
}, [cardDetail])

  if(!cardDetail) return (<><div id="bottom-sheet" className={`bottom-sheet ${cardDetail ? 'open': ''}`}></div></>)
  //add this to neweffect
  
  let data = JSON.parse(localStorage.getItem('data'))

  console.log(cardDetail.missedClasses)

  const addNewEntry =()=>{
    const duplicate = data.subjects[cardDetail.index].missed.find(item=>{
        return item.split('T')[0] == calender.split(':')[0]
    })
    if(duplicate) return console.log(' date already present')

    const compare = isToday(new Date(calender))
    if(compare){
        const today = Date.now()
        cardDetail.setCheckBoxValue(today)
        cardDetail.setMissed(data.subjects[cardDetail.index].missed.length)     
    }
    data.subjects[cardDetail.index].missed.push(new Date(calender))
    localStorage.setItem('data', JSON.stringify(data))
    cardDetail.setMissed(data.subjects[cardDetail.index].missed.length)
    setDetails(data.subjects[cardDetail.index])

   


  }
  return (
            <div id="bottom-sheet" className={`bottom-sheet ${cardDetail ? 'open': ''}`}>
            <div className="sheet-handle"></div>
            
            <div className="sheet-header">
                <span className="sheet-title" id="modal-subject-title">{data.subjects[cardDetail.index].subject_name}</span>
                <button className="sheet-close" onClick={()=>setCardDetail(false)}>&times;</button>
            </div>
            
            <div className="sheet-body">
                <h4>Add Past Record</h4>
                <div className="manual-entry-box">
                    <div className="manual-controls">
                        <input type="date" id="manual-date" defaultValue={calender} onChange={(e)=>setCalender(e.target.value)} className="date-input"/>
                        {/* <button className="btn-small btn-green">Present</button> */}
                        <button className="btn-small btn-red" onClick={addNewEntry}>Absent</button>
                    </div>
                </div>

                <h4>Attendance History</h4>
                <ul className="log-list" id="modal-history-list">
                    {/* why not object {item,index} */}
                    {details && details.missed.map((item, index)=>{
                        const date = new Date(item)
                        return(
                            <SubjectDetailsHistory key={index} setDetails={setDetails} subjectIndex={cardDetail.index} dateIndex={index} date={date.toDateString()} status={'Absent'}/>
                        )
                    })}
                </ul>
            </div>
        </div>
  )
}

export default SubjectDetails

// NOTES
// 2. The Context Rule
// Rule: When a Context value changes, every component that uses that context (useSubjectContext) is forced to re-render immediately.
// This is a great question because it touches on how browsers and JavaScript actually work under the hood.

// Here is a breakdown of what "synchronous blocking" means and why reading localStorage inside the main body of your component is risky.

// 1. The "Single Lane Highway" (The Main Thread)

// 2. What is "Synchronous"?
// Synchronous means "wait for me to finish."

// 3. Why localStorage is "Slow"
// You might think accessing data is instant, but computer storage has a hierarchy:

// RAM (Variables): Extremely fast. Like grabbing a pen from your desk.

// Disk/Storage (localStorage): Much slower. Like walking to the basement to find a file in a cabinet.

// Because localStorage persists data to the hard drive (or SSD), reading from it is an "Input/Output" (I/O) operation. While modern SSDs are fast, they are still thousands of times slower than reading a variable from memory.

// High Frequency: React components re-render very often (e.g., every time you type a letter in an input field or trigger a state change).

// The Freeze: Every single time the component re-renders, the browser has to "pause" (block) for a few milliseconds to go read the disk.

// Visual Lag: If you have a complex app or a slower device (like a cheap mobile phone), these tiny pauses add up. The user feels "lag" or "jank" when scrolling or clicking because the Main Thread is busy waiting for the disk instead of updating the screen.

// The Solution: useEffect
// When you move that logic into useEffect, you are telling React: "Render the UI first (show the user something immediately), and then go fetch the data from storage in the background."

// This prevents the heavy lifting from blocking the initial paint of the screen.