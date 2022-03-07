import React from 'react'
import '../App.css'
import Map from './Map'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Featured from './Featured'
import Story from './CountyStory'
import Nav from './Nav'
import NavVertical from './NavVertical'
import Debt1 from '../Debt1.jpg'

//Home function to render page structural elements
export default function Home () {
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

  //creating a material ui style for maroon text
  const MaroonTextTypography = withStyles({
    root: {
      color: '#5a203c'
    }
  })(Typography)

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
    <>
      {/* ternary to display the correct nav based on the useEffect window width */}
      {mobileView ? (
        <NavVertical
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        ></NavVertical>
      ) : (
        <Nav
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        />
      )}

      <div id='homepage-wrapper'>
        <div id='map-display'>
          <MaroonTextTypography variant='h5' align='center'>
            {/* <b>Click Counties For Stories</b> */}
          </MaroonTextTypography>
          {/* Import map component and passing props */}
          <Map
            navCountySelect={navCountySelect}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            center={center}
            setCenter={setCenter}
            zoom={zoom}
            setZoom={setZoom}
            setFeaturedDisplay={setFeaturedDisplay}
            setSelectedCounty={setSelectedCounty}
            setCountyStoryDisplay={setCountyStoryDisplay}
            countyStoryDisplay={countyStoryDisplay}
            setShuffledIndex={setShuffledIndex}
            setImpact={setImpact}
            setNavCountySelect={setNavCountySelect}
          />
        </div>
        <div id='home-right'>
          <div id='intro-image'>
            <div id='intro'>
              <MaroonTextTypography variant='h6'>
                <b> Stories from the State of Vermont </b>
              </MaroonTextTypography>
              <p>
                The Office of the Health Care Advocate at Vermont Legal Aid is
                gathering and displaying stories of how Vermonters are impacted
                by medical debt. Our goal is to raise awareness of how common
                and painful medical debt is for individuals and families across
                Vermont.
              </p>
              To read stories, please click on a county on the map or choose a
              county from the dropdown menu at the top of the page.
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
            <div id='image'>
              <img src={Debt1} alt='legal debt' />
            </div>
          </div>
          <div id='featured-story'>
            {featuredDisplay ? <Featured /> : null}
            {countyStoryDisplay ? (
              <Story
                impact={impact}
                setImpact={setImpact}
                selectedCounty={selectedCounty}
                shuffledIndex={shuffledIndex}
                setShuffledIndex={setShuffledIndex}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
