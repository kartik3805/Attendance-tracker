import React, { Children, createContext, useContext, useState } from 'react'

const SubjectContext = createContext()
const checkData = ()=>{
  if(localStorage.getItem('data')) return true
  else return false
}
const setModeFromStorage = ()=>{
  if(localStorage.getItem('data')){
      const data = JSON.parse(localStorage.getItem('data'))
      if(data.mode) return data.mode
  }
  else return 'Absolute'
}
function SubjectProvider({children}) {
  const [addedsubject, setAddedsubject] = useState(false)
  const [activeTab, setActiveTab] = useState('attendance')
  const [isEmpty, setIsEmpty] = useState(checkData)
  const [mode, setMode] = useState(setModeFromStorage())
  const [cardDetail, setCardDetail] = useState(false)
  console.log(`Mode from context : ${mode}`)
  return (
    <div>
        <SubjectContext.Provider value={
        {addedsubject,
        setAddedsubject,
        activeTab,
        setActiveTab,
        isEmpty,
        setIsEmpty,
        mode, 
        setMode,
        cardDetail, 
        setCardDetail
        }
        }>
            {children}
        </SubjectContext.Provider>
    </div>
  )
}
export const useSubjectContext = ()=> useContext(SubjectContext)
export default SubjectProvider