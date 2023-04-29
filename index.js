function copy(element, num) {
  for (let i = 0; i < num; i++) {
    const newElem = element.cloneNode(true)
    element.after(newElem)
  }
}

function removeElem(element, num) {
  for (let i = 0; i < num; i++) {
    if (element.nextElementSibling == null) return;
    element.nextElementSibling.remove();
  }
}

function removeChildren(element, num) {
  for (let i = 0; i < num; i++) {
    if (element.firstElementChild == null) return;
    element.firstElementChild.remove();
  }
}

function switchElem(element, num, index) {
  const parent = element.parentElement;
  const position = (num + index) % parent.children.length;

  const buf1 = parent.children[position].cloneNode(true)
  const buf2 = element.cloneNode(true)

  parent.children[position].replaceWith(buf2);
  element.replaceWith(buf1);
}

const functions = {
  'copy': copy,
  'remove': removeElem,
  'removeChildren': removeChildren,
  'switch': switchElem,
}


function solution(element) {
  const childs = element.children;
  if (childs == null) return

  const arrsFunc = ['copy', 'remove', 'removeChildren', 'switch'];

  for (func in arrsFunc) {
    for (let i = 0; i < childs.length; i++) {
      let item = childs[i];
      const xMake = item.getAttribute('x-make');
      if (xMake == null) continue;

      const data = xMake.split(':')
      if (arrsFunc[func] === data[0]) {
        item.removeAttribute('x-make');
        functions[data[0]](item, Number(data[1]), i);
        i = -1;
      }
    }
  }

  for (item of childs) {
    solution(item);
  }
}

const entrys = document.querySelectorAll('entry');
for (entry of entrys) {
  solution(entry);
}
