import { getDate } from "../utils/utils";
import { data } from "./initData";
import Note from "./Note";

export const addNewNote = (content, categoryName) => {
    const note = new Note(getDate(), content, categoryName);
    data.notes.push(note);
    return note;
}

export const getNoteById = (id) => {
    const note = data.notes.find(note => note.id === id);
    return note;
}

export const editNote = (id, params) => {
    const note = getNoteById(id);
    try {
        Object.keys(params).forEach(key => {
            note[key] = params[key];
        });
    } catch (error) {
        return null;
    }
    return note;
}

export const findNotes = (params) => {
    return data.notes.filter(note => {
        for (let key in params) {
            if (note[key] !== params[key]) return false;
        }
        return true;
    }).sort((a, b) => new Date(a.created) - new Date(b.created));
}

export const deleteNote = (id) => {
    data.notes = data.notes.filter(note => note.id !== id);
    return [...data.notes];
}
