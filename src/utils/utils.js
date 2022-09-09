export const getDate = () => {
    return new Date().toISOString().split('T')[0];
}

export const formatDate = (date) => {
    return date.split('-').reduceRight((prev, item) => prev += '.' + item);
}

export const getDatesFromString = (string) => {
    let dates = string.match(/\d{1,2}([\/.-])\d{1,2}\1\d{2,4}/g);
    if (dates) {
        dates = dates.join(', ')
    }
    return dates || '';
}