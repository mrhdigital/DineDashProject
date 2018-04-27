$(document).ready(function () {
  $('.modal').modal();

  var instance = M.Modal.getInstance($(".modal"));
  instance.open();
})
