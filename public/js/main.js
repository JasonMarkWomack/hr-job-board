$(document).ready(function(){
  $('.delete-devjob').on('click', function(){
    var id = $(this).data('id');
    var url ='/delete/'+id;
    if(confirm('Delete Job?')){
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result){
          console.log('Deleting Job...');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });
  $('.edit-devjob').on('click', function(){
    $('#edit-form-name').val($(this).data('name'));
    $('#edit-form-salary').val($(this).data('salary'));
    $('#edit-form-description').val($(this).data('description'));
    $('#edit-form-id').val($(this).data('id'));
});
});
