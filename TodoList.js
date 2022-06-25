//Getting all required elements
const inputbox = document.querySelector(".inputfield input");
const addbtn = document.querySelector(".inputfield  button");
const todolist = document.querySelector(".todolist");
const deleteallbtn = document.querySelector(".deleteall");

inputbox.onkeyup = () => {
    let userdata = inputbox.value;           //Getting user entered data
    if(userdata.trim() != 0){                //If user value are not only spaces
        addbtn.classList.add("active");      //active the add button
    }else{
        addbtn.classList.remove("active");   //unactive the add button
    }
}

showtasks();

//if user click on the add button
addbtn.onclick = ()=>{
    let userdata = inputbox.value;
    let getlocalstorage = localStorage.getItem("New Todo");          //getting localstorage
    if(getlocalstorage == null){ //if localstorage is null
        listArr = [];                 //creating blank array
    }
    else{
        listArr = JSON.parse(getlocalstorage);                       //transforming json string into a JS object
    }
    listArr.push(userdata);                                //Pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));   //transforming JS object into a JSON string
    showtasks();                             //calling showtasks function
    
    addbtn.classList.remove("active");   //unactive the add button
}


//Function to add task list inside the ul
function showtasks(){
    let getlocalstorage = localStorage.getItem("New Todo");          //getting localstorage
    if(getlocalstorage == null){            //if localstorage is null
        listArr = [];                       //creating blank array
    }
    else{
        listArr = JSON.parse(getlocalstorage);                       //transforming json string into a JS object
    }
    
    const pendingtask = document.querySelector(".pendingtask");
    pendingtask.textContent = listArr.length;        //passing the length value in the pendingtask

    if(listArr.length > 0){                        //If array length is greater than 0
        deleteallbtn.classList.add("active");      //active the clearall button
    }
    else{
        deleteallbtn.classList.remove("active");    //Unactive the clearall button
    }
    
    let newLiTag= "";
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick = "deletetask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todolist.innerHTML = newLiTag;                //adding new Li tag inside the ul tag
    inputbox.value = "";                     //Once the task is added leave the input field blank
}

//Delete task function
function deletetask(index){
    let getlocalstorage = localStorage.getItem("New Todo");          //getting localstorage
    listArr = JSON.parse(getlocalstorage);
    listArr.splice(index, 1);          //delete or remove the particular indexed li

    //after removing the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));   //transforming JS object into a JSON string
    showtasks();
}

//Delete all task function
deleteallbtn.onclick = () =>{
    listArr = [];          //Empty an array

    //after deleting all the li task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));   //transforming JS object into a JSON string
    showtasks();
}