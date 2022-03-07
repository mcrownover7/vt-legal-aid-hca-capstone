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

function refreshPage () {
  window.location.reload(false)
}

export default function NavAdmin (props) {
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
            <Button color='inherit' component={Link} to='/'>
              Main Site Home
            </Button>
            <Button color='inherit' onClick={refreshPage}>
              Admin Home
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
