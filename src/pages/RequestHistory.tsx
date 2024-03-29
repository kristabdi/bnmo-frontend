import { useEffect, useState }  from "react";
import NavbarUser from "../components/NavbarUser";
import Table from "../components/Table";
import Cookies from 'js-cookie';
import ReactPaginate from "react-paginate";
import api from "../clients/client"

function RequestHistory() {
    const columns = [
        { header: 'Currency', field: 'currency' },
        { header: 'Amount', field: 'amount' },
        { header: 'Is Deposit', field: 'is_add' },
        { header: 'Approval Status', field: 'is_approved' },
        { header: 'Time Created', field: 'created_at' },
        { header: 'Time Updated', field: 'updated_at' },
    ]
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pages, setPages] = useState(0);
    const [data, setData] = useState<any[]>([]);

    const fetchData = () => {
        fetch (`${api}/customer/history/request?page=${page}&page_size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("access_token")}`
            },
            credentials: "include"
        }).then(response => response.json())
        .then((body:any) =>{
            setData(body);
            setPages(body.length);
        }).catch(error => {
            alert(error);
        });
    }

    const changePage = ({selected}: any) => {
        setPage(selected);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
        <NavbarUser/>
        <Table data={data} columns={columns} history={true}/>
        <nav className="flex justify-center" role="navigation" aria-label="pagination">
        <ReactPaginate 
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            />
        </nav>
        </>
    )
}

export default RequestHistory;