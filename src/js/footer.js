import createElement from './createElement'

export default function footer(footerBox) {
  const footer = createElement(footerBox, 'div', 'footer')

  const rssLogo = createElement(footer, 'a', 'footer__rssLogo')
  rssLogo.href = 'https://rs.school/js/'

  const year = createElement(footer, 'div', 'footer__year', '2022')

  const ghLogo = createElement(footer, 'a', 'footer__ghLogo')
  ghLogo.href = 'https://github.com/olegpl1993'

  return footer;
}
