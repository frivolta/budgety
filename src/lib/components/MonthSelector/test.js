// What user selected
let selectedByUser = 11;


const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const totalMonths = 11;

const getMonth = (selectedMonth, offset = 0) => {
    const offsetMonth = selectedMonth + offset;

    if(offsetMonth>=0 && offsetMonth<= totalMonths){
        return offsetMonth
    }

    if(offsetMonth<0){
        return totalMonths + offsetMonth +1
    }

    if(offsetMonth>totalMonths){
        return offsetMonth-totalMonths -1 
    }
}


console.log(MONTHS[getMonth(selectedByUser, -2)])
console.log(MONTHS[getMonth(selectedByUser, -1)])
console.log(MONTHS[getMonth(selectedByUser)])
console.log(MONTHS[getMonth(selectedByUser, 1)])
console.log(MONTHS[getMonth(selectedByUser, 2)])
