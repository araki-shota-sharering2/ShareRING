// ページが読み込まれたときにユーザー情報を取得
async function fetchUserInfo() {
    try {
        const response = await fetch('/user-info', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            // ユーザー名、メールアドレス、作成日を表示
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email;
            document.getElementById('created-at').textContent = new Date(user.created_at).toLocaleDateString();
            // プロフィール画像の設定
            const profileImageUrl = user.profile_image ? user.profile_image : '/assets/images/default-profile.png';
            document.getElementById('profile-image').src = profileImageUrl;
        } else {
            console.error("ユーザー情報の取得に失敗しました");
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

// 編集ボタンのクリックイベント
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const field = event.target.getAttribute('data-field');
        const displayElement = document.getElementById(field);
        const inputElement = document.getElementById(`edit-${field}`);

        if (inputElement.style.display === 'none') {
            inputElement.value = displayElement.textContent;
            displayElement.style.display = 'none';
            inputElement.style.display = 'inline';
            event.target.textContent = '保存';
        } else {
            const formData = new FormData();
            formData.append(field, inputElement.value);

            updateUserInfo(formData, field, displayElement, inputElement, event.target);
        }
    });
});

// ユーザー情報の更新
async function updateUserInfo(formData, field, displayElement, inputElement, button) {
    try {
        const response = await fetch('/update-user-info', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();
        if (response.ok) {
            displayElement.textContent = formData.get(field);
            inputElement.style.display = 'none';
            displayElement.style.display = 'inline';
            button.textContent = '編集';
            alert("情報が更新されました");
        } else {
            console.error("情報の更新に失敗しました:", result.message);
            alert("情報の更新に失敗しました: " + result.message);
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
        alert("情報の更新中にエラーが発生しました");
    }
}

// ログアウトボタンのクリックイベント
document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = '/login/login.html';
        } else {
            console.error("ログアウトに失敗しました");
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
});

// アカウント削除ボタンのクリックイベント
document.getElementById('delete-account-button').addEventListener('click', async () => {
    if (!confirm("本当にアカウントを削除しますか？この操作は取り消せません。")) {
        return;
    }

    // ユーザーのメールアドレスとパスワードを入力させて確認
    const email = prompt("メールアドレスを入力してください:");
    const password = prompt("パスワードを入力してください:");

    if (!email || !password) {
        alert("メールアドレスとパスワードを入力してください");
        return;
    }

    try {
        const response = await fetch('/delete-account-handler', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert("アカウントが削除されました");
            window.location.href = '/login/login.html'; // ログイン画面にリダイレクト
        } else {
            console.error("アカウントの削除に失敗しました");
            alert("メールアドレスまたはパスワードが間違っているか、エラーが発生しました");
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
        alert("アカウント削除中にエラーが発生しました");
    }
});

// 星の背景をランダムに配置
document.addEventListener("DOMContentLoaded", function() {
    console.log("マイページが読み込まれました");

    // ユーザー情報の取得
    fetchUserInfo();

    // 星をランダムに配置
    const body = document.querySelector('body');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        body.appendChild(star);
    }
});
