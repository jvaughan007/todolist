import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import Modal from '../Modal';
import NewProjectForm from './NewProjectForm';
import { db } from '../../firebase/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'


const AddNewProject = () => {
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (projectName) {
           const ref = query(collection(db, 'projects'), where('name', '==', projectName));
           
           try {
            const snapshot = await getDocs(ref);

            if (snapshot.empty) { 
                const newProject = await addDoc(collection(db, 'projects'), {
                    name: projectName
                });
                console.log(`${newProject.name}`);
                setShowModal(false);
                setProjectName('');
            } else {
                snapshot.forEach((doc) => {
                    console.log("doc: ", doc.id);
                });
            }
           } catch (err) {
            console.error("Error: ", err);
           }
        }
    };

    return (
        <div className='AddNewProject'>
            <div className='add-button'>
                <span onClick={() => setShowModal(true)}>
                    <Plus size='20' />
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <NewProjectForm 
                    handleSubmit={handleSubmit}
                    heading='Name Your New Project!'
                    value={projectName}
                    setProjectName={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>
    )
}

export default AddNewProject;