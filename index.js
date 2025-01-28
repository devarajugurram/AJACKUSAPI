document.addEventListener('DOMContentLoaded', function () {
    // class named CRUDOperations which can hold methods of create , read, update, delete
    class CRUDOperations {
        // this variable used to protect the id in url 
        static encoding = "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZyAxMjMh";

													   
        static getEncoding() {
            return this.encoding;
        }

        // delete user details
        // after successful deletion redirected to the success.html page from there we can redirect to home page
        static deleteUser(userId) {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: 'DELETE',
			  
            }).then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                }
                return response.json();
			  
            }).then(response => {
                window.location.href = "/AJACKUSAPI/success/success.html";
			  
            }).catch((error) => {
                console.log(error);
                window.location.href = '/AJACKUSAPI/reject/reject.html';
            });
        }


        // edit the details of the particular user 
        // returns the template
        static getDatatemplate(name,username,email,phone,address,company,website) {
            const userDataTemplate = {
                "name": name,
                "username": username,
                "email": email,
                "address": {
                    "street": address,
                    "suite": "",
                    "city": "",
                    "zipcode": "",
                    "geo": {
                        "lat": "",
                        "lng": ""
                    }
                },
                "phone": phone,
                "website": website,
                "company": {
                    "name": company,
                    "catchPhrase": "",
                    "bs": ""
                }
            };
            return userDataTemplate;
        }

        // edits the user data to api
        static editUser(userid,name,username,email,phone,address,company,website) {
            const userDataTemplate = this.getDatatemplate(name,username,email,phone,address,company,website);
            fetch(`https://jsonplaceholder.typicode.com/users/${userid}`,{
                    method:'PUT',
                    body: JSON.stringify(userDataTemplate),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                    }
            ).then((response) =>  {
                if(!response.ok) {
                    console.log("Error in updating dat...!");
                }
                return response.json();
			  
            }).then(response => {
                window.location.href = "/AJACKUSAPI/success/success.html";
			  
            }).catch((error) => {
                console.log(error);
                window.location.href = '/AJACKUSAPI/reject/reject.html';
            })
        }




        //fetch details of new User
        static newUser(name, username, email, phone, address, company, website) {
            const userDataTemplate = this.getDatatemplate(name,username,email,phone,address,company,website);
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(userDataTemplate),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
			  
            }).then((response) => {
                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                }
                return response.json();
			  
            }).then((data) => {
                window.location.href = '/AJACKUSAPI/success/success.html';
            })
                .catch((error) => { 
                    console.log(error);
                    window.location.href = '/AJACKUSAPI/reject/reject.html';
            });
        }

        //Fetch all users from API
        static fetchDataFromURL() {
            var tableBody = document.querySelector('#data-table tbody');
            if (tableBody) {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach(user => {
																		   
                            const row = document.createElement('tr');
                            row.style.cursor = 'pointer';
                            row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.address?.city || 'N/A'}</td>
                        <td class="view-button" style="cursor:default;text-align:center;">
                            <button class="view-btn" value="${user.id}" style="cursor:pointer">Edit</button>
                            <button class="delete-btn" value="${user.id}" style="cursor:pointer">Delete</button>
                        </td>
                    `;
                            tableBody.appendChild(row);

																			  
                            row.addEventListener('click', (event) => {
                                if (event.target.classList.contains('view-button') || event.target.classList.contains('view-btn') || event.target.classList.contains('delete-btn')) {
                                    if (event.target.classList.contains('view-btn')) {
                                        const editButton = event.target;
                                        // if (editButton) 
                                        if (editButton) {
                                            console.log(user);
                                            sessionStorage.setItem('data',JSON.stringify(user));
                                            window.location.href = "/AJACKUSAPI/edit/edit.html";
                                        }
                                    }
                                    if (event.target.classList.contains('delete-btn')) {
                                        const deleteButton = event.target;
                                        if (deleteButton) this.deleteUser(deleteButton.value);
                                    }
                                    return;
                                }
                                const encryptedUserId = user.id;
                                const addValue = encryptedUserId === (Math.random() + Math.pow(encryptedUserId, 5)) ? Math.random() + Math.pow(encryptedUserId, 5) + 1 : Math.random() + Math.pow(encryptedUserId, 5);
                                const newString = this.getEncoding() + addValue + "" + encryptedUserId;
                                sessionStorage.setItem('value', newString);
                                window.location.href = `./User/details.html?id=${newString}`;
                            });
                        });
					  
                    }).catch((error) => {
                        console.log(error);
                        this.getErrorMessage();
                    });
            }else {
                this.getErrorMessage();
            }

        }
        // fetch only particular user by id

																	 
        static singleUserFunction() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const userId = urlParams.get('id');
            const getValue = sessionStorage.getItem('value');
            const decodeUrl = userId[userId.length - 1];

            if (getValue && getValue === userId) {
                fetch(`https://jsonplaceholder.typicode.com/users/${decodeUrl}`)
                    .then(response => response.json())
                    .then(data => {

                        const detailsContent = document.querySelector('.details-content');

                        if (detailsContent) {
                            detailsContent.innerHTML = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Username:</strong> ${data.username}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <h3>Address:</h3>
                    <p><strong>Street:</strong> ${data.address.street}</p>
                    <p><strong>Suite:</strong> ${data.address.suite}</p>
                    <p><strong>City:</strong> ${data.address.city}</p>
                    <p><strong>Zipcode:</strong> ${data.address.zipcode}</p>
                    <h4>Geo:</h4>
                    <p><strong>Latitude:</strong> ${data.address.geo.lat}</p>
                    <p><strong>Longitude:</strong> ${data.address.geo.lng}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>Website:</strong> <a href="http://${data.website}" target="_blank">${data.website}</a></p>
                    <h3>Company:</h3>
                    <p><strong>Name:</strong> ${data.company.name}</p>
                    <p><strong>CatchPhrase:</strong> ${data.company.catchPhrase}</p>
                    <p><strong>BS:</strong> ${data.company.bs}</p>
                `;
                        }

                    })
                    .catch(error => {
                        this.getErrorMessage();

                    });
            } else {
                this.getErrorMessage();
            }
		 

        }

        //error message building
        static getErrorMessage() {
            const deleteButton = document.querySelector('.details-buttons');
            if (deleteButton) {
                deleteButton.style.display = 'none';
                const detailsContent = document.querySelector('.details-content');
                detailsContent.innerHTML = `
        <div class="error-message">
            <p><strong>Error:</strong> Unable to fetch user details. Please try again later.</p>
        </div>
    `;
            }
        }
    }

	//variables required for eventlisteners						  
    const redirectButton = document.querySelector('#redirect-button');
    const buttonToadd = document.querySelector('#add-user-button');
    const addnewuser = document.querySelector('#user-form');
    const updatethedetails = document.querySelector('#editForm');

    if (window.location.pathname.includes('details.html')) { CRUDOperations.singleUserFunction(); }
											
			
    else { CRUDOperations.fetchDataFromURL(); }
	 //event listeners

    if (buttonToadd) {
        buttonToadd.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = "./newuser/new.html";
        });
    }
// event listener for adding new users
    if (addnewuser) {
        addnewuser.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.querySelector("#user-name").value;
            const username = document.querySelector("#user-username").value;
            const email = document.querySelector("#user-email").value;
            const phone = document.querySelector("#user-phone").value;
            const address = document.querySelector("#user-address").value;
            const company = document.querySelector("#user-company").value;
            const website = document.querySelector("#user-website").value;
            CRUDOperations.newUser(name, username, email, phone, address, company, website);
        });
    }
// event listener for editing the users
    if(updatethedetails) {
        updatethedetails.addEventListener('submit',function (event) {
            event.preventDefault();
            const userid = document.querySelector('#edit-userId').value;
            const name = document.querySelector("#edit-name").value;
            const username = document.querySelector("#edit-username").value;
            const email = document.querySelector("#edit-email").value;
            const phone = document.querySelector("#edit-phone").value;
            const address = document.querySelector("#edit-street").value;
            const company = document.querySelector("#edit-companyName").value;
            const website = document.querySelector("#edit-website").value;
            CRUDOperations.editUser(userid,name,username,email,phone,address,company,website);
        });
    }

    if (redirectButton) {
        redirectButton.addEventListener('click', function () {
            window.location.href = "/AJACKUSAPI/index.html";
        });
    }

});
