import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          setContacts(results.data);
          await copyHtmlContent(); // Automatically copy HTML after parsing
        },
      });
    }
  };

  function nl2br(text) {
    return text.split("\n").map((item, index) => (
      <React.Fragment key={index}>
        {item}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  }

  const copyHtmlContent = async () => {
    try {
      const htmlContainer = document.querySelector(".COPYABLE-HTML");
      const html = htmlContainer.innerHTML;
      await navigator.clipboard.writeText(html);
      alert("HTML copied to clipboard!");
    } catch (err) {
      alert("Failed to copy HTML: ", err);
    }
  };

  return (
    <div className="App">
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <div className="COPYABLE-HTML">
        <div className="agents-listing">
          {contacts.map((contact, index) => (
            <div className="agent-single" key={index}>
              <div className="agent-single__left">
                {contact["Profile Picture"] && (
                  <img
                    src={contact["Profile Picture"]}
                    alt={`${contact["First Name"]} ${contact["Last Name"]}`}
                    className="agent-single__image"
                  />
                )}
              </div>
              <div className="agent-single__right">
                <p className="no-margin agent-single__name">
                  {contact["First Name"]} {contact["Last Name"]}
                </p>
                {contact.Cell && (
                  <p className="no-margin agent-single__phone">
                    <a href={`tel:+1-${contact.Cell.replace(/[^0-9]/g, "")}`}>
                      {contact.Cell}
                    </a>
                  </p>
                )}
                {contact.Email && (
                  <p className="no-margin agent-single__email">
                    <a href={`mailto:${contact.Email}`}>{contact.Email}</a>
                  </p>
                )}
                {contact.WorkFax && (
                  <p className="no-margin agent-single__note">
                    {contact.WorkFax}
                  </p>
                )}
                {contact.Bio && (
                  <div class="hidden-bio agent-bio">
                    <span class="toggle-button" role="button">
                      <span class="hide-button">Hide Bio &rarr;</span>
                      <span class="show-button">Show Bio &rarr;</span>
                    </span>
                    <div className="my-5 bio">{nl2br(contact.Bio)}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
