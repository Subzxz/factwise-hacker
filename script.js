document.addEventListener('DOMContentLoaded', function() {
    let usersData = []; // This will hold the fetched JSON data

    // Fetch JSON data
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            usersData = data; // Store the fetched data in usersData array
            renderUserList(usersData); // Render the user list initially
        })
        .catch(error => console.error('Error fetching users data:', error));

    // Function to render user list
    function renderUserList(users) {
        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = ''; // Clear previous content

        users.forEach(user => {
            const userItem = createUserItem(user);
            userListContainer.appendChild(userItem);
        });
    }

    // Function to create a user item
    function createUserItem(user) {
        const item = document.createElement('div');
        item.classList.add('accordion-item');

        item.innerHTML = `
            <div class="accordion-header">
                <div class="user-info">
                    <img src="${user.picture}" alt="${user.first} ${user.last}">
                    <span>${user.first} ${user.last}</span>
                </div>
                <button class="accordion-button">+</button>
            </div>
            <div class="accordion-body">
                <div class="form-row">
                    <label>Date of Birth:</label>
                    <input type="text" value="${user.dob}" disabled>
                </div>
                <div class="form-row">
                    <label>Age:</label>
                    <input type="text" value="${calculateAge(user.dob)}" disabled>
                </div>
                <div class="form-row">
                    <label>Gender:</label>
                    <select disabled>
                        <option ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                        <option ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                        <option ${user.gender === 'transgender' ? 'selected' : ''}>Transgender</option>
                        <option ${user.gender === 'rather not say' ? 'selected' : ''}>Rather not say</option>
                        <option ${user.gender === 'other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="form-row">
                    <label>Country:</label>
                    <input type="text" value="${user.country}" disabled>
                </div>
                <div class="form-row">
                    <label>Description:</label>
                    <textarea rows="3" disabled>${user.description}</textarea>
                </div>
                <div class="form-actions">
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;

        const accordionButton = item.querySelector('.accordion-button');
        const editButton = item.querySelector('.edit-button');
        const deleteButton = item.querySelector('.delete-button');

        // Accordion behavior
        accordionButton.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            closeAllAccordions();
            if (!isActive) {
                item.classList.add('active');
            }
        });

        // Edit button click handler
        editButton.addEventListener('click', function() {
            editUser(item);
        });

        // Delete button click handler
        deleteButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this user?')) {
                deleteUser(item);
            }
        });

        return item;
    }

    // Function to close all accordions
    function closeAllAccordions() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    // Function to edit user details
    function editUser(item) {
        const body = item.querySelector('.accordion-body');

        // Create edit mode form
        const saveButton = document.createElement('button');
        saveButton.classList.add('save-button');
        saveButton.textContent = 'Save';

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Cancel';

        body.innerHTML = `
            <div class="form-row">
                <label>Date of Birth:</label>
                <input type="text" value="${item.querySelector('input[type="text"]').value}">
            </div>
            <div class="form-row">
                <label>Age:</label>
                <input type="text" value="${item.querySelector('input[type="text"]').value}">
            </div>
            <div class="form-row">
                <label>Gender:</label>
                <select>
                    <option ${item.querySelector('select').value === 'Male' ? 'selected' : ''}>Male</option>
                    <option ${item.querySelector('select').value === 'Female' ? 'selected' : ''}>Female</option>
                    <option ${item.querySelector('select').value === 'Transgender' ? 'selected' : ''}>Transgender</option>
                    <option ${item.querySelector('select').value === 'Rather not say' ? 'selected' : ''}>Rather not say</option>
                    <option ${item.querySelector('select').value === 'Other' ? 'selected' : ''}>Other</option>
                </select>
            </div>
            <div class="form-row">
                <label>Country:</label>
                <input type="text" value="${item.querySelector('input[type="text"]').value}">
            </div>
            <div class="form-row">
                <label>Description:</label>
                <textarea rows="3">${item.querySelector('textarea').value}</textarea>
            </div>
            <div class="form-actions">
                ${saveButton.outerHTML}
                ${cancelButton.outerHTML}
            </div>
        `;

        editButton.disabled = true;

        // Save changes
        saveButton.addEventListener('click', function() {
            saveChanges(item);
        });

        // Cancel editing
        cancelButton.addEventListener('click', function() {
            cancelEditing(item);
        });

        body.classList.add('active');
    }

    // Save changes
    function saveChanges(item) {
        const editedUser = {
            name: item.querySelector('span').textContent,
            dateOfBirth: item.querySelector('input[type="text"]').value,
            gender: item.querySelector('select').value,
            country: item.querySelector('input[type="text"]').value,
            description: item.querySelector('textarea').value
        };

        // Implement save functionality (e.g., update user details)

        cancelEditing(item);
    }

    // Cancel editing
    function cancelEditing(item) {
        const user = usersData.find(u => u.name === item.querySelector('span').textContent);
        const body = item.querySelector('.accordion-body');
        body.innerHTML = `
            <div class="form-row">
                <label>Date of Birth:</label>
                <input type="text" value="${user.dob}" disabled>
            </div>
            <div class="form-row">
                <label>Age:</label>
                <input type="text" value="${calculateAge(user.dob)}" disabled>
            </div>
            <div class="form-row">
                <label>Gender:</label>
                <select disabled>
                    <option ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                    <option ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                    <option ${user.gender === 'transgender' ? 'selected' : ''}>Transgender</option>
                    <option ${user.gender === 'rather not say' ? 'selected' : ''}>Rather not say</option>
                    <option ${user.gender === 'other' ? 'selected' : ''}>Other</option>
                </select>
            </div>
            <div class="form-row">
                <label>Country:</label>
                <input type="text" value="${user.country}" disabled>
            </div>
            <div class="form-row">
                <label>Description:</label>
                <textarea rows="3" disabled>${user.description}</textarea>
            </div>
            <div class="form-actions">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        const editButton = item.querySelector('.edit-button');
        editButton.disabled = false;

        body.classList.remove('active');
    }

    // Delete user
    function deleteUser(item) {
        const userName = item.querySelector('span').textContent;
        usersData = usersData.filter(user => user.name !== userName);
        renderUserList(usersData);
    }

    // Function to calculate age based on date of birth
    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
});
