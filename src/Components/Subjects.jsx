import { useEffect, useState } from 'react'
import SubjectDetails from './SubjectDetails'
import { useSubjectContext } from '../Contexts/SubjectContext'

function Subjects({name='undefined', id, missed=0, checkBox=false}) { 
  const [missedClasses, setMissed] = useState(missed)
  const [checkBoxValue, setCheckBoxValue] = useState(checkBox)
  const {setCardDetail} = useSubjectContext()

  console.log('subject updated, checkbox value:  ', checkBoxValue)

  useEffect(()=>{
    setMissed(missed)
  },[missed])

  const openCard = (subject_id)=>{
    let data = JSON.parse(localStorage.getItem('data'))
    const index = data.subjects.findIndex((item)=> item.id == subject_id)
    setCardDetail({
      index,missedClasses,setMissed,setCheckBoxValue
    })
  }
  
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
             <div className="subject-info" onClick={()=>openCard(id)}>
                 <h3>{name}</h3>
                 {/* <span>10:00 AM - 11:00 AM</span> */}
                 <span>Missed: {missedClasses}</span>
             </div>
             <div className="checkbox-wrapper">
              {/* NOTES */}
              {/* DOOOOO some research about checked value and its default behaviour  */}
                 <input type="checkbox" defaultChecked={checkBoxValue} id={id} value={checkBoxValue} checked={checkBoxValue} onChange={(e)=>{updateMissed(e.target.id)}}  className="attendance-check"/>
                 <label htmlFor={id} className="check-label">
                     &#10007; </label>
                    {/* these are call HTML entities */}
             </div>
         </div>
    </>
  )
}

export default Subjects