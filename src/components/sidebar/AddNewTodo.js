import React, { useState } from 'react';
import Modal from '../Modal';
import { CalendarEvent, Clock, Bell, BellSlash, Palette, X } from 'react-bootstrap-icons';
import { DatePicker, DesktopTimePicker, DigitalClock, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const AddNewTodo = () => {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [remindMe, setRemindMe] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleRemindChange = (e) => {
        e.preventDefault();
        if (!remindMe) {
            setRemindMe(true);
        } 

        if (remindMe) {
            setRemindMe(false);
        }
    }

    return (
        <div className='AddNewTodo'>
            <div className='button'>
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form>
                        <div className='text'>
                            <h3>Add a New To Do!</h3>
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
                                <div className='active'>
                                    personal
                                </div>
                                <div className='project'>
                                    work
                                </div>
                            </div>
                        </div>
                        <div className='cancel' onClick={(e) => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className='confirm'>
                            <button>+ Add</button>
                        </div>
                    </form>
                </LocalizationProvider>
            </Modal> 
        </div>
    )
}

export default AddNewTodo;