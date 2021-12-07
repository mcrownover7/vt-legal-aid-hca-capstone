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

export default function Dropdown (props) {
  // const [impact, setImpact] = React.useState('')

  // let newCountyStories = []
  const handleChange = event => {
    props.setImpact(event.target.value)
    console.log(props.countyStories)

    // newCountyStories = props.countyStories.map((object, index) => {

    // })
    fetch(`/allstories/${props.correctedCountyFetch}+${event.target.value}`)
      .then(res => res.json())
      .then(storiesArray => {
        //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
        function shuffle (myArray) {
          let currentIndex = myArray.length,
            randomIndex

          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            ;[myArray[currentIndex], myArray[randomIndex]] = [
              myArray[randomIndex],
              myArray[currentIndex]
            ]
          }
          return myArray
        }
        props.setCountyStories(shuffle(storiesArray))
        // console.log(storiesArray);
      })
  }

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='select-topic-label'>Filter Topics</InputLabel>
        <Select
          // labelId='select-impact-label'
          // id='select-impact'
          value={props.impact}
          onChange={handleChange}
          label='Impact'
        >
          <MenuItem value={'HowHasMedicalDebtImpactedYourLife'}>Overall Impacts</MenuItem>
          <MenuItem value={'HowHasMedicalDebtImpactedYourAccessToCare'}>Healthcare Access</MenuItem>
          <MenuItem value={'WhatDoYouThinkOfTheCostOfMedicalCare'}>Healthcare Costs</MenuItem>
          <MenuItem value={'HaveYouBeenSurprisedByAMedicalBill'}>Medical Bills</MenuItem>
          <MenuItem value={'WhatIsYourExperienceWithMedicalDebtCollectors'}>Medical Debts</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
