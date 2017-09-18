/**
 * Node DOM Reifier
 *
 * @class      Node (name)
 * @param      {<type>}  n       dom object definition
 * @return     {<type>}  { description_of_the_return_value }
 */
EvidenceFinder.Core.Node = function Node(n) {
  var tagString = n.node.el.split(".");
  var classList = n.node.classList ? n.node.classList : [];
  var tagName = tagString[0];
  var el = document.createElement(tagName);

  // classes
  tagString.forEach(function(str){
    return el.classList.add(str);
  });
  if (n.type) classList.push(n.type); // automatically add ark type
  classList.forEach(function(str){
    return el.classList.add(str);
  });

  // content
  el.innerHTML = n.node.innerHTML || "";

  // events
  el.addEventListener("click", n.node.onclick || null);

  // dataset
  for (d in n.node.dataset) {
    el.dataset[d] = n.node.dataset[d];
  }

  // attrs
  for (d in n.node.attrs) {
    el.setAttribute(d, n.node.attrs[d]);
  }

  // children
  if (n.node.children != void 0) {
    n.node.children.forEach(function(child){
      el.appendChild(new ARK.Node(child))
    });
  }
  return el;
};
