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
        //alert("Only able to add 8 tasks!");
        return secondAlert();
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
        mypopup();
    } else {
        addList();
    };
    return;
});


input.addEventListener("keypress", e => {
    const escape = e.charCode || e.keyCode || e.which;

    if (escape === 13 && input.value.length == "") {
        return mypopup();
    } else if (escape === 13) {
        addList();
    };
    return;
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
        input.value = input.value.slice(0, 32);
    };
};


//Alert


const mypopup = () => {

    const modalOverlayError = document.createElement("div");
    modalOverlayError.setAttribute("class", "modal-overlay-error");
    document.body.appendChild(modalOverlayError);

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");
    document.body.appendChild(wrapper);
    modalOverlayError.appendChild(wrapper);

    const toast = document.createElement("div");
    toast.setAttribute("class", "toast");
    document.body.appendChild(toast);
    wrapper.appendChild(toast);

    const content = document.createElement("div");
    content.setAttribute("class", "content");
    document.body.appendChild(content);
    toast.appendChild(content);

    const details = document.createElement("div");
    details.setAttribute("class", "details");
    details.innerHTML = "<span>CRITICAL ERROR!</span> <p>Not able to add an empty field!</p>"
    document.body.appendChild(details);
    content.appendChild(details);

    const closeBTN = document.createElement("div");
    closeBTN.setAttribute("class", "close-icon");
    closeBTN.innerHTML = "<i class='uil uil-times'></i>";
    document.body.appendChild(closeBTN);
    toast.appendChild(closeBTN);

    modalOverlayError.classList.add('show-error'); //Show error

    window.onkeydown = function (e) {
        return false;
    }; //disable to spamming the alert on screen

    const removeERROR = () => {
        wrapper.classList.add('hide');
        setTimeout(function () {

            window.onkeydown = function (e) {
                return true;
            };

            wrapper.classList.remove('hide');
            return modalOverlayError.classList.remove('show-error');
        }, 900);
        return;
    };

    closeBTN.addEventListener('click', () => {
        return removeERROR();
    });

    //close alert on ESC KeyBoard
    window.document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            return removeERROR();
        };
        return;
    };

    //Hide the alert after a while

    setTimeout(function () {

        window.onkeydown = function (e) {
            return true;
        };

        wrapper.classList.remove('hide');
        return modalOverlayError.classList.remove('show-error');
    }, 5900);

    setTimeout(function () {
        return wrapper.classList.add('hide');
    }, 5000);

    return;
};


//2nd Alert


const secondAlert = () => {


    const modalOverlayError = document.createElement("div");
    modalOverlayError.setAttribute("class", "modal-overlay-error2");
    document.body.appendChild(modalOverlayError);

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper2");
    document.body.appendChild(wrapper);
    modalOverlayError.appendChild(wrapper);

    const toast = document.createElement("div");
    toast.setAttribute("class", "toast2");
    document.body.appendChild(toast);
    wrapper.appendChild(toast);

    const content = document.createElement("div");
    content.setAttribute("class", "content2");
    document.body.appendChild(content);
    toast.appendChild(content);

    const details = document.createElement("div");
    details.setAttribute("class", "details2");
    details.innerHTML = "<span>WARNING!</span> <p>Only able to enter 8 tasks per time!</p>"
    document.body.appendChild(details);
    content.appendChild(details);

    const closeBTN = document.createElement("div");
    closeBTN.setAttribute("class", "close-icon2");
    closeBTN.innerHTML = "<i class='uil uil-times'></i>";
    document.body.appendChild(closeBTN);
    toast.appendChild(closeBTN);

    modalOverlayError.classList.add('show-error2'); //Show error

    window.onkeydown = function (e) {
        return false;
    }; //disable to spamming the alert on screen

    const removeERROR = () => {
        wrapper.classList.add('hide2');
        setTimeout(function () {

            window.onkeydown = function (e) {
                return true;
            };

            wrapper.classList.remove('hide2');
            return modalOverlayError.classList.remove('show-error2');
        }, 700);
        return;
    };

    closeBTN.addEventListener('click', () => {
        return removeERROR();
    });

    //close alert on ESC KeyBoard
    window.document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            return removeERROR();
        };
        return;
    };

    //Hide the alert after a while

    setTimeout(function () {

        window.onkeydown = function (e) {
            return true;
        };

        wrapper.classList.remove('hide2');
        return modalOverlayError.classList.remove('show-error2');
    }, 5900);

    setTimeout(function () {
        return wrapper.classList.add('hide2');
    }, 5000);

    return;
};
