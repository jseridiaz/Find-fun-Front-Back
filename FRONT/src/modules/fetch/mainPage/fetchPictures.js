export const fetchPictures = async (id, initialWidth, lastWidth, size) => {
  let imagen = await fetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_API_UNSPLASH
    }`
  )
    .then((res) => res.json())
    .then((res) =>
      res.urls[size].replace(`w=${initialWidth}`, `w=${lastWidth}`)
    )

  return imagen
}
