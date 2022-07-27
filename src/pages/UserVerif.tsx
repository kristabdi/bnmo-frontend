import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Table from '../components/Table'
import NavbarAdmin from '../components/NavbarAdmin'

function UserVerifPage() {
    const columns = [
        { header: 'Name', field: 'name' },
        { header: 'Username', field: 'username' },
        { header: 'Verify', field: 'is_verified' },
    ]
    const [data, setData] = useState<any[]>([]);
    const onSubmit = (data: any) => {
        fetch (`http://localhost:3001/admin/verify/user?username=${data.target.value}`, {
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
            fetch ('http://localhost:3001/admin/list/user', {
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
        data.filter(item => item.is_verified === false)
    }, []);

    const dataFilter = data.filter(item => item.is_verified === false);
    return (
        <>
        <NavbarAdmin/>
        <Table data={dataFilter} columns={columns} onSubmit={onSubmit} history={false}/>
        </>
    )
}

export default UserVerifPage;