import { categories } from "./constants"
import Note from "./Note"

export const data = {
    notes: [
        new Note('2022-09-06', 'do homework', categories.task.name, 1, true),
        new Note('2022-09-07', 'read a book', categories.task.name, 2),
        new Note('2022-09-08', 'create ToDo list', categories.idea.name, 3),
        new Note('2022-09-08', 'Donuts are circles with holes', categories.randomThought.name, 4, true),
        new Note('2022-09-08', 'I`m gonna have a dentist appointment on the 9/12/2021, I moved it from 9/15/2021', categories.task.name, 5),
        new Note('2022-09-03', 'Breakfast is "breaking your fast"', categories.randomThought.name, 6),
        new Note('2022-09-09', 'make a soup', categories.task.name, 7),
    ]
}