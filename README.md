# <b>Dynamic-User-Management-Table
A simple, responsive user management interface built with Vanilla JavaScript, HTML, and CSS. Implement full CRUD operations (Create, Read, Update, Delete) on user data, including avatar upload and form validation, without any external libraries.
.
├── index.html          # Main HTML markup and layout\
├── index.css           # Styling with Flexbox and custom CSS\
├── index.js            # CRUD logic and DOM manipulation\
└── images/             # Asset folder for SVG icons and default avatars\

## <b>How to Use
* Click Create to open the user form dialog.
* Upload an avatar, then enter First Name, Last Name, and Username.
* Click Submit to add the new user to the table.
* Click Edit on any user row to modify details in-place.
* Click Delete to remove a user from the list.

## <b> How It Works
1. Data Model: Maintains an in-memory array of user objects: 
'''{ id, avatar, firstName, lastName, username }
'''
3. Rendering: The renderTable() function rebuilds the user list on each change.
4. Form Handling: onFormSubmit() detects whether to create or update based on form state.
5. Image Preview: Uses the FileReader API to display uploaded avatars instantly.
6. Validation: Checks for empty fields and toggles inline error messages.

# ** Screenshots **
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20005727.png)
### Creating a User
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20005733.png)
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20005755.png)
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20005810.png)
### Updating User details
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20005828.png)
![image_alt](https://github.com/sabarishraja/Dynamic-User-Management-Table/blob/main/images/Output%20images/Screenshot%202025-05-13%20010026.png)
