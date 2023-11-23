import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/master.css";

export default function MasterDegree() {
  const [degreeList, setDegreeList] = useState([]);

  const [openAddDegree, setOpenAddDegree] = useState(false);
  const handleOpenAddDegree = (degree) => {
    if (degree) {
      console.log(degree);

      setDegreeInput({
        degree_id: degree.degree_id,
        name: degree.name,
      });
    }
    setOpenAddDegree(true);
  };
  const handleCloseAddDegree = () => {
    setDegreeInput({
      degree_id: "",
      name: null,
    });
    setOpenAddDegree(false);
  };

  const [degreeInput, setDegreeInput] = useState({
    degree_id: "",
    name: null,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/degree")
      .then((response) => {
        console.log(response.data.result);
        setDegreeList(response.data.result);
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

  const columnsDegree = [
    {
      name: "Degree Name",
      selector: (row) => row.name,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div id="action-btn">
            <button onClick={() => handleOpenAddDegree(row)}>Update</button>
            <button onClick={() => handleDeleteDegree(row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  let handleDegreeInput = (e) => {
    const { name, value } = e.target;
    setDegreeInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDegree = () => {
    console.log(degreeInput);
    let degreeData = {
      degree_id: degreeInput.degree_id,
      name: degreeInput.name,
    };
    console.log(degreeData);
    axios
      .post(
        `http://localhost:8088/api/degree/${degreeInput.degree_id}`,
        JSON.stringify(degreeData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddDegree(false);
        setDegreeInput({
          degree_id: "",
          name: null,
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddDegree(false);
      });
  };

  const handleDeleteDegree = (degree) => {
    let degreeData = {
      degree_id: degree.degree_id,
      name: degree.name,
    };

    axios
      .delete(`http://localhost:8088/api/degree/${degree.degree_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(degreeData),
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
      <h1>Degree List</h1>
      <button id="add-btn" onClick={() => handleOpenAddDegree()}>
        Add Degree
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddDegree}
        onClose={handleCloseAddDegree}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddDegree}>
          <div class="modal">
            <div class="modal-header">
              <div>
                <p id="modal-title-form-add" class="modal-title">
                  Add Degree Data
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseAddDegree}
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
                <label for="skill_id">Degree Name</label>
                <input name="name" value={degreeInput.name} onChange={handleDegreeInput}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn" onClick={handleAddDegree}>
                SUBMIT
              </button>
              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleCloseAddDegree}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <DataTable
        className="rdt_Table"
        columns={columnsDegree}
        data={degreeList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
