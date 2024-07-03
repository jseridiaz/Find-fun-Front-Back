export const activeCarousel = async (track) => {
  let arrayPictures
  if (Array.from(track.children).length > 0) {
    arrayPictures = Array.from(track.children)
    const currentSlide =
      arrayPictures[
        arrayPictures.findIndex((el) => el.classList.contains('current-slide'))
      ]

    const sizeMove = currentSlide.getBoundingClientRect().width

    placeImg(arrayPictures, sizeMove)
  } else {
    return
  }
}

const placeImg = (array, sizeMove) => {
  array.forEach((e, i) => {
    e.style.left = `${sizeMove * i}px`
  })
}
const movePerClick = (track, currentSlide, targetSlide) => {
  track.style.transform = `translate(-${targetSlide.style.left})`
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}
export const clickBtn = (track, slide, leftArrow, rightArrow) => {
  const newArray = Array.from(track.childNodes)
  const currentSlide =
    newArray[newArray.findIndex((el) => el.classList.contains('current-slide'))]
  const nextSlide = currentSlide[slide]
  movePerClick(track, currentSlide, nextSlide)
  conditionTohide(newArray, leftArrow, rightArrow)
}
export const conditionTohide = (array, leftArrow, rightArrow) => {
  const indexOfArray = array.findIndex((sld) =>
    sld.classList.contains('current-slide')
  )

  if (indexOfArray > 0) {
    leftArrow.style.display = 'block'
  } else {
    leftArrow.style.display = 'none'
  }
  if (indexOfArray === array.length - 1) {
    rightArrow.style.display = 'none'
  } else {
    rightArrow.style.display = 'block'
  }
}
