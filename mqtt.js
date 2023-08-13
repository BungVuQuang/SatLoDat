
const url = 'wss://broker.emqx.io:8083/mqtt'
var checkConnect = false;
var MoistureInput = document.querySelector("#Moisture");
var RainfallInput = document.querySelector("#Rainfall");
var AccelerationInput = document.querySelector("#Acceleration");
var IDNodeInput = document.querySelector(".select-node-thresh");
// Create an MQTT client instance
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    rejectUnauthorized: false,
    clientId: 'androidClientId2',
    // Authentication
}
// Tạo một đối tượng kết nối MQTT ws://broker.mqttdashboard.com:8884/mqtt
var client = mqtt.connect('wss://mqtt-dashboard.com:8884/mqtt', options);

// Xử lý sự kiện khi kết nối thành công
client.on('connect', function () {
    console.log('Đã kết nối thành công đến MQTT Broker');
    checkConnect = true;
    // Đăng ký để nhận các tin nhắn từ một chủ đề cụ thể
    client.subscribe('/SatLoDat/Healthy');
    //client.subscribe('home/element');
    //client.publish('home/element', `Gateway led 1`);
});

/*============================STATE NODE REQUEST=================================*/
var stateButton = document.getElementById("state-button");
var tableDataState = document.querySelector(".data-state-table");
var IDNodeSearchInput = document.querySelector("#select-node-state");
stateButton.addEventListener("click", function () {
    IDNodeSearchValue = IDNodeSearchInput.value;
    var payload = `{"ID_Device":${IDNodeSearchValue}, "Moisture":0,"Rainfall":0, "Acceleration":0, "Battery":0, "Command":0}`;
    if (checkConnect == true) {
        // Gửi một tin nhắn đến một chủ đề cụ thể
        client.publish('/SatLoDat/Command', `${payload}`);
    }
});

// Xử lý sự kiện khi nhận được một tin nhắn
client.on('message', function (topic, message) {
    var date = new Date();
    var options = {
        timeZone: 'Asia/Ho_Chi_Minh',
    };
    // Lấy ngày tháng năm
    var day = date.toLocaleDateString('en-US', options);
    // Lấy giờ, phút, giây
    var time = date.toLocaleTimeString('en-US', options);
    const obj = JSON.parse(message.toString());
    jQuery("#data-state-list").append(
        " <tr>\n" +
        "    <td>" + obj.ID_Device + "</td>\n" +
        "    <td>" + obj.Moisture + "</td>\n" +
        "    <td>" + obj.Rainfall + "</td>\n" +
        "    <td>" + obj.Acceleration + "</td>\n" +
        "    <td>" + obj.Battery + "</td>\n" +
        "    <td>" + day + "</td>\n" +
        "    <td>" + time + "</td>\n" +
        "</tr>"
    );
    tableDataState.style.display = "block";
    console.log('Nhận được tin nhắn từ chủ đề:', topic, ' - Nội dung:', message.toString());
});
/*=========================== SETUP THRESHOLD NODE REQUEST=================================*/
var setupButton = document.getElementById("setup-button");
var MoistureInput = document.querySelector("#Moisture");
var RainfallInput = document.querySelector("#Rainfall");
var AccelerationInput = document.querySelector("#Acceleration");
var IDNodeInput = document.querySelector(".select-node-thresh");
setupButton.addEventListener("click", function () {
    let MoistureValue = MoistureInput.value;
    let RainfallValue = RainfallInput.value;
    let AccelerationValue = AccelerationInput.value;
    let IDNodeValue = IDNodeInput.value;
    var payload = `{"ID_Device":${IDNodeValue}, "Moisture":${MoistureValue},"Rainfall":${RainfallValue}, "Acceleration":${AccelerationValue}, "Battery":0, "Command":3}`;
    if (checkConnect == true) {
        // Gửi một tin nhắn đến một chủ đề cụ thể
        client.publish('/SatLoDat/Command', `${payload}`);
    }
});


/*============================STATE MQTT BROKER=================================*/
// Xử lý sự kiện khi mất kết nối
client.on('offline', function () {
    console.log('Đã mất kết nối đến MQTT Broker');
});



// //const $ = document.querySelector.bind(document);
// //const $$ = document.querySelectorAll.bind(document);

// var client = null;
// var tempData = new Array();
// var connected = false;
// var temperature = -1;
// var humidity = -1;
// var cnt = 0;
// var toast = document.querySelector(".toast");
// var btn = document.querySelector(".toast-btn");
// var close = document.querySelector(".toast-close");
// var progress = document.querySelector(".progress-toast");
// var text1 = document.querySelector('.text-1');
// var text2 = document.querySelector('.text-2');
// var xhttp1 = new XMLHttpRequest();//dùng AJAX
// var cluster1node1Check = 0;
// var cluster1node2Check = 0;
// var cluster1node3Check = 0;
// var cluster1node4Check = 0;
// var cluster1node5Check = 0;
// var cluster2node1Check = 0;
// var cluster2node2Check = 0;
// var cluster2node3Check = 0;
// var cluster2node4Check = 0;
// var cluster2node5Check = 0;
// var backgroundCluster1Node1 = document.querySelector(".tab-pane .content .card.temperature.cluster1node1");
// var backgroundCluster1Node2 = document.querySelector(".tab-pane .content .card.temperature.cluster1node2");
// var backgroundCluster1Node3 = document.querySelector(".tab-pane .content .card.temperature.cluster1node3");
// var backgroundCluster1Node4 = document.querySelector(".tab-pane .content .card.temperature.cluster1node4");
// var backgroundCluster1Node5 = document.querySelector(".tab-pane .content .card.temperature.cluster1node5");
// var backgroundCluster2Node1 = document.querySelector(".tab-pane .content .card.temperature.cluster2node1");
// var backgroundCluster2Node2 = document.querySelector(".tab-pane .content .card.temperature.cluster2node2");
// var backgroundCluster2Node3 = document.querySelector(".tab-pane .content .card.temperature.cluster2node3");
// var backgroundCluster2Node4 = document.querySelector(".tab-pane .content .card.temperature.cluster2node4");
// var backgroundCluster2Node5 = document.querySelector(".tab-pane .content .card.temperature.cluster2node5");

