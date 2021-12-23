import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dropdown from "./Dropdown.js";

//Home function to render page structural elements
export default function Story(props) {
  //setting up state variables
  const [countyStories, setCountyStories] = useState([]);
  const [correctedCountyFetch, setCorrectedCountyFetch] = useState("");

  //MUI styles for maroon and green text
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

  //creating a corrected county variable to sanitize the input data
  let correctedCounty = props.selectedCounty.toLowerCase().split(" ");
  //useEffect that uses correctedCounty to fire and sets the fetched county state variable dependent on if the county is multiple words
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

  //useEffect to fetch all stories for a selected county
  useEffect(() => {
    //if guards against two firings on mounting. This is needed so that there is not a fetch that returns all stories (when correctedCountyFetch is initially created with no value)
    if (correctedCountyFetch) {
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
    }
  }, [correctedCountyFetch]);

  //creating data fetched variable boolean that will be used in the conditionally rendered elements of the return
  let dataFetched = false;
  //once all stories state variable has data from the fetch it fires
  if (countyStories.length !== 0) {
    //setting boolean true to show data has been fetched
    dataFetched = true;
  }

  //function for the next story button that increments the index that will be used to display from the total fetched and shuffled array
  function nextButton() {
    if (props.shuffledIndex < countyStories.length - 1) {
      props.setShuffledIndex(props.shuffledIndex + 1);
    } else {
      return null;
    }
  }

  //function for the previous story button that increments the index that will be used to display from the total fetched and shuffled array
  function previousButton() {
    if (props.shuffledIndex > 0) {
      props.setShuffledIndex(props.shuffledIndex - 1);
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="county-story">
        <MaroonTextTypography variant="h5">
          <b>The Real Story: Health Care Debt In Vermont</b>
        </MaroonTextTypography>
        <GreenTextTypography variant="h6">
          {/* County, insured, age all are conditionally rendered using dataFetched and utilize the shuffledIndex state variable to display that index in the data array */}
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
        {/* Question answers are conditionally rendered using dataFetched. They use the shuffledIndex to display that stories answers from the data array */}
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
          {/* Next and previous buttons that are used to increment or decrement the story index for indexing the array */}
          <div className="featured-buttons">
            <Button variant="contained" onClick={previousButton}>
              Previous Story
            </Button>
            <Button variant="contained" onClick={nextButton}>
              Next Story
            </Button>
            {/* importing the dropdown component and passing props */}
            <Dropdown
              impact={props.impact}
              setImpact={props.setImpact}
              correctedCountyFetch={correctedCountyFetch}
              countyStories={countyStories}
              setCountyStories={setCountyStories}
              setShuffledIndex={props.setShuffledIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
}
