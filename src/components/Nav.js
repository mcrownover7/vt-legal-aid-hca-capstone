import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LegalAidLogo1 from '../LegalAidLogo1.jpg'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Nav (props) {
  const classes = useStyles()

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
    <div class='nav-wrapper'>
      <AppBar
        style={{ backgroundColor: '#205A3E' }}
        position='static'
        className={'Nav-bar'}
      >
        <Toolbar>
          <a href='https://www.vtlegalaid.org/'>
            <img src={LegalAidLogo1} alt='logo' width='150' />
          </a>

          <div id='nav-typography'>
            <Typography variant='h4'>Health Care Debt in Vermont</Typography>
            <Typography variant='h6'>Real People - Real Stories</Typography>
          </div>
          <div id='nav-buttons'>
            <Button color='inherit' onClick={refreshPage}>
              Home
            </Button>

            <Button color='inherit' component={Link} to='/about'>
              About
            </Button>
            <Button
              color='inherit'
              target='_blank'
              href='https://vtlawhelp.org/health'
            >
              Get Help
            </Button>
            <Button
              color='inherit'
              target='_blank'
              href='https://docs.google.com/forms/d/e/1FAIpQLScRvw8T2MMNnG9up4qYqJ-oKS2WkUUPnOmkIip8QQP-RVxBeQ/viewform?usp=sf_link'
            >
              Submit Story
            </Button>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
