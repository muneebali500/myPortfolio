/* NAV BUTTON TO DISPLAY FOR SMALL SCREENS */
const navBtnOpen = document.getElementById(`nav-open`);
const navBtnClose = document.getElementById(`nav-close`);
const navBar = document.getElementById(`nav`);
const navLinks = document.querySelectorAll(`.nav__link`);

/* EVENT LISTENER DISPLAYS NAVBAR FOR SMALL SCREEN ON CLICK OF NAV OPEN BTN */
navBtnOpen.addEventListener(`click`, () => {
  navBar.style.left = `0`;
  navBtnOpen.style.display = `none`;
  navBtnClose.style.display = `block`;
});

/* EVENT LISTENER HIDES NAVBAR FOR SMALL SCREEN ON CLICK OF NAV CLOSE BTN */
navBtnClose.addEventListener(`click`, () => {
  navBar.style.left = `-5rem`;
  navBtnOpen.style.display = `block`;
  navBtnClose.style.display = `none`;
});

/* CREATING TEXT SHADOW FOR MY NAME */
const myName = document.getElementById(`name__wrapper`);
const myGreeting = document.getElementById(`myGreeting`);

let shadow = ``;
for (let i = 0; i < 20; i++) {
  shadow +=
    (shadow ? `,` : ``) + -i * 1 + "px " + i * 1 + "px 0 rgb(140, 120, 113)";
}

myName.style.textShadow = shadow;

/* FUNCTION THAT GENERATES DOTS AND DISPLAYS IN THE HEADER AREA */
const bubblesContainer = document.getElementById(`bubbles-container`);

function bubbles() {
  if (window.innerWidth < 650) {
    bubblesContainer.innerHTML = ``;
    return;
  }

  bubblesContainer.innerHTML = ``;
  for (let i = 0; i < 100; i++) {
    const bubble = document.createElement(`span`);

    bubble.style.left = Math.floor(Math.random() * window.innerWidth) + `px`;
    bubble.style.top = Math.floor(Math.random() * window.innerHeight) + `px`;

    const size = Math.random() * 10;
    bubble.style.animationDuration = 5 + size + `s`;
    bubble.style.animationDelay = +size + `s`;

    bubblesContainer.appendChild(bubble);
  }
}

window.addEventListener(`load`, bubbles);
window.addEventListener(`resize`, bubbles);

/* EVENT LISTENER THAT SHOWS/DISPLAYS THE PROJECTS MODAL CONTAINER */
const projectInfoBtn = document.querySelectorAll(`.project__info--btn`);

projectInfoBtn.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    const targetModal = e.target.parentElement.parentElement.nextElementSibling;
    targetModal.style.height = `100%`;
    document.body.style.overflow = `hidden`;

    setTimeout(() => {
      targetModal.style.overflowY = `auto`;
    }, 600);
  });
});

/* EVENT LISTNER THAT HIDES THE PROJECTS MODAL CONTAINER */
const modalCloseBtn = document.querySelectorAll(`.project__modal--closeBtn`);

modalCloseBtn.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    const targetModal = e.target.parentElement;
    targetModal.style.height = `0`;

    setTimeout(() => {
      document.body.style.overflow = `visible`;
      targetModal.style.overflowY = `hidden`;
    }, 600);
  });
});

/* EVENT LISTNER PERFORMS ANIMATIONS ON SCROLL */
const projectInfoEl = document.querySelector(`.project__info`);
const projectEl = document.getElementById(`project`);
const serviceImg = document.querySelectorAll(`.service__image`);
const skillEl = document.querySelectorAll(`.skill`);

window.addEventListener(`scroll`, () => {
  /* ANIMATION WHEN THE PROJECTS IS VISIBLE ON VIEWPORT */
  if (elementInViewport(projectEl)) {
    projectInfoEl.style.animation = `moveUp 4s ease-in .5s`;
  } else {
    projectInfoEl.style.animation = `none`;
  }

  /* ANIMATION WHEN SERVICE ELEMENTS ARE VISIBLE ON VIEWPORT */
  serviceImg.forEach((img) => {
    if (elementInViewport(img)) {
      img.style.animation = `coverRotate 2s cubic-bezier(0.8, 0.7, 0.7, 1.7) .2s`;
      img.style.animationFillMode = `forwards`;
    } else {
      img.style.animation = `none`;
    }
  });

  /* ANIMATION FOR SKILL ELEMENTS WHEN VISIBLE ON VIEWPORT */
  for (let i = 0; i < skillEl.length; i++) {
    if (elementInViewport(skillEl[i])) {
      skillEl[i].style.transform = `rotateY(-35deg) rotateX(5deg)`;
      skillEl[i].style.transition = `transform 0.3s ease-in-out ${i / 4}s`;
    } else {
      skillEl[i].style.transform = `rotateY(-35deg)`;
    }
  }
});

/* FUNCTION RETURNS TRUE WHEN THE ELEMENT IS VISIBLE ON VIEWPORT AND VICE VERSA */
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

/* DISPLAY CONTACT BUTTON WHEN MESSAGE SECTION IS ON VIEWPORT */
const contactBtn = document.getElementById(`contact__info-btn`);

window.addEventListener(`scroll`, () => {
  const offset = window.pageYOffset;

  if (offset > 2700) {
    contactBtn.style.visibility = `visible`;
  }
});

// ADDING HOVER CLASS ON NAVBAR AFTER 6 SECONDS OF WINDOW LOAD ENSURES THAT NAVBAR DISPLAY ON VIEWPORT WHEN HOVERED
setTimeout(() => {
  navBar.classList.add(`navHover`);
}, 5500);

// FUNCTIION USING EMAILJS (THIRD PARTY) SERVICE TO SEND MESSAGES OF USERS TO MY MAIL
const messageModal = document.getElementById(`message__modal`);
const messageEl = document.getElementById(`message-reply`);

window.onload = function () {
  emailjs.init("user_Xav0wv0XJGczEGr0wDnwm");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm("contact_service", "contact_form", this).then(
        function () {
          const message = `Thanks for your Interest. Normally, I reach to my clients within 24 working hours. Hopefully, we will talk soon. TAKE CARE 😇`;
          messageEl.textContent = message;
          messageModal.style.transform = `translate(-50%, -50%) scale(1)`;
        },
        function (error) {
          const message = `Something went wrong. Please check your internet connection and try
          again. 🤔😒`;
          messageEl.textContent = message;
          messageModal.style.transform = `translate(-50%, -50%) scale(1)`;
        }
      );

      this.user_name.value = ``;
      this.user_email.value = ``;
      this.message.value = ``;
    });
};

// FUNCTION TO CLOSE MESSAGE MODAL ELEMENT
const messageCloseBtn = document.getElementById(`message-close`);

messageCloseBtn.addEventListener(`click`, () => {
  messageModal.style.transform = `translate(-50%, -50%) scale(0)`;
  messageEl.textContent = ``;
});
