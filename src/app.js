import { BinarySearchTreeNode, drawBinaryTree, VisualizationType, setTheme } from 'binary-tree-visualizer';
const resultBtn = document.getElementById("btn");
const nodesValues = document.getElementById("nodeData");
const result = document.querySelector(".result");
const message = document.getElementById("suggest");
const error = document.querySelector(".error");
const resetBtn = document.querySelector(".reset");
setTheme({
  textFont: "Poppins",
  radius: 31,
  fontSize: 18,
  
  strokeColor: "#2a832f",
  colorArray: [
    {
      borderColor: "#ffff",
      bgColor: "#2a833f",
    },
  ],
  leafNodeSpace: 80,
  lineHeight: 80,
});

resultBtn.addEventListener("click", inputToList);
resetBtn.addEventListener("click", () => {
  nodesValues.value = "";
  message.innerText = "";
  result.style.display = "none";
  resetBtn.style.display = "none";
});
nodesValues.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    inputToList(e);
  }
});
function inputToList(e) {
  e.preventDefault();
  if (nodesValues.value == "") {
    error.style.display = "block";
    result.style.display = "none";
    message.innerText = "";
    error.innerText = ` * Error: Please Enter Some Values , Tree Cannot Be Empty.`;
    setTimeout(()=>{
    error.innerText=``;
    },4000);
    return;
  } else {
    result.style.display = "flex";
    error.style.display = "none";
    resetBtn.style.display = "flex";
    const data = nodesValues.value.split(" ");
    const list = [];
    data.forEach((values) => {
      list.push(parseInt(values));
    });
    if (list.some(isNaN)) {
      result.style.display = "none";
      error.style.display = "block";
      error.innerHTML =
        "Please Check All The Rules First , Only Numbers Are Allowed !!";
      setTimeout(()=>{
      error.innerHTML=``;
      },4000);
      return;
    }

    buildATree(list);
    if (hasDuplicates(list)) {
      const dupli = tellsDuplicates(list);
      message.innerText =
        "YOUR FINAL BINARY SEARCH TREE : \nYou Have Entered Some Duplicates Also : ";
      dupli.forEach((elem) => {
        message.innerText += " " + elem + " ,";
      });
    } else message.innerText = "YOUR FINAL BINARY SEARCH TREE :";
  }
}
function buildATree(list) {
  const root = new BinarySearchTreeNode(list[0]);
  for (let i = 1; i < list.length; i++) {
    root.insert(list[i]);
  }
  drawBinaryTree(root, document.querySelector("canvas"));
}
function hasDuplicates(list) {
  let set = new Set();
  for (const i of list) set.add(i);
  if (list.length != set.size) return true;
  return false;
}
function tellsDuplicates(list) {
  let res = new Set();
  let counts = {};
  for (const num of list) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  for (const key in counts) {
    if (Object.hasOwnProperty.call(counts, key)) {
      if (counts[key] > 1) res.add(key);
    }
  }
  return res;
}

if (window.matchMedia("screen and (max-width: 546px)").matches) {
  setTheme({
    radius: 40,
    leafNodeSpace: 110,
    lineHeight: 110,
  });
}
