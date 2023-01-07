import createElement from './createElement'
import randomBird from '../images/birdrnd.jpg'
import sound from '../sounds/sound.mp3'
import birdsData from './birds'
import createPlayer from './createPlayer'
import state from './state'
import { renderPage } from '../index'
import pause from '../images/createPlayer/pause.svg'

export default function startGame(contentBox) {
  clearState() // сбрасывает параметры игры
  game(contentBox) // создает игровые блоки текущего уровня
}

function clearState() { // сбрасывает параметры игры
  state.level = 0
  state.numQuest = Math.floor(Math.random() * 6)
  state.score = 0
  state.questScore = 5
}

function game(contentBox) { // создает игровые блоки текущего уровня

  console.log('correct answer', state.numQuest)
  const game = createElement(contentBox, 'div', 'game')
  const container = createElement(game, 'div', 'container')
  const levelRow = createElement(container, 'div', 'game__levelRow') //полоска уроня и очков
  const questBox = createElement(container, 'div', 'game__questBox') //блок с вопросом
  const varRow = createElement(container, 'div', 'game__varRow')
  const ansverBox = createElement(varRow, 'div', 'game__ansverBox') //блок с вариантами ответа
  const aboutBirdBox = createElement(varRow, 'div', 'game__aboutBirdBox') //блок с птицей из текущего ответа

  //кнопка следующий уровень
  const nextLevelBtn = createElement(container, 'button', 'game__nextLevelBtn', 'Next Level')
  nextLevelBtn.addEventListener('click', () => { nextLevel(contentBox) }) // переход на следующий уровень
  nextLevelBtn.disabled = true // кнопка не активна

  renderLevelRow(levelRow) // заполняет полоску уровня и очков
  renderQuest(questBox, false) //заполняет блок вопроса
  renderAnsver(ansverBox, questBox, aboutBirdBox, levelRow, nextLevelBtn) //заполняет блок варинтов ответа
}

function nextLevel(contentBox) { // переход на следующий уровень
  document.querySelectorAll('.player__playPause').forEach(elem => { if (elem.src === pause) elem.dispatchEvent(new Event("click")) });
  state.level += 1 // переход на следующий уровень
  state.numQuest = Math.floor(Math.random() * 6) // выбор случайного вопроса
  state.questScore = 5 // сбрасывает количество очков за текущий вопрос
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild) // очищаем узел от старой информации
  if (state.level < 6) game(contentBox) // создает игровые блоки текущего уровня
  else {
    renderPage('result') // рендер страницы с результатом
  }
}

function renderLevelRow(levelRow) { // заполняет полоску уровня и очков
  while (levelRow.firstChild) levelRow.removeChild(levelRow.firstChild) // очищаем узел от старой информации
  const arrLevels = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы']
  for (let i = 0; i <= 5; i++) {
    const level = createElement(levelRow, 'div', 'game__level', arrLevels[i])
    if (i === state.level) level.classList.add('_activ') //добавляет класс текущему уровню
  }
  const scoreText = createElement(levelRow, 'div', 'game__level', `Score: ${state.score}`) // текущее количество очков
}

function renderQuest(questBox, checkWin) { //заполняет блок вопроса
  document.querySelectorAll('.player__playPause').forEach(elem => { if (elem.src === pause) elem.dispatchEvent(new Event("click")) });
  if (questPlayer) questPlayer.pause()
  while (questBox.firstChild) questBox.removeChild(questBox.firstChild) // очищаем узел от старой информации
  const questBirdImg = createElement(questBox, 'img', 'game__questBirdImg')
  const questPlayerBox = createElement(questBox, 'div', 'game__questPlayerBox')
  const questName = createElement(questPlayerBox, 'div', 'game__questName')
  const questPlayer = createPlayer(questPlayerBox, birdsData[state.level][state.numQuest].audio /*sound*/) // плеер (родительский узел и ссылку на аудио)
  if (checkWin) { // сработает если дан правильный ответ
    questBirdImg.src = birdsData[state.level][state.numQuest].image
    questName.textContent = birdsData[state.level][state.numQuest].name
  } else {
    questBirdImg.src = randomBird // картинка неизвестной птици
    questName.textContent = '******'
  }
}

function renderAnsver(ansverBox, questBox, aboutBirdBox, levelRow, nextLevelBtn) { //заполняет блок варинтов ответа
  for (let i = 0; i <= 5; i++) {
    const ansver = createElement(ansverBox, 'button', `game__ansver`, `${birdsData[state.level][i].name}`)
    ansver.addEventListener('click', () => {
      renderAboutBird(aboutBirdBox, i) //заполняет блок о выбранной птице
      checkWins(ansverBox, questBox, nextLevelBtn, levelRow, ansver, i) // проверка условия победы
    })
  }
}

function checkWins(ansverBox, questBox, nextLevelBtn, levelRow, ansver, numOfBird) { // проверка условия победы
  if (numOfBird === state.numQuest) {
    ansver.classList.add('_correct') //меняет цвет ячейки на зеленый
    for (let child of ansverBox.children) child.disabled = true // отключает все кнопки
    state.score += state.questScore // прибавляет количетво очков за текущий вопрос
    renderLevelRow(levelRow) // обновляет полосу уровня и количество очков
    renderQuest(questBox, true) //обновляет блок вопроса
    nextLevelBtn.classList.add('_activ') // меняет цвет кнопки Next Level
    nextLevelBtn.disabled = false // делает кнопку Next Level активной
  } else {
    ansver.classList.add('_uncorrect') //меняет цвет ячейки на красный
    ansver.disabled = true // отключает нажатую кнопку
    state.questScore -= 1 // уменьшает получаемые очки за текущий вопрос
  }
}

function renderAboutBird(aboutBirdBox, numOfBird) { //заполняет блок о выбранной птице
  document.querySelectorAll('.player__playPause').forEach(elem => { if (elem.src === pause) elem.dispatchEvent(new Event("click")) });
  while (aboutBirdBox.firstChild) aboutBirdBox.removeChild(aboutBirdBox.firstChild) // очищаем узел от старой информации
  const birdImg = createElement(aboutBirdBox, 'img', 'game__birdImg')
  birdImg.src = birdsData[state.level][numOfBird].image
  const nameOfBirds = createElement(aboutBirdBox, 'div', 'game__nameOfBirds', `${birdsData[state.level][numOfBird].name}`) //название птицы
  const descriptionOfBirds = createElement(aboutBirdBox, 'div', 'game__descriptionOfBirds', `${birdsData[state.level][numOfBird].description}`) //описание птицы
  const ansverPlayer = createPlayer(aboutBirdBox, birdsData[state.level][numOfBird].audio /*sound*/) // плеер (родительский узел и ссылку на аудио)
}

