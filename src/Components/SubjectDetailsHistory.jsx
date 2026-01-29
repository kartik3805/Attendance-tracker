import React from 'react'
import { useSubjectContext } from '../Contexts/SubjectContext'
import { isToday } from '../utils/datecheck'

function SubjectDetailsHistory({date,setDetails, status, subjectIndex, dateIndex}) {

    const {cardDetail} = useSubjectContext()
    let data = JSON.parse(localStorage.getItem('data'))
    const removeEntry = ()=>{
        const compare = isToday(new Date(data.subjects[subjectIndex].missed[dateIndex]))
        if(compare){
             data.subjects[subjectIndex].lastupdated = false;
             cardDetail.setCheckBoxValue(false)
        }
        data.subjects[subjectIndex].missed.splice(dateIndex,1)
        localStorage.setItem('data',JSON.stringify(data))

        cardDetail.setMissed(data.subjects[cardDetail.index].missed.length)     
        setDetails(data.subjects[cardDetail.index])
    }
  return (
    <li className="log-item">
        {/* <div style="display:flex; align-items:center;"> */}
        <div >
            <span className="log-date">{date}</span>
            <span className={`log-status ${status === 'Absent'? 'absent': 'present'}`}>{status}</span>
        </div>
        <button onClick={()=>removeEntry()} className="btn-trash">
            {/* <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> */}
            DELETE
        </button>
    </li>
  )
}

export default SubjectDetailsHistory