//----Necessary imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import '../App.css'
import Map from './Map'

//Home function to render page structural elements
export default function Home () {
  return (
    //React fragment (instead of <div>)
    <>
      <div class='wrapper'>
        <header>This is the Header: Vt Legal Aid</header>
        <div class='left'>left content stuff goes here</div>
        <main>
          <Map />
        </main>
        <footer>Hi, I'm a footer</footer>
      </div>
    </>
  )
}
