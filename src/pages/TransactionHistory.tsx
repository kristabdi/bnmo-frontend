import axios from "axios";
import React, { useState }  from "react";
import { useCookies } from 'react-cookie';
import NavbarUser from "../components/NavbarUser";
import Table from "../components/Table";
import {transData} from "../components/CurrencyOptions";

function TransactionHistory() {
    const columns = [
        { header: 'Destination Username', field: 'username_to' },
        { header: 'Destination Name', field: 'name_to' },
        { header: 'Currency', field: 'currency_from' },
        { header: 'Amount', field: 'amount' },
    ]

    return (
        <>
        <NavbarUser/>
        <Table data={transData} columns={columns} history={true}/>
        </>
    )
}

export default TransactionHistory;