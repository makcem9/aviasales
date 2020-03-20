// получаем элементы со страницы
const formSearch = document.querySelector('.form-search');
    inputCitiesFrom = document.querySelector('.input__cities-from');
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from');
    inputCitiesTo = document.querySelector('.input__cities-to');
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to');
    inputDateDepart = document.querySelector('.input__date-depart');

// данные
const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = '7a86dd7864e5d076cacd3f998b0f6919',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];
// функции

const getData = (url, callback) => {
    const request = new XMLHttpRequest(); //объект запроса

    request.open('GET', url);

    request.addEventListener('readystatechange', () =>{
        if (request.readyState !== 4) return;

        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();
};


 const showCity = (input, list) => {
    list.textContent = '';
    
    if (input.value !== '') {
        const filterCity = city.filter((item) => { 
            const fixItem = item.name.toLowerCase();
            if (input.value[0].toLowerCase() == fixItem[0])
            return fixItem.includes(input.value.toLowerCase());
        });
        
         filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li)
        });
    }
};
 
 const selectCity = (event, input, list) => {
   const target = event.target;
   if (target.tagName.toLowerCase() === 'li'){
       input.value = target.textContent;
       list.textContent = '';
    }
 };

 const renderCheapDay = (cheapTicket) => {
    console.log(cheapTicket);
}

const renderCheapYear = (cheapTickets) => {
    console.log(cheapTickets);
}

 const renderChip = (data, date) => {
    const cheapTicketYear =JSON.parse(data).best_prices;
    
    const cheapTicketDay = cheapTicketYear.filter((item) => {
       return item.depart_date === date;
    })

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
 };

 

// обработчики событий

 inputCitiesFrom.addEventListener('input',() => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

 inputCitiesTo.addEventListener('input',() => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

 dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom)
 });

 dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo)
});

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityFrom = city.find((item) => {
        return inputCitiesFrom.value === item.name
    });
    const cityTo = city.find((item) => {
        return inputCitiesTo.value === item.name
    });

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    }

    //const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token=${API_KEY}`;

    const requestData = '?depart_date=' + formData.when + 
    '&origin=' + formData.from +
    '&destination=' + formData.to +
    '&one_way=true&token=' + API_KEY;

    getData(proxy + calendar + requestData, (response) => {
        renderChip(response, formData.when);
    });
});

// вызовы функций

getData(proxy + citiesApi, (data) => {
   city = JSON.parse(data).filter((item) => item.name);
});