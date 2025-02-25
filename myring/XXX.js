document.addEventListener("DOMContentLoaded", function() {
    console.log("ホーム画面が読み込まれました");

    // 現在のURLに基づいてフッターリンクを強調
    const path = window.location.pathname;
    const footerLinks = document.querySelectorAll("footer a");

    footerLinks.forEach(link => {
        if (link.getAttribute("href") === path) {
            link.classList.add("active");
        }
    });

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
