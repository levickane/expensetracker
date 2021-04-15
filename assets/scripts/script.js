$(document).ready(function () {
  $('.modal').modal()
})
// $(document).ready(function () {
//   $('select').formSelect()
// })
$(document).ready(function () {
  $('.datepicker').datepicker()
})
$('.dropdown-trigger').dropdown()

var emojiAPI =
  'https://emoji-api.com/emojis?access_key=df865b35c85a0bc75871e53811f1eddd5cde0ba1'
var addItemBtn = $('#addItemBtn')
var clearItemsBtn = $('#clearItemsBtn')
var itemSubmit = $('#itemSubmit')
var itemDisplay = $('#itemDisplay')
var emojiSelection = $('#emojiSelection')
var selectedEmoji = $('#selectedEmoji')

function handleFormSubmit(e) {
  e.preventDefault()
  var itemDate = $('#itemDate').val()
  var itemDescription = $('#itemDescription').val()
  var emojiSelection = $('#emojiSelection').val()
  var incomeExpenseSelection = $('#incomeExpenseSelection').val()
  var itemAmount = parseFloat($('#itemAmount').val())

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
// get stuff from localstorage
function getItemRows() {
  var itemRows
  if (localStorage.getItem('itemEntries')) {
    itemRows = JSON.parse(localStorage.getItem('itemEntries'))
  } else {
    itemRows = []
  }
  return itemRows
}
// render stuff from localstorage
function renderItemRows() {
  // go and look at localstorage to retrieve all the data
  /*
    [{
          itemDescription,
          emojiSelection,
          incomeExpenseSelection,
          itemDate,
          itemAmount 
      }]
    */
   
  var currentStorage = getItemRows()
  // var dateStorage= currentStorage[i].itemdate;
  
  //before we draw on our canvas we want it clean
  itemDisplay.empty() //cleans the itemDisplay of any innerHtml jQuery method
  // that data can be looped thru and drawn onto page wiht a template
  if (currentStorage === []) {
    return
  } else {
    for (var i = 0; i < currentStorage.length; i++) {
      console.log(currentStorage[i])
      //we need to figure out if its red or green

      itemDisplay.append(
        `<tr style="background-color:${isRedOrGreen(
          currentStorage[i].incomeExpenseSelection
        )}">
                <td>${currentStorage[i].itemDescription}</td>
                <td>${currentStorage[i].emojiSelection}</td>
                <td>${currentStorage[i].incomeExpenseSelection}</td>
                <td>${currentStorage[i].itemDate}</td>
                <td>${currentStorage[i].itemAmount}</td>
                <td class="deleteItemRowBtn" data-index=${i}>X</td>
            </tr>
             `
      )
    }
  }
}
$(document).on('click', '.deleteItemRowBtn', function (event) {
  // get the data-index from the thing we click--capture in a variable (targetIndex)
  var targetIndex = $(this).attr('data-index')
  console.log(targetIndex)
  // invoke our delete single item function, passing in the targetIndex
  deleteSingleItem(targetIndex)
})

function deleteSingleItem(specificIndex) {
  var allrows = getItemRows()
  //remove specificItem from allrows
  var specificItemRemoved = allrows.filter((_, index) => index != specificIndex) //new array minus the speicif item
  localStorage.setItem('itemEntries', JSON.stringify(specificItemRemoved))
  renderItemRows()
}

function emptyItemRows() {
  localStorage.setItem('itemEntries', '[]')
  renderItemRows()
}

function isRedOrGreen(stringToInspect) {
  if (stringToInspect === 'Income') {
    return 'green'
  } else {
    return 'red'
  }
}

// add stuff to localstorage
function addItemRows(dataToAdd) {
  var currentStorage = getItemRows() // either [] or [withData]
  currentStorage.push(dataToAdd)
  localStorage.setItem('itemEntries', JSON.stringify(currentStorage))
  renderItemRows()
  return
}

function getEmojis() {
  fetch(emojiAPI)
    .then((respons) => {
      return respons.json()
    })
    .then(function (data) {
      console.log(data)
      for (var i = 491; i < 500; i++) {
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

getEmojis()
itemSubmit.on('click', handleFormSubmit)
addItemBtn.on('click', function () {
  $('#modalForm').trigger('reset')
  $('#itemSubmit').removeClass('modal-close')
})
clearItemsBtn.on('click', function () {
  emptyItemRows()
})

renderItemRows()
