import React from 'react'
import Table from '../components/Table'
import NavbarAdmin from '../components/NavbarAdmin'
import { tableData } from '../components/CurrencyOptions'

function UserVerifPage() {
    const columns = [
        { header: 'Name', field: 'name' },
        { header: 'Username', field: 'username' },
        { header: 'Verify', field: 'is_verified' },
    ]

    const onSubmit = (data: any) => {
        // body : data.target.value
        console.log(data.target.value);
    }
    // tableData di fetch useEffect
    return (
        <>
        <NavbarAdmin/>
        <Table data={tableData} columns={columns} onSubmit={onSubmit} history={false}/>
        </>
    )
}

export default UserVerifPage;