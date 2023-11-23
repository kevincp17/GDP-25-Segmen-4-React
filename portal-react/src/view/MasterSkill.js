import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/master.css";

export default function MasterSkill() {
  const [skillList, setSkillList] = useState([]);

  const [openAddSkill, setOpenAddSkill] = useState(false);
  const handleOpenAddSkill = (skill) =>{
    if(skill){
      console.log(skill);

      setSkillInput({
        skill_id:skill.skill_id,
        name:skill.name,
        skill_type:skill.skill_type
      })
    }
    setOpenAddSkill(true);
  } 
  const handleCloseAddSkill = () => {
    setSkillInput({
      skill_id:"",
      name:null,
      skill_type:null
    })
    setOpenAddSkill(false)
  };

  const [skillInput, setSkillInput] = useState({
    skill_id:"",
    name: null,
    skill_type:null
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/skill")
      .then((response) => {
        console.log(response.data.result);
        setSkillList(response.data.result);
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

  const columnsSkill = [
    {
      name: "Skill Name",
      selector: (row) => row.name,
    },
    {
      name: "Skill Type",
      selector: (row) => row.skill_type,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div id="action-btn">
            <button onClick={() => handleOpenAddSkill(row)}>Update</button>
            <button onClick={() => handleDeleteSkill(row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  let handleSkillInput = (e) => {
    const { name, value } = e.target;
    setSkillInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    let skillData = {
      skill_id:skillInput.skill_id,
      name: skillInput.name,
      skill_type:skillInput.skill_type
    };

    axios
      .post(`http://localhost:8088/api/skill/${skillInput.skill_id}`, JSON.stringify(skillData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddSkill(false);
        setSkillInput({
          skill_id:"",
          name:null,
          skill_type:null
        })
      })
      .catch((error) => {
        console.log(error);
        setOpenAddSkill(false);
      });
  };

  const handleDeleteSkill = (skill) => {
    let skillData = {
      skill_id:skill.skill_id,
      name: skill.name,
      skill_type:skill.skill_type
    };

    axios
      .delete(
        `http://localhost:8088/api/skill/${skill.skill_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(skillData),
        }
      )
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
      <h1>Skill List</h1>
      <button id="add-btn" onClick={() => handleOpenAddSkill()}>
        Add Skill
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddSkill}
        onClose={handleCloseAddSkill}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddSkill}>
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
                onClick={handleCloseAddSkill}
              >
                <CloseIcon />
              </button>
            </div>
            <div
              class="modal-body"
              id="modal-body-add-job"
              style={{ height: "250px" }}
            >
              <div>
                <label for="skill_id">Skill Name</label>
                <input name="name" value={skillInput.name} onChange={handleSkillInput}/>
              </div>

              <div>
                <label for="skill_id">Skill Type</label>
                <select name="skill_type" onChange={handleSkillInput}>
                  <option>Select Skill Type</option>
                  <option value="Soft Skills" selected={skillInput.skill_type==="Soft Skills" ? true : false}>Soft Skills</option>
                  <option value="Hard Skills" selected={skillInput.skill_type==="Hard Skills" ? true : false}>Hard Skills</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn" onClick={handleAddSkill}>
                SUBMIT
              </button>
              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleCloseAddSkill}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>

      <DataTable
        className="rdt_Table"
        columns={columnsSkill}
        data={skillList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
