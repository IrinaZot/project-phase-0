let elemInput = document.querySelectorAll ('.text');//Получаем NodeList input (поле ввода текста)! нужен будет и инд
const subButton = document.querySelectorAll('.submit');//Получаем NodeList subButton (кнопки Добавить)! нужен будет и инд
const table = document.querySelectorAll ('.table');//Получаем NodeList таблицы
const deleteAll = document.getElementsByClassName('buttonAc');//Получаем NodeList кнопки удалить всё
const numberStr = document.querySelectorAll('.cellNumb');//Получаем NodeList числа строки
const numberStrText = numberStr[0].textContent;

function newWord(){  //функция для добавления нового слова в таблицу
    let entValue = elemInput[0].value.trim();

    //проверяем введенное значение не пустое? тогда добавляем переменную с переведенным текстом
    if(entValue !==""){
        let translitValue = transliteration(entValue);
        const maxLength = 7;//добавляем переменную счетчик по которой будем обрезать строку
        let ruInputValue, engInputValue;//добавляем переменную введ.слова на русском и анг
        
    //проверяем длину введенного текста на русском, обрезаем если нужно и вставляем в значения
        if(entValue.length > maxLength){
            ruInputValue = entValue.substring(0, maxLength) + '...';
        }else{
            ruInputValue = entValue;
        };
    //проверяем длину введенного текста на английском, обрезаем если нужно и вставляем в значения
        if(translitValue.length > maxLength){
            engInputValue = translitValue.substring(0, maxLength) + '...';
        }else{
            engInputValue = translitValue
        };

        let newStr = document.createElement('div');//создаем новую строку
        let newCell1 = document.createElement('div');//создаем новую клетку для на русском
        let newNumb = document.createElement('div');//создаем порядковый номер строки
        let newText = document.createElement('div');//создаем див для слова на русском
        let newTextEng = document.createElement('div');//создаем див для слова на английском
        let newCell2 = document.createElement('div');//создаем новую клетку с тестом на англ
        let newcross = document.createElement('img');//создаем картинку крестика
        newcross.src = './css/Group 7.svg';//меняем атрибут src у картинки
        newcross.className = 'cross';//меняем класс у картинки
        newNumb.innerText = 2;// изменяем порядковый номер строки на 2
        newNumb.className = 'cellNumb';
        newStr.className = "str1";
        newCell1.className = 'cell1new';//меняем у новой клетки на русском класс
        newCell2.className = 'cell2new'; //меняем у новой клетки на англ класс
        newText.className = "cellTextNew";//меняем у дива со словом на русском класс
        newTextEng.className = "cell2TextNew";//меняем у дива со словом на англ класс
        
        if(entValue.length > 7){
            newText.setAttribute('data-tooltip', entValue);//если слово на русском обрезаем - добавляем tooltip
        }else{                          
            newText.setAttribute('data-tooltip', '');       //если нет, tooltip пустой
        }
        newText.innerText = ruInputValue;//меняем содержимое дива на русском на введеный текст
        
        if(translitValue.length > 7){
            newTextEng.setAttribute('data-tooltip', translitValue);//если слово на английском обрезаем - добавляем tooltip
        }else{                          
            newTextEng.setAttribute('data-tooltip', '');       //если нет, tooltip пустой
        }
        newTextEng.innerText = engInputValue;//меняем содержимое на переведенный текст
        
        table[0].append(newStr);//добавляем в таблицу новую строку
        newStr.append(newCell1, newCell2);//добавляем в новую строку кл слева и кл справа
        newCell1.append(newNumb, newText);//добавляем в кл слева номер и текст
        newCell2.append(newTextEng, newcross);//добавляем крестик в кл справа

        //добавляем слушателей чтобы подсказка всплывала при наведении мыши на элемент и пропадала, если убираем
        let words = document.querySelectorAll('.cellTextNew, .cell2TextNew');//отлавливаем и русские и англ слова, добавленные в словарь
        if (entValue.length > 7){
        for (let i = 0; i < words.length; i++){
            words[i].addEventListener('mouseover', showTip);
            words[i].addEventListener('mouseout', hideTip);
        };
        }
        newcross.addEventListener('click', (event) =>{//добавляем функцию чтобы удалялась строка
            table[0].removeChild(newStr);
            updateNumbers();
        });
        
        deleteAll[0].addEventListener('click', (event) =>{
            table[0].removeChild(newStr);
        });

    
    }
    

};

subButton[0].addEventListener("click", (event) =>{
    event.preventDefault(); //событие, чтобы стр не перезагружалась
    if(elemInput[0].value !==""){  //условие когда вводишь текст
        newWord();
        elemInput[0].value = "";
    }
    updateNumbers();

});

document.addEventListener('keyup', (event) =>{
    if (event.code === "Enter" && elemInput[0].value !==""){
        newWord();
        elemInput[0].value = "";
    }
    updateNumbers();
});

function transliteration( str ) {
    let ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 
        'Е': 'E', 'Ё': 'E', 'Ж': 'J', 'З': 'Z', 'И': 'I', 
        'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 
        'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 
        'Щ': 'Shch', 'Ы': 'Y', 'Э': 'E', 'Ю': 'U', 'Я': 'Ya'
    }, 
    newstr = [];
    
    str = str.replace(/[ъьЪЬ]+/g, '').replace(/й/g, 'i').replace(/Й/g, 'I');
    
    for ( let i = 0; i < str.length; ++i ) {
       newstr.push(
            ru[ str[i] ]
        || ru[ str[i].toLowerCase() ] == undefined && str[i]
       );
    }
    
    return newstr.join('');
};

//функция для обновления нумерации строк
function updateNumbers(){
    let numberStr = document.querySelectorAll('.cellNumb')
    numberStr.forEach((item, index) => {
        item.innerText = index+1
    });
};
updateNumbers();

//функция для видимости всплывающей подсказки
function showTip(event){
    const eventElement = event.target;//переменная элемента, на котором висит событие
    const toolText = eventElement.getAttribute('data-tooltip');//переменная, в которой текст подсказки из атрибута который повесили на рус и англ див
    const tooltipElement = document.createElement('div');//создаем див для подсказки
    tooltipElement.className = 'tooltipBlock';//меняем класс у дива с подсказкой
    if(toolText.length > 0){
        tooltipElement.textContent = toolText; //добавляем текст который отловили
    
        document.body.appendChild(tooltipElement);//добавляем див с подсказкой в html
    
        const crd = eventElement.getBoundingClientRect();//переменная с координатами элемента, на котором висит событие
        tooltipElement.style.left = crd.left + (crd.width -tooltipElement.offsetWidth) / 2 + "px";//настраиваем положение подсказки относительно элемента слева
        tooltipElement.style.top = crd.top - tooltipElement.offsetHeight - 7 + "px";//настраиваем положение подсказки относительно элемента чтобы подсказка была выше
    }
};

//функция, скрывающая подсказку
function hideTip(event){
    const tooltipElement = document.querySelector('.tooltipBlock');//получаем див подсказки
    if(tooltipElement){
        tooltipElement.remove();
    }
};
