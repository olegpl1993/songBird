import createElement from './createElement'

export default function gallery(contentBox) {
  const gallery = createElement(contentBox, 'div', 'gallery')
  const text = createElement(gallery, 'div', 'gallery__text', 'Gallery page')

  return gallery
}
