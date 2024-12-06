function loadCalendar() {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    const day = document.querySelector(".calendar-dates");

    const currdate = document
        .querySelector(".calendar-current-date");

    const container = document.querySelector('.calendar-container');

    // Array of month names
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Function to generate the calendar
    const manipulate = () => {

        // Get the first day of the month
        let dayone = new Date(year, month, 0).getDay();

        // Get the last date of the month
        let lastdate = new Date(year, month + 1, -1).getDate();

        // Get the day of the last date of the month
        let dayend = new Date(year, month, lastdate).getDay();

        // Get the last date of the previous month
        let monthlastdate = new Date(year, month, 0).getDate();

        // Variable to store the generated calendar HTML
        // let lit = "";

        // Loop to add the last dates of the previous month
        for (let i = dayone; i > 0; i--) {
            const li = document.createElement('li');
            li.classList.add('inactive');
            li.textContent = monthlastdate - i + 1;
            container.appendChild(li);
            // lit +=
            //     `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }

        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {

            // Check if the current date is today
            let isToday = i === date.getDate()
                && month === new Date().getMonth()
                && year === new Date().getFullYear()
                ? "active"
                : "idle";

                const li = document.createElement('li');
                li.classList.add(isToday);
                li.textContent = i;
                container.appendChild(li);
            // lit += `<li class="${isToday}">${i}</li>`;
        }

        // Loop to add the first dates of the next month
        for (let i = dayend; i < 6; i++) {

            const li = document.createElement('li');
            li.classList.add('inactive');
            li.textContent = i - dayend + 1;
            container.appendChild(li);
            // lit += `<li class="inactive">${i - dayend + 1}</li>`
        }

    }

console.log('Run!');    
manipulate();

}

loadCalendar();