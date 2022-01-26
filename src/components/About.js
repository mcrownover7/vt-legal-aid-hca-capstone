//----Necessary imports
import React from 'react'
import '../App.css'
import NavAbout from './NavAbout'

//Home function to render page structural elements
export default function About () {
  return (
    //React fragment (instead of <div>)
    <>
      <NavAbout />
      <div className='wrapper'>
        <main>
          The Office of the Health Care Advocate (HCA) is collecting Vermonters’
          experiences with medical debt. We heard from hundreds of Vermonters
          from all parts of the state who have or continue to suffer from the
          impact of medical debt. The project has three goals:
          <p>
            Inform policy makers and the public about the issue of medical debt
            and its negative impact on goal of Vermonters getting the right care
            at the right time. Support the passage of meaningful policy changes
            to reduce medical debt and improve access to health care for
            Vermonters and Vermont children and families. Let Vermonters be
            heard.
          </p>
          <p>
            The project is ongoing and we would love to hear about your
            experiences. Share your story.
          </p>
        </main>
      </div>
    </>
  )
}
