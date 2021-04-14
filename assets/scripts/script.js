$(document).ready(function () {
  $('.modal').modal()
})
$(document).ready(function () {
  $('select').formSelect()
})
$(document).ready(function () {
  $('.datepicker').datepicker()
})

var emojiAPI =
  'https://emoji-api.com/emojis?access_key=df865b35c85a0bc75871e53811f1eddd5cde0ba1'
var addItemBtn = $('#addItemBtn')
var clearItemsBtn = $('#clearItemsBtn')
var itemSubmit = $('#itemSubmit')
var itemDisplay = $('#itemDisplay')
var emojiSelection = $('#emojiSelection')

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

function printItemRow(itemDescription, emjoi, date, amount) {
  var newItemRow = $('<tr>')
  var itemDescriptionTdEl = $('<td>').text(itemDescription)
  var emojieTdEl = $('<td>').text(emjoi)
  var dateTdEl = $('<td>').text(date)
  var priceTdEl = $('<td>').text('$' + amount)

  newItemRow.append(itemDescriptionTdEl, emojieTdEl, dateTdEl, priceTdEl)
  itemDisplay.append(newItemRow)
}

function getEmojis() {
  fetch(emojiAPI)
    .then((respons) => {
      return respons.json()
    })
    .then(function (data) {
      for (i = 492; i < data.length; i++) {
        var emojiOption = $('<option>')
        emojiSelection.append(emojiOption)
      }
      console.log(emojiSelection)
      //   emojiSelection.append(emojiOption.html(emoji))
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
