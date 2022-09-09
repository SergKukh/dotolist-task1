import { formatDate, getDatesFromString } from "../utils/utils";
import { archiveIcon, ArchiveOutIcon, deleteIcon, editIcon } from "./Icons";

export default function ListItem(note, isArchived = false) {
    return `
        <div class="row">
            <div class="column col1">${note.content}</div>
            <div class="column col2">${formatDate(note.created)}</div>
            <div class="column col3">${note.category.title}</div>
            <div class="column col4">${getDatesFromString(note.content)}</div>
            <div class="column col5">
            ${!isArchived ?
            `<div class="editBtn" id="${note.id}">
                ${editIcon()}
            </div>`
            :
            ''}
            ${!isArchived ?
            `<div class="archiveBtn" id="${note.id}">
                ${archiveIcon()}
            </div>`
            :
            `<div class="archiveOutBtn" 
                id="${note.id}"
                isArchived="${isArchived}">
                ${ArchiveOutIcon()}
            </div>`}                                
                <div class="${!isArchived ? 'deleteBtn' : 'deleteBtnArchived'}" 
                id="${note.id}" 
                isArchived="${isArchived}">
                    ${deleteIcon()}
                </div>
            </div>
        </div>
    `
}