import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dropdown from "./Dropdown.js";

//Home function to render page structural elements
export default function Story(props) {
  const [countyStories, setCountyStories] = useState([]);
  const [correctedCountyFetch, setCorrectedCountyFetch] = useState("");
  // const [impact, setImpact] = React.useState('')

  const MaroonTextTypography = withStyles({
    root: {
      color: "#5a203c",
    },
  })(Typography);
  const GreenTextTypography = withStyles({
    root: {
      color: "#0b5a0b",
    },
  })(Typography);

  let correctedCounty = props.selectedCounty.toLowerCase().split(" ");
  useEffect(() => {
    if (correctedCounty.length === 1) {
      setCorrectedCountyFetch(
        correctedCounty[0].toString().charAt(0).toUpperCase() +
          correctedCounty[0].toString().substring(1).toLowerCase()
      );
    } else {
      setCorrectedCountyFetch(
        correctedCounty[0].toString().charAt(0).toUpperCase() +
          correctedCounty[0].toString().substring(1).toLowerCase() +
          " " +
          correctedCounty[1].toString().charAt(0).toUpperCase() +
          correctedCounty[1].toString().substring(1).toLowerCase()
      );
    }
  }, [correctedCounty]);

  // console.log(correctedCountyFetch);
  useEffect(() => {
    fetch(`/allstories/${correctedCountyFetch}`)
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
        setCountyStories(shuffle(storiesArray));
      });
  }, [correctedCountyFetch]);

  let dataFetched = false;

  //NOTE: WILL NEED A DIFFERENT SOLUTION ONCE STORIES CAN BE ADDED------------------------------------------------------
  //once all stories state variable has data from the fetch it fires
  if (countyStories.length !== 0 && countyStories.length !== 212) {
    //setting boolean true to show data has been fetched
    dataFetched = true;
  }

  function nextButton() {
    if (props.shuffledIndex < countyStories.length - 1) {
      props.setShuffledIndex(props.shuffledIndex + 1);
    } else {
      return null;
    }
  }

  function previousButton() {
    if (props.shuffledIndex > 0) {
      props.setShuffledIndex(props.shuffledIndex - 1);
    } else {
      return null;
    }
  }

  return (
    //React fragment (instead of <div>)
    <>
    <div className="county-story"> 
      <MaroonTextTypography variant="h5">
        <b>The Real Story: Health Care Debt In Vermont</b>
      </MaroonTextTypography>
      <GreenTextTypography variant="h6">
        <div class="drop-wrapper">
        <b>
          {correctedCountyFetch} County Story #{props.shuffledIndex + 1} of{" "}
          {countyStories.length}
      
        </b>
        
        </div>
      </GreenTextTypography>

      <div class="age-insurance">
        <div>
          <b>Insured:</b>{" "}
          {dataFetched ? countyStories[props.shuffledIndex].Insured : null}
        </div>
        <div>
          <b>Age: </b>{" "}
          {dataFetched ? countyStories[props.shuffledIndex].Age : null}
        </div>
      </div>
      <div>
        {dataFetched
          ? [
              countyStories[props.shuffledIndex]
                .HaveYouBeenSurprisedByAMedicalBill ? (
                <li className="story-bullets">
                  {
                    countyStories[props.shuffledIndex]
                      .HaveYouBeenSurprisedByAMedicalBill
                  }
                </li>
              ) : null,
            ]
          : null}
      </div>
      <div>
        {dataFetched
          ? [
              countyStories[props.shuffledIndex]
                .HowHasMedicalDebtImpactedYourAccessToCare ? (
                <li className="story-bullets">
                  {
                    countyStories[props.shuffledIndex]
                      .HowHasMedicalDebtImpactedYourAccessToCare
                  }
                </li>
              ) : null,
            ]
          : null}
      </div>
      <div>
        {dataFetched
          ? [
              countyStories[props.shuffledIndex]
                .HowHasMedicalDebtImpactedYourLife ? (
                <li className="story-bullets">
                  {
                    countyStories[props.shuffledIndex]
                      .HowHasMedicalDebtImpactedYourLife
                  }
                </li>
              ) : null,
            ]
          : null}
      </div>
      <div>
        {dataFetched
          ? [
              countyStories[props.shuffledIndex]
                .WhatDoYouThinkOfTheCostOfMedicalCare ? (
                <li className="story-bullets">
                  {
                    countyStories[props.shuffledIndex]
                      .WhatDoYouThinkOfTheCostOfMedicalCare
                  }
                </li>
              ) : null,
            ]
          : null}
      </div>
      <div>
        {dataFetched
          ? [
              countyStories[props.shuffledIndex]
                .WhatIsYourExperienceWithMedicalDebtCollectors ? (
                <li className="story-bullets">
                  {
                    countyStories[props.shuffledIndex]
                      .WhatIsYourExperienceWithMedicalDebtCollectors
                  }
                </li>
              ) : null,
            ]
          : null}
        <br />
        <div className="featured-buttons">
        <Button variant="contained" onClick={previousButton}>
          Previous Story
        </Button>
        <Button variant="contained" onClick={nextButton}>
          Next Story
        </Button>
        <Dropdown
          impact={props.impact}
          setImpact={props.setImpact}
          correctedCountyFetch={correctedCountyFetch}
          countyStories={countyStories}
          setCountyStories={setCountyStories}
        />
        </div>
      </div>
      </div>
    </>
  );
}
