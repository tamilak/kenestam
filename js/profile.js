document.getElementById("editButton").addEventListener("click", toggleEdit);

function toggleEdit() {
    var editForm = document.getElementById('editForm');
    editForm.classList.toggle('hidden');
}