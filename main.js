/*
post -добовление данных
put - полная замена данных
putch - частичная замена данных 
delete - удаление
get - получение данных
*/
/*
команда для запуска json-server json-server -w db.json -p 8000
*/
/*
CRUD - Create(POST) Read(GET) Update(PUT, PATCH) Delete(DELETE)
*/

//! Create start
// получаем нужные элементы
const API = "http://localhost:8000/todos";
let inpAdd = document.getElementById("inp-add");
let btnAdd = document.getElementById("btn-add");
// console.log(inpAdd, btnAdd);
// навесили событие на кнопку "сохранить"
btnAdd.addEventListener("click", async function () {
  // собрипаем объект для добовление в дб.жейсон
  let newTodo = {
    todo: inpAdd.value,
  };
  // console.log(newTodo);
  // делаем проверку на заполненность инпута и остонавливаем код c помощю return, чтоб пост-запрос не выполнялся
  if (newTodo.todo.trim() === "") {
    alert("заполните поле");
    return;
  }
  // запроч для длбовления
  await fetch(API, {
    method: "POST", // указываем метод
    body: JSON.stringify(newTodo), // указываем что именно нужно запостить
    headers: {
      "Content-type": "application/json; charset=utf-8",
    }, //кодировка
  });
  // очищаем инпут после добовления
  inpAdd.value = "";
  // чтоб добавленный таск сразу отоброзился в листе вызываем функцию, которая отоброжается
  getTodos();
});
//! Create end

// ! Read start
// получаем элемент, чтою=б убедится, что в переменной ist сейчас НЕ пусто
let list = document.getElementById("list");
console.log(list);
// фукция для получения всех тасков и отоброжения их в div#list
// async await нужен здесь, чтоб при отправке запроса мы сначала получили данные и только потом записали все в переменную response, иначе (если мы НЕ дождемся)туда запищется pending (состояние примиса, который еще не выполнен)
async function getTodos() {
  let response = await fetch(API) // если не указать метод запроса, то по умолчанию это GET запрос
    .then(res => res.json()) // переводим все в json формат
    .catch(err => console.log(err)); // отловили ошибку
  console.log(response);
  // очишаем div#list, чтоб список тасков корректно отображался и не хранил там предыдущие html-элементы со старыми данными
  list.innerHTML = "";
  // перебираемт полученный из дб.жсон массива создаем div и задаем ему содержимое через метод innerHTML, каждый созданный элемент аппендим в div#list
  response.forEach(item => {
    let newElem = document.createElement("div");
    newElem.innerHTML = <span>${item.todo}</span>;
    list.append(newElem);
  });
}
// вызываем функцию , чтоб как только откроется страница что-то было отображено
getTodos();
//! Read end
