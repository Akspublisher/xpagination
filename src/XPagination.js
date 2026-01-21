import React, { useEffect } from 'react';
import { useState } from 'react';

function XPagination() {  
    const [dataTable, setDataTable] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);

    const totalDataPerPage = 10;

    const EndPoint = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(EndPoint);
      const data = await response.json();
      console.log(data);
      setDataTable(data);
    } catch (error) {
        alert("Failed to fetch data");
      //console.error("failed to fetch data:", error);
    }
   
  };

  fetchData();
}, []);

const startIndex = (currentPage - 1) * totalDataPerPage;
const endIndex = startIndex + totalDataPerPage;
const currentData = dataTable.slice(startIndex, endIndex);

const totalPages = Math.ceil(dataTable.length / totalDataPerPage);

const handlePrevious = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};
const handleNext = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

    return (
        <div>
            <div>
                <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>
            </div>
            <div>
                <table style={{border: "1px solid black", borderCollapse: "collapse", width: "100%" , 
                }} >

                    <thead>
                        <tr style={{border: "1px solid black", backgroundColor: "green"}}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* Table body will be populated with data */}
                        {currentData.map(data => (
                            <tr key={data.id} >
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                            </tr>
                        ))}
                    </tbody>           
                </table>
                <div style={{ marginTop: "20px", 
                    textAlign: "center" }}>
                    <button
                        onClick={handlePrevious}  
                       // disabled={currentPage === 1}
                       style={{backgroundColor:"green"}}
                    >
                        Previous
                    </button>
                    <span style={{ margin: "0 10px", backgroundColor:"green" }}>
                         {currentPage} 
                    </span>
                    <button
                        onClick={handleNext} 
                       // disabled={currentPage === totalPages}
                       style={{backgroundColor:"green"}}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
}
export default XPagination
