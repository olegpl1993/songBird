import createElement from './createElement'
import { renderPage } from '../index'


export default function header(headerBox) {
  const header = createElement(headerBox, 'div', 'header')
  const logoImg = createElement(header, 'div', 'header__logoImg')
  const menu = createElement(header, 'div', 'header__menu menu')
  const startPageBTN = createElement(menu, 'div', 'menu__btn', 'Start')
  const gameBTN = createElement(menu, 'div', 'menu__btn', 'Game')
  const galleryBTN = createElement(menu, 'div', 'menu__btn', 'Gallery')
  const birdImg = createElement(header, 'div', 'header__birdImg')

  startPageBTN.addEventListener('click', () => { renderPage('startPage') })
  gameBTN.addEventListener('click', () => { renderPage('game') })
  galleryBTN.addEventListener('click', () => { renderPage('gallery') })
  return header;
}
