export const deployMenuMobile = (nav, ul) => {
  nav.classList.toggle('deploy')

  const allLi = ul.childNodes

  ul.classList.toggle('deploy')
  allLi.forEach((e) => {
    e.classList.toggle('deploy')
  })
}
