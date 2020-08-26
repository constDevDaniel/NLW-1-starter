function populateUfs () {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => { return res.json() })
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
populateUfs()

function getCities (event) {
  const citySelect = document.querySelector('[name=city]')
  const stateInput = document.querySelector('[name=state]')

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value='${city.nome}'>  ${city.nome} </option>`
      }
      citySelect.disabled = false
    })
}

// quando mudar o estado ele executa a função getCities, na qual vai mostrar todas as
// cidades daquele estado e tambem habilitando o input de cidade
document.querySelector('select[name=uf]').addEventListener('change', getCities)

//= ==ITENS DE COLETA===

// pegar todos os li's
const itemsCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsCollect) {
  item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items')
let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target 

  // add or remove class with JS
  // toggle adiciona ou remove a classe
  itemLi.classList.toggle('selected')

  const itemId = event.target.dataset.id // quando clica em um dos itens de coleta o id dele vem pra ca

  // verificar se existem itens selecionado, se sim
  // pegar os itens seleionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item === itemId // isso sera true ou false
    return itemFound
  })

  // se ja estiver selecionado, tirar da seleção
  if (alreadySelected != -1) {
    // tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    // se não tiver selecionado
    // adicionar a seleção
    selectedItems.push(itemId)
  }

  // atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}