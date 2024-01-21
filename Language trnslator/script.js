function highlightDates() {
  const year = document.getElementById('year').value;
  const language = document.getElementById('languageDropdown').value;
  const weekhol = parseInt(document.getElementById('weekholiday').value, 10);


  const fileInput = document.getElementById('fileInput');
  const orientation = document.getElementById('orientationDropdown').value;

  if (fileInput.files.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const fileContent = e.target.result.trim();
      const dateStrings = fileContent.split('\n');

      const holidays = dateStrings.map(dateString => new Date(dateString));

      generateCalendar(year, language, holidays, orientation,weekhol);
    };

    fileReader.readAsText(fileInput.files[0]);
  } else {
    alert('Please select a file.');
  }
}

function generateCalendar(year, language, holidays, orientation,weekhol) {
  var calendarPreview = document.getElementById('calendarPreview');
  calendarPreview.innerHTML = '';

  for (let month = 0; month < 12; month++) {
    var monthContainer = document.createElement('div');
    monthContainer.classList.add('month');

    const firstday = new Date(year, month, 1);
    const monthName = firstday.toLocaleString(language, { month: 'long' });
    const lastday = new Date(year, month + 1, 0).getDate();

    var monthHeader = document.createElement('div');
    monthHeader.classList.add('month1');
    monthHeader.textContent = monthName + ' ' + year;
    monthContainer.appendChild(monthHeader);
  
    var daysContainer = document.createElement('div');
    daysContainer.classList.add('days');

    var week = getWeekArray(language);
   
    var weekdays = document.createElement('div');
    weekdays.classList.add('daysweek');
    for (let i = 0; i < 7; i++) {
      var day = document.createElement('div');
      day.classList.add('day');
      if (i === weekhol) {
        day.classList.add('holiday');
        day.style.color = 'red';
      }
      day.textContent = week[i];
      weekdays.appendChild(day);
      daysContainer.appendChild(weekdays);
    }

    let currentDay = 1;
    let currentWeek = 1;

    while (currentDay <= lastday) {
      var weekContainer = document.createElement('div');
      weekContainer.classList.add('week');
      for (let i = 0; i < 7; i++) {
        var dayContainer = document.createElement('div');
        dayContainer.classList.add('day');

        if (currentWeek === 1 && i < firstday.getDay()) {
          dayContainer.textContent = " ";
        } else if (currentDay <= lastday) {
          const currentDate = new Date(year, month, currentDay);
          if (i === weekhol||(holidays.some(holiday => holiday.toLocaleString() === currentDate.toLocaleString()))) {
                dayContainer.style.color = 'red';
                holidays.includes(currentDate);
              } 
                  dayContainer.textContent = currentDay;
          currentDay++;
            }

        weekContainer.appendChild(dayContainer);
      }

      daysContainer.appendChild(weekContainer);
      if (daysContainer.children.length === 7) {
        monthContainer.appendChild(daysContainer.cloneNode(true));
        daysContainer.innerHTML = '';
      }

      currentWeek++;
    }

    monthContainer.appendChild(daysContainer);
    calendarPreview.appendChild(monthContainer);
  }

  calendarPreview.style.display ='flex';
  calendarPreview.style.flexDirection = orientation === 'landscape' ? 'row' : 'column';
}

function getWeekArray(language) {
  if (language === 'kn') {
    return ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"];
  } else if (language === 'es') {
    return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  }
  else if(language=='ar'){
      return ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  }
  else if(language=="hi-IN"){
      return["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
  }
 else if(language=="de"){
       return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

    }
    else if(language=="ja"){
      return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

    }
    else if(language=="zh"){
      return  ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    }
  
   else {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}

function isSameDate(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

document.getElementById('button').addEventListener('click', function () {
  const element = document.getElementById('calendarPreview');

  // Apply styles for centering content
 

  const options = {
      margin: 10,
      filename: 'converted.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: {
          unit: 'mm',
          format: [150, 100],
          orientation: 'landscape',
          justifyFileContent: 'center', // This won't work, instead, apply styling directly to your content
      },
  };

  html2pdf(element, options);
});
