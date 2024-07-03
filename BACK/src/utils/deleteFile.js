const cloudinary = require('cloudinary').v2

const deleteFile = (imgUrl) => {
  const allParts = imgUrl.split('/')
  console.log(allParts)
  const folder = allParts.at(-2)
  console.log(folder)
  const nameFile = allParts.at(-1).split('.')[0]
  console.log(nameFile)

  const public_id = `${folder}/${nameFile}`
  console.log(public_id)

  cloudinary.uploader.destroy(public_id, () =>
    console.log('imagen eliminada de la nube')
  )
}
module.exports = { deleteFile }
