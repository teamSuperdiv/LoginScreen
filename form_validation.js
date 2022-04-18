const formValidator = (function () {
  function validateForm(form) {
    form.addEventListener('submit', (e) => {
      if (form.checkValidity() && validatePasswords()) {
      } else {
        e.preventDefault()
        Array.from(document.querySelectorAll('input')).forEach((input) =>
          validateField(input)
        )
      }
    })
  }

  function validateField(field) {
    if (!field.checkValidity()) {
      if (field.validity.patternMismatch) {
        field.parentElement.querySelector('.error').textContent =
          "Password doesn/'/t meet requirements"
        field.parentElement.querySelector('.error').hidden = false
      } else {
      }
      field.classList.add('invalid')
      field.parentElement.querySelector('.error').hidden = false
    } else {
      field.classList.remove('invalid')
      field.parentElement.querySelector('.error').hidden = true
    }
  }

  function validatePasswords(pwOne, pwTwo) {
    if (pwOne.value !== pwTwo.value) {
      pwTwo.classList.add('invalid')
      pwTwo.parentElement.querySelector('.error').hidden = false
    }
    return pwOne.value === pwTwo.value
  }

  return { validateForm, validateField, validatePasswords }
})()

const form = document.querySelector('#form')
const inputs = Array.from(document.querySelectorAll('input'))
const password = document.querySelector('#pw')
const pwConfirm = document.querySelector('#pw-confirm')

inputs.forEach((input) => {
  input.addEventListener('focusout', () => {
    formValidator.validateField(input)
  })
})

formValidator.validateForm(form)
pwConfirm.addEventListener('focusout', () => {
  formValidator.validatePasswords(password, pwConfirm)
})
