/* Your Code Here */
function createEmployeeRecord(array){
    let employeeRecordObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecordObj;
};

/*
function createEmployeeRecords(arrayOfArrays){
    let arrayOfRecords = arrayOfArrays.map(array => createEmployeeRecord(array));
    //arrayOfObjects
    return arrayOfRecords;
}; 
//Refactor to the below*/

let createEmployeeRecords = function(multiEmployeeData){
    return multiEmployeeData.map(singleData => createEmployeeRecord(singleData))
};

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

let createTimeOutEvent = function(dateStamp){
    let[date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents[this.timeInEvents.findIndex(timeInElement => timeInElement.date === date)].hour;
    let timeOut = this.timeOutEvents[this.timeOutEvents.findIndex(timeOutElement => timeOutElement.date === date)].hour;
    return (timeOut - timeIn)/100;
};

let wagesEarnedOnDate = function (date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

/*
let allWagesFor = function (){
    let allDates = this.timeInEvents.map(objElement => objElement.date);
    let payOwedByDate = allDates.map(date => wagesEarnedOnDate.call(this, date));
    let totalPayAllDatesNum = payOwedByDate.reduce((previousVal, currentVal) => previousVal + currentVal);
    return totalPayAllDatesNum;
}
//can probably refactor more to combine payOwedByDate and totalPayAllDatesNum 
*/



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


let findEmployeeByFirstName = function(srcArray, firstName){
       return srcArray.find(elementArray => {
        return elementArray.firstName === firstName
    })
};

let calculatePayroll = function (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((previousVal, currentVal) => {
        return previousVal + allWagesFor.call(currentVal)
    }, 0) ;
};
