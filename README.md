# Dialog Popup

## PREREQUISITE

* [Node.js 10.15.3](https://nodejs.org/en/download/)
* JavaScript editor or IDE (choose by your personal preference) 

## ARCHITECTURE
Single-page application (web application) based on [React.js](https://reactjs.org/docs/create-a-new-react-app.html)

![](https://user-images.githubusercontent.com/20400793/58096882-c33cab00-7bde-11e9-8e91-6fc1cd8360ee.png)

## Running the App 
* `npm install`
* **(Backend and Frontend are running on separed Node.js instance)**
* Backend `npm run server` or `node server.js`
* Fronend `npm start`
![](https://user-images.githubusercontent.com/20400793/58100334-16662c00-7be6-11e9-9a33-41db615b35ad.png)
[Full size](https://user-images.githubusercontent.com/20400793/58100334-16662c00-7be6-11e9-9a33-41db615b35ad.png)
## Tasks
### Frontend Task 
* Modify open-save-as.jsx to act as unversal Open and Save dialog
* Render all received files names from `programListFetchedFromServer(data)` in `<ListGroup></ListGroup>`
* Render current selected file in  `<Input placeholder="File Name..."/>`
* Disable or Enable input field according "Open" or "Save" mode
* Dispaly warning when user try to use file name which alredy exsist ("Save" mode)

### Frontend + Backend + Socket.io Task
* Render the content of the selected file in editor.jsx
