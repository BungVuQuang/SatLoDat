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
var requestURL = 'https://api.thingspeak.com/channels/2166711/fields/1.json?timezone=Asia%2FHo_Chi_Minh';
var requestURL2 = 'https://api.thingspeak.com/channels/2166711/fields/2.json?timezone=Asia%2FHo_Chi_Minh';
var requestURL3 = 'https://api.thingspeak.com/channels/2166711/fields/3.json?timezone=Asia%2FHo_Chi_Minh';
var requestURL4 = 'https://api.thingspeak.com/channels/2166711/fields/4.json?timezone=Asia%2FHo_Chi_Minh';
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();
var request4 = new XMLHttpRequest();

var dataResponse;
var dataResponse2;
var dataResponse3;
var dataResponse4;
var serie = [
    []
];
var serie2 = [
    []
];
var serie3 = [
    []
];
var serie4 = [
    []
];

var fromDate = document.querySelector("#from-date");
var toDate = document.querySelector("#to-date");
var selectNode = document.querySelector(".select-node-table");
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

    };

    request2.open('GET', requestURL2);
    request2.responseType = 'json';
    request2.send();
    request2.onload = function () {
        dataResponse2 = request2.response.feeds;
    }
    request3.open('GET', requestURL3);
    request3.responseType = 'json';
    request3.send();
    request3.onload = function () {
        dataResponse3 = request3.response.feeds;
    }
    request4.open('GET', requestURL4);
    request4.responseType = 'json';
    request4.send();
    request4.onload = function () {
        dataResponse4 = request4.response.feeds;
        search(); // Gọi hàm xử lý dữ liệu trong hàm onload
    }
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
    console.log(dataResponse2);
    console.log(dataResponse3);
    console.log(dataResponse4);
    for (let i = 0; i < dataResponse.length; i++) {
        serie[i] = [];
        serie2[i] = [];
        serie3[i] = [];
        serie4[i] = [];
        serie[i][0] = dataResponse[i].created_at;
        serie2[i][0] = dataResponse2[i].created_at;
        serie3[i][0] = dataResponse3[i].created_at;
        serie4[i][0] = dataResponse4[i].created_at;
        currentDate = serie[i][0].split('T')[0];
        if (currentDate >= fromDateValue && currentDate <= toDateValue) {
            // Xử lý phần tử
            serie[i][1] = parseFloat(dataResponse[i].field1)
            serie2[i][1] = parseFloat(dataResponse2[i].field2)
            serie3[i][1] = parseFloat(dataResponse3[i].field3)
            serie4[i][1] = parseFloat(dataResponse4[i].field4)

            time = serie[i][0].split('T')[1].substring(0, 8);
            jQuery("#data-list").append(
                " <tr>\n" +
                "    <td>" + count + "</td>\n" +
                "    <td>" + serie[i][1] + "</td>\n" +
                "    <td>" + serie2[i][1] + "</td>\n" +
                "    <td>" + serie3[i][1] + "</td>\n" +
                "    <td>" + serie4[i][1] + "</td>\n" +
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

var dataGraphicResponse;
var dataGraphicResponse2;
var dataGraphicResponse3;
var dataGraphicResponse4;
searchGraphicButton.addEventListener("click", function () {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        dataGraphicResponse = request.response.feeds;

    };

    request2.open('GET', requestURL2);
    request2.responseType = 'json';
    request2.send();
    request2.onload = function () {
        dataGraphicResponse2 = request2.response.feeds;

    };

    request3.open('GET', requestURL3);
    request3.responseType = 'json';
    request3.send();
    request3.onload = function () {
        dataGraphicResponse3 = request3.response.feeds;

    };

    request4.open('GET', requestURL4);
    request4.responseType = 'json';
    request4.send();
    request4.onload = function () {
        dataGraphicResponse4 = request4.response.feeds;
        searchGraphic(); // Gọi hàm xử lý dữ liệu trong hàm onload
    };
});

var serieGraphic = [
    []
];
var dataGraphic = [];
var dateGraphic = [];
var checkChart = 0;
var myChart;
var myHightChart = document.querySelector("#chart-container");
function searchGraphic() {
    let fromDateValue = fromDateGraphic.value;
    let toDateValue = toDateGraphic.value;
    //let selectNodeValue = selectNodeGraphic.value;
    let currentDate;
    let time;
    let typeGprahic;
    if (checkChart == 1) {
        //myChart.destroy(); // Hủy biểu đồ hiện tại trên canvas
        checkChart = 0;
    }
    myHightChart.style.display = 'block';
    checkChart = checkChart + 1;
    if (typeNodeGraphic.value == "Moisture") {
        typeGprahic = '(%)';
        for (let i = 0; i < dataGraphicResponse.length; i++) {
            serieGraphic[i] = []
            serieGraphic[i][0] = dataGraphicResponse[i].created_at
            currentDate = serieGraphic[i][0].split('T')[0];
            if (currentDate >= fromDateValue && currentDate <= toDateValue) {
                // Xử lý phần tử
                //serieGraphic[i][1] = parseFloat(dataResponse[i].field1)
                dataGraphic[i] = parseFloat(dataGraphicResponse[i].field1);
                dateGraphic[i] = currentDate;
                //dateGraphic[i] = currentDate + " T " + serieGraphic[i][0].split('T')[1].substring(0, 8);

            }
        }
    } else if (typeNodeGraphic.value == "Rainfall") {
        typeGprahic = '(mm)';
        for (let i = 0; i < dataGraphicResponse2.length; i++) {
            serieGraphic[i] = []
            serieGraphic[i][0] = dataGraphicResponse2[i].created_at
            currentDate = serieGraphic[i][0].split('T')[0];
            if (currentDate >= fromDateValue && currentDate <= toDateValue) {
                // Xử lý phần tử
                //serieGraphic[i][1] = parseFloat(dataResponse[i].field1)
                dataGraphic[i] = parseFloat(dataGraphicResponse2[i].field2);
                dateGraphic[i] = currentDate;
                //dateGraphic[i] = currentDate + " T " + serieGraphic[i][0].split('T')[1].substring(0, 8);

            }
        }
    } else if (typeNodeGraphic.value == "Acceleration") {
        typeGprahic = 'Độ (°)';
        for (let i = 0; i < dataGraphicResponse3.length; i++) {
            serieGraphic[i] = []
            serieGraphic[i][0] = dataGraphicResponse3[i].created_at
            currentDate = serieGraphic[i][0].split('T')[0];
            if (currentDate >= fromDateValue && currentDate <= toDateValue) {
                // Xử lý phần tử
                //serieGraphic[i][1] = parseFloat(dataResponse[i].field1)
                dataGraphic[i] = parseFloat(dataGraphicResponse3[i].field3);
                dateGraphic[i] = currentDate;
                //dateGraphic[i] = currentDate + " T " + serieGraphic[i][0].split('T')[1].substring(0, 8);

            }
        }
    } else if (typeNodeGraphic.value == "Battery") {
        typeGprahic = '(%)';
        for (let i = 0; i < dataGraphicResponse4.length; i++) {
            serieGraphic[i] = []
            serieGraphic[i][0] = dataGraphicResponse4[i].created_at
            currentDate = serieGraphic[i][0].split('T')[0];
            if (currentDate >= fromDateValue && currentDate <= toDateValue) {
                // Xử lý phần tử
                //serieGraphic[i][1] = parseFloat(dataResponse[i].field1)
                dataGraphic[i] = parseFloat(dataGraphicResponse4[i].field4);
                dateGraphic[i] = currentDate;
                //dateGraphic[i] = currentDate + " T " + serieGraphic[i][0].split('T')[1].substring(0, 8);

            }
        }
    }
    console.log(dateGraphic);
    console.log(dataGraphic);
    // Mảng dữ liệu cảm biến
    var sensorData = [10, 15, 20, NaN, 18, 25, 30, NaN, 22, 16, NaN, 19, 23, 27, 32];
    // Mảng ngày tháng của dữ liệu cảm biến
    var dates = ['2023-05-01', '2023-05-01', '2023-05-01', '2023-05-02', '2023-05-02', '2023-05-02', '2023-05-03', '2023-05-03', '2023-05-03', '2023-05-04', '2023-05-04', '2023-05-04', '2023-05-05', '2023-05-05', '2023-05-05'];

    // Tạo đối tượng lưu trữ dữ liệu cho từng ngày
    var dailyData = {};
    for (var i = 0; i < dateGraphic.length; i++) {
        var date = dateGraphic[i];
        var value = dataGraphic[i];
        if (!isNaN(value) && value !== null) {
            if (!dailyData[date]) {
                dailyData[date] = {
                    values: [],
                    sum: 0,
                    count: 0
                };
            }
            dailyData[date].values.push(value);
            dailyData[date].sum += value;
            dailyData[date].count++;
        }
    }

    // Tính giá trị trung bình cho từng ngày
    var dailyAverages = [];
    for (var date in dailyData) {
        if (dailyData.hasOwnProperty(date)) {
            var average = dailyData[date].sum / dailyData[date].count;
            dailyAverages.push(average);
        }
    }

    // Tạo mảng ngày tháng (unique)
    var uniqueDates = Object.keys(dailyData);

    // Tạo biểu đồ sử dụng Highcharts
    Highcharts.chart('chart-container', {
        chart: {
            type: 'line'
        },
        accessibility: {
            enabled: false
        },
        title: {
            text: 'Đồ thị giá trị trung bình theo ngày về ' + typeNodeGraphic.value
        },
        xAxis: {
            title: {
                text: 'Thời gian '
            },
            categories: uniqueDates
        },
        yAxis: {
            title: {
                text: 'Giá trị trung bình theo ' + typeGprahic
            }
        },
        series: [{
            name: typeNodeGraphic.value + ' ' + typeGprahic,
            data: dailyAverages
        }]
    });
}
/*============================STATE NODE REQUEST=================================*/
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
/*============================SIDE BAR SCROLL=================================*/
var sidebar = document.querySelector(".side-bar");

window.addEventListener("scroll", function () {
    sidebar.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
});
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


