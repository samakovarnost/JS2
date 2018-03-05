function validator() {
    var name = document.getElementById('name');
    if (!/^\w+$/.test(name.value)) {
        alert('Неправильное имя');
        name.style.borderColor = 'red';
        return false;
    }
    else {
        name.style.borderColor = '';
    }

    var phone = document.getElementById('phone');
    if (!/^\+7\(\d{3}\)\d{3}\-\d{4}$/.test(phone.value)) {
        alert('Неправильно набран номер');
        phone.style.borderColor = 'red';
        return false;
    }
    else {
        phone.style.borderColor = '';
    }

    var mail = document.getElementById('mail');
    if (!/^[\w\.\-]+@\w+\.\w+$/.test(mail.value)) {
        alert('Неправильный имейл');
        mail.style.borderColor = 'red';
        return false;
    }
    else {
        mail.style.borderColor = '';
    }
}

$.get('city.json').then(function (data) {
    var $city = $('#city');
    for (var i=0; i<data.length; i++) {
        $city.append('<option value="'+ i +'">'+ data[i] +'</option>')
    }
})
