# CRUD Operations Web App

This project demonstrates CRUD (Create, Read, Update, Delete) operations using the JSONPlaceholder API. It is a simple web app designed for beginners to understand how to work with REST APIs.

---
### Key Features of This README:
1. **Detailed Steps to Run Using Visual Studio Code Live Server**:
   - Covers installing and using the **Live Server extension** step by step.
2. **CRUD Operations with Code Examples**:
   - Explains each operation (POST, PUT, GET, DELETE) with detailed steps and practical code snippets.
3. **User-Friendly Format**:
   - Markdown sections make it easy to follow.
## How to Run the Project Locally Using Visual Studio Code

### Prerequisites
- Install **Visual Studio Code**. [Download here](https://code.visualstudio.com/).
- Install the **Live Server** extension in Visual Studio Code.

### Steps to Run:
1. **Clone the Repository**:
   - Open your terminal and run:
     ```bash
     git clone https://github.com/your-repo-name.git
     ```
   - Replace `your-repo-name` with the actual repository name.

2. **Open the Project in Visual Studio Code**:
   - Navigate to the folder where you cloned the project.
   - Open the folder in Visual Studio Code by clicking **File > Open Folder** or dragging the folder into the editor.

3. **Install Live Server Extension**:
   - In Visual Studio Code, click on the Extensions Marketplace (the square icon in the left-hand sidebar).
   - Search for **Live Server** in the search bar.
   - Click **Install**.

4. **Start Live Server**:
   - Open the `index.html` file in the project.
   - Right-click anywhere in the file and select **Open with Live Server**.
   - Your browser will open automatically and display the web app at `http://127.0.0.1:5500` or a similar local server address.

5. **Interact with the App**:
   - Use the app to test CRUD operations (Create, Read, Update, Delete) via the UI.

---

## JSONPlaceholder API

### What is JSONPlaceholder?
JSONPlaceholder is a free online REST API used for testing and prototyping frontend or backend applications. It provides fake data for various resources such as users, posts, comments, and more.

### Users Endpoint
The `/users` endpoint provides a list of 10 users, each containing details such as:
- `id`: A unique identifier for the user.
- `name`: The user's full name.
- `username`: The username of the user.
- `email`: The user's email address.
- `address`: The user's address (with nested details like street, city, geo-location, etc.).
- `phone`: The user's phone number.
- `website`: The user's website URL.
- `company`: Information about the user's company.

### API Endpoint
You can access the users' data at the following URL:  
[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

### Example Response
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  ...
]
```
## CRUD Operations Explained

### 1. POST Operation
**Purpose**:  
POST is used to **create a new resource** on the server. For example, adding a new user to a database.

**How it Works**:
- The client sends data to the server in the **request body**.
- The server processes the data and creates a new resource.
- The response from the server confirms the creation of the resource, often with the new resource's ID or details.

**Example Use Case**: Adding a new user to the app.

**Code Example**:
```javascript
const newUser = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
  .then(response => response.json())
  .then(data => console.log('User added:', data))
  .catch(error => console.error('Error adding user:', error));
```
### 2. PUT Method

**Purpose**  
The **PUT** method is used to **update an existing resource** on the server. It replaces the entire resource with the new data provided in the request.

### How It Works  
1. The client sends a request to the server specifying the resource (usually identified by an ID) that needs to be updated.
2. The updated data is sent in the request body in JSON format.
3. The server processes the request, replaces the old resource with the new one, and sends back a response confirming the update.

### Example Use Case  
Imagine you want to update the name and email of a user with an ID of `1`. You would use the PUT method to send the new user details to the server.

### Code Example
```javascript
const updatedUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
};

fetch('https://jsonplaceholder.typicode.com/users/1', { // Replace "1" with the user ID you want to update
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedUser)
})
  .then(response => response.json())
  .then(data => console.log('User updated:', data))
  .catch(error => console.error('Error updating user:', error));
```
### 3. DELETE Method

**Purpose**  
The **DELETE** method is used to **remove a resource** from the server. It deletes the resource identified by the specified URL or ID.

### How It Works  
1. The client sends a request to the server specifying the resource (usually identified by an ID) that needs to be deleted.
2. The server processes the request and removes the resource.
3. A confirmation response is sent back, usually without any body content, but often with a status code to indicate success.

### Example Use Case  
Imagine you want to delete a user with an ID of `1`. You would use the DELETE method to send a request to the server to remove that user.

### Code Example
```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', { // Replace "1" with the user ID you want to delete
  method: 'DELETE',
})
  .then(response => {
    if (response.ok) {
      console.log('User deleted successfully');
    } else {
      console.error('Failed to delete user');
    }
  })
  .catch(error => console.error('Error:', error));
```
### 4. **GET Operation**
**Purpose**: Retrieve and display data from the server.

**Steps**:
1. Send a GET request to the API endpoint (`https://jsonplaceholder.typicode.com/users`).
2. Parse the response into JSON format.
3. Display the fetched data in the UI.

**Code Example**:
```javascript
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Use data to update the UI
  })
  .catch(error => console.error('Error fetching data:', error));
```
### Highlights of This Section:
- **Purpose**: Explains what the methods is used for.
- **How It Works**: Describes the flow of CRUD operations.
- **Example Use Case**: Provides a relatable example.
- **Code Example**: Includes a working snippet with the fetch API.
##  THANK YOU
