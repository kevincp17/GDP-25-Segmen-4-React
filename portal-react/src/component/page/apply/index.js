import './index.css'
import React, { useState } from 'react';

function Apply() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

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

    const data = [
        {
            job: 'Graduate Development Program',
            date: '12 okt 2023',
            status: 'HR interview'
        },
    ]

    return (
        <>
            <div id="apply-div">
                {data.map(({ job, date, status }) => (
                    <div id="apply-div2">
                        <div id="job-data" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <p>{job}</p>
                            <p>{date}</p>
                            <p>{status}</p>
                            <div id="cd2-btndiv">
                                <button onClick={toggleModal}>
                                    DETAIL
                                </button>
                            </div>
                        </div>
                    </div>
                ))}


                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Timeline</h2>
                            {status.map(({ step, label }) => (
                                <ul>
                                    <li>
                                        <div className="progress">
                                            <p>{step}</p>
                                            <i class='fa fa-check'></i>
                                        </div>
                                        <p className='text'>{label}</p>
                                    </li>
                                </ul>
                            ))}
                            <button className="close-modal" onClick={toggleModal}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                )}


                {/* {modal && (
                    <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <p class="modal-title">Timeline</p>
                                </div>

                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {status.map(({ step, label }) => (
                                    <ul>
                                        <li>
                                            <div className="progress">
                                                <p>{step}</p>
                                                <i class='fa fa-check'></i>
                                            </div>
                                            <p className='text'>{label}</p>
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

export default Apply;