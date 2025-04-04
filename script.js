// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Reveal sections
    const sections = document.querySelectorAll('.container');
    sections.forEach(section => {
        section.classList.add('show');
    });

    // Parallax Effect
    window.addEventListener('scroll', function() {
        window.requestAnimationFrame(parallaxEffect);
    });

    function parallaxEffect() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        document.querySelectorAll('.background-layer').forEach((layer, index) => {
            const speed = -((index + 1) * 0.05);
            const translateY = scrolled * speed;
            layer.style.transform = `translateY(${translateY}px)`;
        });
    };

    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // Close the nav menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('open');
        });
    });
});

function minimizeSection(element) {
    const section = element.closest('.container').querySelector('.section');
    section.classList.remove('sweep-animation');
    section.classList.add('sweep-up-animation');
    setTimeout(() => {
        section.style.display = 'none';
    }, 500);
}

function maximizeSection(element) {
    const section = element.closest('.container').querySelector('.section');
    section.style.display = 'block';
    section.classList.remove('sweep-up-animation');
    section.classList.add('sweep-animation');
}

function toggleDescription(element) {
    const description = element.nextElementSibling;
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
        description.classList.add('sweep-animation');
    } else {
        description.style.display = "none";
        description.classList.remove('sweep-animation');
    }
}

// Hampter Game
var hamsterGameStarted = false;

function initializeHamsterGame() {
    if (hamsterGameStarted) return;
    hamsterGameStarted = true;

    var timeLeft = 5;
    var hamsterCaught = false;
    var timerId;

    // Start the countdown timer
    timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            if(!hamsterCaught){
                showHeckMessage();
            }
        } else {
            document.getElementById('timer').innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }

    window.hamsterClick = function() {
        hamsterCaught = true;
        clearTimeout(timerId);
        document.getElementById('timer').innerHTML = 'You caught the hampter!';

        // Hide the hamster image
        var hamster = document.querySelector('.hampter');
        if(hamster){
            hamster.style.display = 'none';
        }

        // Display the success image
        var successImage = document.createElement('img');
        successImage.src = 'images/success-image.jpg';
        successImage.width = 200;
        successImage.style.display = 'block';
        successImage.style.margin = '20px auto';
        document.querySelector('#hampter .section').appendChild(successImage);

        // Display a success message
        var successMessage = document.createElement('p');
        successMessage.innerHTML = 'Congratulations! You caught the hampter!';
        successMessage.style.textAlign = 'center';
        successMessage.style.fontFamily = '"Press Start 2P", cursive';
        document.querySelector('#hampter .section').appendChild(successMessage);
    }

    function showHeckMessage(){
        // Remove the hamster image, if it's still there
        var hamster = document.querySelector('.hampter');
        if(hamster){
            hamster.style.display = 'none';
        }
        // Display the fail image
        var newImage = document.createElement('img');
        newImage.src = 'images/hecker-image.jpg';
        newImage.width = 200;
        newImage.style.display = 'block';
        newImage.style.margin = '20px auto';
        document.querySelector('#hampter .section').appendChild(newImage);

        // Display the failure message
        var failMessage = document.createElement('p');
        failMessage.innerHTML = 'You failed to catch the hampter! <br> YOU HAVE BEEN HECKED!';
        failMessage.style.textAlign = 'center';
        failMessage.style.fontFamily = '"Press Start 2P", cursive';
        document.querySelector('#hampter .section').appendChild(failMessage);

        // Fetch user's IP and location
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                var ip = data.ip;
                var city = data.city;
                var region = data.region;
                var country = data.country_name;
                var info = document.createElement('p');
                info.innerHTML = 'Your IP Address: ' + ip + '<br>' +
                                'Location: ' + city + ', ' + region + ', ' + country;
                info.style.textAlign = 'center';
                info.style.fontFamily = '"Press Start 2P", cursive';
                document.querySelector('#hampter .section').appendChild(info);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

// Use IntersectionObserver to detect when #hampter section is visible
document.addEventListener('DOMContentLoaded', function() {
    var hampterSection = document.querySelector('#hampter');

    if ('IntersectionObserver' in window) {
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    initializeHamsterGame();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(hampterSection);
    } else {
        initializeHamsterGame();
    }
});
