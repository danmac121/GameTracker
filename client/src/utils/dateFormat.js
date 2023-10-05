function formatDate(unixDate) {
    // Convert the UNIX timestamp to a JavaScript Date object
    const date = new Date(unixDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const year = date.getFullYear();

    // Return the formatted date
    return `${month}/${day}/${year}`;
}

export default formatDate;