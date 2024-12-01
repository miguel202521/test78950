const patientList = document.getElementById('patient-list');
const overlay = document.getElementById('overlay');
const detailsPopup = document.getElementById('details-popup');
const confirmationPopup = document.getElementById('confirmation-popup');

let patients = JSON.parse(localStorage.getItem('patients')) || [];
let currentPatientIndex = null;

function addPatient() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const complaints = document.getElementById('complaints').value.trim();
    const history = document.getElementById('history').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const consultationDate = document.getElementById('consultation-date').value;

    const photoInput = document.getElementById('photo');
    const photo = photoInput.files.length > 0 ? URL.createObjectURL(photoInput.files[0]) : '';

    if (name === '') return alert('O nome é obrigatório!');

    patients.push({ name, age, weight, complaints, history, notes, consultationDate, photo });
    localStorage.setItem('patients', JSON.stringify(patients));
    clearForm();
    loadPatients();
}

function loadPatients() {
    patientList.innerHTML = '';
    patients.forEach((patient, index) => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        card.innerHTML = `
            <img src="${patient.photo}" alt="Foto do Paciente">
            <div>${patient.name}</div>
        `;
        card.onclick = () => openDetails(index);
        patientList.appendChild(card);
    });
}

function openDetails(index) {
    const patient = patients[index];
    currentPatientIndex = index;
    document.getElementById('details-name').textContent = patient.name;
    document.getElementById('details-age').textContent = patient.age;
    document.getElementById('details-weight').textContent = patient.weight;
    document.getElementById('details-complaints').textContent = patient.complaints;
    document.getElementById('details-history').textContent = patient.history;
    document.getElementById('details-notes').textContent = patient.notes;
    document.getElementById('details-consultation-date').textContent = patient.consultationDate;
    document.getElementById('details-photo').src = patient.photo;
    overlay.style.display = 'block';
    detailsPopup.style.display = 'block';
}

function closeDetails() {
    overlay.style.display = 'none';
    detailsPopup.style.display = 'none';
}

function deletePatient() {
    if (currentPatientIndex !== null) {
        patients.splice(currentPatientIndex, 1);
        localStorage.setItem('patients', JSON.stringify(patients));
        loadPatients();
        closeConfirmation();
    }
}

function closeConfirmation() {
    overlay.style.display = 'none';
    confirmationPopup.style.display = 'none';
}

function confirmDeletion() {
    overlay.style.display = 'block';
    confirmationPopup.style.display = 'block';
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('complaints').value = '';
    document.getElementById('history').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('consultation-date').value = '';
    document.getElementById('photo').value = '';
}

function filterPatients() {
    const search = document.getElementById('search').value.toLowerCase();
    const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(search));
    patientList.innerHTML = '';
    filteredPatients.forEach((patient, index) => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        card.innerHTML = `
            <img src="${patient.photo}" alt="Foto do Paciente">
            <div>${patient.name}</div>
        `;
        card.onclick = () => openDetails(index);
        patientList.appendChild(card);
    });
}

loadPatients();
