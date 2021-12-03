import React from "react";
import { useState, useEffect } from "react";

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
    <>
      <Paper>
        <GreenTextTypography variant="h5">
          Featured Stories:{" "}
        </GreenTextTypography>
        <GreenTextTypography variant="h6">
          Featured Story #1{" "}
        </GreenTextTypography>
        <div id="featured-stories">
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
                allStories[randomStories[0]]
                  .HaveYouBeenSurprisedByAMedicalBill ? (
                  <li>
                    {
                      allStories[randomStories[0]]
                        .HaveYouBeenSurprisedByAMedicalBill
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourAccessToCare ? (
                  <li>
                    {
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourAccessToCare
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourLife ? (
                  <li>
                    {
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourLife
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare ? (
                  <li>
                    {
                      allStories[randomStories[0]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors ? (
                  <li>
                    {
                      allStories[randomStories[0]]
                        .WhatIsYourExperienceWithMedicalDebtCollectors
                    }
                  </li>
                ) : null,
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
                allStories[randomStories[1]]
                  .HaveYouBeenSurprisedByAMedicalBill ? (
                  <li>
                    {
                      allStories[randomStories[1]]
                        .HaveYouBeenSurprisedByAMedicalBill
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .HowHasMedicalDebtImpactedYourAccessToCare ? (
                  <li>
                    {
                      allStories[randomStories[1]]
                        .HowHasMedicalDebtImpactedYourAccessToCare
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .HowHasMedicalDebtImpactedYourLife ? (
                  <li>
                    {
                      allStories[randomStories[1]]
                        .HowHasMedicalDebtImpactedYourLife
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare ? (
                  <li>
                    {
                      allStories[randomStories[1]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[1]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors ? (
                  <li>
                    {
                      allStories[randomStories[1]]
                        .WhatIsYourExperienceWithMedicalDebtCollectors
                    }
                  </li>
                ) : null,
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
                allStories[randomStories[2]]
                  .HaveYouBeenSurprisedByAMedicalBill ? (
                  <li>
                    {
                      allStories[randomStories[2]]
                        .HaveYouBeenSurprisedByAMedicalBill
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .HowHasMedicalDebtImpactedYourAccessToCare ? (
                  <li>
                    {
                      allStories[randomStories[2]]
                        .HowHasMedicalDebtImpactedYourAccessToCare
                    }
                  </li>
                ) : null,
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .HowHasMedicalDebtImpactedYourLife ? (
                  <li>
                    {
                      allStories[randomStories[2]]
                        .HowHasMedicalDebtImpactedYourLife
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare ? (
                  <li>
                    {
                      allStories[randomStories[2]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare
                    }
                  </li>
                ) : null,
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[2]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors ? (
                  <li>
                    {
                      allStories[randomStories[2]]
                        .WhatIsYourExperienceWithMedicalDebtCollectors
                    }
                  </li>
                ) : null,
              ]
            : null}
        </div>
      </Paper>
    </>
  );
}
