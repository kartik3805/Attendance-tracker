import { useSubjectContext } from "../Contexts/SubjectContext"

function PublicSettings() {
  const {addedsubject, setAddedsubject, isEmpty, setIsEmpty} = useSubjectContext()
  if(isEmpty) return (<></>)
  // const obj = {"subjects":[{"subject_name":"Analog and Digital Electronics","id":"analog-and-digital-electronics","missed":[],"total_lectures":"42","lastupdated":false},{"subject_name":"Electrical Machines – II","id":"electrical-machines-–-ii","missed":[],"total_lectures":"42","lastupdated":false},{"subject_name":"Power Systems Analysis","id":"power-systems-analysis","missed":[],"total_lectures":"42","lastupdated":false},{"subject_name":"Power Electronics","id":"power-electronics","missed":[],"total_lectures":"42","lastupdated":false},{"subject_name":"Control Systems","id":"control-systems","missed":[],"total_lectures":"42","lastupdated":false},{"subject_name":"Renewable Energy Technologies","id":"renewable-energy-technologies","missed":[],"total_lectures":"42","lastupdated":false}]}
  const obj = {
  "subjects": [
    {
      "subject_name": "Analog and Digital Electronics",
      "id": "analog-and-digital-electronics",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Wednesday", "label": "Wednesday" },
        { "value": "Thursday", "label": "Thursday" },
        { "value": "Friday", "label": "Friday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Analog and Digital Electronics Lab",
      "id": "analog-and-digital-electronics-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Tuesday", "label": "Tuesday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Electrical Machines – II",
      "id": "electrical-machines-–-ii",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Monday", "label": "Monday" },
        { "value": "Tuesday", "label": "Tuesday" },
        { "value": "Wednesday", "label": "Wednesday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Electrical Machines – II Lab",
      "id": "electrical-machines-–-ii-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Monday", "label": "Monday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Power Systems Analysis",
      "id": "power-systems-analysis",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Monday", "label": "Monday" },
        { "value": "Tuesday", "label": "Tuesday" },
        { "value": "Thursday", "label": "Thursday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Power Systems Analysis Lab",
      "id": "power-systems-analysis-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Thursday", "label": "Thursday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Power Electronics",
      "id": "power-electronics",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Tuesday", "label": "Tuesday" },
        { "value": "Thursday", "label": "Thursday" },
        { "value": "Friday", "label": "Friday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Power Electronics Lab",
      "id": "power-electronics-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Wednesday", "label": "Wednesday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Control Systems",
      "id": "control-systems",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Monday", "label": "Monday" },
        { "value": "Tuesday", "label": "Tuesday" },
        { "value": "Wednesday", "label": "Wednesday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Control Systems Lab",
      "id": "control-systems-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Friday", "label": "Friday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Renewable Energy Technologies",
      "id": "renewable-energy-technologies",
      "missed": [],
      "total_lectures": "42",
      "repeating": [
        { "value": "Wednesday", "label": "Wednesday" },
        { "value": "Thursday", "label": "Thursday" },
        { "value": "Friday", "label": "Friday" }
      ],
      "lastupdated": false
    },
    {
      "subject_name": "Renewable Energy Technologies Lab",
      "id": "renewable-energy-technologies-lab",
      "missed": [],
      "total_lectures": null,
      "repeating": [
        { "value": "Friday", "label": "Friday" }
      ],
      "lastupdated": false
    }
  ],
  "mode": "Absolute"
}
  const loadPecData = ()=>{
    if(!localStorage.getItem('data')){
        localStorage.setItem('data', JSON.stringify(obj) )
        setAddedsubject(!addedsubject)
        setIsEmpty(!isEmpty)
    }
  }

  return (
    <div className="settings-section">
        <button type='submit' onClick={loadPecData} className="btn-add">Load PEC Elec. G2E1 data</button>
    </div>
  )
}

export default PublicSettings