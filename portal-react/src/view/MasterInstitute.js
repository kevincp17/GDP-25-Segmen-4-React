import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/master.css";

export default function MasterInstitute() {
  const [instituteList, setInstituteList] = useState([]);

  const [openAddInstitute, setOpenAddInstitute] = useState(false);
  const handleOpenAddInstitute = (institute) => {
    if (institute) {
      console.log(institute);

      setInstituteInput({
        institute_id: institute.institute_id,
        name: institute.name,
      });
    }
    setOpenAddInstitute(true);
  };
  const handleCloseAddInstitute = () => {
    setInstituteInput({
      institute_id: "",
      name: null,
    });
    setOpenAddInstitute(false);
  };

  const [instituteInput, setInstituteInput] = useState({
    institute_id: "",
    name: null,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/institute")
      .then((response) => {
        console.log(response.data.result);
        setInstituteList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
      setRefresh(false)
  }, [refresh]);

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  const columnsInstitute = [
    {
      name: "Institute Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div id="action-btn">
            <button onClick={() => handleOpenAddInstitute(row)}>Update</button>
            <button onClick={() => handleDeleteInstitute(row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  let handleInstituteInput = (e) => {
    const { name, value } = e.target;
    setInstituteInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInstitute = () => {
    console.log(instituteInput);
    let instituteData = {
      institute_id: instituteInput.institute_id,
      name: instituteInput.name,
    };
    console.log(instituteData);
    axios
      .post(
        `http://localhost:8088/api/institute/${instituteInput.institute_id}`,
        JSON.stringify(instituteData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddInstitute(false);
        setInstituteInput({
          institute_id: "",
          name: null,
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddInstitute(false);
      });
  };

  const handleDeleteInstitute = (institute) => {
    let instituteData = {
      institute_id: institute.institute_id,
      name: institute.name,
    };

    axios
      .delete(`http://localhost:8088/api/institute/${institute.institute_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(instituteData),
      })
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="skill-table-adm">
      <h1>Institute List</h1>
      <button id="add-btn" onClick={() => handleOpenAddInstitute()}>
        Add Institute
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddInstitute}
        onClose={handleCloseAddInstitute}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddInstitute}>
          <div class="modal">
            <div class="modal-header">
              <div>
                <p id="modal-title-form-add" class="modal-title">
                  Add Skill Data
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseAddInstitute}
              >
                <CloseIcon />
              </button>
            </div>
            <div
              class="modal-body"
              id="modal-body-add-job"
              style={{ height: "180px" }}
            >
              <div>
                <label for="skill_id">Institute Name</label>
                <input name="name" value={instituteInput.name} onChange={handleInstituteInput}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn" onClick={handleAddInstitute}>
                SUBMIT
              </button>
              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleCloseAddInstitute}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <DataTable
        className="rdt_Table"
        columns={columnsInstitute}
        data={instituteList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
