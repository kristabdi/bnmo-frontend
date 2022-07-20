import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';

function NavUser() {
    return (
        <Navbar className='flex justify-between px-8 bg-white'>
            <img src="logo.png" alt="logo" className='mx-2 my-0.5 w-14'/>
            <div className="my-2 pb-2">
                <Link to="/request" className='mx-4 text-black no-underline text-base'>Request</Link>
                <Link to="/transaction" className='mx-4 text-black no-underline text-base'>Transaction</Link>
                <Link to="/history" className='mx-4 text-black no-underline text-base'>History</Link>
                <Link to="/profile" className='mx-4 text-black no-underline text-base'>Profile</Link>
                <LogoutButton/>
            </div>
        </Navbar>
    )
}

export default NavUser;