// function battery_node1(charge) {
//     var index = 0;
//     jQuery(".battery .bar.node1").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_node2(charge) {
//     var index = 0;
//     jQuery(".battery .bar.node2").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }
// function battery_node3(charge) {
//     var index = 0;
//     jQuery(".battery .bar.node3").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }
// function battery_node4(charge) {
//     var index = 0;
//     jQuery(".battery .bar.node4").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }
// function battery_node5(charge) {
//     var index = 0;
//     jQuery(".battery .bar.node5").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_cluster2_node1(charge) {
//     var index = 0;
//     jQuery(".battery .bar.cluster2.node1").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_cluster2_node2(charge) {
//     var index = 0;
//     jQuery(".battery .bar.cluster2.node2").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_cluster2_node3(charge) {
//     var index = 0;
//     jQuery(".battery .bar..cluster2.node3").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_cluster2_node4(charge) {
//     var index = 0;
//     jQuery(".battery .bar.cluster2.node4").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }

// function battery_cluster2_node5(charge) {
//     var index = 0;
//     jQuery(".battery .bar.cluster2.node5").each(function () {
//         var power = Math.round(charge / 10);
//         if (index != power) {
//             jQuery(this).addClass("active");
//             index++;
//         } else {
//             jQuery(this).removeClass("active");
//         }
//     });
// }
// // $(".battery .bar").click(function () {
// //     battery(parseInt($(this).data("power")));
// // });


// function toastActive() {
//     toast.classList.add("active");
//     progress.classList.add("active");

//     setTimeout(() => {
//         toast.classList.remove("active");
//     }, 2000)

//     setTimeout(() => {
//         progress.classList.remove("active");
//     }, 2300)
// }

// close.addEventListener("click", () => {
//     toast.classList.remove("active");

//     setTimeout(() => {
//         progress.classList.remove("active");
//     }, 300)
// })

