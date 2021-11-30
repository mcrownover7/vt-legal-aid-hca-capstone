//----Necessary imports
import React from 'react'
import '../App.css'
import Map from './Map'
import Footer from './Footer'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

//Home function to render page structural elements
export default function Home () {
  const [center, setCenter] = useState([43.88, -72.7317])
  const [zoom, setZoom] = useState(8)
  return (
    //React fragment (instead of <div>)
    <>
      <Grid container spacing={2}>
        <Grid item xs='auto'>
          <Paper>
            <Typography variant='h2'>Featured Stories: </Typography>My story
            is... My story is... My story is...
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Paper>
            <Map
              center={center}
              setCenter={setCenter}
              zoom={zoom}
              setZoom={setZoom}
            />
          </Paper>
        </Grid>
      </Grid>

      <Footer />
    </>
  )
}
