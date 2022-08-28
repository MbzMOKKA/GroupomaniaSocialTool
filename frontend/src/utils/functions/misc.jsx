//Imports

//Exports
export function formatDate(moment) {
    function addZeroIfOneChar(value) {
        if (String(value).length <= 1) {
            return `0${value}`;
        }
        return value;
    }
    const dateObj = new Date(moment);
    let year = dateObj.getFullYear();
    let month = addZeroIfOneChar(dateObj.getMonth() + 1);
    let day = addZeroIfOneChar(dateObj.getDate());
    let hours = addZeroIfOneChar(dateObj.getHours());
    let minutes = addZeroIfOneChar(dateObj.getMinutes());
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
}
