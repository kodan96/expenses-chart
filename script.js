$(document).ready(() => {
    const days = document.querySelectorAll('.day');
    const display = document.querySelectorAll('.data-display');

    const items = document.querySelectorAll('.item');
    
    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Process data
            data.forEach(dayData => {
                // Find the corresponding display element based on the day
                const dayElement = document.querySelector(`.${dayData.day}`);
                if (dayElement) {
                    // Set the data display content
                    const displayElement = dayElement.querySelector('.data-display');
                    displayElement.innerHTML = `$<br> ${dayData.amount.toFixed(2)}`;
                } else {
                    console.error(`Day element for ${dayData.day} not found.`);
                }
            });
            // After fetching and displaying data, set the height of the day elements
            setHeight();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to toggle display of data on hover
    const toggleDisplay = (index) => {
        $(display[index]).toggle(); // Toggle display of corresponding data
    }

    const displayData = () => {
        days.forEach((day, index) => {
            $(day).on('mouseover', () => {
                toggleDisplay(index);
            }).on('mouseout', () => {
                toggleDisplay(index);
            });
        });
    }

    const setHeight = () => {
        days.forEach((day, index) => {
            // Find the corresponding display element
            const displayElement = display[index];

            // Get the content of the display element and convert it to a number
            const amount = $(displayElement).text().split(' ')[1];
            

            // Multiply the amount by 2 to determine the height
            const height = amount * 2;

            // Set the height of the day element
            $(day).css('height', `${height}px`);
            
        });
    }

    displayData();
    
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 1}s`; // Stagger the animation delay for each item
    });// Call the function to attach event listeners
});