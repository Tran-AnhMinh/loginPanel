const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('Username');
const passwordInput = document.getElementById('Password');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const username = usernameInput.value;
    const password = passwordInput.value;

    submitBtn.innerText = "Đang xử lý...";
    submitBtn.disabled = true;
    errorMessage.style.display = "none";

    try {

        const response = await fetch('https://tdhistest.pmr.vn:19187/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                loginMSA: true
            })
        });

        const data = await response.json();


        if (response.ok) {

            localStorage.setItem('accessToken', data.token);

            alert('Đăng nhập thành công!');



            //chuyển hướng khi đăng nhập thành công

            //******************************************* */
            window.location.href = "#";
            //******************************************* */




        } else {
            showError(data.message || 'Tài khoản hoặc mật khẩu không đúng!');
        }

    } catch (error) {
        showError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        console.error("Lỗi:", error);
    } finally {
        submitBtn.innerText = "Đăng nhập ngay";
        submitBtn.disabled = false;
    }
});

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
}