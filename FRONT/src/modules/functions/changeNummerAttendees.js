export const changeNummerAttendees = (node, signal) => {
  const newNummer = parseInt(node.textContent.split(':').at(1))
  let toSum = signal ? 1 : -1
  node.innerHTML = node.innerHTML.slice(0, -1) + (newNummer + toSum)
}
