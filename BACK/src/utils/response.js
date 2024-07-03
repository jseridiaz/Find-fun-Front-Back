const response200 = (giveObject, message, res) =>
  res.status(200).json({ result: giveObject, message })
const response201 = (giveObject, message, res) =>
  res.status(201).json({ result: giveObject, message })
const response400 = (message, res) =>
  res.status(400).json({ message: '"' + message + '"' })
const response401 = (message, res) =>
  res.status(401).json({ message: '"' + message + '"' })

module.exports = { response200, response201, response400, response401 }
