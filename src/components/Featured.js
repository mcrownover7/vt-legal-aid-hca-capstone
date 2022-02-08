import React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Debt1 from '../Debt1.PNG'

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
      <MaroonTextTypography variant='h5'>
        <b> Stories from the State of Vermont </b>
      </MaroonTextTypography>
      <div class='graphic-container'>
        <div class='home-text'>
          <p>
            The Health Care Advocacy Office of Vermont Legal Aid is gathering
            and displaying stories of how Vermonters are impacted by medical
            debt to raise awareness.
          </p>
          Please select a county by clicking on the map or the dropdown menu at
          top to see stories.
          <p>
            {' '}
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLScRvw8T2MMNnG9up4qYqJ-oKS2WkUUPnOmkIip8QQP-RVxBeQ/viewform'
              target='_blank'
            >
              Submit your own story.
            </a>
          </p>
        </div>
        <div class='home-image'>
          <img src={Debt1} alt='legal debt' width='200' />
        </div>
      </div>
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
