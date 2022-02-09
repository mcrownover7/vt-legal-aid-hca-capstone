import React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

export default function Featured (props) {
  //setting up state variables
  const [allStories, setAllStories] = useState([])

  //MUI styles for maroon and green text

  const MaroonTextTypography = withStyles({
    root: {
      color: '#5a203c'
    }
  })(Typography)
  const GreenTextTypography = withStyles({
    root: {
      color: '#205A3E'
    }
  })(Typography)

  //useEffect to fetch all stories once on component render
  useEffect(() => {
    fetch('/allstories')
      .then(res => res.json())
      .then(storiesArray => {
        //setting all stories state variable to the response.json from the fetch
        setAllStories(storiesArray)
        // console.log(storiesArray);
      })
  }, [])

  //creating a global variable with an empty array to store the random numbers generated and pushed into it. This will then be used to programmatically generate the featured stories.
  let randomStories = []
  //once all stories state variable has data from the fetch it fires
  if (allStories.length !== 0) {
    //pushing three random numbers using the random number function
    randomStories.push(randomNumber())
    randomStories.push(randomNumber())
    randomStories.push(randomNumber())
    // console.log(randomStories);
  }

  //function to generate a random number based on the length of the all stories array
  function randomNumber () {
    return Math.floor(Math.random() * (allStories.length - 1) + 1)
  }
  return (
    <>
      <div class='featured-story'>
        <MaroonTextTypography variant='h6'>
          <b>Featured Story: </b>
        </MaroonTextTypography>
        {/* County, Insured, and Age are all displayed conditionally with a ternary */}
        <GreenTextTypography variant='h7'>
          <b>
            County:{' '}
            {allStories.length ? allStories[randomStories[0]].County : null}
          </b>
        </GreenTextTypography>
        <div class='age-insurance'>
          <div>
            <b>Insured:</b>{' '}
            {allStories.length ? allStories[randomStories[0]].Insured : null}
          </div>
          <div>
            <b> Age:</b>{' '}
            {allStories.length ? allStories[randomStories[0]].Age : null}
          </div>
        </div>
        {/* Utilizing ternaries to conditionally display the question responses from the survey */}
        <div>
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HaveYouBeenSurprisedByAMedicalBill ? (
                  <li className='story-bullets'>
                    {
                      allStories[randomStories[0]]
                        .HaveYouBeenSurprisedByAMedicalBill
                    }
                  </li>
                ) : null
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourAccessToCare ? (
                  <li className='story-bullets'>
                    {
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourAccessToCare
                    }
                  </li>
                ) : null
              ]
            : null}
          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .HowHasMedicalDebtImpactedYourLife ? (
                  <li className='story-bullets'>
                    {
                      allStories[randomStories[0]]
                        .HowHasMedicalDebtImpactedYourLife
                    }
                  </li>
                ) : null
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatDoYouThinkOfTheCostOfMedicalCare ? (
                  <li className='story-bullets'>
                    {
                      allStories[randomStories[0]]
                        .WhatDoYouThinkOfTheCostOfMedicalCare
                    }
                  </li>
                ) : null
              ]
            : null}

          {allStories.length
            ? [
                allStories[randomStories[0]]
                  .WhatIsYourExperienceWithMedicalDebtCollectors ? (
                  <li className='story-bullets'>
                    {
                      allStories[randomStories[0]]
                        .WhatIsYourExperienceWithMedicalDebtCollectors
                    }
                  </li>
                ) : null
              ]
            : null}
        </div>
      </div>
    </>
  )
}
