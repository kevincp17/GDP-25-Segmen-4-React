import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/master.css";

export default function MasterMajor() {
  const [majorList, setMajorList] = useState([]);

  const [openAddMajor, setOpenAddMajor] = useState(false);
  const handleOpenAddMajor = (major) => {
    if (major) {
      console.log(major);

      setMajorInput({
        major_id: major.major_id,
        name: major.name,
      });
    }
    setOpenAddMajor(true);
  };
  const handleCloseAddMajor = () => {
    setMajorInput({
      major_id: "",
      name: null,
    });
    setOpenAddMajor(false);
  };

  const [majorInput, setMajorInput] = useState({
    major_id: "",
    name: null,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/major")
      .then((response) => {
        console.log(response.data.result);
        setMajorList(response.data.result);
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

  const columnsMajor = [
    {
      name: "Major Name",
      selector: (row) => row.name,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div id="action-btn">
            <button onClick={() => handleOpenAddMajor(row)}>Update</button>
            <button onClick={() => handleDeleteMajor(row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  let handleMajorInput = (e) => {
    const { name, value } = e.target;
    setMajorInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMajor = () => {
    console.log(majorInput);
    let majorData = {
      major_id: majorInput.major_id,
      name: majorInput.name,
    };
    console.log(majorData);
    axios
      .post(
        `http://localhost:8088/api/major/${majorInput.major_id}`,
        JSON.stringify(majorData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddMajor(false);
        setMajorInput({
          major_id: "",
          name: null,
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddMajor(false);
      });
  };

  const handleDeleteMajor = (major) => {
    let majorData = {
      major_id: major.major_id,
      name: major.name,
    };
    axios
      .delete(`http://localhost:8088/api/major/${major.major_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(majorData),
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
      <h1>Major List</h1>
      <button id="add-btn" onClick={() => handleOpenAddMajor()}>
        Add Major
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddMajor}
        onClose={handleCloseAddMajor}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddMajor}>
          <div class="modal">
            <div class="modal-header">
              <div>
                <p id="modal-title-form-add" class="modal-title">
                  Add Major Data
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseAddMajor}
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
                <label for="skill_id">Major Name</label>
                <input name="name" value={majorInput.name} onChange={handleMajorInput}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn" onClick={handleAddMajor}>
                SUBMIT
              </button>
              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleCloseAddMajor}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <DataTable
        className="rdt_Table"
        columns={columnsMajor}
        data={majorList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
