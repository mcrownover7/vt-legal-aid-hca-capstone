import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Menu as MenuIcon } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";

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
      <h1>ADMIN PORTAL</h1>
      <Button color="inherit" onClick={openStoryForm}>
        Create New Story
      </Button>

      {createStoryFormBool
        ? [
            <form action="/createnew" method="POST">
              <input type="text" name="id" placeholder="RespID" />
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
                <label for="id">
                  Current RespID {rowSelection[0].RespID}:{" "}
                </label>
                <input type="text" name="id" placeholder="RespID" />
              </div>
              <div>
                <label for="county">
                  Current County {rowSelection[0].County}:{" "}
                </label>
                <input type="text" name="county" placeholder="County" />
              </div>
              <div>
                <label for="insured">
                  Current Insured {rowSelection[0].Insured}:{" "}
                </label>
                <input type="text" name="insured" placeholder="Insured" />
              </div>
              <div>
                <label for="age">Current Age {rowSelection[0].Age}: </label>
                <input type="text" name="age" placeholder="Age" />
              </div>
              <h5>How has medical debt impacted your life? (current answer)</h5>
              {rowSelection[0].HowHasMedicalDebtImpactedYourLife
                ? [
                    <div>
                      {rowSelection[0].HowHasMedicalDebtImpactedYourLife}
                    </div>,
                  ]
                : [<div>No Answer</div>]}
              <input
                type="text"
                name="impactLife"
                placeholder="How has Medical Debt Impacted your Life"
              />
              <h5>
                How has Medical Debt Impacted your Access to Care? (current
                answer)
              </h5>
              {rowSelection[0].HowHasMedicalDebtImpactedYourAccessToCare
                ? [
                    <div>
                      {
                        rowSelection[0]
                          .HowHasMedicalDebtImpactedYourAccessToCare
                      }
                    </div>,
                  ]
                : [<div>No Answer</div>]}
              <input
                type="text"
                name="impactCare"
                placeholder="How has Medical Debt Impacted your Access to Care"
              />
              <h5>
              What do you Think of the Cost of Medical Care? (current
                answer)
              </h5>
              {rowSelection[0].WhatDoYouThinkOfTheCostOfMedicalCare
                ? [
                    <div>
                      {
                        rowSelection[0]
                          .WhatDoYouThinkOfTheCostOfMedicalCare
                      }
                    </div>,
                  ]
                : [<div>No Answer</div>]}
              <input
                type="text"
                name="costCare"
                placeholder="What do you Think of the Cost of Medical Care"
              />
               <h5>
               Have You Been Surprised by a Medical Bill? (current
                answer)
              </h5>
              {rowSelection[0].HaveYouBeenSurprisedByAMedicalBill
                ? [
                    <div>
                      {
                        rowSelection[0]
                          .HaveYouBeenSurprisedByAMedicalBill
                      }
                    </div>,
                  ]
                : [<div>No Answer</div>]}
              <input
                type="text"
                name="surpriseBill"
                placeholder="Have You Been Surprised by a Medical Bill"
              />
               <h5>
               What is your Experience with Medical Debt Collectors? (current
                answer)
              </h5>
              {rowSelection[0].WhatIsYourExperienceWithMedicalDebtCollectors
                ? [
                    <div>
                      {
                        rowSelection[0]
                          .WhatIsYourExperienceWithMedicalDebtCollectors
                      }
                    </div>,
                  ]
                : [<div>No Answer</div>]}
              <input
                type="text"
                name="collections"
                placeholder="What is your Experience with Medical Debt Collectors"
              />
              <div>
              <input type="submit" />
              </div>
            </form>,
          ]
        : null}
    </>
  );
}

// 12841061068
