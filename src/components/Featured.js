import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Graph from "./Graph.js";

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
      <div>
        <Graph />
      </div>
      <GreenTextTypography variant="h5">
        <b>Featured Story: </b>
      </GreenTextTypography>
      <GreenTextTypography variant="h7">
        <b>
          County:{" "}
          {allStories.length ? allStories[randomStories[0]].County : null}
        </b>
      </GreenTextTypography>
      <div id="featured-stories"></div>
      <div class="age-insurance">
        <div>
          <b>Insured:{" "}</b>
          {allStories.length ? allStories[randomStories[0]].Insured : null}
        </div>
        <div>
         <b> Age:</b> {allStories.length ? allStories[randomStories[0]].Age : null}
        </div>
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
              allStories[randomStories[0]].HowHasMedicalDebtImpactedYourLife ? (
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
    </>
  );
}
