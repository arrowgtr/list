document.addEventListener("DOMContentLoaded", () => {
    const toDoListContainer = document.getElementById('toDoListContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resetButton = document.getElementById('resetButton');
    const daysInMonth = 30; // Assuming a 30-day month
    const tasks = [
        "100 frontier",
        "200 tbs",
        "500 poke catch",
        "500 train",
        "500 fish"
    ];
    const totalTasks = daysInMonth * tasks.length;

    // Function to load the state of checkboxes from localStorage
    function loadState() {
        let completedTasks = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            for (let task = 1; task <= tasks.length; task++) {
                const checkboxId = `day${day}task${task}`;
                const checkbox = document.getElementById(checkboxId);
                const savedState = localStorage.getItem(checkboxId);
                if (savedState === 'true') {
                    checkbox.checked = true;
                    completedTasks++;
                } else {
                    checkbox.checked = false;
                }
            }
        }
        updateProgressBar(completedTasks);
    }

    // Function to save the state of a checkbox to localStorage
    function saveState(checkboxId, isChecked) {
        localStorage.setItem(checkboxId, isChecked);
    }

    // Function to update the progress bar
    function updateProgressBar(completedTasks) {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = percentage + '%';
        progressText.innerText = `Progress: ${completedTasks} / ${totalTasks} (${percentage.toFixed(2)}%)`;
    }

    // Function to reset all checkboxes
    function resetAll() {
        for (let day = 1; day <= daysInMonth; day++) {
            for (let task = 1; task <= tasks.length; task++) {
                const checkboxId = `day${day}task${task}`;
                localStorage.removeItem(checkboxId);
                document.getElementById(checkboxId).checked = false;
            }
        }
        updateProgressBar(0);
    }

    // Create the to-do list structure
    for (let day = 1; day <= daysInMonth; day++) {
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-container';

        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.innerText = `Day ${day}`;
        dayContainer.appendChild(dayHeader);

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';

            // Apply the small-font class to the third task
            if (index === 2) {
                taskElement.classList.add('small-font');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `day${day}task${index + 1}`;

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.innerText = task;

            // Add event listener to save the state when checkbox is clicked
            checkbox.addEventListener('change', (event) => {
                const isChecked = event.target.checked;
                saveState(event.target.id, isChecked);

                // Update the progress bar
                const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked').length;
                updateProgressBar(completedTasks);
            });

            taskElement.appendChild(checkbox);
            taskElement.appendChild(label);
            dayContainer.appendChild(taskElement);
        });

        toDoListContainer.appendChild(dayContainer);
    }

    // Load the saved state from localStorage
    loadState();

    // Add event listener to reset all button
    resetButton.addEventListener('click', resetAll);
});
