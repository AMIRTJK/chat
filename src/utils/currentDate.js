const date = new Date();
const day = date.getDate().toString().padStart(2, "0"); 
const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
const year = date.getFullYear();

export const formattedDate = `${day}-${month}-${year}`;