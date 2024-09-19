let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

const signNowButton = document.querySelector('#sign-now-button');

const addSignature = (person, event) => {
  event.preventDefault();
  const signatures = document.querySelector('.signatures');
  const newSigns = document.createElement("p");
  newSigns.innerHTML = ("🖊️ " + person.fname + " from " + person.hometown + " supports this.");
  signatures.appendChild(newSigns);

}

// TODO: Remove the click event listener that calls addSignature()

// TODO: Complete validation form

const validateForm = (event) => {

  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    fname: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (person.fname.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else if (person.hometown.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else if (person.email.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }


  if (containsErrors == false) {
    addSignature(person, event);
    toggleModal(person);

    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }


  signNowButton.addEventListener('click', (event) => {
    validateForm(event);
  });

  let animation = {
    revealDistance: 150,
    initialOpacity: 1,
    transitionDelay: '0',
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
  }; // CHECKED!!!!

  const revealableContainers = document.querySelectorAll('.revealable');

  const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
      let windowHeight = window.innerHeight;
      let topOfRevealableContainers = revealableContainers[i].getBoundingClientRect().top;
      if (topOfRevealableContainers < windowHeight - animation.revealDistance) {
        revealableContainers[i].classList.add('active');
      } else {
        revealableContainers.classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', reveal);



  const toggleModal = (person) => {
    let modal = document.querySelector('#thanks-modal');
    let modalContent = document.querySelector('#thanks-modal-content');
    let scaleFactor = 1;
    let modalImage = document.querySelector(".modal-image");
    modal.style.display = "flex";
    modalContent.innerHTML = ("Thank you " + person.fname + " for your support!");
    setTimeout(() => {
      modal.style.display = "none";
    }, 4000)
    let intervalId = setInterval(scaleImage(), 500);




    const scaleImage = () => {
      scaleFactor = scaleFactor === 1 ? 0.8 : 1;
      modalImage.style.transform = `scale(${scaleFactor})`;
    }

  }


}
