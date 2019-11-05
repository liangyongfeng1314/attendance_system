let _date = {
    cd(times){ // changeDate
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay= currentDate.getDate()
        return new Date(currentYear.toString() + '-' + currentMonth.toString() + '-' + currentDay.toString() + "  " + times.toString()).getTime();
    }
}
export default _date;