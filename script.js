document.addEventListener('DOMContentLoaded', function () {
    async function fetchData() {
        try {
            const response = await fetch('/data');
            const data = await response.json();
            renderTable(data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    async function searchData(query) {
        try {
            const response = await fetch(`/search?query=${query}`);
            const data = await response.json();
            renderTable(data);
        } catch (err) {
            console.error('Error searching data:', err);
        }
    }

    async function deleteData(id) {
        try {
            await fetch(`/delete/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (err) {
            console.error('Error deleting data:', err);
        }
    }

    async function updateData(id, updatedData) {
        try {
            await fetch(`/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            fetchData();
        } catch (err) {
            console.error('Error updating data:', err);
        }
    }

    function renderTable(data) {
        const tbody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');

            const cell1 = document.createElement('td');
            cell1.textContent = item._id;
            row.appendChild(cell1);

            const cell2 = document.createElement('td');
            cell2.textContent = item.name;
            row.appendChild(cell2);

            const cell3 = document.createElement('td');
            cell3.textContent = item.age;
            row.appendChild(cell3);

            const cell4 = document.createElement('td');
            cell4.textContent = item.grade;
            row.appendChild(cell4);

            const cell5 = document.createElement('td');
            cell5.textContent = item.city;
            row.appendChild(cell5);

            const cell6 = document.createElement('td');
            cell6.textContent = item.country;
            row.appendChild(cell6);

            const cell7 = document.createElement('td');
            cell7.textContent = item.born;
            row.appendChild(cell7);

            const cell8 = document.createElement('td');
            cell8.textContent = item.class;
            row.appendChild(cell8);

            const cell9 = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => showEditForm(item);
            cell9.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteData(item._id);
            cell9.appendChild(deleteButton);

            row.appendChild(cell9);

            tbody.appendChild(row);
        });
    }

    function showEditForm(item) {
        document.getElementById('edit-id').value = item._id;
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-age').value = item.age;
        document.getElementById('edit-grade').value = item.grade;
        document.getElementById('edit-city').value = item.city;
        document.getElementById('edit-country').value = item.country;
        document.getElementById('edit-born').value = item.born;
        document.getElementById('edit-class').value = item.class;
        document.getElementById('edit-form').style.display = 'block';
    }

    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        if (query) {
            searchData(query);
        } else {
            fetchData();
        }
    });

    document.getElementById('edit-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('edit-id').value;
        const updatedData = {
            name: document.getElementById('edit-name').value,
            age: document.getElementById('edit-age').value,
            grade: document.getElementById('edit-grade').value,
            city: document.getElementById('edit-city').value,
            country: document.getElementById('edit-country').value,
            born: document.getElementById('edit-born').value,
            class: document.getElementById('edit-class').value
        };
        updateData(id, updatedData);
        document.getElementById('edit-form').style.display = 'none';
    });

    fetchData();
});