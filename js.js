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
})
