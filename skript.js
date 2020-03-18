const formSearch = document.querySelector('.form-search');
    inputCitiesFrom = document.querySelector('.input__cities-from');
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from');
    inputCitiesTo = document.querySelector('.input__cities-to');
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to');
    inputDateDepart = document.querySelector('.input__date-depart');

 const city = ['Москва','Санкт-Петербург','Минск','Караганда','Челябинск',
                'Керч','Волгоград','Самара','Днепропетровск','Екатеренбург','Одесса',
                'Ухань','Шымкен','Нижний Новгород','Калининград','Вроцлав','Ростов-на-Дону',
                '','','','','','','','','','','','','','','','',''];

 const showCity = (input, list) => {
     list.textContent = '';

     if (input.value !== '') {
           const filterCity = city.filter((item) => {
                const fixItem = item.toLowerCase();
                return fixItem.includes(input.value.toLowerCase());
            });
        
         filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li)
        });
    }
 };

 inputCitiesFrom.addEventListener('input',() => {
     showCity(inputCitiesFrom, dropdownCitiesFrom)
    });

 dropdownCitiesFrom.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            console.log(target.textContent)
            inputCitiesFrom.value = target.textContent;
            dropdownCitiesFrom.textContent =''; 
        }
 });
 
 const showCity1 = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
          const filterCity = city.filter((item) => {
               const fixItem = item.toLowerCase();
               return fixItem.includes(input.value.toLowerCase());
           });
       
        filterCity.forEach((item) => {
           const li = document.createElement('li');
           li.classList.add('dropdown__city');
           li.textContent = item;
           list.append(li)
       });
   }
};

 inputCitiesTo.addEventListener('input',() => {
    showCity1(inputCitiesTo, dropdownCitiesTo)
   });


 dropdownCitiesTo.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        console.log(target.textContent)
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent =''; 
    }
});

