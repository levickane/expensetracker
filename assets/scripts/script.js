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
      console.log(data)
      for (var i = 0; i < 10; i++) {
        var emoji = data[i].character
        var emojiOption = $('<option>')
        emojiOption.attr('value', emoji)
        emojiOption.text(emoji)
        emojiSelection.append(emojiOption)
      }
      for (var i = 0; i < emojiSelection.length; i++) {
        $('#dropdownMenu').append(emojiSelection[i])
        console.log(emojiSelection[i])
      }
    })
}

{
  /* <ul id="select-options-9f68e503-efe6-c98d-b316-1c420fe6c1e5" class="dropdown-content select-dropdown" tabindex="0" style=""><li class="disabled selected" id="select-options-9f68e503-efe6-c98d-b316-1c420fe6c1e50" tabindex="0"><span>Select Emoji</span></li></ul> */
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
