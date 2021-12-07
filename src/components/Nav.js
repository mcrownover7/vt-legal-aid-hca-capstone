import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LegalAidLogo1 from '../LegalAidLogo1.png'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Nav () {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const style = {
    background: '#205A3E'
  }

  function refreshPage () {
    window.location.reload(false)
  }

  return (
    <AppBar style={{ backgroundColor: '#205A3E' }} position='static'>
      <Toolbar>
        <img src={LegalAidLogo1} alt='logo' width='100' />

        <div>
          <Typography variant='h4' className={classes.title}>
            Health Care Debt in Vermont
          </Typography>
          <Typography variant='h6' className={classes.subTitle}>
            Real People - Real Stories
          </Typography>
        </div>

        {/* NOTE: this is currently not doing anything since it is a single page app */}
        <Button color='inherit' onClick={refreshPage}>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/about'>
          About
        </Button>
        <Button color='inherit' component={Link} to='/contact'>
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  )
}