// jQuery.noConflict();

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for (var i = 0; i < 15; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return "client_" + text;
// }

// document.querySelector('#clientId').value = makeid();

// function logging(title, msg) {
//     var date = new Date();
//     jQuery("#log").prepend(date.toString() + " - " + title + ":\n"
//         + msg + "\n"
//         + "========\n");
// }

// function disconnect() {
//     client.disconnect();
//     text1.textContent = "Disconnected Successfully";
//     toastActive();
//     connected = false;
//     document.querySelector(".connect-btn").classList.remove("hide");
//     document.querySelector(".disconnect-btn").classList.add("hide");
//     msg = " [Information] | clientId=" + client.clientId;
//     title = "Disconnected Successfully";
//     logging(title, msg);
// }

// //document.addEventListener('DOMContentLoaded', function () {
// function subscribe(topic, qos) {
//     const Id = jQuery("#topiclist");
//     var id = Id.children("tr:last-child").attr("id");
//     if (id == undefined) {
//         id = 1;
//     } else {
//         id = Number(id) + 1;
//     }
//     client.subscribe(topic, {
//         qos: qos,
//         onSuccess: onSubSucc,
//         onFailure: onSubFail,
//         invocationContext: {
//             topic: topic,
//             qos: qos,
//             clientId: client.clientId,
//             id: id
//         }
//     });
//     function onSubSucc(context) {
//         topic = context.invocationContext.topic;
//         text1.textContent = "Subscribe Successfully"
//         toastActive();
//         if (jQuery("td:contains(" + topic + ")").length == 0) {
//             jQuery("#topiclist").append(
//                 " <tr id='" + context.invocationContext.id + "'>\n" +
//                 "    <td>" + context.invocationContext.id + "</td>\n" +
//                 "    <td>" + topic + "</td>\n" +
//                 "    <td>" + context.invocationContext.qos + "</td>\n" +
//                 "    <td>" + context.grantedQos + "</td>\n" +
//                 "    <td>\n" +
//                 "       <button class='unsubscribe-btn' " +
//                 "onclick='unsubscribe(" + id + ")' type='button'>Unsubscribe</button>\n" +
//                 "    </td>\n" +
//                 "</tr>"
//             );
//         } else {
//             qosobj = jQuery("td:contains(" + topic + ")")[0].nextElementSibling;
//             qosobj.innerText = context.invocationContext.qos;
//             gqosobj = qosobj.nextElementSibling;
//             gqosobj.innerText = context.grantedQos;
//         }

//         msg = " [Subscription information] | clientId= " + context.invocationContext.clientId + ", topicFilter=" + topic
//             + ", QoS=" + context.invocationContext.qos + ", grantedQoS=" + context.grantedQos;
//         title = "SUBSCRIBE succeeded";
//         logging(title, msg);
//     }

//     function onSubFail(context) {
//         msg = " [Subscription Infomation] | clientId= " + context.invocationContext.clientId + ", topicFilter=" + topic
//             + ", QoS=" + context.invocationContext.qos + ", errorCode=" + context.errorCode
//             + ", errorMessage=" + context.errorMessage;
//         title = "SUBSCRIBE failed";
//         logging(title, msg);
//     }
// }
// //});

// function unsubscribe(id) {
//     if (connected == false) {
//         //layer.msg('Need to connect before unsubscribing', { icon: 2, offset: 200 });
//         return;
//     }
//     text1.textContent = "Unsubscribe Successfully"
//     toastActive();
//     topic = jQuery("#" + id).children("td:nth-child(2)").text();
//     client.unsubscribe(topic, {
//         onSuccess: onUnsubSucc,
//         onFailure: onUnsubFail,
//         invocationContext: {
//             topic: topic,
//             clientId: client.clientId,
//             id: id
//         }
//     });
//     function onUnsubSucc(context) {
//         //layer.msg('Unsubscribe succeeded', { icon: 1, offset: 200 });
//         jQuery("#" + context.invocationContext.id).remove();
//         msg = " [Subscription information] | clientId= " + context.invocationContext.clientId + ", topicFilter=" + topic;
//         title = "UNSUBSCRIBE succeeded";
//         logging(title, msg);
//     }

//     function onUnsubFail(context, errorCode, errorMessage) {
//         msg = " [Subscription information] | clientId= " + context.invocationContext.clientId + ", topicFilter=" + topic
//             + ", errorCode=" + context.errorCode + ", errorMessage=" + context.errorMessage;
//         title = "UNSUBSCRIBE Fail";
//         logging(title, msg);
//     }
// }
// function publish(topic, payload, qos, retain) {
//     console.log(topic, payload, qos, retain);
//     client.publish(topic, payload, qos, retain);
// }
// var form = document.querySelector('#connect-form');
// var formSub = document.querySelector('#form-subscripton');
// var formSetup = document.querySelector('#form-setup');
// var formChangeWifi = document.querySelector('#form-change');
// var formDeleteNode = document.querySelector('#form-delete');
// formSub.addEventListener('submit', function (events) {
//     events.preventDefault();
//     if (connected == false) {
//         text1.textContent = "Chưa connect bạn ơi !"
//         toastActive();
//         return;
//     }

//     var topic = formSub.elements["subtopic"].value;
//     var qos = Number(formSub.elements["subqos"].value);
//     subscribe(topic, qos);
// });

// function checkTime(i) {
//     if (i < 10) {
//         i = "0" + i;
//     }
//     return i;
// }
// var temp = 0;
// formSetup.addEventListener('submit', function (events) {
//     events.preventDefault();
//     if (connected == false) {
//         text1.textContent = "Chưa connect bạn ơi !"
//         toastActive();
//         return;
//     }
//     var cluster_name = Number(formSetup.elements["cluster"].value);
//     var node_name = Number(formSetup.elements["subqos"].value);
//     var Threshold_Temper = formSetup.elements["temper"].value;
//     var mode = formSetup.elements["subqos5"].value;
//     var topic = `/Temperature/Setup`;
//     var qos = Number(0);
//     var payload = `{"Cluster":"${cluster_name}", "Node":"${node_name}","Temperature":"${Threshold_Temper}", "Mode":"${mode}"}`;
//     var retain = false;
//     console.log(payload);
//     publish(topic, payload, qos, retain);
//     var today = new Date();
//     // Giờ, phút, giây hiện tại
//     var h = today.getHours();
//     var m = today.getMinutes();
//     var s = today.getSeconds();
//     temp = temp + 1;
//     // Chuyển đổi sang dạng 01, 02, 03
//     m = checkTime(m);
//     s = checkTime(s);
//     jQuery("#set_up_list").append(
//         " <tr id='Node1'>\n" +
//         "    <td>" + temp + "</td>\n" +
//         "    <td>" + h + ":" + m + ":" + s + "</td>\n" +
//         "    <td>" + formSetup.elements["temper"].value + "</td>\n" +
//         "    <td>" + formSetup.elements["subqos"].value + "</td>\n" +
//         "    <td>" + formSetup.elements["subqos5"].value + "</td>\n" +
//         "</tr>"
//     );
// });

// formChangeWifi.addEventListener('submit', function (events) {
//     events.preventDefault();
//     if (connected == false) {
//         text1.textContent = "Chưa connect bạn ơi !"
//         toastActive();
//         return;
//     }
//     var ssid = formChangeWifi.elements["SSID"].value;
//     var password = formChangeWifi.elements["password"].value;
//     var topic = `/Temperature/Setup`;
//     var qos = Number(0);
//     var payload = `${ssid} ${password}`;
//     var retain = false;
//     console.log(payload);
//     publish(topic, payload, qos, retain);
//     text1.textContent = "Đã thay đổi Wifi Info :>"
//     toastActive();
// });

// formDeleteNode.addEventListener('submit', function (events) {
//     events.preventDefault();
//     if (connected == false) {
//         text1.textContent = "Chưa connect bạn ơi !"
//         toastActive();
//         return;
//     }
//     var node = formDeleteNode.elements["node_num"].value;
//     var topic = `/Temperature/Setup`;
//     var qos = Number(0);
//     var payload = `Delete ${node}`;
//     var retain = false;
//     console.log(payload);
//     publish(topic, payload, qos, retain);
//     text1.textContent = `Đã xoá Node ${node} ra khỏi mạng :>`
//     toastActive();
// });

// form.addEventListener('submit', function (events) {
//     events.preventDefault();
//     //var data = document.form;
//     var hostname = form.elements["hostname"].value;
//     var port = Number(form.elements["port"].value);
//     var suburl = form.elements["suburl"].value;

//     var username = form.elements["username"].value;
//     var password = form.elements["password"].value;
//     var clientId = form.elements["clientId"].value;

//     var timeout = form.elements["timeout"].value == "" ? 10 : Number(form.elements["timeout"].value);
//     var keepalive = form.elements["keepalive"].value == "" ? 60 : Number(form.elements["keepalive"].value);
//     var cleansession = form.elements["cleansession"].value == "true" ? true : false;
//     var ssl = form.elements["ssl"].value == "true" ? true : false;
//     var reconnect = form.elements["reconnect"].value == "true" ? true : false;
//     var mqttversion = Number(form.elements["mqttversion"].value);

//     client = new Paho.Client(hostname, port, suburl, clientId);
//     //client = new Paho.MQTT.Client(hostname, port, 'bungdz');

//     // set callback handlers
//     client.onConnectionLost = onConnectionLost;
//     client.onMessageArrived = onMessageArrived;
//     client.onMessageDelivered = onMessageDelivered;

//     var options = {
//         invocationContext: { host: hostname, port: port, path: suburl, clientId: clientId },
//         timeout: timeout,
//         keepAliveInterval: keepalive,
//         cleanSession: cleansession,
//         useSSL: ssl,
//         reconnect: reconnect,
//         mqttVersion: mqttversion,
//         onSuccess: onSuccess,
//         onFailure: onFailure,
//         userName: username,
//         password: password,
//     };

//     client.connect(options);

//     var msg = " [Server] | " + hostname + ":" + port + suburl + "\n"
//         + " [Account] | username=" + username + ", password=" + password + ", clientId" + clientId + "\n"
//         + " [Parameters] | timeout=" + timeout + ", keepalive=" + keepalive + ", cleansession=" + cleansession
//         + ", ssl=" + ssl + ", reconnect=" + reconnect + ", mqttversion=" + mqttversion;

//     title = "CONNECT Initiate a connect operation";
//     logging(title, msg);
//     // called when the client connects
//     function onSuccess(context) {
//         document.querySelector(".connect-btn").classList.add("hide");
//         document.querySelector(".disconnect-btn").classList.remove("hide");
//         text1.textContent = "Connected Successfully"
//         toastActive();
//         connected = true;
//         msg = " [Infomation] | clientId=" + context.invocationContext.clientId;
//         title = "CONNECT SUCCEEDED";
//         logging(title, msg);

//     }
//     setInterval(function () {
//         if (cluster1node1Check == 0) {
//             backgroundCluster1Node1.style.backgroundColor = '#FF0000';
//         }
//         if (cluster1node2Check == 0) {
//             backgroundCluster1Node2.style.backgroundColor = '#FF0000';
//         }
//         if (cluster1node3Check == 0) {
//             backgroundCluster1Node3.style.backgroundColor = '#FF0000';
//         }
//         if (cluster1node4Check == 0) {
//             backgroundCluster1Node4.style.backgroundColor = '#FF0000';
//         }
//         if (cluster1node5Check == 0) {
//             backgroundCluster1Node5.style.backgroundColor = '#FF0000';
//         }
//         if (cluster2node1Check == 0) {
//             backgroundCluster2Node1.style.backgroundColor = '#FF0000';
//         }
//         if (cluster2node2Check == 0) {
//             backgroundCluster2Node2.style.backgroundColor = '#FF0000';
//         }
//         if (cluster2node3Check == 0) {
//             backgroundCluster2Node3.style.backgroundColor = '#FF0000';
//         }
//         if (cluster2node4Check == 0) {
//             backgroundCluster2Node4.style.backgroundColor = '#FF0000';
//         }
//         if (cluster2node5Check == 0) {
//             backgroundCluster2Node5.style.backgroundColor = '#FF0000';
//         }
//     }, 50000);
//     setInterval(function () {
//         if (cluster1node1Check == 1) {
//             cluster1node1Check = 0;
//         }
//         if (cluster1node2Check == 1) {
//             cluster1node2Check = 0;
//         }
//         if (cluster1node3Check == 1) {
//             cluster1node3Check = 0;
//         }
//         if (cluster1node4Check == 1) {
//             cluster1node4Check = 0;
//         }
//         if (cluster1node5Check == 1) {
//             cluster1node5Check = 0;
//         }
//         if (cluster2node1Check == 1) {
//             cluster2node1Check = 0;
//         }
//         if (cluster2node2Check == 1) {
//             cluster2node2Check = 0;
//         }
//         if (cluster2node3Check == 1) {
//             cluster2node3Check = 0;
//         }
//         if (cluster2node4Check == 1) {
//             cluster2node4Check = 0;
//         }
//         if (cluster2node5Check == 1) {
//             cluster2node5Check = 0;
//         }
//     }, 40000);
//     function onFailure(context) {
//         console.log(context)
//         connected = false;
//         msg = " [Infomation] | clientId=" + context.invocationContext.clientId
//             + ", errorCode=" + context.errorCode + ", errorMessage=" + context.errorMessage;
//         title = "CONNECT failed";
//         logging(title, msg);
//     }

//     function onConnectionLost(context) {
//         if (context.errorCode !== 0) {
//             msg = " [error] | errorCode=" + context.errorCode + ", errorMessage=" + context.errorMessage;
//             title = "CONNECT error";
//             logging(title, msg);
//         }
//         connected = false;
//     }

//     function onMessageArrived(message) {
//         var date = new Date();

//         var payload = message.payloadString;
//         jQuery("#rcv").prepend(date.toString() + " - " + "Received the news" + ":\n"
//             + " [Received the news] | topic=" + message.destinationName + ", QoS=" + message.qos
//             + ", retained=" + message.retained + ", duplicate=" + message.duplicate
//             + ", payload=" + message.payloadString + "\n"
//             + "========\n");
//         cnt = Number(cnt) + Number(1);
//         document.querySelector(".message-count").textContent = String(Number(cnt));
//         console.log(" Message payload: " + payload);
//         //hàm lấy dữ iệu dht11 tách từ JSON key:value
//         //xhttp1.onreadystatechange = function () {
//         //JSON.create là đóng gói, còn JSON.parse là giải mã cái đóng gói thành key và value
//         let messs = message.payloadString.toString();
//         if (messs.indexOf("NEW") != -1) {
//             Email.send({
//                 Host: "smtp.elasticemail.com",
//                 Username: "mylifeisyou23@gmail.com",
//                 Password: "081BE6D4D66F9CB6F0B0B686B1683684A7A0",
//                 Port: 2525,
//                 To: 'quangbung2306@gmail.com',
//                 From: "mylifeisyou23@gmail.com",
//                 Subject: `Có thiết bị mới vào mạng !!!`,
//                 Body: `${messs}!!`
//             });
//         } else {
//             try {
//                 const obj = JSON.parse(message.payloadString);//parse cái key:value mà esp response lại
//                 var element1 = document.getElementById('t1');
//                 var element2 = document.getElementById('t2');
//                 var element3 = document.getElementById('t3');
//                 var element4 = document.getElementById('t4');
//                 var element5 = document.getElementById('t5');
//                 var cluster2Element1 = document.getElementById('cluster2-t1');
//                 var cluster2element2 = document.getElementById('cluster2-t2');
//                 var cluster2element3 = document.getElementById('cluster2-t3');
//                 var cluster2element4 = document.getElementById('cluster2-t4');
//                 var cluster2element5 = document.getElementById('cluster2-t5');
//                 if (obj.Cluster == 1 && obj.Node1 != undefined) {
//                     element1.innerText = obj.Node1;
//                     cluster1node1Check = 1;
//                     backgroundCluster1Node1.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=OMRASFVUCHSVNKDO&field1=' + obj.Node1);
//                     xhr.send();
//                     battery_node1(obj.Battery1);
//                 } else if (obj.Cluster == 1 && obj.Node2 != undefined) {
//                     element2.innerText = obj.Node2;
//                     cluster1node2Check = 1;
//                     backgroundCluster1Node2.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=OMRASFVUCHSVNKDO&field2=' + obj.Node2);
//                     xhr.send();
//                     battery_node2(obj.Battery2);
//                 } else if (obj.Cluster == 1 && obj.Node3 != undefined) {
//                     element3.innerText = obj.Node3;
//                     backgroundCluster1Node3.style.backgroundColor = '#FFFFFF';
//                     cluster1node3Check = 1;
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=OMRASFVUCHSVNKDO&field3=' + obj.Node3);
//                     xhr.send();
//                     battery_node3(obj.Battery3);
//                 } else if (obj.Cluster == 1 && obj.Node4 != undefined) {
//                     element4.innerText = obj.Node4;
//                     backgroundCluster1Node4.style.backgroundColor = '#FFFFFF';
//                     cluster1node4Check = 1;
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=OMRASFVUCHSVNKDO&field4=' + obj.Node4);
//                     xhr.send();
//                     battery_node4(obj.Battery4);
//                 } else if (obj.Cluster == 1 && obj.Node5 != undefined) {
//                     element5.innerText = obj.Node5;
//                     cluster1node5Check = 1;
//                     backgroundCluster1Node5.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     console.log("Da vao day")
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=OMRASFVUCHSVNKDO&field5=' + obj.Node5);
//                     xhr.send();
//                     battery_node5(obj.Battery5);
//                 } else if (obj.Cluster == 2 && obj.Node1 != undefined) {
//                     cluster2Element1.innerText = obj.Node1;
//                     cluster2node1Check = 1;
//                     backgroundCluster2Node1.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=QS86Z5K8J1WHJT6C&field1=' + obj.Node1);
//                     xhr.send();
//                     battery_cluster2_node1(obj.Battery1);
//                 } else if (obj.Cluster == 2 && obj.Node2 != undefined) {
//                     cluster2Element2.innerText = obj.Node2;
//                     cluster2node2Check = 1;
//                     backgroundCluster2Node2.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=QS86Z5K8J1WHJT6C&field2=' + obj.Node2);
//                     xhr.send();
//                     battery_cluster2_node2(obj.Battery2);
//                 } else if (obj.Cluster == 2 && obj.Node3 != undefined) {
//                     cluster2Element3.innerText = obj.Node3;
//                     cluster2node3Check = 1;
//                     backgroundCluster2Node3.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=QS86Z5K8J1WHJT6C&field3=' + obj.Node3);
//                     xhr.send();
//                     battery_cluster2_node3(obj.Battery3);
//                 } else if (obj.Cluster == 2 && obj.Node4 != undefined) {
//                     cluster2Element4.innerText = obj.Node4;
//                     cluster2node4Check = 1;
//                     backgroundCluster2Node4.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=QS86Z5K8J1WHJT6C&field4=' + obj.Node4);
//                     xhr.send();
//                     battery_cluster2_node4(obj.Battery4);
//                 } else if (obj.Cluster == 2 && obj.Node5 != undefined) {
//                     cluster2Element5.innerText = obj.Node5;
//                     cluster2node5Check = 1;
//                     backgroundCluster2Node5.style.backgroundColor = '#FFFFFF';
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('POST', 'https://api.thingspeak.com/update?api_key=QS86Z5K8J1WHJT6C&field5=' + obj.Node5);
//                     xhr.send();
//                     battery_cluster2_node5(obj.Battery5);
//                 }
//                 //temperature = parseFloat(obj.Temperature);
//                 // if (temperature >= setpoint) {
//                 //     Swal.fire({
//                 //         icon: 'error',
//                 //         title: `Nhiệt độ vượt quá ${setpoint} C`,
//                 //         width: 600,
//                 //         padding: '3em',
//                 //         color: '#716add',
//                 //         background: '#fff url("https://sweetalert2.github.io/images/trees.png")',
//                 //         backdrop: `
//                 //           rgba(0,0,123,0.4)
//                 //           url("https://sweetalert2.github.io/images/nyan-cat.gif")
//                 //           left top
//                 //           no-repeat
//                 //         `
//                 //     })
//                 //     Email.send({
//                 //         Host: "smtp.elasticemail.com",
//                 //         Username: "benzylaxetat23@gmail.com",
//                 //         Password: "75329D08F726718915058A2C3E316B1AE463",
//                 //         To: 'mylifeisyou23@gmail.com',
//                 //         From: "benzylaxetat23@gmail.com",
//                 //         Subject: `CANH BAO NHIET DO QUA MUC ${setpoint} C`,
//                 //         Body: "Hi there !!"
//                 //     }).then(
//                 //         message => alert(message)
//                 //     );
//                 //     var topic = '/temperature/fan';
//                 //     var qos = Number(0);
//                 //     var payload = '1';
//                 //     var retain = false;
//                 //     publish(topic, payload, qos, retain);
//                 // } else {
//                 //     var topic = '/temperature/fan';
//                 //     var qos = Number(0);
//                 //     var payload = '0';
//                 //     var retain = false;
//                 //     publish(topic, payload, qos, retain);
//                 // }
//             } catch (err) {
//                 console.log('error', err);
//             }
//         }
//         // tempData.push({
//         //     "timestamp": Date().slice(16, 21),
//         //     "temperature": parseInt(payload)
//         // });
//         // if (tempData.length >= 10) {
//         //     tempData.shift()
//         // }
//         // var element1 = document.getElementById('t1');
//         // element1.innerText = payload;
//         // var element1 = document.getElementById('h1');
//         // element1.innerText = payload;

//         //drawChart(tempData)
//     }

//     function onMessageDelivered(message) {
//         msg = " [Message] | topic=" + message.destinationName + ", QoS=" + message.qos
//             + ", retained=" + message.retained + ", duplicate=" + message.duplicate
//             + ", payload=" + message.payloadString;
//         title = "PUBLISH Successfully";
//         logging(title, msg);
//     }

// });
// // layui.use(['form', 'table', 'layer', 'element'], function () {
// //     var form = layui.form;
// //     var table = layui.table;
// //     var element = layui.element;


// //     //monitor commits
// //     form.on('submit(subscribe)', function (rawdata) {
// //         if (connected == false) {
// //             layer.msg('Need to connect before subscribing', { icon: 2, offset: 200 });
// //             return;
// //         }
// //         var data = rawdata.field;
// //         var topic = data.subtopic;
// //         var qos = Number(data.subqos);
// //         subscribe(topic, qos);
// //     });

// //     //monitor commits
// //     form.on('submit(publish)', function (rawdata) {
// //         if (connected == false) {
// //             layer.msg('Need to connect before publishing', { icon: 2, offset: 200 });
// //             return;
// //         }
// //         var data = rawdata.field;
// //         var topic = data.pubtopic;
// //         var qos = Number(data.pubqos);
// //         var payload = data.pubpayload;
// //         var retain = data.pubretain == true ? true : false;
// //         publish(topic, payload, qos, retain);
// //     });


// //     // monitor commits
// //     form.on('submit(connect)', function (rawdata) {
// //         var data = rawdata.field;

// //         var hostname = data.hostname;
// //         var port = Number(data.port);
// //         var suburl = data.suburl;

// //         var username = data.username;
// //         var password = data.password;
// //         var clientId = data.clientId;

// //         var timeout = data.timeout == "" ? 10 : Number(data.timeout);
// //         var keepalive = data.keepalive == "" ? 60 : Number(data.keepalive);
// //         var cleansession = data.cleansession == "true" ? true : false;
// //         var ssl = data.ssl == "true" ? true : false;
// //         var reconnect = data.reconnect == "true" ? true : false;
// //         var mqttversion = Number(data.mqttversion);

// //         var willmessage = null;


// //         if (data.wmopen == 1) {
// //             var willmessage = new Paho.Message(data.wmpayload);
// //             willmessage.retained = data.wmretain == "true" ? true : false;
// //             willmessage.qos = Number(data.wmqos);
// //             willmessage.destinationName = data.wmtopic;
// //         }

// //         client = new Paho.Client(hostname, port, suburl, clientId);

// //         // set callback handlers
// //         client.onConnectionLost = onConnectionLost;
// //         client.onMessageArrived = onMessageArrived;
// //         client.onMessageDelivered = onMessageDelivered;

// //         var options = {
// //             invocationContext: { host: hostname, port: port, path: suburl, clientId: clientId },
// //             timeout: timeout,
// //             keepAliveInterval: keepalive,
// //             cleanSession: cleansession,
// //             useSSL: ssl,
// //             reconnect: reconnect,
// //             mqttVersion: mqttversion,
// //             onSuccess: onSuccess,
// //             onFailure: onFailure,
// //             userName: username,
// //             password: password

// //         };

// //         client.connect(options);


// //         var msg = " [Server] | " + hostname + ":" + port + suburl + "\n"
// //             + " [Account] | username=" + username + ", password=" + password + ", clientId" + clientId + "\n"
// //             + " [Parameters] | timeout=" + timeout + ", keepalive=" + keepalive + ", cleansession=" + cleansession
// //             + ", ssl=" + ssl + ", reconnect=" + reconnect + ", mqttversion=" + mqttversion;

// //         if (data.wmopen == 1) {
// //             msg += "\n [Will Message] | topic=" + data.wmtopic + ", qos=" + data.wmqos + ", retained=" + data.wmretain
// //                 + ", payload=" + data.wmpayload;
// //         }

// //         title = "CONNECT Initiate a connect operation";
// //         logging(title, msg);


// //         // called when the client connects
// //         function onSuccess(context) {
// //             var connectionString = context.invocationContext.host + ":" + context.invocationContext.port + context.invocationContext.path;
// //             var navControlTitle = document.getElementById("nav-control-hide");
// //             layer.msg('Connection succeeded', { icon: 1, offset: 200 });
// //             navControlTitle.style.display = "inline";
// //             $("#connect-btn").addClass("layui-hide");
// //             $("#disconnect-btn").removeClass("layui-hide");
// //             connected = true;
// //             msg = " [Infomation] | clientId=" + context.invocationContext.clientId;
// //             title = "CONNECT SUCCEEDED";
// //             logging(title, msg);
// //         }

// //         function onFailure(context) {
// //             console.log(context)
// //             layer.msg('Connection failed', { icon: 2, offset: 200 });
// //             connected = false;
// //             msg = " [Infomation] | clientId=" + context.invocationContext.clientId
// //                 + ", errorCode=" + context.errorCode + ", errorMessage=" + context.errorMessage;
// //             title = "CONNECT failed";
// //             logging(title, msg);
// //         }

// //         // called when the client loses its connection
// //         function onConnectionLost(context) {
// //             if (context.errorCode !== 0) {
// //                 layer.msg('The connection is abnormally disconnected', { icon: 2, offset: 200 });
// //                 msg = " [error] | errorCode=" + context.errorCode + ", errorMessage=" + context.errorMessage;
// //                 title = "CONNECT error";
// //                 logging(title, msg);
// //             }
// //             connected = false;
// //         }

// //         // called when a message arrives
// //         function onMessageArrived(message) {

// //             var date = new Date();
// //             var payload = message.payloadString;
// //             $("#rcv").prepend(date.toString() + " - " + "Received the news" + ":\n"
// //                 + " [Received the news] | topic=" + message.destinationName + ", QoS=" + message.qos
// //                 + ", retained=" + message.retained + ", duplicate=" + message.duplicate
// //                 + ", payload=" + message.payloadString + "\n"
// //                 + "========\n");
// //             $("#newdot").removeClass("layui-hide");
// //             console.log(" Message payload: " + payload);
// //             temperature = parseInt(message.payloadString);
// //             // tempData.push({
// //             //     "timestamp": Date().slice(16, 21),
// //             //     "temperature": parseInt(payload)
// //             // });
// //             // if (tempData.length >= 10) {
// //             //     tempData.shift()
// //             // }
// //             var element1 = document.getElementById('t1');
// //             element1.innerText = payload;

// //             //drawChart(tempData)
// //         }

// //         function onMessageDelivered(message) {
// //             layer.msg('Message sent successfully', { icon: 1, offset: 200 });
// //             msg = " [Message] | topic=" + message.destinationName + ", QoS=" + message.qos
// //                 + ", retained=" + message.retained + ", duplicate=" + message.duplicate
// //                 + ", payload=" + message.payloadString;
// //             title = "PUBLISH Successfully";
// //             logging(title, msg);
// //         }

// //     });

// //     form.on('switch(wmfilter)', function (data) {
// //         if (data.elem.checked) {
// //             $("#wmdiv").removeClass("layui-hide");
// //         } else {
// //             $("#wmdiv").addClass("layui-hide");
// //         }
// //     });
// // });

// // var client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, "Bungdz123");

// // // set callback handlers
// // client.onConnectionLost = onConnectionLost;
// // client.onMessageArrived = onMessageArrived;

// // // connect the client
// // client.connect({ onSuccess: onConnect });


// // // called when the client connects
// // function onConnect() {
// //     // Once a connection has been made, make a subscription and send a message.
// //     console.log("onConnect");
// //     client.subscribe("World");
// //     message = new Paho.MQTT.Message("Hello");
// //     message.destinationName = "World";
// //     client.send(message);
// // }

// // // called when the client loses its connection
// // function onConnectionLost(responseObject) {
// //     if (responseObject.errorCode !== 0) {
// //         console.log("onConnectionLost:" + responseObject.errorMessage);
// //     }
// // }

// // // called when a message arrives
// // function onMessageArrived(message) {
// //     console.log("onMessageArrived:" + message.payloadString);
// // }

// ///https://api.thingspeak.com/channels/1253820/fields/3.json?api_key=EDMX5MRXCJ7LU0PO&days=4
// let requestURL = 'https://api.thingspeak.com/channels/1962864/fields/1.json?api_key=IPYUMN69TN5J7ZWQ';
// let requestURL2 = 'https://api.thingspeak.com/channels/1962864/fields/2.json?api_key=IPYUMN69TN5J7ZWQ';
// let requestURL3 = 'https://api.thingspeak.com/channels/1962864/fields/3.json?api_key=IPYUMN69TN5J7ZWQ';
// let requestURL4 = 'https://api.thingspeak.com/channels/1962864/fields/4.json?api_key=IPYUMN69TN5J7ZWQ';
// let requestURL5 = 'https://api.thingspeak.com/channels/1962864/fields/5.json?api_key=IPYUMN69TN5J7ZWQ';
// //let requestURL = 'https://api.thingspeak.com/channels/1253820/fields/3.json?api_key=EDMX5MRXCJ7LU0PO&days=4';
// let request = new XMLHttpRequest();
// let request2 = new XMLHttpRequest();
// let request3 = new XMLHttpRequest();
// let request4 = new XMLHttpRequest();
// let request5 = new XMLHttpRequest();

// let pinco1;
// let pinco2;
// let pinco3;
// let pinco4;

// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function () {
//     pinco1 = request.response;
// }

// request2.open('GET', requestURL2);
// request2.responseType = 'json';
// request2.send();
// request2.onload = function () {
//     pinco2 = request2.response;
// }
// request3.open('GET', requestURL3);
// request3.responseType = 'json';
// request3.send();
// request3.onload = function () {
//     pinco3 = request3.response;
// }
// request4.open('GET', requestURL4);
// request4.responseType = 'json';
// request4.send();
// request4.onload = function () {
//     pinco4 = request4.response;
// }
// request5.open('GET', requestURL5);
// request5.responseType = 'json';
// request5.send();
// request5.onload = function () {
//     var pinco5 = request5.response;
//     populatechart(pinco1, pinco2, pinco3, pinco4, pinco5);
// }

// function populatechart(pallino, pallino1, pallino2, pallino3, pallino4) {
//     console.log(pallino)
//     console.log(pallino1)
//     console.log(pallino2)
//     console.log(pallino3)
//     console.log(pallino4)
//     var misure = pallino.feeds;
//     var misure1 = pallino1.feeds;
//     var misure2 = pallino2.feeds;
//     var misure3 = pallino3.feeds;
//     var misure4 = pallino4.feeds;
//     var serie = [
//         []
//     ];
//     var serie1 = [
//         []
//     ];
//     var serie2 = [
//         []
//     ];
//     var serie3 = [
//         []
//     ];
//     var serie4 = [
//         []
//     ];
//     for (let i = 0; i < misure.length; i++) {
//         serie[i] = []
//         serie[i][0] = misure[i].created_at
//         serie[i][1] = parseFloat(misure[i].field1)

//     }
//     for (let i = 0; i < misure1.length; i++) {
//         serie1[i] = []
//         serie1[i][0] = misure1[i].created_at
//         serie1[i][1] = parseFloat(misure1[i].field2)

//     }
//     for (let i = 0; i < misure2.length; i++) {
//         serie2[i] = []
//         serie2[i][0] = misure2[i].created_at
//         serie2[i][1] = parseFloat(misure2[i].field3)

//     }
//     for (let i = 0; i < misure3.length; i++) {
//         serie3[i] = []
//         serie3[i][0] = misure3[i].created_at
//         serie3[i][1] = parseFloat(misure3[i].field4)

//     }
//     for (let i = 0; i < misure4.length; i++) {
//         serie4[i] = []
//         serie4[i][0] = misure4[i].created_at
//         serie4[i][1] = parseFloat(misure4[i].field5)

//     }
//     serie.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie1.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie2.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie3.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie4.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     Highcharts.chart('container', {
//         xAxis: {
//             type: 'datetime',
//             //max: 4 * 24 * 3600000,
//             labels: {
//                 overflow: 'justify'
//             }
//         },
//         title: {
//             text: 'History Temperature'
//         },

//         yAxis: {
//             title: {
//                 text: 'Temperature(°C)'
//             },
//             plotLines: [{
//                 value: 0,
//                 width: 1,
//                 color: '#808080'
//             }]
//         },
//         tooltip: {
//             valueSuffix: '°C'
//         },
//         exporting: {
//             enabled: true
//         },
//         legend: {
//             layout: 'vertical',
//             align: 'right',
//             verticalAlign: 'middle',
//             borderWidth: 0
//         },
//         rangeSelector: {
//             buttons: [{
//                 count: 1,
//                 type: 'minute',
//                 text: '1M'
//             }, {
//                 count: 5,
//                 type: 'minute',
//                 text: '5M'
//             }, {
//                 type: 'all',
//                 text: 'All'
//             }],
//             inputEnabled: false,
//             selected: 0
//         },
//         series: [{
//             type: 'line',
//             name: 'Node1',
//             data: serie
//         },
//         {
//             type: 'line',
//             name: 'Node2',
//             data: serie1
//         },
//         {
//             type: 'line',
//             name: 'Node3',
//             data: serie2
//         }
//             ,
//         {
//             type: 'line',
//             name: 'Node4',
//             data: serie3
//         }
//             ,
//         {
//             type: 'line',
//             name: 'Node5',
//             data: serie4
//         }
//         ],

//     });
// }


// let cluster2requestURL = 'https://api.thingspeak.com/channels/2006971/fields/1.json?api_key=ST1UZ4X1M9T5W0YK';
// let cluster2requestURL2 = 'https://api.thingspeak.com/channels/2006971/fields/2.json?api_key=ST1UZ4X1M9T5W0YK';
// let cluster2requestURL3 = 'https://api.thingspeak.com/channels/2006971/fields/3.json?api_key=ST1UZ4X1M9T5W0YK';
// let cluster2requestURL4 = 'https://api.thingspeak.com/channels/2006971/fields/4.json?api_key=ST1UZ4X1M9T5W0YK';
// let cluster2requestURL5 = 'https://api.thingspeak.com/channels/2006971/fields/5.json?api_key=ST1UZ4X1M9T5W0YK';
// //let requestURL = 'https://api.thingspeak.com/channels/1253820/fields/3.json?api_key=EDMX5MRXCJ7LU0PO&days=4';
// let cluster2request = new XMLHttpRequest();
// let cluster2request2 = new XMLHttpRequest();
// let cluster2request3 = new XMLHttpRequest();
// let cluster2request4 = new XMLHttpRequest();
// let cluster2request5 = new XMLHttpRequest();

// let cluster2pinco1;
// let cluster2pinco2;
// let cluster2pinco3;
// let cluster2pinco4;

// cluster2request.open('GET', cluster2requestURL);
// cluster2request.responseType = 'json';
// cluster2request.send();
// cluster2request.onload = function () {
//     cluster2pinco1 = cluster2request.response;
// }

// cluster2request2.open('GET', cluster2requestURL2);
// cluster2request2.responseType = 'json';
// cluster2request2.send();
// cluster2request2.onload = function () {
//     cluster2pinco2 = cluster2request2.response;
// }
// cluster2request3.open('GET', cluster2requestURL3);
// cluster2request3.responseType = 'json';
// cluster2request3.send();
// cluster2request3.onload = function () {
//     cluster2pinco3 = cluster2request3.response;
// }
// cluster2request4.open('GET', cluster2requestURL4);
// cluster2request4.responseType = 'json';
// cluster2request4.send();
// cluster2request4.onload = function () {
//     cluster2pinco4 = cluster2request4.response;
// }
// cluster2request5.open('GET', cluster2requestURL5);
// cluster2request5.responseType = 'json';
// cluster2request5.send();
// cluster2request5.onload = function () {
//     var cluster2pinco5 = cluster2request5.response;
//     populateCluster2Chart(cluster2pinco1, cluster2pinco2, cluster2pinco3, cluster2pinco4, cluster2pinco5);
// }

// function populateCluster2Chart(pallino, pallino1, pallino2, pallino3, pallino4) {
//     console.log(pallino)
//     console.log(pallino1)
//     console.log(pallino2)
//     console.log(pallino3)
//     console.log(pallino4)
//     var misure = pallino.feeds;
//     var misure1 = pallino1.feeds;
//     var misure2 = pallino2.feeds;
//     var misure3 = pallino3.feeds;
//     var misure4 = pallino4.feeds;
//     var serie = [
//         []
//     ];
//     var serie1 = [
//         []
//     ];
//     var serie2 = [
//         []
//     ];
//     var serie3 = [
//         []
//     ];
//     var serie4 = [
//         []
//     ];
//     for (let i = 0; i < misure.length; i++) {
//         serie[i] = []
//         serie[i][0] = misure[i].created_at
//         serie[i][1] = parseFloat(misure[i].field1)

//     }
//     for (let i = 0; i < misure1.length; i++) {
//         serie1[i] = []
//         serie1[i][0] = misure1[i].created_at
//         serie1[i][1] = parseFloat(misure1[i].field2)

//     }
//     for (let i = 0; i < misure2.length; i++) {
//         serie2[i] = []
//         serie2[i][0] = misure2[i].created_at
//         serie2[i][1] = parseFloat(misure2[i].field3)

//     }
//     for (let i = 0; i < misure3.length; i++) {
//         serie3[i] = []
//         serie3[i][0] = misure3[i].created_at
//         serie3[i][1] = parseFloat(misure3[i].field4)

//     }
//     for (let i = 0; i < misure4.length; i++) {
//         serie4[i] = []
//         serie4[i][0] = misure4[i].created_at
//         serie4[i][1] = parseFloat(misure4[i].field5)

//     }
//     serie.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie1.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie2.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie3.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     serie4.forEach(function (point) {
//         point[0] = Date.parse(point[0])
//     });
//     Highcharts.chart('cluster2-container', {
//         xAxis: {
//             type: 'datetime',
//             //max: 4 * 24 * 3600000,
//             labels: {
//                 overflow: 'justify'
//             }
//         },
//         title: {
//             text: 'History Temperature'
//         },

//         yAxis: {
//             title: {
//                 text: 'Temperature(°C)'
//             },
//             plotLines: [{
//                 value: 0,
//                 width: 1,
//                 color: '#808080'
//             }]
//         },
//         tooltip: {
//             valueSuffix: '°C'
//         },
//         exporting: {
//             enabled: true
//         },
//         legend: {
//             layout: 'vertical',
//             align: 'right',
//             verticalAlign: 'middle',
//             borderWidth: 0
//         },
//         rangeSelector: {
//             buttons: [{
//                 count: 1,
//                 type: 'minute',
//                 text: '1M'
//             }, {
//                 count: 5,
//                 type: 'minute',
//                 text: '5M'
//             }, {
//                 type: 'all',
//                 text: 'All'
//             }],
//             inputEnabled: false,
//             selected: 0
//         },
//         series: [{
//             type: 'line',
//             name: 'Node1',
//             data: serie
//         },
//         {
//             type: 'line',
//             name: 'Node2',
//             data: serie1
//         },
//         {
//             type: 'line',
//             name: 'Node3',
//             data: serie2
//         }
//             ,
//         {
//             type: 'line',
//             name: 'Node4',
//             data: serie3
//         }
//             ,
//         {
//             type: 'line',
//             name: 'Node5',
//             data: serie4
//         }
//         ],

//     });
// }


// // Highcharts.stockChart('container', {
// //     chart: {
// //         // backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //         type: 'line',
// //         // events: {
// //         //     load: function () {

// //         //         // set up the updating of the chart each second
// //         //         var series = this.series[0];
// //         //         setInterval(function () {
// //         //             var x = (new Date()).getTime(), // current time
// //         //                 y = serie;
// //         //             series.addPoint([x, y]);
// //         //         }, 1000);
// //         //     }
// //         // }
// //     },

// //     accessibility: {
// //         enabled: false
// //     },

// //     time: {
// //         useUTC: false
// //     },

// //     rangeSelector: {
// //         buttons: [{
// //             count: 1,
// //             type: 'minute',
// //             text: '1M'
// //         }, {
// //             count: 5,
// //             type: 'minute',
// //             text: '5M'
// //         }, {
// //             type: 'all',
// //             text: 'All'
// //         }],
// //         inputEnabled: false,
// //         selected: 0
// //     },

// //     title: {
// //         text: 'Live Temperature'
// //     },

// //     yAxis: {
// //         title: {
// //             text: 'Temperature (°C)'
// //         },
// //         plotLines: [{
// //             value: 0,
// //             width: 1,
// //             color: '#808080'
// //         }]
// //     },
// //     tooltip: {
// //         valueSuffix: '°C'
// //     },
// //     exporting: {
// //         enabled: false
// //     },
// //     legend: {
// //         layout: 'vertical',
// //         align: 'right',
// //         verticalAlign: 'middle',
// //         borderWidth: 0
// //     },
// //     series: [{
// //         name: 'Temperature',
// //         data:
// //             (function () {
// //                 // generate an array of random data
// //                 var data = [],
// //                     time = (new Date()).getTime(),
// //                     i;

// //                 for (i = -300; i <= 0; i += 1) {
// //                     data.push([
// //                         time + i * 1000,
// //                         -1
// //                     ]);
// //                 }
// //                 return data;
// //             }())
// //     }]
// // });

