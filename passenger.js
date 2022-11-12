const read = require('readline-sync')
const fs = require('fs');
const { displayPartsToString } = require('typescript');

while (true) {
    console.log("1. Add User");
    console.log("2. Update User");
    console.log("3. Delete User");
    console.log("4. Search User");
    console.log("5. Display all users");
    console.log("6. Exit");

    let option = read.question('Please select an option: ');
    switch (option) {
        case "1":
            addUser();
            break;
        case "2":
            updateUser();
            break;
        case "3":
            deleteUser();
            break;
        case "4":
            selectUser();
            break;
        case "5":
            displayUsers();
            break;
        case "6":
            process.exit(0);
            break;
        default:
            console.log("Invalid option");
    }
}

function addUser() {
    console.log("Add User Selected");
    var user = {
        name: null,
        username: null,
        email: null,
        phone: null,
        altPhone: null,
    };
    user.name = read.question("Name: ");
    user.username = read.question("Username: ").toLowerCase();
    user.email = read.question("Email: ");
    user.phone = read.question("Phone number: ");
    user.altPhone = read.question("Alternate Phone number: ");

    let fileName = getFileName(user.username);
    var json = JSON.stringify(user);
    fs.writeFileSync(fileName, json);
}

function updateUser() {
    let userName = read.question('Enter the username: ');
    var fileName = getFileName(userName);

    var userText = fs.readFileSync(fileName, 'utf8');
    var user = JSON.parse(userText);

    console.log("Enter the details or leave it blank");
    let name = read.question("Name: ");
    let email = read.question("Email: ");
    let phone = read.question("Phone number: ");
    let altPhone = read.question("Alternate phon: ");

    user.name = name == "" ? user.name : name;
    user.email = email == "" ? user.email : email;
    user.phone = phone == "" ? user.phone : phone;
    user.altPhone = altPhone == "" ? user.altPhone : altPhone;

    fs.writeFileSync(fileName, JSON.stringify(user));
    console.log("User updated successfully 👍");
}

function deleteUser() {
    let duserName = read.question('Enter the username: ');
    fs.unlinkSync(getFileName(duserName));
}

function selectUser() {
    // let userName = read.question('Enter the username: ');
    // var userText = fs.readFileSync(getFileName(userName), 'utf8');
    // var user = JSON.parse(userText);
    // console.table(user);
    var email = read.question("Enter the email_id you want to search : ");
    var files = fs.readdirSync('./data/');
    for (let i = 0; i < files.length; i++) {
        var data = fs.readFileSync(`./data/${files[i]}`, 'utf-8');
        var obj = JSON.parse(data);
        if (obj.email == email) {
            console.table(obj);
            break;
        }
    }
}
function displayUsers() {
   
    var files = fs.readdirSync('./data/');
        for (let i = 0; i < files.length; i++) {
            var data = fs.readFileSync(`./data/${files[i]}`,'utf-8');
            var display = JSON.parse(data);
            console.log(display);
            
        }
}
function getFileName(userName) {
    return `data/${userName}.json`;
}