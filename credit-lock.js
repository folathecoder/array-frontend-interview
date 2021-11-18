"use strict";

//TODO: Declare all required css variables
const historyContainer = document.querySelector(".history-container");
const showAll = document.querySelector(".show-all");
const hideAll = document.querySelector(".hide-all");

//TODO: Function that destructures history lock date and converts it into a custom date format
const customHistoryDate = (date) => {
  const historyDate = new Date(date);
  const day = historyDate.getDate();
  const month = historyDate.getMonth() + 1;
  const year = historyDate.getFullYear();
  const hour = historyDate.getHours();
  const minute = `${historyDate.getMinutes()}`[0];
  const period = historyDate.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  const gmt = -historyDate.getTimezoneOffset() / 60;
  const displayDate = `${year}-${month}-${day} ${hour}:${minute}${period} GMT +${gmt}`;
  return displayDate;
};

//TODO: Function that renders the history lock data to the frontend, conditionally
const renderHistory = (historyData, historyIndex) => {
  //This if statement ensures nothing is rendered to the frontend if the "history data" and "history index" are not fetched
  if (historyData && historyIndex) {
    //Get the custom history lock date format
    const historyDate = customHistoryDate(historyData.date);

    //The history UI component
    const historyComponent = `
      <li class="history-list" id=${historyIndex}>
          <span class="date">${historyDate} </span>
          <div class="lock-wrapper">
              <svg class="lock-icon" width="12px" height="18px" viewBox="0 0 12 18" version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="Credit-Lock" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="2.1-Creditlock-Locked-History-Desktop" transform="translate(-424.000000, -539.000000)"
                      fill="#3E3F42" fill-rule="nonzero">
                      <g id="bureau" transform="translate(167.000000, 190.000000)">
                      <g id="Group" transform="translate(22.000000, 349.820582)">
                          <path
                          d="M245.5,5.79545455 L244.75,5.79545455 L244.75,3.75 C244.75,1.68 243.07,-1.77635684e-14 241,-1.77635684e-14 C238.93,-1.77635684e-14 237.25,1.68 237.25,3.75 L237.25,5.79545455 L236.5,5.79545455 C235.675,5.79545455 235,6.47045455 235,7.29545455 L235,14.7954545 C235,15.6204545 235.675,16.2954545 236.5,16.2954545 L245.5,16.2954545 C246.325,16.2954545 247,15.6204545 247,14.7954545 L247,7.29545455 C247,6.47045455 246.325,5.79545455 245.5,5.79545455 Z M241,12.5454545 C240.175,12.5454545 239.5,11.8704545 239.5,11.0454545 C239.5,10.2204545 240.175,9.54545455 241,9.54545455 C241.825,9.54545455 242.5,10.2204545 242.5,11.0454545 C242.5,11.8704545 241.825,12.5454545 241,12.5454545 Z M243.325,5.79545455 L238.675,5.79545455 L238.675,3.75 C238.675,2.4675 239.7175,1.425 241,1.425 C242.2825,1.425 243.325,2.4675 243.325,3.75 L243.325,5.79545455 Z"
                          id="unlock_icon-copy-8"></path>
                      </g>
                      </g>
                  </g>
                  </g>
              </svg>
          <span class="lock">${historyData.type}</span>
          </div>
      </li>
`;

    // Insert each history lock entry into the history container
    historyContainer.insertAdjacentHTML("afterbegin", historyComponent);
  }
};

//TODO: Async function that fetches that history lock data
const lockHistory = async () => {
  try {
    // Clear all existing lock history data on the UI to aboid duplicates
    historyContainer.innerHTML = "";

    // Fetch lock history data from local json file-path: "test-1_data.json"
    const response = await fetch("test-1_data.json");

    // Catch a repsonse error if the endpoint is faulty or fails to return any data
    if (response.ok) {
      const data = await response.json();

      //Render all lock history data to the frontend by mapping through the data
      data.forEach((history, index) => {
        renderHistory(history, index);
      });

      // Dynamically display the total number of lock history entries
      showAll.innerHTML = `Show All (${data.length})`;


      //TODO: Filter the history lock data based on specific actions

      //Get all the history lock data when they finally get fetched
      const historyList = await document.querySelectorAll(".history-list");

      if (historyList) {
        //Convert NodeList to HTML Colletion (Array)
        const historyCollection = Array.from(historyList);

        //Initially hide all history list
        const hideAllHistory = () => {
          historyCollection.forEach((list) => {
            list.style.display = "none";
          });
        };

        //Display only the first 5 lock history data to the frontend
        const defaultHistoryLength = () => {
          historyCollection.slice(0, 5).forEach((list) => {
            list.style.display = "flex";
          });
        };

        //Display all lock history data to the frontend
        const displayAllHistory = () => {
          historyCollection.forEach((list) => {
            list.style.display = "flex";
          });
        };

        //Display all lock history data when "Show All" is clicked
        showAll.addEventListener("click", (e) => {
          hideAllHistory();
          displayAllHistory();
        });

        //Default state of the history lock data
        hideAllHistory();
        defaultHistoryLength();

        //Toggle the display (hide or show) of lock history data when  is clicked
        hideAll.addEventListener("click", (e) => {
          hideAll.classList.toggle("hide");

          if (hideAll.classList.contains("hide")) {
            hideAllHistory();
            showAll.style.display = "none";
            hideAll.innerHTML = "Show lock history";
          } else {
            hideAllHistory();
            defaultHistoryLength();
            showAll.style.display = "block";
            hideAll.innerHTML = "Hide lock history";
          }
        });
      }
    }
  } catch (error) {
    // console.log(error);
  }
};

lockHistory();
