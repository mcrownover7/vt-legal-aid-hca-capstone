//----Necessary imports
import React from 'react'
import '../App.css'
import Footer from './Footer'
import Nav from './Nav'

//Home function to render page structural elements
export default function Contact () {
  return (
    //React fragment (instead of <div>)
    <>
      <div class='wrapper'>
        <Nav />
        <div class='left'>left content stuff goes here</div>
        <main>
          Here's how you can get in touch with us Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Impedit vel minus possimus asperiores
          non commodi ullam quasi at culpa, esse dignissimos in, soluta
          voluptate maiores corporis. Rem iusto eveniet incidunt dignissimos nam
          consectetur explicabo hic eius cupiditate enim quisquam magnam dolore
          cumque, quod eligendi, unde soluta obcaecati ut laborum nobis?
        </main>
        <Footer />
      </div>
    </>
  )
}
