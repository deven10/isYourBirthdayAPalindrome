function reversedStr(str){
    let chars = str.split('');
    let reverseString = chars.reverse();
    let reversedString = reverseString.join('');
    // let reversedString = str.split('').reverse().join('');
    return reversedString;
}

function isPalindrome(str){
    let reverse = reversedStr(str);
    if(str === reverse){
        return true;
    }
    return false;
}

function convertDateToString(date){
    let dateStr = { day: '', month: '', year: ''}

    if(date.day < 10){
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllFormatDates(date){
    let dateStr = convertDateToString(date);
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    let listOfPalindromes = getAllFormatDates(date);
    let flag = false;
    for(let i=0; i<listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }

    }
    return flag;
}

function isLeapYear(year){
    if(year % 4000 === 0){
        return true;
    } 
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month == 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            } 
        }else {
                if(day > 28){
                   day = 1;
                   month++;    
                }
            }
    }   else {
            if(day > daysInMonth[month - 1]){
                day = 1;
                month++;
            }
        }
        if(month > 12){
            month = 1;
            year++;
        }

    return {
        day: day,
        month:month,
        year:year
    };
}

function getNextPalindromeDate(date){
    let count = 0;
    let nextDate = getNextDate(date);

    while(1){
        count++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        } 
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

// function getPreviousDate(date){
//     let day = date.day - 1; //30 12 2020
//     console.log(day, "<= initial");
//     let month = date.month;
//     let year = date.year;

//     let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

//     if(month == 2){
//         if(isLeapYear(year)){
//             if(day > 29){
//                 day = day - 1;
//                 console.log(day, "<= if leap year -1 day");
//             } 
//         }else {
//                 if(day > 28){
//                    day = day - 1; 
//                    console.log(day, "<= if not a leap year still -1 day");
//                 }
//             }
//     }   else {
//             if(day > daysInMonth[month - 1]){
//                 day = day - 1;
//                 // month--;
//             }
//         }
//         if(month > 12){
//             day = 31;
//             month--;
//             // year;
//         }

//     return {
//         day: day,
//         month:month,
//         year:year
//     };
// }

// function getPreviousPalindromeDate(date){
//     let count = 0;
//     let nextDate = getPreviousDate(date);

//     while(1){
//         count++;
//         let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
//         if(isPalindrome){
//             break;
//         } 
//         nextDate = getPreviousDate(nextDate);
//     }
//     return [count, nextDate];
// }

const bday = document.querySelector("#birthdate");
const btn = document.querySelector("#btn");
const output = document.querySelector("#output");

function clickHandler(e){
    let birthDateStr = bday.value;

    if(birthDateStr !== ""){
        let listOfDate = birthDateStr.split("-");

        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        let isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            output.innerText = "🚀 Yay, your birthday is a palindrome."
        } else {
            let [count, nextDate] = getNextPalindromeDate(date);
            output.innerText = `😖 Sorry, your birthday is not a palindrome.\n You missed it by ${count} days 😔 and the date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`
        }
    }
}

btn.addEventListener("click", clickHandler);

