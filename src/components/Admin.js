import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Menu as MenuIcon } from "@material-ui/icons";

export default function Admin(props) {
  const [allStories, setAllStories] = useState([]);
  const [createStoryForm, setCreateStoryForm] = useState(false);

  //useEffect to fetch all stories once on component render
  useEffect(() => {
    fetch("/allstories")
      .then((res) => res.json())
      .then((storiesArray) => {
        //setting all stories state variable to the response.json from the fetch
        setAllStories(storiesArray);
        // console.log(storiesArray);
      });
  }, []);

  function openStoryForm() {
    setCreateStoryForm(true);

    return null;
  }

  return (
    <>
      <h1>ADMIN PORTAL</h1>
      <Button color="inherit" onClick={openStoryForm}>
        Create New Story
      </Button>

      {createStoryForm
        ? [
            <form action="/createnew" method="POST">
              <input type="text" name="id" placeholder="RespId" />
              <input type="text" name="county" placeholder="County" />
              <input type="text" name="insured" placeholder="Insured" />
              <input type="text" name="age" placeholder="Age" />
              <input
                type="text"
                name="impactLife"
                placeholder="How has Medical Debt Impacted your Life"
              />
              <input
                type="text"
                name="impactCare"
                placeholder="How has Medical Debt Impacted your Access to Care"
              />
              <input
                type="text"
                name="costCare"
                placeholder="What do you Think of the Cost of Medical Care"
              />
              <input
                type="text"
                name="surpriseBill"
                placeholder="Have You Been Surprised by a Medical Bill"
              />
              <input
                type="text"
                name="collections"
                placeholder="What is your Experience with Medical Debt Collectors"
              />
              <input type="submit" />
            </form>,
          ]
        : null}
    </>
  );
}
