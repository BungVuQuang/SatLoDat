const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const clodeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler")

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

//var toast = document.querySelector(".toast");
// var btn = document.querySelector(".toast-btn");
// var close = document.querySelector(".toast-close");
// var progress = document.querySelector(".progress-toast");

/*========================================== TOAST =================================================*/
// toast.classList.add("active");
// progress.classList.add("active");

// setTimeout(() => {
//     toast.classList.remove("active");
// }, 2000)

// setTimeout(() => {
//     progress.classList.remove("active");
// }, 2300)

// close.addEventListener("click", () => {
//     toast.classList.remove("active");

//     setTimeout(() => {
//         progress.classList.remove("active");
//     }, 300)
// })

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';

});

clodeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");


        this.classList.add("active");
        pane.classList.add("active");
    };
});

/*============================LOGO OPTION=================================*/
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}

/*============================CLOUD REQUEST=================================*/
//let requestURL = 'https://api.thingspeak.com/channels/1962864/fields/1.json?api_key=IPYUMN69TN5J7ZWQ';
var requestURL = 'https://api.thingspeak.com/channels/1962864/fields/1.json?timezone=Asia%2FHo_Chi_Minh';
var request = new XMLHttpRequest();
var dataResponse;
var serie = [
    []
];
var fromDate = document.querySelector("#from-date");
var toDate = document.querySelector("#to-date");
var selectNode = document.querySelector("#select-node");
var tableDataHistory = document.querySelector(".data-table");
var searchButton = document.getElementById("search-button");
var exportButton = document.getElementById("excel-button");
var searchGraphicButton = document.getElementById("search-button-graphic");


searchButton.addEventListener("click", function () {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        dataResponse = request.response.feeds;
        search(); // Gọi hàm xử lý dữ liệu trong hàm onload
    };
});
var dataExport = [];
var dateExport = [];
exportButton.addEventListener("click", function () {

});

function search() {
    let fromDateValue = fromDate.value;
    let toDateValue = toDate.value;
    let selectNodeValue = selectNode.value;
    let currentDate;
    let time;
    var count = 0;
    console.log(dataResponse);
    for (let i = 0; i < dataResponse.length; i++) {
        serie[i] = []
        serie[i][0] = dataResponse[i].created_at
        currentDate = serie[i][0].split('T')[0];
        if (currentDate >= fromDateValue && currentDate <= toDateValue) {
            // Xử lý phần tử
            serie[i][1] = parseFloat(dataResponse[i].field1)
            time = serie[i][0].split('T')[1].substring(0, 8);
            jQuery("#data-list").append(
                " <tr>\n" +
                "    <td>" + count + "</td>\n" +
                "    <td>" + serie[i][1] + "</td>\n" +
                "    <td>" + 200 + "</td>\n" +
                "    <td>" + 50 + "</td>\n" +
                "    <td>" + 80 + "</td>\n" +
                "    <td>" + currentDate + "</td>\n" +
                "    <td>" + time + "</td>\n" +
                "</tr>"
            );
            count = count + 1;
        }
    }
    tableDataHistory.style.display = "block";
    console.log("From Date:", fromDateValue);
    console.log("To Date:", toDateValue);
    console.log("Select Node:", selectNodeValue);
}
/*============================CLOUD REQUEST: GRAPHIC=================================*/

var fromDateGraphic = document.querySelector("#from-date-graphic");
var toDateGraphic = document.querySelector("#to-date-graphic");
var selectNodeGraphic = document.querySelector("#select-node-graphic");
var typeNodeGraphic = document.querySelector("#type-graphic");
// Mảng thời gian

const ctx = document.getElementById('myChart').getContext('2d');
var dataGraphicResponse;
searchGraphicButton.addEventListener("click", function () {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        dataGraphicResponse = request.response.feeds;
        searchGraphic(); // Gọi hàm xử lý dữ liệu trong hàm onload
    };
});

var serieGraphic = [
    []
];
var dataGraphic = [];
var dateGraphic = [];
function searchGraphic() {
    let fromDateValue = fromDateGraphic.value;
    let toDateValue = toDateGraphic.value;
    //let selectNodeValue = selectNodeGraphic.value;
    let currentDate;
    let time;
    let typeGprahic;
    if (typeNodeGraphic.value == "Moisture") {
        typeGprahic = '%';
    } else if (typeNodeGraphic.value == "Rainfall") {
        typeGprahic = 'mm';
    } else if (typeNodeGraphic.value == "Acceleration") {
        typeGprahic = 'Độ (°)';
    } else if (typeNodeGraphic.value == "Battery") {
        typeGprahic = '%';
    }
    console.log(dataGraphicResponse);
    for (let i = 0; i < dataGraphicResponse.length; i++) {
        serieGraphic[i] = []
        serieGraphic[i][0] = dataGraphicResponse[i].created_at
        currentDate = serieGraphic[i][0].split('T')[0];
        if (currentDate >= fromDateValue && currentDate <= toDateValue) {
            // Xử lý phần tử
            //serieGraphic[i][1] = parseFloat(dataResponse[i].field1)
            dataGraphic[i] = parseFloat(dataGraphicResponse[i].field1);
            dateGraphic[i] = currentDate + " T " + serieGraphic[i][0].split('T')[1].substring(0, 8);

        }
    }
    console.log(dateGraphic);
    console.log(dataGraphic);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateGraphic,
            datasets: [{
                label: typeNodeGraphic.value,
                data: dataGraphic,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Thời gian'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: typeGprahic
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Biểu đồ dữ liệu ' + typeNodeGraphic.value + ' từ ngày ' + fromDateValue + ' đến ngày ' + toDateValue
                }
            }
        }
    });
}

/*============================CLOUD REQUEST: GRAPHIC=================================*/
// Tạo mảng dữ liệu
// const timeArray = ['09:00', '10:00', '11:00', '12:00'];
// const dateArray = ['01/01/2023', '01/02/2023', '01/03/2023', '01/04/2023'];
// const dataArray = [10, 20, 30, 40];

// // Tạo đối tượng workbook mới
// const workbook = XLSX.utils.book_new();

// // Tạo sheet mới
// const worksheet = XLSX.utils.aoa_to_sheet([
//     ['Thời gian', 'Ngày', 'Dữ liệu'],
//     ...timeArray.map((time, index) => [time, dateArray[index], dataArray[index]])
// ]);

// // Thêm sheet vào workbook
// XLSX.utils.book_append_sheet(workbook, worksheet, 'Dữ liệu');

// // Xuất file Excel
// XLSX.writeFile(workbook, 'du-lieu.xlsx');

// ///https://api.thingspeak.com/channels/1253820/fields/3.json?api_key=EDMX5MRXCJ7LU0PO&days=4


