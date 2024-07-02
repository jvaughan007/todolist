import React, { createContext, useState } from "react";

const ToDoContext = createContext();

const ToDoContextProvider = ({ children }) => {

    const defaultProject = 'today';
    const [selectedProject, setSelectedProject] = useState(defaultProject);

    return (
        <ToDoContext.Provider 
            value={
                {
                    selectedProject,
                    setSelectedProject
                }
            }
        >
            {children}
        </ToDoContext.Provider>
    )
}

export { ToDoContextProvider, ToDoContext };