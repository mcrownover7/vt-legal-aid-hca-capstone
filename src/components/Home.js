//----Necessary imports
import React from "react";
import "../App.css";
import Map from "./Map";

import { useState } from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Featured from "./Featured";
import Story from "./CountyStory";
import Nav from "./Nav";

//Home function to render page structural elements
export default function Home() {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [zoom, setZoom] = useState(8);
  const [featuredDisplay, setFeaturedDisplay] = useState(true);
  const [countyStoryDisplay, setCountyStoryDisplay] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [shuffledIndex, setShuffledIndex] = useState(0);
  const [impact, setImpact] = useState("");
  const [navCountySelect, setNavCountySelect] = useState("");

  const MaroonTextTypography = withStyles({
    root: {
      color: "#5a203c",
    },
  })(Typography);

  return (
    <>
      <Nav
        setSelectedCounty={setSelectedCounty}
        setCountyStoryDisplay={setCountyStoryDisplay}
        setFeaturedDisplay={setFeaturedDisplay}
        navCountySelect={navCountySelect}
        setNavCountySelect={setNavCountySelect}
      />
      <div id="homepage-wrapper">
        <div id="map-display">
          <MaroonTextTypography variant="h5" align="center"><b>Click Counties For Stories</b></MaroonTextTypography>
          <Map
            center={center}
            setCenter={setCenter}
            zoom={zoom}
            setZoom={setZoom}
            setFeaturedDisplay={setFeaturedDisplay}
            setSelectedCounty={setSelectedCounty}
            setCountyStoryDisplay={setCountyStoryDisplay}
            countyStoryDisplay={countyStoryDisplay}
            setShuffledIndex={setShuffledIndex}
            setImpact={setImpact}
            setNavCountySelect={setNavCountySelect}
          />
        </div>
        <div id="stories-display">
          {featuredDisplay ? <Featured /> : null}
          {countyStoryDisplay ? (
            <Story
              impact={impact}
              setImpact={setImpact}
              selectedCounty={selectedCounty}
              shuffledIndex={shuffledIndex}
              setShuffledIndex={setShuffledIndex}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
