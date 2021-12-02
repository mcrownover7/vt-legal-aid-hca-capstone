import React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

export default function Featured(props) {
  const [allStories, setAllStories] = useState([]);
  const GreenTextTypography = withStyles({
    root: {
      color: "#5a203c",
    },
  })(Typography);

  //useEffect to fetch all stories once on component render
  useEffect(() => {
    fetch("/allstories")
      .then((res) => res.json())
      .then((storiesArray) => {
        //setting all stories state variable to the response.json from the fetch
        setAllStories(storiesArray);
        // console.log(storiesArray);
      });
  }, []);

  //creating a global variable with an empty array to store the random numbers generated and pushed into it. This will then be used to programmatically generate the featured stories.
  let randomStories = [];
  //once all stories state variable has data from the fetch it fires
  if (allStories.length !== 0) {
    //pushing three random numbers using the random number function
    randomStories.push(randomNumber());
    randomStories.push(randomNumber());
    randomStories.push(randomNumber());
    // console.log(randomStories);
  }

  //function to generate a random number based on the length of the all stories array
  function randomNumber() {
    return Math.floor(Math.random() * (allStories.length - 1) + 1);
  }

  return (
    <Grid item xs={6}>
      <Paper>
        <GreenTextTypography variant="h5">
          Featured Stories:{" "}
        </GreenTextTypography>
        <GreenTextTypography variant="h6">
          Featured Story #1{" "}
        </GreenTextTypography>
        <div>
          County:{" "}
          {allStories.length ? allStories[randomStories[0]].County : null}
        </div>
        <div>
          Insured:{" "}
          {allStories.length ? allStories[randomStories[0]].Insured : null}
        </div>
        <div>
          Age: {allStories.length ? allStories[randomStories[0]].Age : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]].HaveYouBeenSurprisedByAMedicalBill
                  ? [
                      <br />,
                      <b>Have you been surprised by a Medical Bill?</b>,
                      <br />,
                      allStories[randomStories[0]]
                        .HaveYouBeenSurprisedByAMedicalBill,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your access to care?</b>,
                      <br />,
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourAccessToCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]].HowHasMedicalDebtImpactedYourLife
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your life?</b>,
                      <br />,
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourLife,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? [
                      <br />,
                      <b>What do you think of the cost of medical care?</b>,
                      <br />,
                      allStories[randomStories[0]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? [<br />, <b>What is your experience with medical debt collectors?</b>, <br />, 
                    allStories[randomStories[0]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors]
                  : null,
              ]
            : null}
        </div>
        <GreenTextTypography variant="h6">
          Featured Story #2{" "}
        </GreenTextTypography>
        <div>
          County:{" "}
          {allStories.length ? allStories[randomStories[1]].County : null}
        </div>
        <div>
          Insured:{" "}
          {allStories.length ? allStories[randomStories[1]].Insured : null}
        </div>
        <div>
          Age: {allStories.length ? allStories[randomStories[1]].Age : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[1]].HaveYouBeenSurprisedByAMedicalBill
                  ? [
                      <br />,
                      <b>Have you been surprised by a Medical Bill?</b>,
                      <br />,
                      allStories[randomStories[1]]
                        .HaveYouBeenSurprisedByAMedicalBill,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your access to care?</b>,
                      <br />,
                      allStories[randomStories[1]]
                        .HowHasMedicalDebtImpactedYourAccessToCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[1]].HowHasMedicalDebtImpactedYourLife
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your life?</b>,
                      <br />,
                      allStories[randomStories[1]]
                        .HowHasMedicalDebtImpactedYourLife,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? [
                      <br />,
                      <b>What do you think of the cost of medical care?</b>,
                      <br />,
                      allStories[randomStories[1]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? [<br />, <b>What is your experience with medical debt collectors?</b>, <br />, 
                    allStories[randomStories[1]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors]
                  : null,
              ]
            : null}
        </div>
        <GreenTextTypography variant="h6">
          Featured Story #3{" "}
        </GreenTextTypography>
        <div>
          County:{" "}
          {allStories.length ? allStories[randomStories[2]].County : null}
        </div>
        <div>
          Insured:{" "}
          {allStories.length ? allStories[randomStories[2]].Insured : null}
        </div>
        <div>
          Age: {allStories.length ? allStories[randomStories[2]].Age : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[2]].HaveYouBeenSurprisedByAMedicalBill
                  ? [
                      <br />,
                      <b>Have you been surprised by a Medical Bill?</b>,
                      <br />,
                      allStories[randomStories[0]]
                        .HaveYouBeenSurprisedByAMedicalBill,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourAccessToCare
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your access to care?</b>,
                      <br />,
                      allStories[randomStories[2]]
                        .HowHasMedicalDebtImpactedYourAccessToCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[2]].HowHasMedicalDebtImpactedYourLife
                  ? [
                      <br />,
                      <b>How has Medical Debt impacted your life?</b>,
                      <br />,
                      allStories[randomStories[2]]
                        .HowHasMedicalDebtImpactedYourLife,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare
                  ? [
                      <br />,
                      <b>What do you think of the cost of medical care?</b>,
                      <br />,
                      allStories[randomStories[2]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare,
                    ]
                  : null,
              ]
            : null}
        </div>
        <div>
          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors
                  ? [<br />, <b>What is your experience with medical debt collectors?</b>, <br />, 
                    allStories[randomStories[2]]
                      .WhatIsYourExperienceWithMedicalDebtCollectors]
                  : null,
              ]
            : null}
        </div>
      </Paper>
    </Grid>
  );
}
