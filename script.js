function findIdentitcalNode(nodeName) {
  let node = document.getElementById(nodeName);
  var nodePosition = {
    rootId: '',
    position: []
  };
  let matchedNodenames = [];
  if (node) {
    findRootNodeAndPosition(node, nodePosition);
  }
  let roots = [...document.querySelectorAll("div[id*='root']")].filter(node => node.id != nodePosition.rootId);
  for (let rootNode of roots) {
    matchedNodenames.push(matchNodeIds(rootNode, nodePosition.position));
  }
  console.log(matchedNodenames.filter(char => char != null));
}

function findRootNodeAndPosition(node, nodePosition) {
  let position = [...node.parentNode.children].findIndex(childNode => childNode === node);
  nodePosition.position != null && Array.isArray(nodePosition.position) ? nodePosition.position.push(position) : [];
  if (node.parentNode.id.includes('root')) {
    nodePosition.rootId = node.parentNode.id;
  } else {
    return findRootNodeAndPosition(node.parentNode, nodePosition);
  }
  nodePosition.position.reverse();
  return nodePosition;
}

function matchNodeIds(rootNode, position) {
  let node = rootNode;
  for (let step of position) {
    node = node.children[step];
    if (!node) {
      return null;
    }
  }
  return node.id;
}
