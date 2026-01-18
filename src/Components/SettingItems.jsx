import { useSubjectContext } from '../Contexts/SubjectContext'

function SettingItems({name,id}) {  
  const {addedsubject, setAddedsubject} = useSubjectContext()

  const deleteSubject = (id)=>{
    let data = JSON.parse(localStorage.getItem('data'))
    const toBeRemoved = data.subjects.find((item)=>item.id == id)
    const data2 = data.subjects.filter((item)=> item.id != toBeRemoved.id)
    data.subjects = data2
    localStorage.setItem('data', JSON.stringify(data))
    setAddedsubject(!addedsubject)
  }
  return (
    <div>
        {/* target in callback can access all the params */}
        <div className="settings-item">{name} <button id={id} onClick={(e)=>{deleteSubject(e.target.id)}} className="delete-btn">Remove</button></div>
    </div>
  )
}

export default SettingItems


