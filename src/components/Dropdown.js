import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const impact = [
  'overall-impacts',
  'healthcare-impacts',
  'overall-costs',
  'medical-bills',
  'medical-debts'
]

export default function Dropdown () {
  const [impact, setImpact] = React.useState('')

  const handleChange = event => {
    setImpact(event.target.value)
  }

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='select-topic-label'>Filter Topics</InputLabel>
        <Select
          labelId='select-impact-label'
          id='select-impact'
          value={impact}
          onChange={handleChange}
          label='Impact'
        >
          <MenuItem value={'overall-impacts'}>Overall Impacts</MenuItem>
          <MenuItem value={'healthcare-impacts'}>Healthcare Access</MenuItem>
          <MenuItem value={'overall-costs'}>Healthcare Costs</MenuItem>
          <MenuItem value={'medical-bills'}>Medical Bills</MenuItem>
          <MenuItem value={'medical-debts'}>Medical Debts</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
