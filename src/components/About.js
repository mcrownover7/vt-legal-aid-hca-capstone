//----Necessary imports
import React from 'react'
import '../App.css'
import Footer from './Footer'
import Navigation from './Navigation'

//Home function to render page structural elements
export default function About () {
  return (
    //React fragment (instead of <div>)
    <>
      <div class='wrapper'>
        <Navigation />
        <div class='left'>left content stuff goes here</div>
        <main>Here's some stuff about us</main>
        <Footer />
      </div>
    </>
  )
}
