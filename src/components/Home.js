//----Necessary imports
import React from 'react'
import '../App.css'
import Map from './Map'
import Footer from './Footer'
import Nav from './Nav'

//Home function to render page structural elements
export default function Home () {
  return (
    //React fragment (instead of <div>)
    <>
      <div class='wrapper'>
        <Nav />
        <div class='left'>left content stuff goes here</div>
        <main>
          <Map />
        </main>
        <Footer />
      </div>
    </>
  )
}
