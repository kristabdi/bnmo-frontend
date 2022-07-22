import React from 'react'
import Table from '../components/Table'
import NavbarAdmin from '../components/NavbarAdmin'
import { reqData } from '../components/CurrencyOptions'

function UserVerifPage() {
    const columns = [
        { header: 'ID', field: 'id' },
        { header: 'ID User', field: 'id_user' },
        { header: 'Amount', field: 'amount' },
        { header: 'Currency', field: 'currency' },
        { header: 'Is Add', field: 'is_add' },
        { header: 'Is Approved', field: 'is_approved' },
    ]

    const onSubmit = (data: any) => {
        // body : data.target.value
        console.log(data.target.value);
    }
    // tableData di fetch useEffect
    return (
        <>
        <NavbarAdmin/>
        <Table data={reqData} columns={columns} onSubmit={onSubmit}/>
        </>
    )
}

export default UserVerifPage;