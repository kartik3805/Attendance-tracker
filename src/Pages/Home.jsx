import React, { useEffect, useState } from 'react'
import Subjects from '../Components/Subjects';
import UpdateList from '../Components/UpdateList';
import { useSubjectContext} from '../Contexts/SubjectContext';
import PublicSettings from '../Components/PublicSettings';
import HiddenSettings from '../Components/HiddenSettings';
import SelectDays from '../Components/SelectDays';
import SubjectDetails from '../Components/SubjectDetails';


// Tab Switching Logic
// const switchTab = (tabName) =>{
//             // Hide all views
//             document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
//             document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

//             // Show selected view
//             document.getElementById(tabName + '-view').classList.add('active');
            
//             // Highlight button
//             const btnIndex = tabName === 'attendance' ? 0 : 1;
//             document.querySelectorAll('.tab-btn')[btnIndex].classList.add('active');
//         }


const generateUniqueId = (subjects, name) => {
    // Basic slug (lowercase, replace spaces)
    let slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    let finalSlug = slug;
    
    // Check if this slug exists in the array
    let count = 1;
    // We create a Set of existing IDs for fast lookup
    const existingIds = new Set(subjects.map(s => s.id));

    while (existingIds.has(finalSlug)) {
        count++;
        finalSlug = `${slug}-${count}`;
    }
    return finalSlug;
};

function Home() {
    const [newsubject, setNewsubject] = useState(null)
    const [totalLectures, setTotalLectures] = useState(null)
    const [selected, setSelected] = useState([]);
    const {addedsubject, setAddedsubject, activeTab, setActiveTab, isEmpty, setCardDetail, cardDetail} = useSubjectContext()
    let today = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // today = today.toDateString()
    //optimize this addsubject
    const addSubject = (e)=>{
    e.preventDefault();
    
    let local_storage_data = JSON.parse(localStorage.getItem('data'))
    if(local_storage_data){
        local_storage_data.subjects.push({
            subject_name: newsubject,
            id: generateUniqueId(local_storage_data.subjects,newsubject),
            missed: [],
            total_lectures: totalLectures,
            repeating: selected,
            lastupdated: false

        })
    }else{
        local_storage_data = {
        subjects: [
            {
                subject_name: newsubject,
                id: generateUniqueId([],newsubject),
                missed: [],
                total_lectures: totalLectures,
                repeating: selected,
                lastupdated: false
            }
        ],
        mode: 'Absolute'
    }
    }
    
    localStorage.setItem('data', JSON.stringify(local_storage_data))
    // console.log(JSON.parse(localStorage.getItem('data')))
    setAddedsubject(!addedsubject)
}

    useEffect(()=>{
        // updateList()

    },[])

  return (
    <div>
        <div className="app-container">
        <header>
            <h1>Attendance Tracker</h1>
        </header>

        {/* <div className="tabs">
            <button className={`tab-btn ${activeTab == 'attendance' ? 'active' : ''}`} onClick={()=>{setActiveTab('attendance')}}>Mark Attendance</button>
            <button className={`tab-btn ${activeTab == 'settings' ? 'active' : ''}`}  onClick={()=>{setActiveTab('settings')}}>Settings</button>
        </div> */}

        <div className="content">
            
            <div id="attendance-view" className={`view ${activeTab == 'attendance' ? 'active' : ''}`}>
                {/* <span className="date-display" id="current-date">{}</span> */}
                <div className="date-header" id="current-day">{days[today.getDay()]}</div>
                <span className="date-sub" id="current-date">{`${today.toDateString().split(' ')[1]} ${today.getDate()}, ${today.getFullYear()}`}</span>
                
                <div id="subject-list-container">
                    <UpdateList subjectUpdate={addedsubject} />
                </div>
            </div>

            <div id="stats" className={`view ${activeTab == 'stats' ? 'active' : ''}`}>
                <div id="subject-list-container">
                    <p>Stats page is under construction...</p>
                </div>
            </div>

            <div id="settings-view"  className={`view ${activeTab == 'settings' ? 'active' : ''}`}>
             {/* remember on submit and not action */}
             <div className="settings-section">
                <form onSubmit={(e)=>addSubject(e)}>
                <div className="form-group">
                    <label>Add New Subject*</label>
                    <input type="text" required onChange={(e)=>{setNewsubject(e.target.value)}} id="new-subject-input" placeholder="e.g. Chemistry"/>
                </div>
                <div className="form-group">
                    <label htmlFor='total-lectures'>Total lectures</label>
                    <input type="number" onChange={(e)=>{setTotalLectures(e.target.value)}} id="total-lectures" placeholder="0"/>
                </div>
                <div className="form-group">
                    <label htmlFor='repeating'>Repeating On</label>
                    <SelectDays id="repeating" state={selected} setState={setSelected}/>
            
                </div>
            

                <button type='submit' className="btn-add">+ Add Subject</button>

             </form>

              <div className="settings-list">
                    <div id="settings-subject-list">
                        <UpdateList subjectUpdate={addedsubject} RenderComponent='SettingItems' />
                    </div>
               
                    
                </div>
             </div>
           
                <PublicSettings/>

                <HiddenSettings/>  

           </div>

        </div>

         <div id="modal-overlay" className={`modal-overlay ${cardDetail ? 'open': ''}`}  onClick={()=>setCardDetail(false)}></div>
        <SubjectDetails/>

        <nav className="bottom-nav">
            <button className={`nav-btn ${activeTab == 'attendance' ? 'active' : ''}`} onClick={()=>{setActiveTab('attendance')}}>
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Today
            </button>
            {/* <button className={`nav-btn ${activeTab == 'stats' ? 'active' : ''}`} onClick={()=>{setActiveTab('stats')}}>
                <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                Stats
            </button> */}
            <button className={`nav-btn ${activeTab == 'settings' ? 'active' : ''}`} onClick={()=>{setActiveTab('settings')}}>
                <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                Settings
            </button>
        </nav>
    </div>
    </div>
  )
}

export default Home