import { categories } from "./constants";

export default function Note(created, content, category, id = Date.now(), archived = false) {
    this.id = id;
    this.created = created;
    this.content = content;
    this.category = categories[category];
    this.archived = archived;
}