//Imports
import axios from 'axios';

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

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
            console.error('Async: Could not copy text: ', err);
        }
    );
}

export async function downloadFile(fileURL, fileName) {
    try {
        const MIME_TYPES = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'text/plain': 'txt',
            'video/mp4': 'mp4',
        };
        const file = await axios({ url: fileURL, method: 'GET', responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([file.data]));
        const link = document.createElement('a');
        const extension = MIME_TYPES[file.data.type];
        link.href = url;
        link.setAttribute('download', fileName + '.' + extension);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.log('An error occured');
    }
}
