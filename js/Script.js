// Read more and read less section

const parentContainer = document.querySelector('.about-content');

parentContainer.addEventListener('click', event => {

    const current = event.target;

    const isBtn = current.className.includes('btn');

    if (!isBtn) return;

    const currentText = event.target.parentNode.querySelector('.read-more-text');

    currentText.classList.toggle('read-more-text--show');

    current.textContent = current.textContent.includes('Read More') ? "Read Less..." : "Read More...";

})

// toggle icon navbar

let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuicon.onclick = () => {
    menuicon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};




// Scroll section active link

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    //sticky navbar

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.screenY > 100);

    //Remove toggle icon and navbar when click navbar link (scroll)
    menuicon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};


//contact form validation 

document.querySelector("form").addEventListener("submit", function (event) {
    // Get form elements
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var subject = document.getElementById("Esubject").value;
    var message = document.getElementById("message").value;

    // Regular expressions for validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^[0-9]{10}$/;

    // Validate fields
    if (name.trim() === "") {
        alert("Full Name is required.");
        event.preventDefault();
    } else if (!emailPattern.test(email)) {
        alert("Please enter a valid Email Address.");
        event.preventDefault();
    } else if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Mobile Number.");
        event.preventDefault();
    } else if (subject.trim() === "") {
        alert("Email Subject is required.");
        event.preventDefault();
    } else if (message.trim() === "") {
        alert("Message is required.");
        event.preventDefault();
    }
});

//Google sheet to store data 

// Email will always be sent to your default email
const DEFAULT_EMAIL = "hitenc239@gmail.com";

function doPost(e) {
  try {
    const data = e.parameter;

    MailApp.sendEmail({
      to: DEFAULT_EMAIL,
      subject: "New Website Form Submission",
      htmlBody: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Message:</b> ${data.message}</p>
        <hr>
        <p>📅 Time: ${new Date()}</p>
      `
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}



//Scroll reveal

ScrollReveal({
     reset: true ,
     distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .skill-heading, .project-heading, .contact-heading',{ origin: 'top' });
ScrollReveal().reveal('.home-img, .project-box, .skill-box',{ origin: 'bottom' });
ScrollReveal().reveal('.about-img, .contact-img, .title', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

//typed js

const typed =  new Typed('.multiple-text',{
    strings: ['PHP Developer','Backend Developer'],
    typeSpeed: 100,
    backSpeed:  100,
    backDelay: 1000,
    loop: true
});
