

function formatDate(date) {
  if(!date) {
    return null;
  }  

  let format= date.split('-')
   
    return `${format[1]}/${format[2]}/${format[0]}`;
  }


export default formatDate;