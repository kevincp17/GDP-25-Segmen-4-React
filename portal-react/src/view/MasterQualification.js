import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/master.css";

export default function MasterQualification() {
  const [qualificationList, setQualificationList] = useState([]);

  const [openAddQualification, setOpenAddQualification] = useState(false);
  const handleOpenAddQualification = (qualification) => {
    if (qualification) {
      console.log(qualification);

      setQualificationInput({
        qualification_id: qualification.qualification_id,
        name: qualification.name,
      });
    }
    setOpenAddQualification(true);
  };
  const handleCloseAddQualification = () => {
    setQualificationInput({
      qualification_id: "",
      name: null,
    });
    setOpenAddQualification(false);
  };

  const [qualificationInput, setQualificationInput] = useState({
    qualification_id: "",
    name: null,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/qualification")
      .then((response) => {
        console.log(response.data.result);
        setQualificationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    setRefresh(false);
  }, [refresh]);

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  const columnsQualification = [
    {
      name: "Qualification Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div id="action-btn">
            <button onClick={() => handleOpenAddQualification(row)}>Update</button>
            <button onClick={() => handleDeleteQualification(row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  let handleQualificationInput = (e) => {
    const { name, value } = e.target;
    setQualificationInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddQualification = () => {
    console.log(qualificationInput);
    let qualificationData = {
      qualification_id: qualificationInput.qualification_id,
      name: qualificationInput.name,
    };
    console.log(qualificationData);
    axios
      .post(
        `http://localhost:8088/api/qualification/${qualificationInput.qualification_id}`,
        JSON.stringify(qualificationData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddQualification(false);
        setQualificationInput({
          qualification_id: "",
          name: null,
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddQualification(false);
      });
  };

  const handleDeleteQualification = (qualification) => {
    let qualificationData = {
      qualification_id: qualification.qualification_id,
      name: qualification.name,
    };
    axios
      .delete(`http://localhost:8088/api/qualification/${qualification.qualification_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(qualificationData),
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
      <h1>Qualification List</h1>
      <button id="add-btn" onClick={() => handleOpenAddQualification()}>
        Add Qualification
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddQualification}
        onClose={handleCloseAddQualification}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddQualification}>
          <div class="modal">
            <div class="modal-header">
              <div>
                <p id="modal-title-form-add" class="modal-title">
                  Add Qualification Data
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseAddQualification}
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
                <label for="skill_id">Qualification Name</label>
                <input name="name" value={qualificationInput.name} onChange={handleQualificationInput}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn" onClick={handleAddQualification}>
                SUBMIT
              </button>
              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleCloseAddQualification}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <DataTable
        className="rdt_Table"
        columns={columnsQualification}
        data={qualificationList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
