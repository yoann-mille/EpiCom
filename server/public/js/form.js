jQuery(function(){

    var form_login_click = false;
    $('form.form-login').submit(function(){
	if (form_login_click){
	    return false;
	}
	form_login_click = true;

	var login = $(this).find('input[name="login"]').val();
	var password = $(this).find('input[name="password"]').val();

	if (!login || !password){
	    form_login_click = false;
	    console.log('login and password can\'t by empty');
	} else {
	    $.ajax({
		url: '/login',
		type: 'POST',
		data: {login: login, password: password},
		success: function(){
		    document.location.href = '/';
		},
		error: function(err){
		    console.log('error', err);
		},
		complete: function(){
		    form_login_click = false;
		}
	    });
	}
	return false;
    });

    var form_media_delete_click = false;
    $('form.form-media-delete').submit(function(){
	if (form_media_delete_click){
	    return false;
	}
	form_media_delete_click = true;

	var selected = new Array();
	$(this).find('input:checked[type="checkbox"]').each(function() {
	    selected.push($(this).attr('value'));
	});

	if (!selected.length){
	    form_media_delete_click = false;
	    console.log('nothing to delete');
	} else {
	    $.ajax({
		url: '/media',
		type: 'DELETE',
		data: {todelete: selected},
		success: function(){
		    document.location.reload();
		},
		error: function(err){
		    console.log('error', err);
		},
		complete: function(){
		    form_media_delete_click = false;
		}
	    });
	}
	return false;
    });

});
