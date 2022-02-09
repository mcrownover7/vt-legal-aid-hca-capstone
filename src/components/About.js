//----Necessary imports
import React from 'react'
import '../App.css'
import NavAbout from './NavAbout'
import NavVerticalAbout from './NavVerticalAbout'
import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Debt2 from '../Debt2.svg'

//creating a material ui style for maroon text
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

//Home function to render page structural elements

export default function About () {
  //creating use state variables
  const [center, setCenter] = useState([43.88, -72.7317])
  const [zoom, setZoom] = useState(8)
  const [featuredDisplay, setFeaturedDisplay] = useState(true)
  const [countyStoryDisplay, setCountyStoryDisplay] = useState(false)
  const [selectedCounty, setSelectedCounty] = useState('')
  const [shuffledIndex, setShuffledIndex] = useState(0)
  const [impact, setImpact] = useState('')
  const [navCountySelect, setNavCountySelect] = useState('')
  const [mobileView, setMobileView] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  //useEffect to set the mobile view for navigation based on the window width
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false)
    }

    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())

    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  return (
    //React fragment (instead of <div>)
    <>
      {/* ternary to display the correct nav based on the useEffect window width */}
      {mobileView ? (
        <NavVerticalAbout
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        ></NavVerticalAbout>
      ) : (
        <NavAbout
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        />
      )}

      <div className='subpage-wrapper'>
        <div class='left-article'>
          <MaroonTextTypography variant='h5'>
            <strong> About This Web Site </strong>
          </MaroonTextTypography>
          <div class='content'>
            <GreenTextTypography variant='h7'>
              <em>
                {' '}
                <strong>
                  Why the Health Care Debt in Vermont Project Matters{' '}
                </strong>
              </em>
            </GreenTextTypography>
          </div>
          <div class='content'>
            The Office of the Health Care Advocate (HCA) is collecting
            Vermonters’ experiences with medical debt. We heard from hundreds of
            Vermonters from all parts of the state who have or continue to
            suffer from the impact of medical debt.
          </div>
          <div class='content'>
            <GreenTextTypography variant='h7'>
              <strong>
                <em>
                  The Health Care Debt In Vermont project has three goals:
                </em>
              </strong>
            </GreenTextTypography>
          </div>
          <div class='content'>
            <ol>
              <li>
                Inform policy makers and the public about the issue of medical
                debt and its negative impact on goal of Vermonters getting the
                right care at the right time.
              </li>
              <li>
                Support the passage of meaningful policy changes to reduce
                medical debt and improve access to health care for Vermonters
                and Vermont children and families.
              </li>
              <li>Let the voices of Vermonters be heard.</li>
            </ol>
          </div>
          <div class='content'>
            The project is ongoing and we would love to hear about your
            experiences.{' '}
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLScRvw8T2MMNnG9up4qYqJ-oKS2WkUUPnOmkIip8QQP-RVxBeQ/viewform'
              target='_blank'
            >
              Please share your story here.
            </a>
          </div>
        </div>

        <div class='right-article'>
          <img src={Debt2} alt='legal debt' />
        </div>
      </div>
    </>
  )
}
