window.addEventListener('DOMContentLoaded', () => {
  // handle mobile hamburger menu
  const hamburgerIcon = document.getElementById('hamburger')
  const mobileMenu = document.querySelector('.mobile-menu')

  if (!hamburgerIcon || !mobileMenu) {
    console.log('missing mobile menu')
  }

  hamburgerIcon.addEventListener('click', () => {
    /active/i.test(mobileMenu.className)
      ? mobileMenu.className = 'mobile-menu hidden'
      : mobileMenu.className = 'mobile-menu active'
  })


  const mobileMenuItems = [].slice.call(document.querySelectorAll('aside.mobile-menu li'))

  mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.className = 'mobile-menu hidden'
    })
  })

  // handle contact us form
  const contactUsForm = document.getElementById('contact-us')

  contactUsForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const firstName = getFormInputValue('firstname')
    const lastName = getFormInputValue('lastname')
    const email = getFormInputValue('sender_email')
    const message = getFormInputValue('message')

    const isValidEmail = checkValidEmail(email)

    if (!isValidEmail) showErrorMessage('sender_email_error', 'please enter a valid email address')

    if (firstName && lastName && email && isValidEmail && message) {
      clearErrorMessages()

      const data = {
        firstName, lastName, email, message
      }

      const fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      }

      const url = window.location.origin + '/.netlify/functions/send'
      fetch(url, fetchData)
        .then(() => {
          showSuccessMessage('contact-us-success')
          resetForm()
          mixpanel.track("contact us")
        })
        .catch(e => console.log(e))
    }

    // emit analytic events
  })

  // handle email subscribe form
  const emailSubscribeForm = document.querySelector('#subscribe form')

  emailSubscribeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = getFormInputValue('email')
    const isValidEmail = checkValidEmail(email)

    if (!isValidEmail) showErrorMessage('email_error', 'please enter a valid email address')

    if (isValidEmail) {
      const data = { email }

      const fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      }

      const url = window.location.origin + '/.netlify/functions/subscribe'

      fetch(url, fetchData)
        .then(() => {
          showSuccessMessage('subscribe-success')
          resetForm()

          mixpanel.track("Sign Up")

        })
        .catch(e => console.log(e))
    }
  })


})

// form utils

function resetForm() {
  const inputs = ['firstname', 'lastname', 'sender_email', 'message', 'email']

  inputs.forEach(input => {
    const el = document.getElementById(input)

    if (el) el.value = ''
  })

}

function showSuccessMessage(elementId) {
  const successMessage = document.getElementById(elementId)

  successMessage.className = 'success show'
}

function getFormInputValue(inputName) {
  const input = document.getElementById(inputName)
  if (input && input.value.length) return input.value

  showErrorMessage(inputName)
}

function showErrorMessage(inputName, message) {
  const node = document.getElementById(`${inputName}_error`)
  node.className = 'error show'

  if (message) {
    node.innerText = message
  }
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error.show')

  if (errorMessages.length) {
    for (let i = 0; i < errorMessages.length; i++) {
      const errorMessage = errorMessages[i]
      errorMessage.className = 'error'
    }
  }
}

function checkValidEmail(email) {
  return /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(email)
}

// tracking website links
mixpanel.track_links("#buy a", "click buy link", { properties: "clicked on booknook.com" })

mixpanel.track_links("#home .buy-btn", "click green buy now")

mixpanel.track_links("#authors", "click on authors link", {
  "referrer": document.referrer
})
