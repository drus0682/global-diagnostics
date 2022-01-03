let counter = 0;

function addRow(tableID) {

    let tableRef = document.getElementById(tableID);
    let newRow = tableRef.insertRow(0);

    // let message = {};
    // message.status = false;
    // message.station = 'Жлобин-Центральный';
    // message.time_from = '04.08.2021 15:12:02.214';
    // message.time_to = '04.08.2021 15:15:02.214';
    // message.device = 'Измерительный центр 2';  
    // message.description = '38. 95СП - значение 15.05 V не соответствует установленному';

    // let messageList = [
    //   { status : false, 
    //     station : 'Жлобин-Центральный', 
    //     time_from : '04.08.2021 15:12:02.214', 
    //     time_to : '', 
    //     device : 'Измерительный центр 2', 
    //     description : '38. 95ЕС - значение 15.05 V не соответствует установленному'},
    //   { status : true, 
    //     station : 'Минск-Пассажирский', 
    //     time_from : '01.08.2021 15:12:02.214', 
    //     time_to : '01.08.2021 15:15:02.214', 
    //     device : 'Показательный прибор 1', 
    //     description : '39. 88СП - значение 18.05 V не соответствует установленному'},
    //   { status : true, 
    //     station : 'Могилёв', 
    //     time_from : '09.08.2021 13:12:02.987', 
    //     time_to : '09.08.2021 13:29:08.228', 
    //     device : 'UNZ - Преобразователь 8', 
    //     description : '40. 66УИ - имеет значение 1 не соответствующее норме (0)'}
    // ];

    let messageList = [{
            reg: 1,
            org: 1,
            place: 'Гатово',
            type: 'Фид',
            name: '1',
            y_value: 1,
            z_value: 20,
            g_value: 60,
            k_value: 00,
            c_value: 20,
            grade: 5
        },
        {
            reg: '',
            org: 2,
            place: 'Придвинская',
            type: 'ГТРЦ',
            name: '1-3',
            y_value: 2,
            z_value: '',
            g_value: '',
            k_value: '',
            c_value: '',
            grade: 4
        },
        {
            reg: '',
            org: 3,
            place: 'Ратомка',
            type: 'КПИ',
            name: '2-4',
            y_value: 3,
            z_value: 60,
            g_value: 30,
            k_value: 5,
            c_value: 5,
            grade: 3
        }
    ];

    let random = randomInteger(0, 2)

    let values = Object.values(messageList[random]).reverse();

    //values.pop(); 

    for (let key in values) {
        let newCell = newRow.insertCell(0);
        newCell.appendChild(document.createTextNode(values[key]));
    }

    //let newCell = newRow.insertCell(0);
    //let indicator = document.createElement('div');

    // if (messageList[random].status) {
    //   indicator.innerHTML = '<i class="fa fa-circle green" aria-hidden="true"></i>';
    // } else {
    //   indicator.innerHTML = '<i class="fa fa-circle red" aria-hidden="true"></i>'
    // }

    //newCell.appendChild(indicator);

    // counter++;
    // let counterRef = document.getElementById("counter");
    // counterRef.removeChild(counterRef.firstChild);
    // counterRef.appendChild(document.createTextNode("Количество записей: " + counter));
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function searchInTable() {
    counter = 0;
    let flag = false;

    let input, filter, table, tr, td, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("inserted-table");
    tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        txtValue = "";
        for (let j = 0; j < 11; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue += td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    flag = true;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        if (flag) {
            counter++;
            flag = false;
        }
    }
    //let counterRef = document.getElementById("counter");
    //counterRef.removeChild(counterRef.firstChild);
    //counterRef.appendChild(document.createTextNode("Количество записей: " + counter));
}

function resetTable() {
    document.getElementById('search').value = "";
    searchInTable();
}

function resetDateFrom() {
    document.getElementById('date-from').value = '';
    //searchInTable();
}

function resetDateTo() {
    document.getElementById('date-to').value = '';
    //searchInTable();
}

$(document).ready(function() {

    $('#add').click(function() {
        addRow("inserted-table");
    });

    $('#reset').click(function() {
        resetTable();
    });

    $('#reset-date-from').click(function() {
        resetDateFrom();
    });

    $('#reset-date-to').click(function() {
        resetDateTo();
    });

});


document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table-color thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});