window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded')

  const hamburgerIcon = document.getElementById('hamburger')
  const mobileMenu = document.querySelector('.mobile-menu')

  if (!hamburgerIcon || !mobileMenu) {
    console.log('missing mobile menu')
    return
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

      const url = 'https://commerciallawinghana.netlify.app/.netlify/functions/send'
      fetch(url, fetchData)
        .then((response) => {
          if (response.status === '200') {
            showSuccessMessage()
            resetForm()
          }
        })
        .catch(e => console.log(e))
    }
  })
})

function resetForm() {
  const inputs = ['firstname', 'lastname', 'sender_email', 'message']

  inputs.forEach(input => {
    const el = document.getElementById(input)

    if (el) el.value = ''
  })

}

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message')

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
