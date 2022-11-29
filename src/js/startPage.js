import createElement from './createElement'
import videoBirds from '../video/videoBirds.mp4'
import { renderPage } from '../index'


export default function startPage(contentBox) {
  const startPage = createElement(contentBox, 'div', 'startPage')

  const videoBox = createElement(startPage, 'div', 'videoBox')
  const video = document.createElement("video")
  video.className = 'video'
  video.src = videoBirds
  video.muted = 'true'
  video.play()
  videoBox.appendChild(video)

  const textBox = createElement(startPage, 'div', 'textBox')
  const playBtn = createElement(textBox, 'div', 'playBtn', 'Start New Game')
  playBtn.addEventListener('click', () => { renderPage('game') })

  return startPage
}
