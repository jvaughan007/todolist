import React, { useState } from 'react';
import RenameProject from './RenameProject';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';
import Modal from '../Modal';


const Project = ({project, edit}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='Project'>
            <div className='name'>
                {project.name}
            </div>
            <div className='btns'>
                {
                    edit ?
                        <div className='edit-delete'>
                            <span  onClick={() => setShowModal(showmodal => !showModal)}>
                                <PencilFill size='15'className='edit'/>
                            </span>
                            <span>
                                <Trash3Fill size='15' className='delete' />
                            </span>
                        </div> 
                        :
                        project.numOfTodos === 0 ?
                        ""
                        :
                        <div className='total-todos'>
                            {project.numOfTodos}
                        </div>
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} >
                <RenameProject setShowModal={setShowModal} project={project} />
            </Modal>
        </div>
    )
}

export default Project;