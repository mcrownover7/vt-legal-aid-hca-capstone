import React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//Home function to render page structural elements
export default function Story(props) {
  const [countyStories, setCountyStories] = useState([]);
  const [correctedCountyFetch, setCorrectedCountyFetch] = useState("");

  const GreenTextTypography = withStyles({
    root: {
      color: "#5a203c",
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
        // console.log(storiesArray);
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
      <Grid item xs={6}>
        <Paper>
          <GreenTextTypography variant="h5">
            {correctedCountyFetch} Story #{props.shuffledIndex + 1} of {countyStories.length}{" "}
          </GreenTextTypography>
          <div>
            County:{" "}
            {dataFetched ? countyStories[props.shuffledIndex].County : null}
          </div>
          <div>
            Insured:{" "}
            {dataFetched ? countyStories[props.shuffledIndex].Insured : null}
          </div>
          <div>
            Age: {dataFetched ? countyStories[props.shuffledIndex].Age : null}
          </div>
          <div>
            {dataFetched
              ? [
                  countyStories[props.shuffledIndex]
                    .HaveYouBeenSurprisedByAMedicalBill
                    ? [<br />, 
                        <b>Have you been surprised by a Medical Bill?</b>,
                        <br />,
                        countyStories[props.shuffledIndex]
                          .HaveYouBeenSurprisedByAMedicalBill,
                      ]
                    : null,
                ]
              : null}
          </div>
          <div>
            {dataFetched
              ? [
                  countyStories[props.shuffledIndex]
                    .HowHasMedicalDebtImpactedYourAccessToCare
                    ? [<br />, 
                        <b>How has Medical Debt impacted your access to care?</b>,
                        <br />,
                        countyStories[props.shuffledIndex]
                          .HowHasMedicalDebtImpactedYourAccessToCare,
                      ]
                    : null,
                ]
              : null}
          </div>
          <div>
            {dataFetched
              ? [
                  countyStories[props.shuffledIndex]
                    .HowHasMedicalDebtImpactedYourLife
                    ? [<br />, 
                        <b>How has Medical Debt impacted your life?</b>,
                        <br />,
                        countyStories[props.shuffledIndex]
                          .HowHasMedicalDebtImpactedYourLife,
                      ]
                    : null,
                ]
              : null}
          </div>
          <div>
            {dataFetched
              ? [
                  countyStories[props.shuffledIndex]
                    .WhatDoYouThinkOfTheCostOfMedicalCare
                    ? [<br />, 
                        <b>What do you think of the cost of medical care?</b>,
                        <br />,
                        countyStories[props.shuffledIndex]
                          .WhatDoYouThinkOfTheCostOfMedicalCare,
                      ]
                    : null,
                ]
              : null}
          </div>
          <div>
            {dataFetched
              ? [
                  countyStories[props.shuffledIndex]
                    .WhatIsYourExperienceWithMedicalDebtCollectors
                    ? [<br />, 
                        <b>What is your experience with medical debt collectors?</b>,
                        <br />,
                        countyStories[props.shuffledIndex]
                          .WhatIsYourExperienceWithMedicalDebtCollectors,
                      ]
                    : null,
                ]
              : null}
          <br />
            <Button variant="contained" onClick={previousButton}>
              Previous Story
            </Button>
            <Button variant="contained" onClick={nextButton}>
              Next Story
            </Button>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
