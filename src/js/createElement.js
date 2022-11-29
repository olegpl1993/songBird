export default function createElement(parent, tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  parent.append(element);
  return element;
}
