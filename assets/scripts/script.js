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
    printItemRow(
      itemDescription,
      emojiSelection,
      incomeExpenseSelection,
      itemDate,
      itemAmount
    )
    itemSubmit.addClass('modal-close')
  }
}

var itemRows = []
function printItemRow(itemDescription, emjoi, incomeExpense, date, amount) {
  var newItemRow = $("<tr class='tableitem'>")
  var itemDescriptionTdEl = $('<td>').text(itemDescription)
  var emojieTdEl = $('<td>').text(emjoi)
  var incomeExpenseTdEl = $('<td>').text(incomeExpense)
  var dateTdEl = $('<td>').text(date)
  var priceTdEl = $('<td>').text('$' + amount)
  console.log(incomeExpenseTdEl[0].innerText)
  if (incomeExpenseTdEl[0].innerText == 'Expense') {
    newItemRow.attr('style', 'background-color: red')
  } else {
    newItemRow.attr('style', 'background-color: green')
  }
  newItemRow.append(
    itemDescriptionTdEl,
    emojieTdEl,
    incomeExpenseTdEl,
    dateTdEl,
    priceTdEl
  )
  itemRows.push(newItemRow)
  for (var i = 0; i < itemRows.length; i++) {
    itemDisplay.append(newItemRow)
  }
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
  itemDisplay.children().remove()
})
