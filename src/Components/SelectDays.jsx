import Select from 'react-select'

function SelectDays({state, setState}) {
const options = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" }
];

  return (
    <Select
      options={options}
      isMulti
      value={state}
      onChange={setState}
      placeholder="Select"
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
}

export default SelectDays