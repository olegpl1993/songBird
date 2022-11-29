import createElement from './createElement'
import play from '../images/createPlayer/play.svg'
import pause from '../images/createPlayer/pause.svg'
import volumeON from '../images/createPlayer/volumeON.svg'
import volumeOFF from '../images/createPlayer/volumeOFF.svg'

// создает узел плеер (родительский узел и ссылку на аудио)
export default function createPlayer(parent, audioSrc) {
  const audio = new Audio(audioSrc)
  const player = createElement(parent, 'div', 'player')

  //кнопка плей/пауза ----------------
  const playPause = createElement(player, 'img', 'player__playPause')
  playPause.src = play // картинка старт
  playPause.addEventListener('click', () => {
    if (playPause.src === play) {
      audio.play() //начинает проигрывание
      playPause.src = pause // меняет картинку на паузу
    } else {
      audio.pause() //останавливает проигрывание
      playPause.src = play // меняет картинку на плей
    }
  })
  audio.addEventListener('ended', () => { playPause.src = play }) // меняет картинку кнопки когда трек закончился
  // ----------------------------------

  const timeBox = createElement(player, 'div', 'player__timeBox')

  //прогресс бар
  const progressBar = createElement(timeBox, 'input', 'player__progressBar')
  progressBar.type = 'range'
  progressBar.value = 0
  audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime / audio.duration * 100 // заполняет полоску прогрем бара
    curTime.textContent = `${getTimeCodeFromNum(audio.currentTime)}` // меняет текущее время воспроизведение
    durTime.textContent = `${getTimeCodeFromNum(audio.duration)}` // общая продолжительность трека
  })
  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value / 100 * audio.duration // меняет текущее время трека
  })

  //форматирует секунды в часы/минуты/секунды (128 => 2:08)
  function getTimeCodeFromNum(num) {
    if (isNaN(num)) return '0:00'
    let seconds = parseInt(num)
    let minutes = parseInt(seconds / 60)
    seconds -= minutes * 60
    const hours = parseInt(minutes / 60)
    minutes -= hours * 60
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`
  }
  //теекущее время трека и общее время
  const timeRow = createElement(timeBox, 'div', 'player__timeRow')
  const curTime = createElement(timeRow, 'div', 'player__time', `${getTimeCodeFromNum(audio.currentTime)}`)
  const durTime = createElement(timeRow, 'div', 'player__time', `${getTimeCodeFromNum(audio.duration)}`)
  //----------------------------------------

  const volumeRow = createElement(timeBox, 'div', 'player__volumeRow')
  //кнопка звука --------------
  const volumeImg = createElement(volumeRow, 'img', 'player__volumeImg')
  volumeImg.src = volumeON; // картинка звук включен
  volumeImg.addEventListener('click', () => {
    if (volumeImg.src === volumeON) {
      audio.volume = 0
      volumeImg.src = volumeOFF
      volumeBar.value = audio.volume * 100
    } else {
      audio.volume = 1
      volumeImg.src = volumeON
      volumeBar.value = audio.volume * 100
    }
  })
  //ползунок громкости
  const volumeBar = createElement(volumeRow, 'input', 'player__volumeBar')
  volumeBar.type = 'range'
  volumeBar.value = audio.volume * 100
  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100 // меняет текущее значение громкости
    if (audio.volume === 0) volumeImg.src = volumeOFF
    else volumeImg.src = volumeON
  })

  return player //возвращем узел плеера
}
// ---------------------------------------------------------------------