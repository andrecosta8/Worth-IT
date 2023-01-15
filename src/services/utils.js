export const formatDate = (date) =>{
    let filteredDate = (date).split("T");
    let filteredTime = filteredDate[1].split(".")
    let formatedDate = filteredDate[0] + " - " + filteredTime[0];
    return formatedDate;
}





