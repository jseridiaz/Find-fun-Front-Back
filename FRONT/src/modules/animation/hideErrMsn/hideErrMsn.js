export const hideErrMsn = (msnErr, duration) => {
  setTimeout(() => {
    msnErr.classList.add('no-visibility')
  }, duration)
}
