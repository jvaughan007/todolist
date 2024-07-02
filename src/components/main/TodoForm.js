import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarEvent, Clock, Bell, BellSlash, Palette, X } from 'react-bootstrap-icons';
import { DatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


const TodoForm = ({ handleSubmit,
    heading = false,
    text, handleTextChange, 
    remindMe,handleRemindChange, 
    day, setDay, 
    time, setTime, 
    toDoProject, setToDoProject,
    projects, 
    showButtons = false, 
    setShowModal= false 
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit} className="TodoForm">
                <div className='text'>
                    {
                        heading &&
                        <h3>{heading}</h3>
                    }
                    <input 
                        type='text' 
                        placeholder='What to do?' 
                        value={text} 
                        onChange={handleTextChange} 
                    />
                </div>
                <div className='remind'>
                    {!remindMe ? <Bell onClick={handleRemindChange}/> : <BellSlash onClick={handleRemindChange}/>}
                    <p>Remind Me!</p>
                </div>
                <div className='pick-day'>
                    <div className='title'>
                        <CalendarEvent />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker 
                        value={day}
                        onChange={(selectedDay) => setDay(selectedDay)}
                    />
                </div>
                <div className='pick-time'>
                    <div className='title'>
                        <Clock />
                        <p>Choose time</p>
                    </div>
                    <DesktopTimePicker
                        value={time} 
                        onChange={(selectedTime) => setTime(selectedTime)}
                        />
                </div>
                <div className='pick-project'>
                    <div className='title'>
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className='projects'>
                        {
                            projects.length > 0 ?
                            projects.map( project => 
                                <div 
                                    className={ `project ${project.name === toDoProject ? "active" : ""}` }
                                    key={project.id}
                                    onClick={() => setToDoProject(project.name)}
                                >
                                    {project.name}
                                </div>
                            )
                            :
                            <div style={{color: "#ff0000"}}>
                                Please add a project before continuing!
                            </div>
                        }
                    </div>
                </div>
                {
                    showButtons &&
                    <div>
                        <div className='cancel' onClick={() => setShowModal(!setShowModal)}>
                            <X size='40' />
                        </div>
                        {
                            projects.length > 0 &&
                            <div className='confirm'>
                                <button>Confirm</button>
                            </div>
                        }
                    </div>
                    
                }
            </form>
        </LocalizationProvider>
    )
}

export default TodoForm;