import React, { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import ListItem from '@mui/material/ListItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LegalAidLogo1 from '../LegalAidLogo1.jpg'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Link } from 'react-router-dom'

export default function NavVertical (props) {
  const [state, setState] = useState({
    mobileView: false
  })

  // const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({ ...prevState, mobileView: true }))
        : setState(prevState => ({ ...prevState, mobileView: false }))
    }

    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())

    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  //evt handler for when a new filter is selected from the form in this component
  const handleChange = event => {
    if (event.target.value !== 'Clear') {
      //setting the impact (displays the filter selected) to the selected field in the filter
      props.setSelectedCounty(event.target.value)
      props.setCountyStoryDisplay(true)
      props.setFeaturedDisplay(false)
      props.setNavCountySelect(event.target.value)
      props.setIsSelected(true)
    } else {
      window.location.reload(false)
    }
  }

  function refreshPage () {
    window.location.reload(false)
  }

  return (
    <div className='nav-wrapper'>
      <AppBar
        style={{ backgroundColor: '#205A3E' }}
        position='static'
        className={'Nav-bar'}
      >
        <Toolbar>
          <Stack spacing={2}>
            <ListItem id='V-Nav-Logo'>
              <a href='https://www.vtlegalaid.org/'>
                <img src={LegalAidLogo1} alt='logo' width='150' />
              </a>
            </ListItem>
            <ListItem id='V-Nav-Title'>
              {' '}
              <Typography variant='h5'>Health Care Debt in Vermont</Typography>
            </ListItem>
            <ListItem id='V-Nav-Subtitle'>
              {' '}
              <Typography variant='h6'>Real People - Real Stories</Typography>
            </ListItem>
            <Stack spacing={1} direction='row'>
              <Stack spacing={0}>
                <ListItem className='V-Buttons'>
                  {' '}
                  <Button color='inherit' component={Link} to='/'>
                    Home
                  </Button>
                </ListItem>
                <ListItem className='V-Buttons'>
                  {' '}
                  <Button
                    color='inherit'
                    target='_blank'
                    href='https://vtlawhelp.org/health'
                  >
                    Get Help
                  </Button>
                </ListItem>
              </Stack>
              <Stack>
                <ListItem className='V-Buttons'>
                  {' '}
                  <Button color='inherit' component={Link} to='/About'>
                    About
                  </Button>
                </ListItem>
                <ListItem className='V-Buttons'>
                  <Button
                    color='inherit'
                    to='_blank'
                    href='https://docs.google.com/forms/d/e/1FAIpQLScRvw8T2MMNnG9up4qYqJ-oKS2WkUUPnOmkIip8QQP-RVxBeQ/viewform?usp=sf_link'
                  >
                    Submit Story
                  </Button>
                </ListItem>
              </Stack>
            </Stack>
            <Stack>
              <ListItem className='V-Buttons'>
                {' '}
                <FormControl variant='standard' sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id='select-county' style={{ color: 'black' }}>
                    Select A County
                  </InputLabel>
                  <Select
                    value={props.navCountySelect}
                    onChange={handleChange}
                    label='Nav-County-Set'
                    style={{ backgroundColor: 'white', color: '#5a203c' }}
                  >
                    <MenuItem value='Addison'>Addison</MenuItem>
                    <MenuItem value='Bennington'>Bennington</MenuItem>
                    <MenuItem value='Caledonia'>Caledonia</MenuItem>
                    <MenuItem value='Chittenden'>Chittenden</MenuItem>
                    <MenuItem value='Essex'>Essex</MenuItem>
                    <MenuItem value='Franklin'>Franklin</MenuItem>
                    <MenuItem value='Grand Isle'>Grand Isle</MenuItem>
                    <MenuItem value='Lamoille'>Lamoille</MenuItem>
                    <MenuItem value='Orange'>Orange</MenuItem>
                    <MenuItem value='Orleans'>Orleans</MenuItem>
                    <MenuItem value='Rutland'>Rutland</MenuItem>
                    <MenuItem value='Washington'>Washington</MenuItem>
                    <MenuItem value='Windham'>Windham</MenuItem>
                    <MenuItem value='Windsor'>Windsor</MenuItem>
                    <MenuItem value='Clear'>Clear Filter</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  )
}
