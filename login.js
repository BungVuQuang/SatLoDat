// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBtYH9hwRFMQ11cKLEvCPOwf9rE6EQSKg",
    authDomain: "satlodat-7c2cd.firebaseapp.com",
    projectId: "satlodat-7c2cd",
    storageBucket: "satlodat-7c2cd.appspot.com",
    messagingSenderId: "710346148245",
    appId: "1:710346148245:web:5bf5be36f57dbf6e0a8e9c",
    measurementId: "G-YMNZCNN9J4"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Đăng nhập
function log() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    // Xác thực người dùng sử dụng Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // Đăng nhập thành công
            var user = userCredential.user;
            alert("Đăng nhập thành công:", user);
            window.location.href = "main.html";
            // Thực hiện các hành động sau khi đăng nhập thành công
            // Ví dụ: chuyển hướng đến trang chính, hiển thị dữ liệu, v.v.
        })
        .catch(function (error) {
            // Đăng nhập thất bại
            var errorMessage = error.message;
            console.log("Đăng nhập thất bại:", errorMessage);
            document.getElementById("error-message").textContent = errorMessage;
        });
}