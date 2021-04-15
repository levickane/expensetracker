$(document).ready(function () {
  $('.modal').modal()
})
$(document).ready(function () {
  $('.datepicker').datepicker()
})
$('.dropdown-trigger').dropdown()

//global variables
var emojiAPI =
  'https://emoji-api.com/emojis?access_key=df865b35c85a0bc75871e53811f1eddd5cde0ba1'
var addItemBtn = $('#addItemBtn')
var clearItemsBtn = $('#clearItemsBtn')
var itemSubmit = $('#itemSubmit')
var itemDisplay = $('#itemDisplay')
var emojiSelection = $('#emojiSelection')
var selectedEmoji = $('#selectedEmoji')

//functions
/*This makes sure that the form inputs all have values and then passes
the values into the addItemRows function which will append the row
to the table's body. Then add's the modal-close class to close the modal.*/
function handleFormSubmit(e) {
  e.preventDefault()
  var itemDate = $('#itemDate').val()
  var itemDescription = $('#itemDescription').val()
  var emojiSelection = $('#emojiSelection').val()
  var incomeExpenseSelection = $('#incomeExpenseSelection').val()
  var itemAmount = parseFloat($('#itemAmount').val()).toFixed(2)

  if (
    itemDate != '' &&
    emojiSelection !== null &&
    incomeExpenseSelection !== null &&
    itemDescription != '' &&
    itemAmount != ''
  ) {
    addItemRows({
      itemDescription,
      emojiSelection,
      incomeExpenseSelection,
      itemDate,
      itemAmount
    })

    itemSubmit.addClass('modal-close')
  }
}

/* This funciton gets stuff from localstorage. If there's items
in local storage, then return those items as objects in an array called itemRows.
If there isn't anything in local storage, return itemRows as an empty array*/
function getItemRows() {
  var itemRows
  if (localStorage.getItem('itemEntries')) {
    itemRows = JSON.parse(localStorage.getItem('itemEntries'))
  } else {
    itemRows = []
  }
  return itemRows
}

/* This function renders stuff from localstorage. It goes to local storage and retreives all the data
that was input as 
      [{
          itemDescription,
          emojiSelection,
          incomeExpenseSelection,
          itemDate,
          itemAmount 
      }]
as a variable called currentStorage. Then it makes sure that itemDisplay (our table body) is empty.
Then we'll check if getItemRows returned an empty array. if it did, then we can exit the function because there's
nothing to render. Else - we'll loop over the data that getItemRows returned in the form of an array and
draw it onto the page with a template. Inside the <tr> we'll style the background color either red or green.*/
function renderItemRows() {
  var currentStorage = getItemRows()
  itemDisplay.empty()
  if (currentStorage === []) {
    return
  } else {
    for (var i = 0; i < currentStorage.length; i++) {
      itemDisplay.append(
        `<tr style="background-color:${isRedOrGreen(
          currentStorage[i].incomeExpenseSelection
        )}">
                <td>${currentStorage[i].itemDescription}</td>
                <td>${currentStorage[i].emojiSelection}</td>
                <td>${currentStorage[i].incomeExpenseSelection}</td>
                <td>${currentStorage[i].itemDate}</td>
                <td>$${currentStorage[i].itemAmount}</td>
                <td class="deleteItemRowBtn" data-index=${i}>X</td>
            </tr>
                `
      )
    }
  }
}

/*This function will take in a string to inspect. We found the string from the above function by
console.log(currentStroage[i].incomeExpenseSelection). Depending on the selection, the console will
return a string that says either Income or Expense. If it returns Income, we'll return a the string
'green' and make the background color of the <tr> green. Else, it will return and become 'red'. */
function isRedOrGreen(stringToInspect) {
  if (stringToInspect === 'Income') {
    return 'green'
  } else {
    return 'red'
  }
}

