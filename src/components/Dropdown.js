import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown(props) {
  //evt handler for when a new filter is selected from the form in this component
  const handleChange = (event) => {
    //setting the impact (displays the filter selected) to the selected field in the filter
    props.setImpact(event.target.value);
    //resetting the shuffle index to remove bugs with the filter starting at the previous value
    props.setShuffledIndex(0);
    //new fetch using the evt.target.value and county to fetch only the counties stories that have that information matching the filter
    fetch(`/allstories/${props.correctedCountyFetch}+${event.target.value}`)
      .then((res) => res.json())
      .then((storiesArray) => {
        //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
        function shuffle(myArray) {
          let currentIndex = myArray.length,
            randomIndex;

          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [myArray[currentIndex], myArray[randomIndex]] = [
              myArray[randomIndex],
              myArray[currentIndex],
            ];
          }
          return myArray;
        }
        //setting the state variable for countyStories
        props.setCountyStories(shuffle(storiesArray));
      });
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-topic-label" style={{ color: "#5a203c" }}>
          Filter Topics
        </InputLabel>
        <Select value={props.impact} onChange={handleChange} label="Impact">
          <MenuItem value={"HowHasMedicalDebtImpactedYourLife"}>
            Overall Impacts
          </MenuItem>
          <MenuItem value={"HowHasMedicalDebtImpactedYourAccessToCare"}>
            Healthcare Access
          </MenuItem>
          <MenuItem value={"WhatDoYouThinkOfTheCostOfMedicalCare"}>
            Healthcare Costs
          </MenuItem>
          <MenuItem value={"HaveYouBeenSurprisedByAMedicalBill"}>
            Medical Bills
          </MenuItem>
          <MenuItem value={"WhatIsYourExperienceWithMedicalDebtCollectors"}>
            Medical Debts
          </MenuItem>
          <MenuItem value={"Reset"}>Clear Filter</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
