const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const updateCalendar = () => {
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.getElementById("calendar-grid");
    
    // Clear existing days
    calendarGrid.querySelectorAll('.calendar-day-cell').forEach(cell => cell.remove());

    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const days = daysInMonth(currentMonth, currentYear);

    // Insert empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-day-cell", "empty");
        calendarGrid.appendChild(emptyCell);
    }

    // Insert day cells
    for (let i = 1; i <= days; i++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day-cell");
        dayCell.textContent = i;
        calendarGrid.appendChild(dayCell);
    }
};

document.getElementById("prev-month").addEventListener("click", () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

// Initialize the calendar
updateCalendar();
