//----Necessary imports
import React from 'react'
import '../App.css'
import Footer from './Footer'
import Nav from './Nav'

//Home function to render page structural elements
export default function About () {
  return (
    //React fragment (instead of <div>)
    <>
      <div className='wrapper'>
        <Nav />
        <div className='left'>left content stuff goes here</div>
        <main>Here's some stuff about us</main>
        <Footer />
      </div>
    </>
  )
}
