let score = 0; let target = 3; let currentIdx = -1;
let hyCount = 0; let currentNeeds = [];
const giftPool = ['🍑', '🧸', '🧧', '🌸', '🫔', '❤️', '🃏', '🎆', '🍎'];
const chars = [
    { i: "👦", n: "Vũ" }, { i: "👶", n: "Minh" }, { i: "🧒", n: "Bảo" },
    { i: "🧑", n: "Huy" }, { i: "😎", n: "Bách" }, { i: "👧", n: "Vi" }, { i: "👩", n: "Hà" }
];
const data = [
{ h: "福", t: "Phúc", w: [
        "🧧 Chúc bạn ăn nhiều không béo, đẹp bất chấp camera thường làm người yêu cũ nhìn phát là cay đỏ mắt!",
        "🧧 Chúc bạn là 'con cưng' của vũ trụ, muốn gì được nấy, trừ việc muốn giảm cân vì bạn đẹp sẵn rồi!",
        "🧧 Năm mới nhận combo Phúc: Sáng tin vui, trưa quà khủng, đêm nằm mơ thấy tui (không mơ là mất lộc)!"
    ]},
    { h: "祿", t: "Lộc", w: [
        "💰 Chúc lộc lá bám đuổi bạn dai dẳng hơn cả người yêu cũ. Làm đâu thắng đó, tiền về đầy túi, túi đầy tiền!",
        "💰 Chúc bạn lộc rơi trúng đầu, quà rơi trúng tay, giàu đến mức dùng tờ 500k gấp máy bay (nhưng đưa tui giữ hộ cho)!",
        "💰 Chúc bạn shopping không nhìn giá, chỉ nhìn tui xem có đứng chờ quẹt thẻ hộ không thôi. Lộc lá đầy nhà nhé!"
    ]},
    { h: "壽", t: "Thọ", w: [
        "🛡️ Chúc bạn sống thọ trăm tuổi để còn đủ sức nghe tui nói xàm mỗi ngày. Sức khỏe dồi dào, chạy deadline không mệt!",
        "🛡️ Chúc bạn trẻ mãi không già, lão hóa ngược đến mức sau này ra đường người ta tưởng bạn là em của tui!",
        "🛡️ Chúc bạn khỏe như lực sĩ, dẻo dai như mèo, ăn được ngủ được chơi được, không lo đau lưng mỏi gối!"
    ]},
    { h: "智", t: "Trí", w: [
        "🧠 Chúc bạn thông minh đột xuất, IQ nhảy vọt tầm vũ trụ. Mọi bài toán khó hay drama mạng đều nắm bắt trong 1 giây!",
        "🧠 Chúc bạn trí não 200% công suất, học 1 hiểu 10, sáng suốt đến mức nhìn đâu cũng thấy chân lý (nhất là nhìn tui)!",
        "🧠 Chúc bạn thông tuệ như hiền triết nhưng cute như em bé. Luôn tìm ra cách làm ít hưởng nhiều, thi đâu đậu đó!"
    ]},
    { h: "喜", t: "Hỷ", w: [
        "💖 Chúc bạn tình duyên nở rộ đỏ hơn bao lì xì. Muốn tìm chân ái đừng nhìn đâu xa, nhìn tui nè, kho báu đây rồi!",
        "💖 Chúc bạn hỷ sự đầy mặt, cười suốt ngày người ta tưởng trúng số. Sớm có người bao ăn, bao chơi, bao luôn cả đời!",
        "💖 Chúc tin vui gõ cửa liên tục đến mức không kịp đăng story. Tình yêu thắm thiết, hạnh phúc keo sơn như nhựa mít!"
    ]},
    { h: "安", t: "An", w: [
        "🍃 Chúc bạn bình an đến mức chim chóc cũng ghen tị. Không drama, không sóng gió, chỉ có ăn ngon và ngủ kỹ!",
        "🍃 Năm mới tâm hồn thanh thản như đi spa, ngủ ngon không mộng mị (trừ mộng thấy tui). Vạn sự an yên!",
        "🍃 Chúc bạn mỗi ngày thức dậy đều thấy nắng đẹp, dù trời mưa thì lòng vẫn ấm áp vì đã có tui... nhắn tin phiền phức!"
    ]},
    { h: "財", t: "Tài", w: [
        "💎 Chúc bạn tài năng phát tiết, động đâu cũng thấy vàng. Tiền bạc rủng rỉnh đến mức ví không gập lại được!",
        "💎 Chúc bạn làm đâu thắng đó, trở thành thỏi nam châm hút tiền. Giàu sang phú quý, thẻ ngân hàng quẹt mòn cả số!",
        "💎 Chúc bạn công thành danh toại, sự nghiệp thăng tiến như tên lửa. Tiền tiêu không hết, chỉ sợ không có sức tiêu!"
    ]},
    { h: "忍", t: "Nhẫn", w: [
        "🌟 Chúc bạn nhẫn nại vô biên, ví dụ như nhẫn nại chờ tui trưởng thành hơn. Kiên trì hôm nay, hái quả ngọt ngày mai!",
        "🌟 Chúc bạn nhẫn nhưng không nhục, khí chất ngời ngời như nữ vương. Dùng sự dịu dàng để thu phục cả thế giới!",
        "🌟 Chúc bạn luôn bình tĩnh trước mọi drama thị phi. Nhẫn để thành công, nhẫn để giàu có, nhẫn để yêu tui nhiều hơn!"
    ]},
    { h: "成", t: "Thành", w: [
        "🚀 Chúc bạn búng tay một cái là mọi việc xong xuôi. Năm mới mã đáo thành công, muốn gì được nấy, vạn sự viên mãn!",
        "🚀 Chúc mọi dự định của bạn đều nở hoa rực rỡ. Chinh phục đỉnh cao sự nghiệp dễ như trở bàn tay!",
        "🚀 Năm mới tỏa sáng rực rỡ, thành công vang dội khiến ai cũng phải ngưỡng mộ. Đánh đâu thắng đó, không thành không về!"
    ]}
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


