import { useEffect, useState }  from "react";
import NavbarUser from "../components/NavbarUser";
import Table from "../components/Table";
import Cookies from 'js-cookie';
import ReactPaginate from "react-paginate";

function TransactionHistory() {
    const columns = [
        { header: 'Destination Username', field: 'username_to' },
        { header: 'Currency', field: 'currency_from' },
        { header: 'Amount', field: 'amount' },
    ]
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pages, setPages] = useState(0);
    const [data, setData] = useState<any[]>([]);

    const changePage = ({selected}: any) => {
        setPage(selected);
    }

    useEffect(() => {
        const fetchData = () => {
            fetch (`http://localhost:3001/customer/history/transaction?page=${page}&page_size=${pageSize}`, {
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

export default TransactionHistory;