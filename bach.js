let score = 0; let target = 3; let currentIdx = -1;
let hyCount = 0; let currentNeeds = [];
const giftPool = ['🍑', '🧸', '🧧', '🌸', '🫔', '❤️', '🃏', '🎆', '🍎'];
const chars = [
    { i: "👦", n: "Vũ" }, { i: "👶", n: "Minh" }, { i: "🧒", n: "Bảo" },
    { i: "🧑", n: "Huy" }, { i: "😎", n: "Bách" }, { i: "👧", n: "Vi" }, { i: "👩", n: "Hà" }
];

const data = [
    { 
        h: "福", t: "Phúc Mãn Đường", 
        w: [
            "🏮 Chúc bạn năm mới Phúc lộc đầy nhà, nhưng mà nhà phải xây thêm kho vì Phúc nhiều quá không có chỗ chứa! Chúc bạn ăn gì cũng không béo, thức khuya cũng không thâm quầng, và đặc biệt là gặp người tặng code này lúc nào cũng thấy vui như Tết!",
            "🏮 Chúc Phúc thần gõ cửa nhà bạn liên tục đến mức bạn phải treo biển 'Đã đủ Phúc, xin mời sang nhà hàng xóm'. Chúc bạn luôn xinh đẹp rạng ngời, đẹp bất chấp filter, đẹp đến mức camera thường cũng phải ngả mũ chào thua!",
            "🏮 Năm mới chúc bạn nhận được 'combo Phúc': Sáng nhận tin vui, trưa nhận quà khủng, tối nhận lì xì, đêm nằm mơ thấy người tặng quà (cái này quan trọng nha). Chúc bạn luôn là 'con cưng' của vũ trụ, muốn gì được nấy, trừ việc muốn giảm cân vì bạn đẹp sẵn rồi!"
        ]
    },
    { 
        h: "祿", t: "Lộc Tấn Vinh Hoa", 
        w: [
            "💰 Chúc bạn tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin. Chúc lộc lá đầy nhà đến mức mỗi lần đi quét nhà là quét ra được vài tờ polime. Chúc bạn shopping không cần nhìn giá, chỉ cần nhìn xem có chỗ nào để chứa đồ không thôi!",
            "💰 Năm nay chúc bạn thành 'đại gia' ngầm, tài khoản ngân hàng nhảy số như chạy deadline, lộc rơi trúng đầu, quà rơi trúng tay. Chúc bạn giàu đến mức dùng tờ 500k để gấp máy bay, nhưng mà thôi phí lắm, để dành đó đi ăn lẩu với tui nè!",
            "💰 Chúc lộc lá năm Bính Ngọ bám đuổi bạn dai dẳng hơn cả người yêu cũ. Chúc bạn làm đâu thắng đó, chơi game thì toàn gánh team, quay số thì luôn trúng giải đặc biệt, và đặc biệt là luôn dồi dào 'Lộc ăn uống' (nhất là khi đi với người tặng code này)!"
        ]
    },
    { 
        h: "壽", t: "Thọ Tỷ Nam Sơn", 
        w: [
            "🛡️ Chúc bạn khỏe như lực sĩ, dẻo dai như mèo, và tươi tắn như hoa hướng dương. Chúc bạn ăn được, ngủ được, chơi được, không lo đau lưng mỏi gối như mấy bà già. Sống lâu trăm tuổi để còn chứng kiến tui ngày càng đẹp trai ra nữa chứ!",
            "🛡️ Chúc bạn có sức khỏe 'vô cực', chạy deadline không biết mệt, đi chơi không biết chán. Chúc bạn luôn trẻ mãi không già, lão hóa ngược đến mức sau này ra đường người ta tưởng bạn là em gái của... chính mình!",
            "🛡️ Năm mới chúc bạn thân hình đồng hồ cát (cát nhiều hay ít thì tùy nha), sức đề kháng siêu cấp vũ trụ, virus thấy bạn là phải quay xe gấp. Chúc bạn sống thọ đến lúc răng rụng vẫn còn ngồi kể chuyện 'ngày xửa ngày xưa có anh chàng tặng code siêu đỉnh' cho con cháu nghe!"
        ]
    },
    { 
        h: "智", t: "Trí Tuệ Minh", 
        w: [
            "🧠 Chúc bạn đầu óc thông minh, IQ nhảy vọt lên tầm vũ trụ. Mọi bài toán khó, mọi drama trên mạng bạn đều nắm bắt trong 1 nốt nhạc. Chúc bạn sáng suốt đến mức nhìn đâu cũng thấy đáp án, nhìn ai cũng thấy chân tình (nhất là nhìn tui nè)!",
            "🧠 Chúc trí não bạn hoạt động công suất 200%, học 1 hiểu 10, nhớ lâu như thù dai. Chúc bạn luôn có những ý tưởng 'triệu đô' và những quyết định đúng đắn, ví dụ như quyết định đi chơi với tui chẳng hạn. Đỉnh của chóp luôn!",
            "🧠 Năm mới chúc bạn thông tuệ như các bậc hiền triết nhưng tính tình vẫn cute như em bé. Chúc bạn luôn tìm ra cách làm ít hưởng nhiều, học ít thi cao, và luôn đủ tinh tế để nhận ra ai là người quan tâm mình nhất trên đời này!"
        ]
    },
    { 
        h: "喜", t: "Hỷ Khí Lâm Môn", 
        w: [
            "💖 Chúc bạn năm mới 'Hỷ' đầy mặt, cười nói suốt ngày đến mức người ta tưởng trúng số. Chúc bạn có nhiều tin vui đến mức không kịp đăng story, tình duyên thì nở rộ như hoa mùa xuân, đỏ rực như bao lì xì trên tay!",
            "💖 Chúc cho mỗi sáng thức dậy bạn đều thấy một chuyện vui, mỗi trưa gặp một người tốt, và mỗi tối có một giấc mơ đẹp. Chúc cuộc sống của bạn ngọt ngào như trà sữa trân châu đường đen, nhưng không gây béo và luôn đầy ắp topping hạnh phúc!",
            "💖 Chúc hỷ sự bao quanh bạn như kiến bám đường. Chúc bạn sớm tìm được 'nửa kia' hoàn hảo (mà thôi không cần tìm đâu xa, có người đang đứng ngay đây rồi nè). Một năm ngập tràn tiếng cười, vui vẻ tới bến, quẩy hết mình nha!"
        ]
    },
    { 
        h: "安", t: "An Khang Thịnh Vượng", 
        w: [
            "🍃 Chúc bạn một năm bình an đến mức chim chóc cũng phải ghen tị. Không drama, không sóng gió, chỉ có sự yên bình và những bữa ăn ngon. Chúc tâm hồn bạn luôn thanh thản như đang đi spa, ngủ ngon không mộng mị (trừ mộng thấy tui)!",
            "🍃 Năm mới chúc bạn 'An' trong tâm, 'Khang' trong thân. Mọi muộn phiền tan biến như bọt xà phòng, chỉ còn lại sự thư thái. Chúc bạn mỗi ngày đều là một ngày nắng đẹp, dù trời có mưa thì trong lòng vẫn thấy ấm áp vì đã có ai đó che chở!",
            "🍃 Chúc bạn sống giữa thế gian đầy thị phi mà vẫn giữ được sự bình tĩnh đáng nể. Chúc cuộc đời bạn êm đềm như nước mặt hồ, không lo âu, không phiền muộn, chỉ có niềm vui và sự an yên tuyệt đối bên cạnh những người yêu thương!"
        ]
    },
    { 
        h: "財", t: "Tài Lộc Hanh Thông", 
        w: [
            "💎 Chúc bạn tài năng phát tiết, làm gì cũng ra tiền, động đâu cũng thấy vàng. Chúc danh tiếng của bạn bay xa tới tận sao Hỏa, khiến cư dân mạng phải trầm trồ vì sự giỏi giang và giàu có của bạn. Một năm tỏa sáng rực rỡ nhé!",
            "💎 Năm mới chúc bạn trở thành 'thỏi nam châm' hút tài lộc. Ví tiền của bạn sẽ dày lên đến mức không gập lại được, và thẻ ngân hàng thì quẹt đến mức mòn cả số. Chúc bạn luôn là ngôi sao sáng nhất trong mọi cuộc vui và trong cả trái tim ai đó!",
            "💎 Chúc bạn công thành danh toại, sự nghiệp thăng tiến như tên lửa Space X. Chúc bạn không chỉ giàu về tiền bạc mà còn giàu về tình cảm, giàu về trải nghiệm và đặc biệt là giàu sự kiên nhẫn để nghe tui nói nhảm mỗi ngày!"
        ]
    },
    { 
        h: "忍", t: "Nhẫn Để Thành Công", 
        w: [
            "🌟 Chúc bạn có lòng kiên nhẫn vô biên, ví dụ như nhẫn nại chờ đợi tui trưởng thành hơn chẳng hạn. Chúc bạn luôn bình tĩnh trước mọi sóng gió, vì bạn biết rằng sau cơn mưa trời lại sáng, và sau những nỗ lực sẽ là kho báu khổng lồ!",
            "🌟 Chúc bạn 'Nhẫn' nhưng không 'Nhục', luôn giữ vững lập trường và khí chất của một nữ vương. Chúc bạn kiên trì với mục tiêu của mình đến cùng, vì thành công đang đợi bạn ở phía trước với một vòng tay rộng mở (và cả tui nữa)!",
            "🌟 Năm mới chúc bạn luyện được thần công 'Nhẫn nại tuyệt đối'. Ai làm gì thì làm, mình vẫn cứ xinh đẹp và thành công. Chúc bạn dùng sự dịu dàng và kiên nhẫn của mình để thu phục cả thế giới, bắt đầu từ việc thu phục cái người tặng quà này!"
        ]
    },
    { 
        h: "成", t: "Công Thành Danh Toại", 
        w: [
            "🚀 Chúc bạn năm mới muốn gì là thành nấy, búng tay một cái là mọi việc xong xuôi. Chúc bạn chinh phục được mọi đỉnh cao, từ đỉnh núi Fansipan cho đến đỉnh cao sự nghiệp, và cả đỉnh cao của hạnh phúc nữa. Mã đáo thành công!",
            "🚀 Chúc mọi dự định ấp ủ của bạn đều 'nở hoa' kết trái rực rỡ. Chúc bạn đi đâu cũng có người giúp, làm gì cũng có người thương. Một năm thành công vang dội, khiến ai cũng phải ngước nhìn và ngưỡng mộ!",
            "🚀 Năm mới chúc bạn 'vạn sự viên mãn', từ nhan sắc, học vấn cho đến tình cảm đều đạt điểm 10 tuyệt đối. Chúc bạn luôn tự hào về bản thân và luôn có tui ở bên cạnh để cùng ăn mừng những chiến thắng hiển hách của bạn!"
        ]
    }
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