/*This EVENT targets the document (because the element hasn't actually been created yet. so it's going to 
continuously scan the document until it finds something with the class name .deleteItemRowBtn). Once the element
with .deleteItemRowBtn is clicked it's going target *this* element and look at he data-index. It's then going to envoke
and pass that element's data-index into a function called deleteSingleItem()*/
$(document).on('click', '.deleteItemRowBtn', function (event) {
  var targetIndex = $(this).attr('data-index')
  deleteSingleItem(targetIndex)
})

/*This function takes in a specific index as an argument. Then it retreives the item rows from local storage and sets that array of objects
to a variable called allrows. Then it sets a variable called specificItemRemoved which is equal to the array
of objects in localStorage(now called allrows) that is filtered by (no specific value *_* because the value isn't important here)
the index of the object in the array.**KEY POINT HERE-> (_, index) is a callback function which means: the function is a predicate, 
to test each element of the array. Return a value that coerces to *true to keep the element, or to false if it doesn't coerce.
So if the index of any object in that array equates to or contanains the specificIndex that was passed in from above as the 
targetIndex then get rid of it and create this new array of objects variable called specificItemRemoved instead of allrows. 
Then we're going to set local storage with the new array of objects called specificItemRemoved and then stringify it in order 
to store it into local storage. Then immediatly render the item rows again by calling renderItemRows() */
function deleteSingleItem(specificIndex) {
  var allrows = getItemRows()
  var specificItemRemoved = allrows.filter((_, index) => index != specificIndex) //new array minus the speicif item
  localStorage.setItem('itemEntries', JSON.stringify(specificItemRemoved))
  renderItemRows()
}

/* This function sets local storage to an empty array and then immediatly calls renderItemRows(). When it calls
renderItemRows, there will be nothing to render because the local storage is now set to nothing, which means that
the table will now be empty.*/
function emptyItemRows() {
  localStorage.setItem('itemEntries', '[]')
  renderItemRows()
}

/*This funciton adds item rows to local storage. It takes an argument called dataToAdd. It sets a variable called
currentStorage which calls getItemRows which returns either an empty array or an array with data. Then we're going
to push the dataToAdd to the currentStorage (which is an array with or without data). Then we'll set localstorage with
a stringified version of current storage and then we'll immediatly render the item rows by calling renderItemRows()*/
function addItemRows(dataToAdd) {
  var currentStorage = getItemRows()
  currentStorage.push(dataToAdd)
  localStorage.setItem('itemEntries', JSON.stringify(currentStorage))
  renderItemRows()
  return
}

/*This function fetches the emojis from the emoji api and gives a response.json() object, then creates a function
to loop over all the data in the emoji json object. Using dot notation we're able to narrow down the actual emoji character.
for each emoji, we're going to create an <option> and a value attribut and setting the value attribut and the 
text/innerText as the emoji character, then appending the emoji character option inside the emojiSelection <select> tag.
for every emojiSelection, we're appending that to the dropdownMenu.*/
function getEmojis() {
  fetch(emojiAPI)
    .then((respons) => {
      return respons.json()
    })
    .then(function (data) {
      for (var i = 491; i < data.length; i++) {
        var emoji = data[i].character
        var emojiOption = $('<option>')
        emojiOption.attr('value', emoji)
        emojiOption.text(emoji)
        emojiSelection.append(emojiOption)
      }
      for (var i = 0; i < emojiSelection.length; i++) {
        $('#dropdownMenu').append(emojiSelection[i])
      }
    })
}

//This calls the API to get the emojis
getEmojis()
//on itemSubmit click, we reference the handleFormSubmit funciton.
itemSubmit.on('click', handleFormSubmit)
/*on addItemBtn click, the modal form is reset to blank fields and the itemSubmit button's class,
modal-close, is immediatly removed, so that they can't submit an empty form.*/
addItemBtn.on('click', function () {
  $('#modalForm').trigger('reset')
  $('#itemSubmit').removeClass('modal-close')
})
//on clearItemsBtn click, the emptyItemRows function is invoked
clearItemsBtn.on('click', function () {
  emptyItemRows()
})
//the item rows will be rendered on page load.
renderItemRows()
