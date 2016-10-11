//add interactivity to the app to do the following

/*
USEFUL DOM FUNCTIONS

document
  .createElement()
  .getElementById()
  .getElementsByClassName()
  .getElementsByTag()
  .onclick
  .onchange
  .addEventListener

element
  .appendChild()
  .parentNode
  .querySelector()
  .classList
    .toggle()
  .removeChild()
  .onclick
  .onchange
  .addEventListener
  .children
  .type
*/

  var newTaskInputField = document.getElementById('new-task')
  var incompleteTaskList = document.getElementById('incomplete-tasks')
  var completedTaskList = document.getElementById('completed-tasks')
  var addButton = document.getElementsByClassName('add')[0]

  //task-item template
  function createNewTaskElement(labelText) {
    //create individual components of taskElement
    var listItem = document.createElement('li'),
        itemText = document.createElement('label'),
        checkbox = document.createElement('input'),
        editInput = document.createElement('input'),
        editButton = document.createElement('button'),
        deleteButton = document.createElement('button')

    //set types of checkbox and editinput
    checkbox.type = 'checkbox'
    editInput.type = 'text'

    //set inner text of buttons
    editButton.textContent = 'Edit'
    deleteButton.textContent = 'Delete'

    //give buttons appropriate class names
    editButton.className = 'edit'
    deleteButton.className = 'delete'

    //set textContent of label to fn parameter
    itemText.textContent = labelText || ''

    //append elements as child to listItem
    listItem.appendChild(checkbox)
    listItem.appendChild(itemText)
    listItem.appendChild(editInput)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    return listItem
  }

  //append newly created taskElement to #incomplete-tasks
  function addTask(){
    var input = newTaskInputField.value
    if (input !== '') {
      var newTask = createNewTaskElement(input)
      bindTaskEvents(newTask, complete)
      incompleteTaskList.appendChild(newTask)
      newTaskInputField.value = ''
    }
  }

  //delete task
  function deleteTask(){
    //remove list item from parent
    var listItem = this.parentNode
    listItem.remove()
  }

  //edit task
  function editTask(){
    var listItem = this.parentNode,
        label = listItem.querySelector('label'),
        editInput = listItem.querySelector('input[type=text]'),
        containsClass = listItem.classList.contains('editMode')

    //if listItem is in editMode
    if (containsClass) {
      //set label innerHTML to editInput value
      label.innerText = editInput.value

    } else {
      //set editInput value to label innerHTML
      editInput.value = label.innerText
    }

    //toggle list item to .editMode
    listItem.classList.toggle('editMode')
  }

  //mark task as completed
  function complete(){
    //list item is parent node of checkbox
    var listItem = this.parentNode
    //move list item to #completed-tasks
    completedTaskList.appendChild(listItem)
    //change event handler to listen for incomplete
    bindTaskEvents(listItem, incomplete)
  }

  //mark task as incompleted
  function incomplete(){
    //list item is parent node of checkbox
    var listItem = this.parentNode
    //move to #incomplete-tasks
    incompleteTaskList.appendChild(listItem)
    //change event handler to listen for complete
    bindTaskEvents(listItem, complete)
  }

  //attaches event handlers to list item
  function bindTaskEvents(listItem, checkboxEventHandler){
    var checkbox = listItem.querySelector('input[type=checkbox]'),
        editButton = listItem.querySelector('button.edit'),
        deleteButton = listItem.querySelector('button.delete')

    //bind #edit to editTask
    editButton.onclick = editTask
    //bind #delete to deleteTask
    deleteButton.onclick = deleteTask
    //bind checkbox to checkboxEventHandler
    checkbox.onchange = checkboxEventHandler
  }

  //add new task to incompleteTaskList when #add is clicked
  addButton.addEventListener("click", addTask);

  //bind proper event listeners to each task in lists
  for (var i = 0; i < incompleteTaskList.children.length; i++) {
    bindTaskEvents(incompleteTaskList.children[i], complete)
  }
  for (var i = 0; i < completedTaskList.children.length; i++) {
    bindTaskEvents(completedTaskList.children[i], incomplete)
  }
