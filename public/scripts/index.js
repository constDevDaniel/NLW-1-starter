const buttonSearch = document.querySelector('#page-home main a')
const modal = document.querySelector('#modal')
const close = document.querySelector('#modal .header a')

buttonSearch.addEventListener('click', () => {
  modal.classList.remove('hide')
})

close.addEventListener('click', () => {
  modal.classList.add('hide')
})

/* quando utiliza o querySelectorAll não da pra utilizar o addEventListener
pois o addEventListener so pode ser usado em 1 unico elemento
*/
