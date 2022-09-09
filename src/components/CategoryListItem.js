export default function CategoryListItem(category, active, archived) {
    return `
        <div class="row">
            <div class="column colSum1">${category.title}</div>
            <div class="column colSum2">${active}</div>
            <div class="column colSum3">${archived}</div>
        </div>
    `
}