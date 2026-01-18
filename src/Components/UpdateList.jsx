import { useEffect, useState } from 'react'
import Subjects from './Subjects'
import SettingItems from './SettingItems'
import { isToday } from '../utils/datecheck.js'

// If you call the function getLocalSubjects(), it runs every single time your component renders.
// If you pass the reference getLocalSubjects, React only runs it once.

// You are passing the function itself (the recipe), not the result (the meal).

// React sees that you passed a function and treats it differently:

// Render 1: React detects this is the first mount. It calls getLocalSubjects(), gets the data, and sets the state.

// Render 2: React detects this is a re-render. It sees the function, knows it already has the state, and skips running the function entirely.

// To answer you directly: No, React does not read the file again. However, JavaScript executes the entire function body again.

// A React Component is just a normal JavaScript function. When a "Re-render" happens, it means JavaScript calls your function UpdateList() again from top to bottom.


const getLocalStorage = ()=>{
  if(JSON.parse(localStorage.getItem('data'))){
        try{
            const data = JSON.parse(localStorage.getItem('data'))
            return (data.subjects)
        }catch(err){
            console.log(err)
           
        }
  }else return []
}
function UpdateList({subjectUpdate, RenderComponent='subjects'}) {
  const [subjectlist, setSubjectlist] = useState(getLocalStorage)

  // useEffect runs AFTER the return statement, not before.
  
  useEffect(()=>{
    const newData = getLocalStorage()
    setSubjectlist(newData)
  },[subjectUpdate])


//   console.log(subjectlist)
//   console.log(subjectlist.map((item)=>{
//             return(
//                 <Subjects name={item.subject_name}/>
//             )
//        }))


  if(RenderComponent=='subjects'){
  if(subjectlist.length == 0) return(<>
  {/* <Subjects name='No subject added' missed={69}/>
  <Subjects name='No subject added 2' missed={68}/> */}
  {/* ****very map and react concept
  as it run before useeffect so there is empty array in start and two subjects are painted but there no changed of name when its updated after use effect and this does not happen with name as its direct and not dependent of usestate */}
  </>)
  return (
    <>
       {subjectlist.map((item)=>{
            let updatedDate
            if(item.lastupdated){
                updatedDate = new Date(item.lastupdated);
                // console.log(isToday(updatedDate))
              
            }
            // console.log(item.subject_name ,' ', item.missed.length)
            return(
                <Subjects key={item.id} name={item.subject_name} id={item.id} missed={item.missed.length} checkBox={isToday(updatedDate)}/>
            )
       })}

       

       {}
    </>
  )}else{
    if(subjectlist.length == 0) return <SettingItems name='No subject added'/>
    return (
    <>
       {subjectlist.map((item)=>{
            return(
                <SettingItems key={item.id} name={item.subject_name} id={item.id}/>
            )
       })}

       

       {}
    </>
  )
  }
}

export default UpdateList