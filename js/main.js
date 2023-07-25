document.addEventListener('DOMContentLoaded', (event) => {
    // logic for slide show navigation
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    nextBtn.addEventListener('click', () => {
        // code to go to next slide
    });

    prevBtn.addEventListener('click', () => {
        // code to go to previous slide
    });

    // logic for tab navigation
    const tabs = document.getElementsByClassName('tab');
    const contents = document.getElementsByClassName('content');
    
    for(let i=0; i<tabs.length; i++) {
        tabs[i].addEventListener('click', () => {
            // hide all content sections
            for(let j=0; j<contents.length; j++) {
                contents[j].style.display = 'none';
            }

            // show the clicked tab's content section
            contents[i].style.display = 'block';
        });
    }
});
