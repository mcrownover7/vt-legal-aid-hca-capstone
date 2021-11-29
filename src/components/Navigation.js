//----Necessary imports
import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import About from './About'

//Home function to render page structural elements
export default function Header () {
  return (
    //React fragment (instead of <div>)
    <>
      <header>
        Our Header: Vt Legal Aid--
        <Button component={About}>About Us</Button>
        <Link className='nav-link' to='/contact'>
          Contact Us
        </Link>
        later we need hamburger menu
      </header>
    </>
  )
}
