import React from "react";
import { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import { DataGrid } from "@mui/x-data-grid";
import NavAdmin from "./NavAdmin";

export default function Admin(props) {
  const [allStories, setAllStories] = useState([]);
  const [createStoryFormBool, setCreateStoryFormBool] = useState(false);
  const [updateDeleteStoryBool, setUpdateDeleteStoryBool] = useState(false);
  const [rowSelectionBool, setRowSelectionBool] = useState(false);
  const [updateStoryFormBool, setUpdateStoryFormBool] = useState(false);
  const [bulkUploadFormBool, setBulkUploadFormBool] = useState(false);
  const [rowSelection, setRowSelection] = useState([]);
  const [mongoID, setMongoID] = useState("");
  const [respID, setRespID] = useState("");
  const [county, setCounty] = useState("");
  const [insured, setInsured] = useState("");
  const [age, setAge] = useState("");
  const [medicalDebt, setMedicalDebt] = useState("");
  const [accessCare, setAccessCare] = useState("");
  const [costCare, setCostCare] = useState("");
  const [surprised, setSurprised] = useState("");
  const [collectors, setCollectors] = useState("");

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

  //function for setting the boolean state variable to open the create story form
  function openStoryForm() {
    setCreateStoryFormBool(true);
    console.log(allStories);
    return null;
  }

  //function for setting the boolean state variable to open the mui data grid
  function openUpdate() {
    setUpdateDeleteStoryBool(true);
    return null;
  }

  //function for setting the boolean state variable to close the mui data grid and open the update form
  function openUpdateForm() {
    setUpdateStoryFormBool(true);
    setUpdateDeleteStoryBool(false);
    //setting all of the state variables for the update form to the correct initial value from the row selection state variable that is derived from the mui data grid selected row methods
    setMongoID(rowSelection[0]._id);
    setRespID(rowSelection[0].RespID);
    setCounty(rowSelection[0].County);
    setAge(rowSelection[0].Age);
    setInsured(rowSelection[0].Insured);
    setMedicalDebt(rowSelection[0].HowHasMedicalDebtImpactedYourLife);
    setAccessCare(rowSelection[0].HowHasMedicalDebtImpactedYourAccessToCare);
    setCostCare(rowSelection[0].WhatDoYouThinkOfTheCostOfMedicalCare);
    setSurprised(rowSelection[0].HaveYouBeenSurprisedByAMedicalBill);
    setCollectors(
      rowSelection[0].WhatIsYourExperienceWithMedicalDebtCollectors
    );
    // console.log(rowSelection);
  }

  //function for opening the bulk upload form
  function openBulkUpload() {
    setBulkUploadFormBool(true);
  }

  //creating the columns for the mui data grid that displays for updating or deleting a story
  const columns = [
    {
      field: "RespID",
      headerName: "Response ID",
      width: 120,
      stretchable: true,
    },
    { field: "County", headerName: "County", width: 110 },
    { field: "Insured", headerName: "Insured", width: 70 },
    { field: "Age", headerName: "Age", width: 70 },
    {
      field: "HowHasMedicalDebtImpactedYourLife",
      headerName: "Life Impact?",
      width: 500,
      resizable: true,
    },
    {
      field: "HowHasMedicalDebtImpactedYourAccessToCare",
      headerName: "Care Access Impact?",
      width: 500,
    },
    {
      field: "WhatDoYouThinkOfTheCostOfMedicalCare",
      headerName: "About Cost of Care?",
      width: 500,
    },
    {
      field: "HaveYouBeenSurprisedByAMedicalBill",
      headerName: "Experienced Surprise?",
      width: 500,
    },
    {
      field: "WhatIsYourExperienceWithMedicalDebtCollectors",
      headerName: "Experienced Debt Collectors?",
      width: 500,
    },
  ];

  return (
    <>
      {/* rendering the admin nav bar */}
      <NavAdmin>
        <h1>ADMIN PORTAL</h1>
      </NavAdmin>
      <div className="admin-buttons">
        {/* button for creating a new story */}
        <Button id="create-button" variant="contained" onClick={openStoryForm}>
          Create New Story
        </Button>
        {/* button for updating/deleting a story, opens mui data grid */}
        <Button
          id="update-delete-button"
          variant="contained"
          onClick={openUpdate}
        >
          Update/Delete Stories
        </Button>
        {/* button for bulk upload of stories via csv */}
        <Button
          id="update-delete-button"
          variant="contained"
          onClick={openBulkUpload}
        >
          Bulk Upload
        </Button>
      </div>
      {/* boolean that displays the form for creating a new story only after the new story button is clicked */}
      {createStoryFormBool
        ? [
            <form id="create-form" action="/createnew" method="POST">
              <div>
                <label for="id">RespID: </label>
                <input
                  type="number"
                  name="id"
                  placeholder="RespID"
                  required="true"
                  min="10000000000"
                  max="99999999999"
                />
              </div>
              <div>
                <label for="county">County: </label>
                <select name="county">
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Addison">Addison</option>
                  <option value="Bennington">Bennington</option>
                  <option value="Caledonia">Caledonia</option>
                  <option value="Chittenden">Chittenden</option>
                  <option value="Essex">Essex</option>
                  <option value="Franklin">Franklin</option>
                  <option value="Grand Isle">Grand Isle</option>
                  <option value="Lamoille">Lamoille</option>
                  <option value="Orange">Orange</option>
                  <option value="Orleans">Orleans</option>
                  <option value="Rutland">Rutland</option>
                  <option value="Washington">Washington</option>
                  <option value="Windham">Windham</option>
                  <option value="Windsor">Windsor</option>
                </select>
              </div>
              <div>
                <label for="insured">Insured: </label>
                <select name="insured">
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label for="age">Age: </label>
                <select name="age">
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="18-26">18-26</option>
                  <option value="27-40">27-40</option>
                  <option value="41-64">41-64</option>
                  <option value="65+">65+</option>
                </select>
              </div>
              <div>
                <label for="impactLife">
                  How Has Medical Debt Impacted Your Life?{" "}
                </label>
                <div>
                  <textarea type="text" name="impactLife" />
                </div>
              </div>
              <div>
                <label for="impactCare">
                  How Has Medical Debt Impacted Your Access to Care?{" "}
                </label>
                <div>
                  <textarea type="text" name="impactCare" />
                </div>
              </div>
              <div>
                <label for="costCare">
                  What Do You Think Of The Cost Of Medical Care?{" "}
                </label>
                <div>
                  <textarea type="text" name="costCare" />
                </div>
              </div>
              <div>
                <label for="surpriseBill">
                  Have You Been Surprised By A Medical Bill?{" "}
                </label>
                <div>
                  <textarea type="text" name="surpriseBill" />
                </div>
              </div>
              <div>
                <label for="collections">
                  What Is Your Experience With Medical Debt Collectors?{" "}
                </label>
                <div>
                  <textarea type="text" name="collections" />
                </div>
              </div>
              <input type="submit" />
            </form>,
          ]
        : null}

      {/* boolean that displays the bulk upload of stories form after the bulk upload button is pressed */}
      {bulkUploadFormBool
        ? [
            <form id="bulk-form" action="/bulkupload" method="POST">
              <div>
                <label for="csv">CSV to Upload: </label>
                <input type="file" id="csv" />
              </div>
            </form>,
          ]
        : null}

      {/* boolean that displays the mui data grid of all stories after the update/delete button is pressed */}
      {updateDeleteStoryBool
        ? [
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={allStories}
                columns={columns}
                rowsPerPageOptions={[10, 50, 100]}
                getRowId={(row) => row._id}
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);

                  const selectedRows = allStories.filter((row) =>
                    selectedIDs.has(row._id)
                  );
                  setRowSelection(selectedRows);
                  setRowSelectionBool(true);
                }}
                rowSelection={rowSelection}
              />
            </div>,
            // ternaries used to conditionally display the update and delete story buttons only when a row is selected in mui data grid
            <div className="admin-buttons">
              <div>
                {rowSelectionBool
                  ? [
                      <Button variant="contained" onClick={openUpdateForm}>
                        Update Story
                      </Button>,
                    ]
                  : null}
              </div>

              <div>
                {rowSelectionBool
                  ? [
                      <form
                        action={`/delete/${rowSelection[0]._id}`}
                        method="POST"
                      >
                        <Button variant="contained" type="submit">
                          Delete Story
                        </Button>
                      </form>,
                    ]
                  : null}
              </div>
            </div>,
          ]
        : null}

      {/* boolean that displays the form for updating a  story only after the update story button is clicked while mui grid is open */}
      {updateStoryFormBool
        ? [
            <form id="update-form" action={`/update/${mongoID}`} method="POST">
              <h2>Update Entry Form</h2>
              <h4>
                Enter only the information to be changed, if no change to the
                field is needed leave it blank.
              </h4>
              <div>
                <label for="id">Current RespID: </label>
                <input
                  value={respID}
                  onChange={(evt) => setRespID(evt.target.value)}
                  type="number"
                  name="id"
                  required="true"
                  min="10000000000"
                  max="99999999999"
                />
              </div>
              <div>
                <label for="county">
                  Current County {rowSelection[0].County}:{" "}
                </label>
                <select
                  name="county"
                  onChange={(evt) => setCounty(evt.target.value)}
                >
                  <option value={`${rowSelection[0].County}`}>No Change</option>
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Addison">Addison</option>
                  <option value="Bennington">Bennington</option>
                  <option value="Caledonia">Caledonia</option>
                  <option value="Chittenden">Chittenden</option>
                  <option value="Essex">Essex</option>
                  <option value="Franklin">Franklin</option>
                  <option value="Grand Isle">Grand Isle</option>
                  <option value="Lamoille">Lamoille</option>
                  <option value="Orange">Orange</option>
                  <option value="Orleans">Orleans</option>
                  <option value="Rutland">Rutland</option>
                  <option value="Washington">Washington</option>
                  <option value="Windham">Windham</option>
                  <option value="Windsor">Windsor</option>
                </select>
              </div>
              <div>
                <label for="insured">
                  Current Insured {rowSelection[0].Insured}:{" "}
                </label>
                <select
                  name="insured"
                  onChange={(evt) => setInsured(evt.target.value)}
                >
                  <option value={`${rowSelection[0].Insured}`}>
                    No Change
                  </option>
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label for="age">Current Age {rowSelection[0].Age}: </label>
                <select name="age" onChange={(evt) => setAge(evt.target.value)}>
                  <option value={`${rowSelection[0].Age}`}>No Change</option>
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="18-26">18-26</option>
                  <option value="27-40">27-40</option>
                  <option value="41-64">41-64</option>
                  <option value="65+">65+</option>
                </select>
              </div>
              <h5>How Has Medical Debt Impacted Your Life? (current answer)</h5>
              <textarea
                type="text"
                name="impactLife"
                onChange={(evt) => setMedicalDebt(evt.target.value)}
              >
                {medicalDebt}
              </textarea>
              <h5>
                How Has Medical Debt Impacted Your Access To Care? (current
                answer)
              </h5>
              <textarea
                type="text"
                name="impactCare"
                onChange={(evt) => setAccessCare(evt.target.value)}
              >
                {accessCare}
              </textarea>
              <h5>
                What Do You Think Of The Cost Of Medical Care? (current answer)
              </h5>
              <textarea
                type="text"
                name="costCare"
                onChange={(evt) => setCostCare(evt.target.value)}
              >
                {costCare}
              </textarea>
              <h5>
                Have You Been Surprised By A Medical Bill? (current answer)
              </h5>
              <textarea
                type="text"
                name="surpriseBill"
                onChange={(evt) => setSurprised(evt.target.value)}
              >
                {surprised}
              </textarea>
              <h5>
                What Is Your Experience With Medical Debt Collectors? (current
                answer)
              </h5>
              <textarea
                type="text"
                name="collections"
                onChange={(evt) => setCollectors(evt.target.value)}
              >
                {collectors}
              </textarea>
              <div>
                <input type="submit" />
              </div>
            </form>,
          ]
        : null}
    </>
  );
}
