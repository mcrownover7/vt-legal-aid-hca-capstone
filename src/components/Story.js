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
  }, [correctedCounty])
 

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
          {/* <div>
          County:{" "}
          {countyStories.length ? countyStories[randomStories[0]].County : null}
        </div>
        <div>
          Insured:{" "}
          {countyStories.length ? countyStories[randomStories[0]].Insured : null}
        </div>
        <div>
          Age: {countyStories.length ? countyStories[randomStories[0]].Age : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[0]].HaveYouBeenSurprisedByAMedicalBill
                  ? "Have you been surprised by a Medical Bill?" +
                    countyStories[randomStories[0]]
                      .HaveYouBeenSurprisedByAMedicalBill
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? "How has Medical Debt impacted your access to care?" +
                    countyStories[randomStories[0]]
                      .HowHasMedicalDebtImpactedYourAccessToCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[0]].HowHasMedicalDebtImpactedYourLife
                  ? "How has Medical Debt impacted your life?" +
                    countyStories[randomStories[0]]
                      .HowHasMedicalDebtImpactedYourLife
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[0]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? "What do you think of the cost of medical care?" +
                    countyStories[randomStories[0]]
                      .WhatDoYouThinkOfTheCostOfMedicalCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[0]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? "What is your experience with medical debt collectors?" +
                    countyStories[randomStories[0]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors
                  : null,
              ]
            : null}
        </div>
        <GreenTextTypography variant="h6">
          Featured Story #2{" "}
        </GreenTextTypography>
        <div>
          County:{" "}
          {countyStories.length ? countyStories[randomStories[1]].County : null}
        </div>
        <div>
          Insured:{" "}
          {countyStories.length ? countyStories[randomStories[1]].Insured : null}
        </div>
        <div>
          Age: {countyStories.length ? countyStories[randomStories[1]].Age : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[1]].HaveYouBeenSurprisedByAMedicalBill
                  ? "Have you been surprised by a Medical Bill?" +
                    countyStories[randomStories[1]]
                      .HaveYouBeenSurprisedByAMedicalBill
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[1]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? "How has Medical Debt impacted your access to care?" +
                    countyStories[randomStories[1]]
                      .HowHasMedicalDebtImpactedYourAccessToCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[1]].HowHasMedicalDebtImpactedYourLife
                  ? "How has Medical Debt impacted your life?" +
                    countyStories[randomStories[1]]
                      .HowHasMedicalDebtImpactedYourLife
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[1]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? "What do you think of the cost of medical care?" +
                    countyStories[randomStories[1]]
                      .WhatDoYouThinkOfTheCostOfMedicalCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[1]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? "What is your experience with medical debt collectors?" +
                    countyStories[randomStories[1]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors
                  : null,
              ]
            : null}
        </div>
        <GreenTextTypography variant="h6">
          Featured Story #3{" "}
        </GreenTextTypography>
        <div>
          County:{" "}
          {countyStories.length ? countyStories[randomStories[2]].County : null}
        </div>
        <div>
          Insured:{" "}
          {countyStories.length ? countyStories[randomStories[2]].Insured : null}
        </div>
        <div>
          Age: {countyStories.length ? countyStories[randomStories[2]].Age : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[2]].HaveYouBeenSurprisedByAMedicalBill
                  ? "Have you been surprised by a Medical Bill?" +
                    countyStories[randomStories[2]]
                      .HaveYouBeenSurprisedByAMedicalBill
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[2]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? "How has Medical Debt impacted your access to care?" +
                    countyStories[randomStories[2]]
                      .HowHasMedicalDebtImpactedYourAccessToCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[2]].HowHasMedicalDebtImpactedYourLife
                  ? "How has Medical Debt impacted your life?" +
                    countyStories[randomStories[2]]
                      .HowHasMedicalDebtImpactedYourLife
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[2]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? "What do you think of the cost of medical care?" +
                    countyStories[randomStories[2]]
                      .WhatDoYouThinkOfTheCostOfMedicalCare
                  : null,
              ]
            : null}
        </div>
        <div>
          {countyStories.length
            ? [
                countyStories[randomStories[2]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? "What is your experience with medical debt collectors?" +
                    countyStories[randomStories[2]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors
                  : null,
              ]
            : null}
        </div> */}
        </Paper>
      </Grid>
    </>
  );
}
