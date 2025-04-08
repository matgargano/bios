import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSun0Mvi7qSCmrmtGq5jY-ZlUC2sIVt8W-wSZrbzRC0xrQAx06zoODN1LcIYHOPdQcoQOlGxBXrf6sF/pub?output=csv";

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true, // Required to fetch the file from the URL
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setContacts(results.data);
      },
      error: function (error) {
        console.error("Error fetching or parsing CSV:", error);
        alert("Failed to load data from the URL.");
      },
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  function nl2br(text) {
    // Split the text on new lines and filter out empty strings if they exist
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
      {contacts.length > 0 && (
        <button onClick={copyHtmlContent}>Copy HTML</button>
      )}
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
                    <span className="agent__single__icon-phone agent__single__icon"></span>
                    <a href={`tel:+1-${contact.Cell.replace(/[^0-9]/g, "")}`}>
                      {contact.Cell}
                    </a>
                  </p>
                )}
                {contact.Email && (
                  <p className="no-margin agent-single__email">
                    <span className="agent__single__icon-envelope agent__single__icon"></span>
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
