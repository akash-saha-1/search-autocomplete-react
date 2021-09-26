import React, { useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';
import Tables from './components/Table';

function App() {
  const [tableData, setTableData] = useState([]);
  return (
    <div className="App">
      <h2 className="heading">Custom AutoComplete React</h2>
      <div className="auto-container">
        <AutoComplete setTableData={setTableData} />
        <Tables tableData={tableData} />
      </div>
    </div>
  );
}

export default App;
