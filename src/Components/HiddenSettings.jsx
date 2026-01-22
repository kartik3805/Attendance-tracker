import { useSubjectContext } from "../Contexts/SubjectContext"
function HiddenSettings() {
const {addedsubject, setAddedsubject, isEmpty, setIsEmpty, mode, setMode} = useSubjectContext()
if(!isEmpty) return (<></>)
  const deleteData = ()=>{
    if(localStorage.getItem('data')){
        localStorage.removeItem('data')
        setAddedsubject(!addedsubject)
        setIsEmpty(!isEmpty)
    }
  }
  const toggleMode =()=>{
    let data = JSON.parse(localStorage.getItem('data'))
    const emptyOnes = data.subjects.map(item=>{
      if(item.repeating.length<=0) return item.subject_name
      else return null
    })
    const ifEligible = !!emptyOnes.find(item => item!=null)
    if(ifEligible) return console.log(`These subject need to be updated: ${emptyOnes}`)
    
    console.log(mode)
    if(mode == 'Absolute'){
      setMode('Timetable'); 
      setAddedsubject(!addedsubject); 
      data.mode='Timetable';

    } 
    else {
      setMode('Absolute') ; 
      setAddedsubject(!addedsubject) ; 
      data.mode='Absolute'
    }
    console.log(data)
    localStorage.setItem('data', JSON.stringify(data))
  }

  return (
    <div >
           <div className="settings-section experimental">
                    <div className="exp-header">
                        {/* <svg className="flask-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z" style="display:none"/>
                            <path d="M6 22h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2zm6-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6-9l-2-4h-8l-2 4h12zM5 21v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4H5zM12 4V2"/>
                            <path d="M18.8 8l-1.4-3H6.6L5.2 8h13.6zM12 2C10.5 2 7.2 2 7.2 2s-1 0-1 2l1.6 4H16.2L17.8 4c0-2-1-2-1-2s-3.3 0-4.8 0V1h-2v1zM6 10v9c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-9H6zm7 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </svg> */}
                        <h3 className="section-title" >Experimental</h3>
                    </div>

                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Enable TimeTable mode</h4>
                            <p>All subject much have repeating days defined*</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={mode=='Timetable' ? true : false} value={mode} id="check" onChange={()=>toggleMode()}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

         <button type='submit' onClick={deleteData} className="btn-add">Delete all data</button>
         {/* <button type='checkbox' onClick={toggleMode} className="btn-add">Enable another mode</button> */}
    </div>
  )
}

export default HiddenSettings