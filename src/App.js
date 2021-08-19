import "./styles.css";

// reverse string
function reverseStr(str) {
  var returnstr = str.split("").reverse().join("");
  return returnstr;
}

//palindrome condition
function isPalindrome(str) {
  var reverse = reverseStr(str);
  if (str === reverse) {
    return true;
  }
  return false;
}

// convert date to string
function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalndromes = getAllDateFormats(date);

  var isPalindromeFlag = false;
  for (var i = 0; i < listOfPalndromes.length; i++) {
    if (isPalindrome(listOfPalndromes[i])) {
      isPalindromeFlag = true;
      break;
    }
  }
  return isPalindromeFlag;
}

function IsLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (IsLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counter++;
    //a loop keeps on running checking if next date is palindrome
    var isNextPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isNextPalindrome) {
      break;
    }
    //upadting the nextDate since previous one was not a palindrome
    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (IsLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousPalindromeDate(date) {
  var counter = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    counter++;
    var isPreviousPalindrom = checkPalindromeForAllDateFormats(previousDate);
    if (isPreviousPalindrom) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }

  return [counter, previousDate];
}

const checkpelindromHandler = () => {
  const userDob = document.querySelector("#birthDate");
  const resultShow = document.querySelector("#result");
  const nextPalindrome = document.querySelector("#nextResult");
  const previousPlaindrome = document.querySelector("#prevResult");

  var bdayDateString = userDob.value;

  if (bdayDateString == "") {
    resultShow.innerHTML = `Please Select date.`;
    nextPalindrome.innerText = "";
    previousPlaindrome.innerText = "";
  } else {
    var dateAfterHyphenRemoved = bdayDateString.split("-"); //["2021", "08", "17"]

    var date = {
      day: Number(dateAfterHyphenRemoved[2]),
      month: Number(dateAfterHyphenRemoved[1]),
      year: Number(dateAfterHyphenRemoved[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);
    if (isPalindrome) {
      resultShow.innerText = `Your Birthday is a Palindrome 🤟🤟`;
      nextPalindrome.innerText = "";
      previousPlaindrome.innerText = "";
    } else {
      var [nextCtr, nextDate] = getNextPalindromeDate(date);
      var [preCtr, previousDate] = getPreviousPalindromeDate(date);

      resultShow.innerText = `Your Birthday is not a Palindrome.`;
      nextPalindrome.innerText = `The next palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, You were earlier by ${nextCtr} days.🤦‍♂️`;
      previousPlaindrome.innerText = `The last palindrome date was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you were late by ${preCtr} days.🤷‍♂️`;
    }
  }
};

export default function App() {
  return (
    <div className="App">
      <h1>Check if Your Birthday Is Palindrome</h1>
      <p>Please enter birthday date </p>

      <input type="date" id="birthDate" />
      <br />
      <br />
      <button onClick={checkpelindromHandler}>Check</button>
      <br />
      <br />
      <strong id="result"></strong>
      <br />
      <br />
      <strong id="prevResult"></strong>
      <br />
      <br />
      <strong id="nextResult"></strong>
    </div>
  );
}
