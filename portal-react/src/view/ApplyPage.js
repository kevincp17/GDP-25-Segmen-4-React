import '../css/apply.css'
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { viewApplyData } from '../features/viewApplyData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";

function ApplyPage() {
    const [show, setShow] = useState(false);
    const [apply, setApply] = useState([{}]);

    const handleShow = (data) => {
        console.log(data);
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const url = useSelector((state) => state.apply.url)
    const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: url,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
        setApply(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url])

    const status = [
        {
            label: 'HR Interview',
            step: 1,
        },
        {
            label: 'HR Interview',
            step: 2,
        },
        {
            label: 'User Interview',
            step: 3,
        },
        {
            label: 'HR Interview',
            step: 4,
        },
        {
            label: 'HR Interview',
            step: 5,
        },
    ]

    // const data = [
    //     {
    //         job: 'Graduate Development Program',
    //         date: '12 okt 2023',
    //         status: 'HR interview'
    //     },
    // ]

    return (
        <>
            <div id="apply-div">
            {apply.map(data => {
                return(
                    <div id="apply-div2">
                        <div id="job-data" onClick={() => handleShow(apply)}>
                            {/* <p>{data.career.title}</p> */}
                            <p>{data.date}</p>
                            <p>{data.status}</p>
                            <div id="cd2-btndiv">
                                <button onClick={handleShow}>DETAIL</button>
                            </div>
                        </div>
                    </div>
                 )
                    
              })}

                <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Timeline</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {/* {status.map(({ step, label }) => (
                                    <ul>
                                        <li>
                                            <div classNameName="progress">
                                                <p>{step}</p>
                                                <i className='fa fa-check'></i>
                                            </div>
                                            <p classNameName='text'>{label}</p>
                                        </li>
                                    </ul>
                                ))} */}
                    </Modal.Body>
                </Modal>


                {/* {modal && (
                    <div classNameName="modal">
                        <div onClick={toggleModal} classNameName="overlay"></div>
                        <div classNameName="modal-content">
                            <h2>Timeline</h2>
                            {status.map(({ step, label }) => (
                                <ul>
                                    <li>
                                        <div classNameName="progress">
                                            <p>{step}</p>
                                            <i className='fa fa-check'></i>
                                        </div>
                                        <p classNameName='text'>{label}</p>
                                    </li>
                                </ul>
                            ))}
                            <button classNameName="close-modal" onClick={toggleModal}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                )} */}


                {/* {modal && (
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <p className="modal-title">Timeline</p>
                                </div>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div classNameName="modal-body">
                                {status.map(({ step, label }) => (
                                    <ul>
                                        <li>
                                            <div classNameName="progress">
                                                <p>{step}</p>
                                                <i className='fa fa-check'></i>
                                            </div>
                                            <p classNameName='text'>{label}</p>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                )} */}
            </div>
        </>
    )
}

export default ApplyPage;