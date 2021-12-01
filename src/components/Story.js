import React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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

  console.log(correctedCountyFetch);
  useEffect(() => {
    fetch(`/allstories/${correctedCountyFetch}`)
      .then((res) => res.json())
      .then((storiesArray) => {
        //setting all stories state variable to the response.json from the fetch
        setCountyStories(storiesArray);
        console.log(storiesArray);
      });
  }, [correctedCountyFetch]);

  let randomStories;

  //once all stories state variable has data from the fetch it fires
  //** address state variable multiple fires */
  if (countyStories.length !== 0 && countyStories.length !== 212) {
    //pushing one random number using the random number function
    randomStories = randomNumber();
    console.log(randomStories);
  }

  //function to generate a random number based on the length of the all stories array
  function randomNumber() {
    return Math.floor(Math.random() * (countyStories.length - 1) + 1);
  }

  return (
    //React fragment (instead of <div>)
    <>
      <Grid item xs="auto">
        <Paper>
          <GreenTextTypography variant="h5">
            Featured Stories:{" "}
          </GreenTextTypography>
          <GreenTextTypography variant="h6">
            Featured Story #1{" "}
          </GreenTextTypography>
          <div>
            County: {randomStories ? countyStories[randomStories].County : null}
          </div>
          <div>
            Insured:{" "}
            {randomStories ? countyStories[randomStories].Insured : null}
          </div>
          <div>
            Age: {randomStories ? countyStories[randomStories].Age : null}
          </div>
          <div>
            {randomStories
              ? [
                  countyStories[randomStories]
                    .HaveYouBeenSurprisedByAMedicalBill
                    ? "Have you been surprised by a Medical Bill?" +
                      countyStories[randomStories]
                        .HaveYouBeenSurprisedByAMedicalBill
                    : null,
                ]
              : null}
          </div>
          <div>
            {randomStories
              ? [
                  countyStories[randomStories]
                    .HowHasMedicalDebtImpactedYourAccessToCare
                    ? "How has Medical Debt impacted your access to care?" +
                      countyStories[randomStories]
                        .HowHasMedicalDebtImpactedYourAccessToCare
                    : null,
                ]
              : null}
          </div>
          <div>
            {randomStories
              ? [
                  countyStories[randomStories].HowHasMedicalDebtImpactedYourLife
                    ? "How has Medical Debt impacted your life?" +
                      countyStories[randomStories]
                        .HowHasMedicalDebtImpactedYourLife
                    : null,
                ]
              : null}
          </div>
          <div>
            {randomStories
              ? [
                  countyStories[randomStories]
                    .WhatDoYouThinkOfTheCostOfMedicalCare
                    ? "What do you think of the cost of medical care?" +
                      countyStories[randomStories]
                        .WhatDoYouThinkOfTheCostOfMedicalCare
                    : null,
                ]
              : null}
          </div>
          <div>
            {randomStories
              ? [
                  countyStories[randomStories]
                    .WhatIsYourExperienceWithMedicalDebtCollectors
                    ? "What is your experience with medical debt collectors?" +
                      countyStories[randomStories]
                        .WhatIsYourExperienceWithMedicalDebtCollectors
                    : null,
                ]
              : null}
          </div>
        </Paper>
      </Grid>
    </>
  );
}
