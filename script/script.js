document.addEventListener('DOMContentLoaded', function () {
    // this is an additional javascript page which helps in data initalization for updating users
    // LoadDetailsofUser indicates the class hold methods like loading data into webpage
    class LoadDetailsofUser {
        //method loaduser, return type void and function type is static so that it should  be loaded at first 
        static loaduser() {
            // session data is collected here
            const data = JSON.parse(sessionStorage.getItem('data'));
            // session data initialized to wepage
            document.querySelector('#edit-name').value = data.name;
            document.querySelector('#edit-username').value = data.username;
            document.querySelector('#edit-email').value = data.email;
            document.querySelector('#edit-street').value = data.address.street + "," + data.address.suite + "," + data.address.city + "," + data.address.zipcode;
            document.querySelector('#edit-userId').value = data.id;
            document.querySelector('#edit-phone').value = data.phone;
            document.querySelector('#edit-website').value = "https://"+data.website;
            document.querySelector('#edit-companyName').value = data.company.name + "," + data.company.catchPhrase + "," + data.company.bs;
        }
    }
    //calling the loaduser function
    LoadDetailsofUser.loaduser();
});