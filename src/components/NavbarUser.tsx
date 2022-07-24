import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';

function NavUser() {
    return (
        <Navbar className='flex justify-between px-8 bg-white'>
            <img src="logo.png" alt="logo" className='mx-2 my-0.5 w-14'/>
            <div className="my-2 pb-2">
                <Link to="/request" className='mx-4 text-black no-underline text-base'>Request Form</Link>
                <Link to="/transaction" className='mx-4 text-black no-underline text-base'>Transaction Form</Link>
                <Link to="/reqhistory" className='mx-4 text-black no-underline text-base'>Request History</Link>
                <Link to="/transhistory" className='mx-4 text-black no-underline text-base'>Transaction History</Link>
                <Link to="/dashboard" className='mx-4 text-black no-underline text-base'>Dashboard</Link>
                <LogoutButton/>
            </div>
        </Navbar>
    )
}

export default NavUser;