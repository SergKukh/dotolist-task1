import './styles/style.css';
import './styles/list.css';
import './styles/modal.css';
import { categories, modalTypes } from './data/constants.js';
import ListItem from './components/ListItem';
import CategoryListItem from './components/CategoryListItem';
import { addNewNote, deleteNote, editNote, findNotes, getNoteById } from './data/controllers';

const list = document.getElementById('noteListItems');
const archivedList = document.getElementById('archivedListItems');
const categoryList = document.getElementById('categoryListItems');
const createNoteBtn = document.getElementById('createNoteBtn');
const archivedBtn = document.getElementById('archivedBtn');
const modals = document.querySelectorAll('.modal');
const modalWrappers = document.querySelectorAll('.modalWrapper');
const noteModal = document.getElementById('noteModal');
const archivedModal = document.getElementById('archivedModal');
const noteForm = document.getElementById('noteForm');
const enterTitle = document.getElementById('enterTitle');
const modalSubmit = document.getElementById('modalSubmit');
const modalClose = document.querySelector('.modalClose');
const categorySelector = document.querySelector('#noteForm .formItem select');
let modalType = modalTypes.create;
let currentId = 0;

createNoteBtn.addEventListener('click', () => {
    modalType = modalTypes.create;
    setModalType();
    noteModal.classList.toggle('show');
    enterTitle.focus();
})

archivedBtn.addEventListener('click', () => {
    renderArchivedNotes();
    archivedModal.classList.toggle('show');
})

modals.forEach(modal => {
    modal.addEventListener('click', () => {
        modal.classList.remove('show');
        enterTitle.value = '';
        categorySelector.value = categories.task.name;
    });
})

modalClose.addEventListener('click', () => {
    modals.forEach(modal => {
        modal.classList.remove('show');
    })
})

modalWrappers.forEach(element => {
    element.addEventListener('click', (event) => {
        event.stopPropagation();
    })
})

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = enterTitle.value.trim();
    if (!content) return;

    if (modalType === modalTypes.create) {
        addNewNote(content, categorySelector.value);
    } else if (modalType === modalTypes.edit) {
        const params = {
            content,
            category: categories[categorySelector.value]
        }
        editNote(currentId, params);
    }
    noteModal.classList.toggle('show');
    renderNotes();
    enterTitle.value = '';
    categorySelector.value = categories.task.name;
})

function main() {
    Object.keys(categories).forEach(key => {
        categorySelector.innerHTML +=
            `<option value="${categories[key].name}">${categories[key].title}</option>`;
    })

    renderNotes();
}

function setModalType() {
    if (modalType === modalTypes.create) {
        modalSubmit.value = 'Create';
    } else if (modalType === modalTypes.edit) {
        modalSubmit.value = 'Save';
    }
}

function editHandler() {
    const id = +this.getAttribute('id');
    currentId = id;
    modalType = modalTypes.edit;
    setModalType();
    const note = getNoteById(id);
    enterTitle.value = note.content;
    categorySelector.value = note.category.name;
    noteModal.classList.toggle('show');
    enterTitle.focus();
}

function archiveHandler() {
    const id = +this.getAttribute('id');
    const isArchived = this.getAttribute('isArchived');
    editNote(id, { archived: !isArchived });
    renderNotes();
    if (isArchived) {
        renderArchivedNotes();
    }
}

function deleteHandler() {
    const id = +this.getAttribute('id');
    const isArchived = this.getAttribute('isArchived');
    deleteNote(id);
    renderNotes();
    if (isArchived) {
        renderArchivedNotes();
    }
}

function addClickHandlers(className, callback) {
    const btns = document.querySelectorAll(className);
    btns.forEach(btn => {
        btn.addEventListener('click', callback)
    });
}
function removeClickHandlers(className, callback) {
    const btns = document.querySelectorAll(className);
    btns.forEach(btn => {
        btn.removeEventListener('click', callback)
    });
}

function renderNotes() {
    removeClickHandlers('.editBtn', editHandler);
    removeClickHandlers('.archiveBtn', archiveHandler);
    removeClickHandlers('.deleteBtn', deleteHandler);

    list.innerHTML = "";
    findNotes({ archived: false }).forEach(note => {
        list.innerHTML += ListItem(note);
    });
    archivedBtn.textContent = `Archived (${findNotes({ archived: true }).length})`;
    renderCategories();

    addClickHandlers('.editBtn', editHandler);
    addClickHandlers('.archiveBtn', archiveHandler);
    addClickHandlers('.deleteBtn', deleteHandler);
}

function renderCategories() {
    categoryList.innerHTML = "";
    Object.keys(categories).sort((a, b) => a.title - b.title).forEach(key => {
        const category = categories[key];
        const notes = findNotes({ category });
        const active = notes.filter(note => note.archived === false).length;
        const archived = notes.length - active;
        categoryList.innerHTML += CategoryListItem(category, active, archived);
    });
}

function renderArchivedNotes() {
    removeClickHandlers('.archiveOutBtn', archiveHandler);
    removeClickHandlers('.deleteBtnArchived', deleteHandler);

    archivedList.innerHTML = "";
    findNotes({ archived: true }).forEach(note => {
        archivedList.innerHTML += ListItem(note, true);
    });

    addClickHandlers('.archiveOutBtn', archiveHandler);
    addClickHandlers('.deleteBtnArchived', deleteHandler);
}

main();

