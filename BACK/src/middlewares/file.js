const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'proyect-10',
    formats: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif']
  }
})

const upload = multer({ storage })
module.exports = upload
