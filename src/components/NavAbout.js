import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LegalAidLogo1 from '../LegalAidLogo1.jpg'

export default function NavAbout (props) {
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
            {' '}
            <img
              src={LegalAidLogo1}
              alt='logo'
              width='150'
            />
          </a>

          <div id='nav-typography'>
            <Typography variant='h4'>Health Care Debt in Vermont</Typography>
            <Typography variant='h6'>Real People - Real Stories</Typography>
          </div>
          <div id='nav-buttons'>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' onClick={refreshPage}>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
