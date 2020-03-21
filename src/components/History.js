import React from 'react';

const History = ({ data, clearHistory }) => (
  <div>
    <div id="history">
      {data && data.map(calculation => (
        <>
          {calculation}<br />
        </>
      ))}
    </div>
    {/* clear history button */}
    <button
      className="btn btn-outline-danger"
      onClick={clearHistory}
    >
      Clear History
    </button>
  </div>
)

export default History
