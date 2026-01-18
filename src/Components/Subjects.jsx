import { useEffect, useState } from 'react'

function Subjects({name='undefined', id, missed=0, checkBox=false}) { 
  const [missedClasses, setMissed] = useState(missed)
  const [checkBoxValue, setCheckBoxValue] = useState(checkBox)

  useEffect(()=>{
    setMissed(missed)
  },[missed])
  
  const updateMissed = (id)=>{
    let data = JSON.parse(localStorage.getItem('data'))
    const index = data.subjects.findIndex((item)=> item.id == id)
    const now = new Date().toISOString();


    // checkbox logic 
    if(!checkBoxValue){
        ((data.subjects[index]).missed).push(now);
        (data.subjects[index]).lastupdated = now

    }else{
         ((data.subjects[index]).missed).pop();
         (data.subjects[index]).lastupdated = false     
    }

    // (data.subjects[index]).lastupdated = now
    setMissed(((data.subjects[index]).missed).length)
    localStorage.setItem('data', JSON.stringify(data))

    setCheckBoxValue(!checkBoxValue)
  }

  return (
    <>
         <div className="subject-card">
             <div className="subject-info">
                 <h3>{name}</h3>
                 {/* <span>10:00 AM - 11:00 AM</span> */}
                 <span>Missed: {missedClasses}</span>
             </div>
             <div className="checkbox-wrapper">
                 <input type="checkbox" defaultChecked={checkBoxValue} id={id} value={checkBoxValue} onChange={(e)=>{updateMissed(e.target.id, e.target.value)}} className="attendance-check"/>
                 <label htmlFor={id} className="check-label">
                     &#10007; </label>
                    {/* these are call HTML entities */}
             </div>
         </div>
    </>
  )
}

export default Subjects