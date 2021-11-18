
## Frontend Task 1

This is a web app feature built as part of Array's frontend developer interview process and I enjoyed the task!


## Implementations

- Fetched "lock history" data from local JSON path 
- Conditionally rendered fetched data to the frontend
- Error handling using trycatch async/await function
- Enabling user to adjust the "lock history" display (toggle, show more, show less functionalities)
- Custom date format fetched from JSON path
- Conditionally render the "Lock" and "Unlock" state of each "lock history" entry


## Execution Steps

- Created an external JavaScript file to house the feature implementation. I did not go for a package manager because I consider this a small and straighforward feature. If it were a bigger project, I would have compartmentalized the code to ensure global resuability of code snippets.
- Started off by fetching the local JSON data using an async function. I then pulled the corresponding data from the response after ensuring the fetch was sucessful. To ensure that the UI does not break when data fails to be fetched, I decided to completely remove the "lock history" feature from the UI and log the error to the console. This decision will prevent the distruption of usage.
  
   ```
    if (response.ok) {
      const data = await response.json();
      }
    } else {
      showAll.style.display = "none";
      hideAll.style.display = "none";
    }
  ```

- Created a function that dynamically renders the "lock history" UI component with the corresponding history data generated from the fetched data.
- To ensure that a user as the option to collapse and limit the number of "lock history" data that is presented on the frontend, I used chunks of resuable functions to show and hide data using click eventlisteners.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript

**Deployment:** Vercel



## Run Locally

Clone the project

```bash
  git clone https://github.com/folathecoder/array-frontend-interview.git
```

Go to the project directory

```bash
  cd array-test-1
```

Install 

- live-server (VS Code extenstion) to preview the app.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://folarin.dev/)