import './styles/index.scss'
import createElement from './js/createElement'
import header from './js/header'
import footer from './js/footer'
import startPage from './js/startPage'
import startGame from './js/game'
import result from './js/result'
import gallery from './js/gallery'

const wrapper = createElement(document.body, 'div', 'wrapper')
const headerBox = createElement(wrapper, 'div', 'headerBox')
const contentBox = createElement(wrapper, 'div', 'contentBox')
const footerBox = createElement(wrapper, 'div', 'footerBox')

export function renderPage(page) { // меняет страницу контента
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild) // очищаем узел contentBox
  if (page === 'startPage') startPage(contentBox) // отрисовка выбраной страницы
  if (page === 'game') startGame(contentBox)
  if (page === 'gallery') gallery(contentBox)
  if (page === 'result') result(contentBox)
}

window.addEventListener('load', () => {
  header(headerBox)
  footer(footerBox)
  renderPage('startPage')
}) // при первой загрузке