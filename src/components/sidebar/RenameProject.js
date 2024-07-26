import React, { useState } from 'react';
import EditProjectForm from './EditProjectForm';
import { db } from '../../firebase/firebase';
import {doc, updateDoc} from 'firebase/firestore';

const RenameProject = ({project, setShowModal}) => {

    const [newProjectName, setNewProjectName] = useState(project.name);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "projects", project.id);

        await updateDoc(docRef, {
            name: newProjectName
        });

        setShowModal(false);

    }

    return (
        <div className='EditProject'>
            <EditProjectForm
                handleSubmit={handleSubmit}
                heading='Edit Project Name'
                value={newProjectName}
                setNewProjectName={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText='Confirm'
            />
        </div>
    )
}

export default RenameProject;