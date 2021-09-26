import React from 'react';

const Tables = (props) => {
  return (
    <>
      {props.tableData && props.tableData.length > 0 && (
        <div className="table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Pin Code</th>
                <th scope="col">items</th>
              </tr>
            </thead>
            <tbody>
              {props.tableData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.address}</td>
                  <td>{data.pincode}</td>
                  <td>{data.items.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Tables;
