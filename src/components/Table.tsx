import React from "react";

type Model = {
    data: any[];
    columns: any[];
    history: boolean;
    onSubmit?: (data: any) => void;
}

function ReusableTable({ data, columns, onSubmit, history }: Model) {
    const getCaps = (head: any, field: any) => {
        if (head) return head.toUpperCase();
        return field.toUpperCase();
    };

    return (
        <div className="flex flex-col justify-center px-20 py-8">
        <table>
            <thead className="border-solid border-b p-2 text-left">
                <tr>
                    {columns &&
                    columns?.map((head: any) => (
                        <th>{getCaps(head.header, head.field)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((row: any) => (
                    <tr key={row}>
                        {columns.map((col) => (
                            ((col.field === "is_verified" || col.field === "is_approved") && !history) ?
                            <button
                            type="submit" 
                            className="mt-2 px-1 py-0.5 border rounded-md bg-gray-300" 
                            value={(col.field === "is_verified") ? row["username"] : row["id_user"]} onClick={onSubmit}>Verify</button>
                            : <td key={col.field} className="border-solid border-b p-2 text-left">{row[col.field]}</td>
                        ))}
                    </tr>
                    ))}
            </tbody>
        </table>
        {data ? null : <p>Empty table</p>}
        </div>
    );
};

export default ReusableTable;