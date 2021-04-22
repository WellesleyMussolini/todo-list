const list = document.querySelector("#list");
const input = document.querySelector("#input");
const addBTN = document.querySelector("#add");


let listARRAY = JSON.parse(localStorage.getItem('list-array')) || [];


const renderList = () => {
    list.innerHTML = "";

    for (paragraph of listARRAY) {
        let listEntity = document.createElement("li");

        let removeTEXT = document.createElement('button');
        removeTEXT.setAttribute('href', '#');
        removeTEXT.setAttribute("id", "remove-paragraph")
        removeTEXT.innerHTML = '<i class="fa fa-trash"></i>';

        let listText = document.createTextNode(paragraph);
        listEntity.appendChild(listText);

        //trash button
        listEntity.appendChild(removeTEXT);
        list.appendChild(listEntity);

        let position = listARRAY.indexOf(paragraph);
        removeTEXT.setAttribute('onclick', 'removeTEXT(' + position + ')');
    };
};
renderList();


const removeTEXT = (position) => {
    listARRAY.splice(position, 1);
    renderList();

    saveToStorage();
};


const addList = () => {
    let listText = input.value;
    listARRAY.push(listText);

    if (listARRAY.length > 8) {
        alert("Only able to add 8 tasks!");
    } else {
        //returns
        input.value = "";
        renderList();
    }
    saveToStorage();
    return;
};


addBTN.addEventListener('click', () => {
    if (input.value.length == 0) {
        alert("Type something");
        renderList();
    } else {
        addList();
    }

});


const removeBTN = document.createElement("button");
removeBTN.textContent = "CLEAN";
removeBTN.setAttribute("id", "remove-all")
document.querySelector(".container").appendChild(removeBTN);

removeBTN.addEventListener("click", () => {
    listARRAY = [];
    input.value = "";
    renderList();

    saveToStorage();
});


function saveToStorage() {
    localStorage.setItem('list-array', JSON.stringify(listARRAY));
};

const characterLimit = (input) => {
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 38);
    };
};
