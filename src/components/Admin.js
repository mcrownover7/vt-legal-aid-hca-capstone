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
  const [rowSelection, setRowSelection] = useState([]);
  const [updateStoryFormBool, setUpdateStoryFormBool] = useState(false);

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
    setCreateStoryFormBool(true);
    console.log(allStories);
    return null;
  }

  function openUpdate() {
    setUpdateDeleteStoryBool(true);
    return null;
  }

  function openUpdateForm() {
    setUpdateStoryFormBool(true);
    setUpdateDeleteStoryBool(false);
    console.log(rowSelection);
  }

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
      <NavAdmin>
        <h1>ADMIN PORTAL</h1>
      </NavAdmin>
      <Button color="inherit" onClick={openStoryForm}>
        Create New Story
      </Button>

      {createStoryFormBool
        ? [
            <form action="/createnew" method="POST">
              <div>
                <label for="id">RespID: </label>
                <input type="number" name="id" placeholder="RespID" />
              </div>
              {/* <input type="text" name="county" placeholder="County" /> */}
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
              {/* <input type="text" name="insured" placeholder="Insured" /> */}
              <div>
                <label for="insured">Insured: </label>
                <select name="insured">
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {/* <input type="text" name="age" placeholder="Age" /> */}
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

      <Button color="inherit" onClick={openUpdate}>
        Update/Delete Stories
      </Button>

      {updateDeleteStoryBool
        ? [
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={allStories}
                columns={columns}
                rowsPerPageOptions={[10]}
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
            <div>
              {rowSelectionBool
                ? [
                    <Button color="inherit" onClick={openUpdateForm}>
                      Update Story
                    </Button>,
                  ]
                : null}
            </div>,
            <div>
              {rowSelectionBool
                ? [
                    <form
                      action={`/delete/${rowSelection[0]._id}`}
                      method="POST"
                    >
                      <Button color="inherit" type="submit">
                        Delete Story
                      </Button>
                    </form>,
                  ]
                : null}
            </div>,
          ]
        : null}
      {updateStoryFormBool
        ? [
            <form action={`/update/${rowSelection[0]._id}`} method="POST">
              <h2>Update Entry Form</h2>
              <h4>
                Enter only the information to be changed, if no change to the
                field is needed leave it blank.
              </h4>
              <div>
                <label for="id">Current RespID: </label>
                <input
                  value={rowSelection[0].RespID}
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
                <select name="county">
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
                {/* <input type="text" name="county" placeholder="County" /> */}
              </div>
              <div>
                <label for="insured">
                  Current Insured {rowSelection[0].Insured}:{" "}
                </label>
                <select name="insured">
                  <option value={`${rowSelection[0].Insured}`}>
                    No Change
                  </option>
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {/* <input type="text" name="insured" placeholder="Insured" /> */}
              </div>
              <div>
                <label for="age">Current Age {rowSelection[0].Age}: </label>
                <select name="age">
                  <option value={`${rowSelection[0].Age}`}>No Change</option>
                  <option value="Did Not Answer">Did Not Answer</option>
                  <option value="18-26">18-26</option>
                  <option value="27-40">27-40</option>
                  <option value="41-64">41-64</option>
                  <option value="65+">65+</option>
                </select>
                {/* <input type="text" name="age" placeholder="Age" /> */}
              </div>
              <h5>How Has Medical Debt Impacted Your Life? (current answer)</h5>
              <textarea type="text" name="impactLife">
                {rowSelection[0].HowHasMedicalDebtImpactedYourLife}
              </textarea>
              <h5>
                How Has Medical Debt Impacted Your Access To Care? (current
                answer)
              </h5>
              <textarea type="text" name="impactCare">
                {rowSelection[0].HowHasMedicalDebtImpactedYourAccessToCare}
              </textarea>
              <h5>
                What Do You Think Of The Cost Of Medical Care? (current answer)
              </h5>
              <textarea type="text" name="costCare">
                {rowSelection[0].WhatDoYouThinkOfTheCostOfMedicalCare}
              </textarea>
              <h5>
                Have You Been Surprised By A Medical Bill? (current answer)
              </h5>
              <textarea type="text" name="surpriseBill">
                {rowSelection[0].HaveYouBeenSurprisedByAMedicalBill}
              </textarea>
              <h5>
                What Is Your Experience With Medical Debt Collectors? (current
                answer)
              </h5>
              <textarea type="text" name="collections">
                {rowSelection[0].WhatIsYourExperienceWithMedicalDebtCollectors}
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
