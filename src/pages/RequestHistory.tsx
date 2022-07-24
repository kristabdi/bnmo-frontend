import axios from "axios";
import React, { useState }  from "react";
import { useCookies } from 'react-cookie';
import NavbarUser from "../components/NavbarUser";
import Table from "../components/Table";
import {requestData} from "../components/CurrencyOptions";

function RequestHistory() {
    const columns = [
        { header: 'Currency', field: 'currency' },
        { header: 'Amount', field: 'amount' },
        { header: 'Is Deposit', field: 'is_add' },
        { header: 'Approval Status', field: 'is_approved' },
        { header: 'Time Created', field: 'created_at' },
        { header: 'Time Updated', field: 'updated_at' },
    ]

    return (
        <>
        <NavbarUser/>
        <Table data={requestData} columns={columns} history={true}/>
        </>
    )
}

export default RequestHistory;