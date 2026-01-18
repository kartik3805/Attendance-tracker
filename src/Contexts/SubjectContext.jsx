import React, { Children, createContext, useContext, useState } from 'react'

const SubjectContext = createContext()
function SubjectProvider({children}) {
  const [addedsubject, setAddedsubject] = useState(false)
  const [activeTab, setActiveTab] = useState('attendance')
  return (
    <div>
        <SubjectContext.Provider value={
        {addedsubject,
        setAddedsubject,
        activeTab,
        setActiveTab
        }
        }>
            {children}
        </SubjectContext.Provider>
    </div>
  )
}
export const useSubjectContext = ()=> useContext(SubjectContext)
export default SubjectProvider