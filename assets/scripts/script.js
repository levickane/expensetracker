$(document).ready(function () {
  $('.modal').modal()
})
$(document).ready(function () {
  $('select').formSelect()
})
$(document).ready(function () {
  $('.datepicker').datepicker()
})

emojiAPI =
  'https://emoji-api.com/emojis?access_key=df865b35c85a0bc75871e53811f1eddd5cde0ba1'

// getEmojis()

var addItemBtn = $('#addItemBtn')
addItemBtn.on('click', function () {
  $('#modalForm').trigger('reset')
  $('#itemSubmit').removeClass('modal-close')
})

var itemSubmit = $('#itemSubmit')
var itemsList = []

function handleFormSubmit() {
  var itemDate = $('#itemDate').val()
  var itemDescription = $('#itemDescription').val()
  var emojiSelection = $('#emojiSelection').val()
  var itemAmount = parseFloat($('#itemAmount').val())

  if (
    itemDate != '' &&
    emojiSelection !== null &&
    itemDescription != '' &&
    itemAmount != ''
  ) {
    printItemRow(itemDescription, emojiSelection, itemDate, itemAmount)

    itemSubmit.addClass('modal-close')
  }
}

var itemDisplay = $('#itemDisplay')

function printItemRow(itemDescription, emjoi, date, amount) {
  console.log('hello')
  var newItemRow = $('<tr>')
  var itemDescriptionTdEl = $('<td>').text(itemDescription)
  var emojieTdEl = $('<td>').text(emjoi)
  var dateTdEl = $('<td>').text(date)
  var priceTdEl = $('<td>').text('$' + amount)

  newItemRow.append(itemDescriptionTdEl, emojieTdEl, dateTdEl, priceTdEl)
  console.log(newItemRow)
  itemDisplay.append(newItemRow)
}

var clearItemsBtn = $('#clearItemsBtn')
var itemName = $('.itemName')

var expenseList = $('#expenseList')
clearItemsBtn.on('click', function () {
  expenseList.children().remove()
})

// function getEmojis() {
//   fetch(emojiAPI)
//     .then((respons) => {
//       return respons.json()
//     })
//     .then(function (data) {
//       emojiSelection = $('#emojiSelection')
//       for (i = 0; i < data.length; i++) {
//         emojiOption = $('<option>')
//         emoji = data[i].character
//         emojiSelection.append(emojiOption.html(emoji))
//       }
//     })
// }

itemSubmit.on('click', handleFormSubmit)
