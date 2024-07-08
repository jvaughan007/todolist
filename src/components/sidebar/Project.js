import React, { useContext, useState } from 'react';
import RenameProject from './RenameProject';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';
import Modal from '../Modal';
import { db } from '../../firebase/firebase';
import { collection, doc, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { ToDoContext } from '../../context';


const Project = ({project, edit}) => {

    // Global Context
    const { setSelectedProject } = useContext(ToDoContext);

    // State of this component
    const [showModal, setShowModal] = useState(false);

    const handleDeleteProject = async (project) => {
        try {
            const associatedTodos = query(collection(db, "todos"), where("project", "==", project.name));
            
            const querySnapshot = await getDocs(associatedTodos);
            querySnapshot.forEach((todo) => {
                deleteDoc(doc(db, 'todos', todo.id));
            })

            deleteDoc(doc(db, 'projects', project.id));
            setSelectedProject('today');
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return (
        <div className='Project'>
            <div 
                className='name'
                onClick={() => setSelectedProject(project.name)}
            >
                {project.name}
            </div>
            <div className='btns'>
                {
                    edit ?
                        <div className='edit-delete'>
                            <span  onClick={() => setShowModal(showmodal => !showModal)}>
                                <PencilFill size='15'className='edit'/>
                            </span>
                            <span 
                                className='delete'
                                onClick={() => handleDeleteProject(project)}    
                            >
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