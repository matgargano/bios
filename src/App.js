import React, { useState } from "react";
import Papa from "papaparse";

function App() {
  const [contacts, setContacts] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setContacts(results.data);
        },
      });
    }
  };

  return (
    <div className="App">
      {contacts.length === 0 && (
        <>
          <h1>Upload CSV File</h1>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </>
      )}
      <div className="agents-listing">
        {contacts.map((contact, index) => (
          <div className="agent-single" key={index}>
            <div class="agent-single__left"></div>
            <div class="agent-single__right">
              <p className="no-margin agent-single__name">
                {contact["First Name"]} {contact["Last Name"]}
              </p>
              {contact.Cell && (
                <p className="no-margin agent-single__phone">
                  <span class="agent__single__icon-phone agent__single__icon"></span>
                  <a href={`tel:+1-${contact.Cell.replace(/[^0-9]/g, "")}`}>
                    {contact.Cell}
                  </a>
                </p>
              )}
              {contact.Email && (
                <p className="no-margin agent-single__email">
                  <span class="agent__single__icon-envelope agent__single__icon"></span>
                  <a href={`mailto:${contact.Email}`}>{contact.Email}</a>
                </p>
              )}
              {contact.WorkFax && (
                <p className="no-margin agent-single__note">
                  {contact.WorkFax}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
