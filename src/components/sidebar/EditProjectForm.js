import React from "react";

const EditProjectForm = ({handleSubmit, heading, value, setNewProjectName, setShowModal, confirmButtonText}) => {
    
    return (
        <form onSubmit={handleSubmit} className="ProjectForm">
            <h3>{heading}</h3>
            <input 
                value={value}
                onChange={(e) => setNewProjectName(e.target.value)}
                type='text'
                placeholder='Your Project Name'
                autoFocus
            />
            <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
            </button>
            <button className="confirm">
                {confirmButtonText}
            </button>
        </form>
    );
}

export default EditProjectForm;