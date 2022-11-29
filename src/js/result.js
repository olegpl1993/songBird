import createElement from './createElement'
import state from './state'

export default function result(contentBox) {
  const result = createElement(contentBox, 'div', 'result')
  const text = createElement(result, 'div', 'result__text', `Your score: ${state.score}`)

  return result
}
