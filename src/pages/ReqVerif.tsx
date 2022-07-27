import { useEffect, useState } from 'react'
import Table from '../components/Table'
import NavbarAdmin from '../components/NavbarAdmin'
import Cookies from 'js-cookie'

function UserVerifPage() {
    const columns = [
        { header: 'ID', field: 'id' },
        { header: 'ID User', field: 'id_user' },
        { header: 'Amount', field: 'amount' },
        { header: 'Currency', field: 'currency' },
        { header: 'Is Add', field: 'is_add' },
        { header: 'Is Approved', field: 'is_approved' },
    ]
    const [data, setData] = useState<any[]>([]);
    const onSubmit = (data: any) => {
        fetch (`http://localhost:3001/admin/verify/req?id=${data.target.value}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("access_token")}`
            },
            credentials: "include"
        }).then((response : any) => {
            if (response.ok) {
                alert("Success");
                window.location.reload();
            }
        }).catch(error => {
            alert(error);
        });
    }

    useEffect(() => {
        const fetchData = () => {
            fetch (`http://localhost:3001/admin/list/history`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`
                },
                credentials: "include"
            }).then(response => response.json())
            .then((body:any) =>{
                setData(body);
            }).catch(error => {
                alert(error);
            });
        }
        fetchData();
    }, []);
    
    const dataFilter = data.filter(item => item.is_approved === false);

    return (
        <>
        <NavbarAdmin/>
        <Table data={dataFilter} columns={columns} onSubmit={onSubmit} history={false}/>
        </>
    )
}

export default UserVerifPage;