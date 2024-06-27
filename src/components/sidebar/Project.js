import React from 'react';
import RenameProject from './RenameProject';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';


const Project = ({project, edit}) => {

    return (
        <div className='Project'>
            <div className='name'>
                {project.name}
            </div>
            <div className='btns'>
                {
                    edit ?
                        <div className='edit-delete'>
                            <span>
                                <PencilFill size='15'className='edit' />
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
        </div>
    )
}

export default Project;