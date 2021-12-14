//----Necessary imports
import React from 'react'
import '../App.css'

//Home function to render page structural elements
export default function About () {
  return (
    //React fragment (instead of <div>)
    <>
      <div className='wrapper'>
        <div className='left'>left content stuff goes here</div>
        <main>Here's some stuff about us</main>
      </div>
    </>
  )
}
