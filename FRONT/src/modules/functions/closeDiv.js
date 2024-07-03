export const closeDiv = (selector, deleteDiv) => {
  selector.addEventListener('click', () => deleteDiv.remove())
}
