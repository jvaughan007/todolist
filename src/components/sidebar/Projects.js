import React, { useContext, useState } from 'react';
import AddNewProject from './AddNewProject';
import Project from './Project'
import { CaretDown, CaretUp, Palette, PencilFill } from 'react-bootstrap-icons';
import { ToDoContext } from '../../context';


const Projects = () => {

    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false);
    const pencilColor = edit ? "#2ec52e" : "#000000";


    // Global Context
    const {projects} = useContext(ToDoContext);

    return (
        <div className='Projects'>
            <div className='header'>
                <div className='title'>
                    <Palette size='18' />
                    <p>Projects</p>
                    {
                        (showMenu === false) &&
                        <div className='total-projects'>
                            {projects.length}
                        </div>
                    }
                </div>
                <div className='btns'>
                    {
                        showMenu && projects.length > 0 &&
                        <span className='edit' onClick={() => setEdit(edit => !edit)}>
                            <PencilFill size='15' color={pencilColor} />
                        </span>
                    }
                    <AddNewProject />
                    <span className='arrow'>
                        {
                            showMenu ? 
                            <CaretDown size='20' onClick={() => {
                                setShowMenu( showMenu => !showMenu);
                                setEdit(false);
                                }
                            }/> 
                            : 
                            <CaretUp size='20' onClick={() => {
                                setShowMenu( showMenu => !showMenu);
                                setEdit(false);
                                }
                            }/>
                    }
                    </span>
                </div>
            </div>
            
                {
                    showMenu && projects.length > 0 &&
                    projects.map( project => 
                        <div className='items'>
                            <div className='item'>
                                <Project 
                                    project={project}
                                    key={project.id}
                                    edit={edit}
                                />
                            </div>
                        </div>  
                    )
                }
                                  
        </div>
    )
}

export default Projects;