import { useSubjectContext } from '../Contexts/SubjectContext'

function SettingItems({name,id,repeating}) {  
  const {addedsubject, setAddedsubject} = useSubjectContext()

  const deleteSubject = (id)=>{
    let data = JSON.parse(localStorage.getItem('data'))
    const toBeRemoved = data.subjects.find((item)=>item.id == id)
    const data2 = data.subjects.filter((item)=> item.id != toBeRemoved.id)
    data.subjects = data2
    localStorage.setItem('data', JSON.stringify(data))
    setAddedsubject(!addedsubject)
  }
  console.log(repeating)
  return (
    <div>
        {/* target in callback can access all the params */}
         <div className="setting-row">
            <div className="setting-info">
                <h4>{name}</h4>
                <p>{repeating != undefined ? repeating.map(item=>item.value.slice(0,3) + ' ' ):''}</p>
            </div>
                <button id={id} onClick={(e)=>{deleteSubject(e.target.id)}} className="btn-delete">Remove</button>
         </div>
        {/* <div className="settings-item">{name} <button id={id} onClick={(e)=>{deleteSubject(e.target.id)}} className="delete-btn">Remove</button></div> */}
    </div>
  )
}

export default SettingItems


