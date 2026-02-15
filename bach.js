let score = 0; let target = 3; let currentIdx = -1;
let hyCount = 0; let currentNeeds = [];
const giftPool = ['🍑', '🧸', '🧧', '🌸', '🫔', '❤️', '🃏', '🎆', '🍎'];
const chars = [
    { i: "👦", n: "Vũ" }, { i: "👶", n: "Minh" }, { i: "🧒", n: "Bảo" },
    { i: "🧑", n: "Huy" }, { i: "😎", n: "Bách" }, { i: "👧", n: "Vi" }, { i: "👩", n: "Hà" }
];

const data = [
    { h: "福", t: "Phúc Mãn Đường", w: ["🏮 Phúc như Đông Hải, thọ tỷ Nam Sơn. Gia đình êm ấm!", "🏮 Phúc lộc đầy nhà, năm mới vạn sự hanh thông!", "🏮 Một chữ Phúc cho năm mới bình an, vạn điều như ý!"]},
    { h: "祿", t: "Lộc Tấn Vinh Hoa", w: ["💰 Tiền vào như nước sông Đà, tiền ra nhỏ giọt!", "💰 Công danh rạng rỡ, sự nghiệp thăng hoa, tiền đầy túi!", "💰 Lộc lá đầy nhà, mua sắm thả ga nhé!"]},
    { h: "壽", t: "Thọ Tỷ Nam Sơn", w: ["🛡️ Sức khỏe dẻo dai, bách niên giai lão!", "🛡️ Thân thể cường tráng, không lo ốm đau!", "🛡️ Luôn tràn đầy năng lượng chinh phục mọi thử thách!"]},
    { h: "智", t: "Trí Tuệ Minh", w: ["🧠 IQ thăng tiến, học một hiểu mười!", "🧠 Trí tuệ sáng láng, giúp bạn dẫn đầu!", "🧠 Mọi bài toán khó đều có lời giải hay!"]},
    { h: "喜", t: "Hỷ Khí Lâm Môn", w: ["💖 Tin vui gõ cửa liên tục, tình duyên thắm thiết!", "💖 Vạn sự như ý, tỷ sự như mơ!", "💖 Một năm ngập tràn tiếng cười và niềm vui!"]},
    { h: "安", t: "An Khang Thịnh Vượng", w: ["🍃 Một năm bình an, tâm hồn thanh thản!", "🍃 Sóng gió dừng sau cánh cửa, trả lại bình yên!", "🍃 Ngủ ngon mỗi tối, thức dậy với nụ cười!"]},
    { h: "財", t: "Tài Lộc Hanh Thông", w: ["💎 Tài năng phát tiết, làm đâu thắng đó!", "💎 Tiền bạc rủng rỉnh, sự nghiệp rạng danh!", "💎 Trở thành ngôi sao sáng nhất trong mắt mọi người!"]},
    { h: "忍", t: "Nhẫn Để Thành Công", w: ["🌟 Lòng kiên định như đá, ý chí vững như đồng!", "🌟 Nhẫn nại hôm nay là trái ngọt cho ngày mai!", "🌟 Vượt qua khó khăn để chạm tới vinh quang!"]},
    { h: "成", t: "Công Thành Danh Toại", w: ["🚀 Mã đáo thành công, vạn sự viên mãn!", "🚀 Mọi dự định ấp ủ đều đạt kết quả vượt mong đợi!", "🚀 Năm mới tỏa sáng rực rỡ nhất!"]}
];

function playSound(freq, type) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
}

function burstIcons(icon) {
    const corners = [{ x: 0, y: window.innerHeight }, { x: window.innerWidth, y: window.innerHeight }];
    for(let i=0; i<100; i++) {
        const corner = corners[i % 2];
        const el = document.createElement('div');
        el.className = 'burst-icon';
        el.innerText = icon;
        el.style.left = corner.x + 'px';
        el.style.top = corner.y + 'px';
        const tx = (i % 2 === 0 ? 1 : -1) * (Math.random() * 600 + 100);
        const ty = -(Math.random() * 800 + 300);
        el.style.setProperty('--tx', `${tx}px`);
        el.style.setProperty('--ty', `${ty}px`);
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}

function openGame(idx) {
    currentIdx = idx; score = 0;
    let charObj = chars[Math.floor(Math.random() * chars.length)];
    if (charObj.n === "Bách") currentNeeds = ["❤️", "❤️", "❤️"];
    else {
        currentNeeds = [];
        for(let i=0; i<3; i++) currentNeeds.push(giftPool[Math.floor(Math.random() * giftPool.length)]);
    }
    document.getElementById('char-icon').innerText = charObj.i;
    document.getElementById('char-name-label').innerText = charObj.n;
    document.getElementById('quest-text').innerText = charObj.n + " đang muốn vài thứ...";
    updateNeedsDisplay();
    document.getElementById('fill').style.width = '0%';
    document.getElementById('game-modal').style.display = 'flex';
}

function updateNeedsDisplay() {
    let html = "";
    currentNeeds.forEach((n, idx) => {
        let opacity = idx < score ? "0.3" : "1";
        html += `<span style="opacity: ${opacity}; margin: 0 5px;">${n}</span>`;
    });
    document.getElementById('needs-display').innerHTML = html;
}

function give(gift) {
    if(gift === currentNeeds[score]) {
        score++;
        playSound(400 + score * 100, 'sine');
        document.getElementById('fill').style.width = (score/target)*100 + '%';
        updateNeedsDisplay();
        if(score >= target) {
            burstIcons(gift);
            document.getElementById('char-icon').innerText = "😍";
            setTimeout(win, 3000);
        }
    } else {
        playSound(150, 'square');
        alert("Hihi món này tui hổng có cần nè!");
    }
}

function win() {
    document.getElementById('game-modal').style.display = 'none';
    const box = document.getElementById('scroll-box');
    const title = document.getElementById('scroll-title');
    const hr = document.getElementById('scroll-hr');
    const wishArea = document.getElementById('r-wish');
    box.classList.remove('thanh-chi');
    title.innerText = "📜 DI CHIẾU 📜";
    hr.style.borderColor = "#d4af37";

    if(currentIdx === 4) { 
        hyCount++;
        if(hyCount >= 4) {
            box.classList.add('thanh-chi');
            title.innerText = "✨ THÁNH CHỈ ✨";
            hr.style.borderColor = "#b30000";
            document.getElementById('r-han').innerText = "喜";
            document.getElementById('r-title').innerText = "Lời Tỏ Tình Từ Bách";
            wishArea.innerHTML = `
                <div style="font-style: italic; color: #b30000; font-weight: bold; margin-bottom: 10px;">
                    "Trăm năm trong cõi người ta,<br>Bách thì chỉ muốn một nhà với Phương."
                </div>
                (thật ra bách thích phương nhìu lắm luôn á nhiều như trái đất này nè, nhưng bách ko nói thoi, sơ phương ko thích bách á)
            `;
            document.getElementById('res-modal').style.display = 'flex';
            playSound(600, 'triangle');
            return;
        }
    }
    const d = data[currentIdx];
    document.getElementById('r-han').innerText = d.h;
    document.getElementById('r-title').innerText = d.t;
    wishArea.innerHTML = d.w[Math.floor(Math.random() * d.w.length)];
    document.getElementById('hy-count-info').innerText = currentIdx === 4 ? `Tiến độ: ${hyCount}/4` : "";
    document.getElementById('res-modal').style.display = 'flex';
    playSound(500, 'sine');
}

window.closeRes = function() { document.getElementById('res-modal').style.display = 'none'; }
