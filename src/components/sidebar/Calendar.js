import React, { useState } from 'react';
import { CalendarDate, CaretUp, CaretDown } from 'react-bootstrap-icons';
import { calendarItems } from '../../constants';


const Calendar = () => {
   const [showMenu, setShowMenu] = useState(true);

    return (
        <div className='Calendar'>
            <div className='header'>
                <div className='title'>
                    <CalendarDate size='18' />
                    <p>Calendar</p>
                </div>
                <div className='btns'>
                    <span>
                    {
                            showMenu ? 
                            <CaretDown size='20' onClick={() => setShowMenu( showMenu => !showMenu)}/> : <CaretUp size='20' onClick={() => setShowMenu( showMenu => !showMenu)}/>
                    }
                    </span>
                </div>
            </div>
            <div className='items'>
                {
                    showMenu &&
                    calendarItems.map(item => 
                        <div className='item' key={item} >
                            {item}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calendar;