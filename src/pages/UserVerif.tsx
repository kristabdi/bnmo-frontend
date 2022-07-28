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
    const [searchTerm, setSearchTerm] = useState('');
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
    }, []);

    const dataFilter = data.filter(item => item.is_verified === false).filter(item => {
        if (searchTerm === '') {
            return item;
        } else if (item.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        }
    });

    return (
        <>
        <NavbarAdmin/>
        <input type="text" className="border text-gray-900 p-2 rounded-xl text-sm px-5" placeholder='Search username...' onChange={(event) => setSearchTerm(event.target.value)}>
        </input>

        <Table data={dataFilter} columns={columns} onSubmit={onSubmit} history={false}/>
        </>
    )
}

export default UserVerifPage;