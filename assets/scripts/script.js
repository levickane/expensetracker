$(document).ready(function () {
  $('.modal').modal()
})
$(document).ready(function () {
  $('select').formSelect()
})
$(document).ready(function () {
  $('.datepicker').datepicker()
})

var addItemBtn = $('#addItemBtn')
addItemBtn.on('click', function () {
  $('#modalForm').trigger('reset')
  $('#itemSubmit').removeClass('modal-close')
})

var itemSubmit = $('#itemSubmit')
itemSubmit.on('click', function () {
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
    itemSubmit.addClass('modal-close')
  }
})
