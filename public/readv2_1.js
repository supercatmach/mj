
  const bgImg = new Image();
  bgImg.src = 'https://cdn.jsdelivr.net/gh/supercatmach/pic@main/backg/endshure.jpg';
  
  bgImg.onload = () => {
$(".stanbylonding").show();

$(".stanbylondingshap100").animate({width:'100%'},10000);

  };

window.addEventListener("load", () => {
  // 所有圖片載入完才會執行這裡的程式碼
  ///console.log("圖片全部載入完成！");


$(".stanbylondingshap100").stop();

$(".stanbylondingshap100").animate({width:'100%'},1000);

setTimeout(() => {

$(".stanbylondingshap100").css("width","0px")

$(".stanbylondingshap100").hide();

$(".stanbylonding").hide();

$(".pledstanby").show();

},1000)

});

setTimeout(() => {

$(".stanbylondingshap100").css("width","0px")

$(".stanbylondingshap100").hide();

$(".stanbylonding").hide();

$(".pledstanby").show();

$(".adown,.camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking,.table,.scaler").show()

},3000)




document.oncontextmenu = function(){
    event.returnValue = false;
}

v41= new Audio("https://cdn.jsdelivr.net/gh/supercatmach/pic@main/music/v41.wav")
v41.preload = "auto"


  const bgm = new Audio("https://cdn.jsdelivr.net/gh/supercatmach/pic@main/music/kawaii-dance-upbeat-japan-anime-edm-242104.mp3");
  bgm.loop = true;
  bgm.volume = 0.3; // 初始音量
  bgm.play();

  // 音量滑桿控制
  const volumeSlider = document.getElementById("volumeSlider");
  const volumeIcon = document.getElementById("volumeIcon");

  volumeSlider.addEventListener("input", () => {
    bgm.volume = parseFloat(volumeSlider.value);
    updateVolumeIcon();
  });

  volumeIcon.addEventListener("click", () => {

    // 點擊圖示切換靜音 / 回復
    if (bgm.volume > 0) {
      bgm.volume = 0;
      volumeSlider.value = 0;
    } else {
      bgm.volume = 1;
      volumeSlider.value = 1;
    }
    updateVolumeIcon();
  });

  function updateVolumeIcon() {
    if (bgm.volume === 0) {
      volumeIcon.className = "fas fa-volume-mute";
    } else if (bgm.volume < 0.5) {
      volumeIcon.className = "fas fa-volume-down";
    } else {
      volumeIcon.className = "fas fa-volume-up";
    }
  }
  // 點擊啟動音樂（瀏覽器限制）
  document.addEventListener("click", () => {
    bgm.play();
  }, { once: true });

for(let i=0;i<plerinfor.length;i++){

if(plerinfor[i].cho!=0){

plerinfor[i].cho=localStorage.getItem("ch"+i);

}

}


pledpicmyslef="-1"

if (!localStorage.getItem("uploadedImage")) {
  localStorage.setItem("uploadedImage", 1);
} 

$("#bk90").hide()


lasplmgd0=localStorage.getItem("plmgd");
function saveLocalStorageAsQR() {
    $('#qrcode').show();

    let localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        try {
            localStorageData[key] = JSON.parse(value);  // 嘗試解析 JSON
        } catch (e) {
            localStorageData[key] = value;  // 不是 JSON 則直接存入
        }
    }

    // 將資料轉成字串
    let jsonString = JSON.stringify(localStorageData);

    // 使用 pako 壓縮資料
    let compressedData = pako.deflate(jsonString, { to: "uint8array" });

    // 將壓縮後的資料轉為 Base64 字串
    let base64String = btoa(String.fromCharCode(...compressedData));

    // 生成 QR Code
new QRCode(document.getElementById("qrcode"), {
    text: base64String,
    width: 512,  // 增加 QR Code 的尺寸
    height: 512,
    correctLevel: QRCode.CorrectLevel.H  // 設定為最高錯誤容忍度
});

    setTimeout(() => {
        // 取得 QR Code 生成後的 canvas
        let canvas = document.getElementById("qrcode").querySelector("canvas");
        
        if (canvas) {
            // 轉換 canvas 成為 PNG 圖片
            let img = document.createElement("img");
            img.src = canvas.toDataURL("image/png"); // 將 canvas 轉換為 PNG 圖片
            img.id = "qrcodeImage"; // 設定圖片 ID
            
            // 創建下載鏈接
            let link = document.createElement("a");
            link.href = img.src; // 圖片的 URL
            link.download = "qrcode.jpg"; // 下載的圖片名稱
            link.appendChild(img); // 把圖片插入到鏈接中

            // 顯示圖片在頁面上
            $('#qrcode').html(link); // 顯示鏈接，點擊可以下載圖片
        }
    }, 500);

    setTimeout("$('#qrcode').html('')",5000);
}// 觸發文件選擇對話框
// 觸發文件選擇對話框
function triggerFileUpload() {
    document.getElementById('fileInput').click();
}

// 處理文件選擇
function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // 檢查圖片是否加載成功
                console.log("Image loaded successfully", img.width, img.height);

                // 把圖片繪製到 canvas 上
                const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // 使用 jsQR 解碼 QR Code
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height, {
                    inversionAttempts: "dontInvert",  // 不反轉顏色
                    errorCorrectionLevel: "H"  // 設定錯誤容忍度
                });

                if (code) {
                    const decodedBase64 = code.data;

                    // 解碼 Base64 並解壓縮
                    try {
                        if (isValidBase64(decodedBase64)) {
                            let decodedData = new Uint8Array(atob(decodedBase64).split("").map(c => c.charCodeAt(0)));
                            let decompressedData = pako.inflate(decodedData, { to: "string" });

                            // 嘗試解析解壓縮後的資料為 JSON
                            try {
                                let parsedData = JSON.parse(decompressedData);
                                console.log("解析後的資料:", parsedData);
                                // 更新 localStorage
                                for (let key in parsedData) {
                                    localStorage.setItem(key, JSON.stringify(parsedData[key])); // 儲存解析後的資料
                                }
                                console.log("localStorage 已更新");
incountie()

                            } catch (e) {
                                console.log("無法解析為 JSON", e);
                            }
                        } else {
                            console.log("無效的 Base64 字串");
                        }
                    } catch (e) {
                        console.log("解碼或解壓縮失敗", e);
                    }
                } else {
                    console.log("無法解碼 QR Code");
                }
            };
            img.src = e.target.result; // 圖片來源
        };
        reader.readAsDataURL(file); // 讀取圖片檔案
    }
}

// 檢查 Base64 是否有效
function isValidBase64(str) {
    try {
        // 檢查字串是否符合 Base64 的格式
        return /^[A-Za-z0-9+/=]+$/.test(str);
    } catch (e) {
        return false;
    }
}
////////////////////////////////////////////
const serverList = [
  "https://mj-5x4w.onrender.com",
  "https://mj-2-r1j0.onrender.com",
  "https://mj-sp1.up.railway.app",
  "https://mj-sp2.up.railway.app"
];

// 洗牌函式（Fisher–Yates Shuffle）
function shuffleArray(arr) {
  const result = arr.slice(); // 複製一份避免改到原陣列
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

async function findLiveServer() {
  const shuffledList = shuffleArray(serverList); // 隨機排序
  for (let url of shuffledList) {
    try {
      const res = await fetch(url + "/ping", { timeout: 2000 });
      if (res.ok) return url;
    } catch (e) {
      // console.log(`${url} 掛了`);
    }
  }
  throw new Error("找不到可用伺服器");
}
function sufpvpn(dps){

servertoURL=null

findLiveServer()
  .then(serverURL => {
    const socket = io(serverURL, {
  transports: ['websocket'],       // ✅ 明確指定只用 WebSocket
});

servertoURL=serverURL

if(dps!=3){///連線

$(".pledstanby").hide()

$('#bk90').hide()

$(".londing").show()

$(".londingshap100").css("width","0px")

$(".londingshap100").animate({width:'100%'},10000);

}

socket.on("hi", (plid) => {

console.log(plid+"伺服器確認重連成功");

$(".mypin").val(plid)

if(dps==1){///連線

socket.emit("waninRoom");

}

if(dps==2){///創防

socket.emit("createRoom2");

}

});


socket.on("roomCreated", (rooms) => {

console.log(rooms.roomId)

$(".londingshap100").stop();

$(".londingshap100").animate({width:'100%'},1000);

setTimeout(() => {

window.location.href = `/magi.html?room=${rooms.roomId}&server=${encodeURIComponent(servertoURL)}`

},1000)

});

socket.on("roomCreated2", (rooms) => {

console.log(rooms.roomId)

$(".londingshap100").stop();

$(".londingshap100").animate({width:'100%'},1000);

setTimeout(() => {

window.location.href = `${rooms.roomId}`

},1000)

});


    console.log("連到伺服器:", serverURL);
  })
  .catch(err => {
    alert("目前所有伺服器都掛了，請稍後再試！");
  });


}

////////////////////////////////////////////

$("#copyBtn").click(function() {
  const input = $(".mypin");
  input.select();
  document.execCommand("copy");

});

////////////////////////////////////////////

lassave=0///上次紀錄

if(lasplmgd0!=null){

///setTimeout('$("#bk90").show()',5000)

///setTimeout('countie()',11000)

///localStorage.clear()

for(let i=0;i<plerinfor.length;i++){

if(plerinfor[i].cho!=0){

localStorage.setItem("ch"+i,plerinfor[i].cho);

}

}

}


function incountie(){

$(".pledstanby").hide()

$('#bk90').hide()

$(".coun3").hide()

$(".table").show()

///$(".adown,.camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking").show()

///$(".camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking").show()

$(".bk60").hide()

$(".bk30").hide()

$(".londing").show()

$(".londingshap100").css("width","0px")

$(".londingshap100").animate({width:'100%'},10000);

setTimeout('$(".londing").hide()',10000)

setTimeout('countie()',10000)

}

function countie(){

plerK=["0c","1l","2c","3r"]///玩家

egmgd=[40000,40000,40000,40000]///四個玩家的積分

makrs=JSON.parse(localStorage.getItem("player"));
////最後一次莊家

nobackch=0///無返回主畫面

gunwin=0///搶槓胡

nogunwin=0///槓上開花

tinmsalf=0///手動聽牌

$(".zun"+makrs).show()

$(".ti0").hide()
$(".ti1").hide()
$(".ti2").hide()
$(".ti3").hide()

sittwind=JSON.parse(localStorage.getItem("sittwind"))///各家風位

fowtwind=JSON.parse(localStorage.getItem("fowtwind"))///各家花位

cantakenb=JSON.parse(localStorage.getItem("cantakenb"))

plmgd=JSON.parse(localStorage.getItem("plmgd"))

spf=JSON.parse(localStorage.getItem("spf"))///安全牌

flocd=JSON.parse(localStorage.getItem("flocd"))///四個玩家的花牌

otmgd=JSON.parse(localStorage.getItem("otmgd"))///四個玩家打出的牌

bkmgd=JSON.parse(localStorage.getItem("bkmgd"))

akmgd=JSON.parse(localStorage.getItem("akmgd"))///四個玩家吃碰槓後可增加組數的牌

etmgd=JSON.parse(localStorage.getItem("etmgd"))///四個玩家可吃的牌

cnmgd=JSON.parse(localStorage.getItem("cnmgd"))///四個玩家可碰的牌

gnmgd=JSON.parse(localStorage.getItem("gnmgd"))///四個玩家可槓的牌

rlmgd=JSON.parse(localStorage.getItem("rlmgd"))///四個玩家已吃碰槓的區域

rcmgd=JSON.parse(localStorage.getItem("rcmgd"))///四個玩家被吃碰槓的位置

ramgd=JSON.parse(localStorage.getItem("ramgd"))///四個玩家暗槓的牌

rbmgd=JSON.parse(localStorage.getItem("rbmgd"))///四個玩家明槓的牌

lomgd=JSON.parse(localStorage.getItem("lomgd"))///四個玩家聽的牌

lbmgd=JSON.parse(localStorage.getItem("lbmgd"))///四個玩家是否宣佈聽牌

daetp=JSON.parse(localStorage.getItem("daetp"))///四個玩家吃碰槓的區域萬筒條的分布

eemgd=JSON.parse(localStorage.getItem("eemgd"))///四個玩家已吃的牌

ppmgd=JSON.parse(localStorage.getItem("ppmgd"))///四個玩家已碰的牌

ethan=JSON.parse(localStorage.getItem("ethan"))///四個玩家因吃碰槓後手上隱藏的張數

etnum=JSON.parse(localStorage.getItem("etnum"))///四個玩家吃碰槓的組數

egmgd=JSON.parse(localStorage.getItem("egmgd"))////最後一次玩家的分數

alsee=JSON.parse(localStorage.getItem("alsee"))///已見光的牌

epgmow=JSON.parse(localStorage.getItem("epgmow"))///吃碰槓的場合

cantoutcd=JSON.parse(localStorage.getItem("cantoutcd"))///吃碰後不能捨的牌

savedImage = JSON.parse(localStorage.getItem('uploadedImage'));  

///console.log(savedImage)

tinyk=0

pldname=["mycad","nextcad","fontcad","lastcad"]

allmgd=JSON.parse(localStorage.getItem("allmgd"))

pled=makrs

lassave=1

pledpicmyslef="-1"

chnwind=JSON.parse(localStorage.getItem("chun"))
////最後一次圈
junwind=JSON.parse(localStorage.getItem("fom"))
////最後一次風
linmrs=JSON.parse(localStorage.getItem("laner"))
////最後一次連莊
pled=JSON.parse(localStorage.getItem("incard"))
////最後一次抽牌的人
mds=JSON.parse(localStorage.getItem("mds"))
////進度

if(epgmow==0){

otc=JSON.parse(localStorage.getItem("lastcard"))
tineptout=otc

}

if(mds==2){

mdt=JSON.parse(localStorage.getItem("lastcard"))
cpd=JSON.parse(localStorage.getItem("lastcard"))

}

tinyk=0

pldname=["mycad","nextcad","fontcad","lastcad"]

$("."+pldname[0]+" div .ds17").attr('class','d17');

$("."+pldname[1]+" div .ds17").attr('class','d17');

$("."+pldname[2]+" div .ds17").attr('class','d17');

$("."+pldname[3]+" div .ds17").attr('class','d17');

for(let i=1;i<18;i++){

$("."+pldname[0]+" div .d"+i).hide()
$("."+pldname[1]+" div .d"+i).hide()
$("."+pldname[2]+" div .d"+i).hide()
$("."+pldname[3]+" div .d"+i).hide()

$("."+pldname[0]+" div .d"+i+" .c1").html("")
$("."+pldname[1]+" div .d"+i+" .c1").html("")
$("."+pldname[2]+" div .d"+i+" .c1").html("")
$("."+pldname[3]+" div .d"+i+" .c1").html("")

$("."+pldname[0]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[1]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[2]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[3]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

}

for(let i=1;i<31;i++){

$("."+pldname[0]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[1]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[2]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[3]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);

$("."+pldname[0]+" div .o"+i+" .c1").html("")
$("."+pldname[1]+" div .o"+i+" .c1").html("")
$("."+pldname[2]+" div .o"+i+" .c1").html("")
$("."+pldname[3]+" div .o"+i+" .c1").html("")

$("."+pldname[0]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[1]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[2]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[3]+" div .o"+i+" div").css("filter","opacity(1)")


}

for(let i=1;i<9;i++){

$("."+pldname[0]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[1]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[2]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[3]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);

$("."+pldname[0]+" div .f"+i+" .c1").html("")
$("."+pldname[1]+" div .f"+i+" .c1").html("")
$("."+pldname[2]+" div .f"+i+" .c1").html("")
$("."+pldname[3]+" div .f"+i+" .c1").html("")

}

for(let i=1;i<21;i++){

$("."+pldname[0]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[1]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[2]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[3]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);

$("."+pldname[0]+" div .e"+i+" .c1").html("")
$("."+pldname[1]+" div .e"+i+" .c1").html("")
$("."+pldname[2]+" div .e"+i+" .c1").html("")
$("."+pldname[3]+" div .e"+i+" .c1").html("")

$("."+pldname[0]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[0]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[1]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[1]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[2]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[2]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[3]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[3]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

}


$(".gh2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/op'+sittwind[0]+'.png" style="width:50px;height:50px;">')

$(".gh1").show()

bgige2='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(chnwind-28)+'.png" style="height:40px;">'
bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/wn.png" style="height:40px;">'
bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(junwind-28)+'.png" style="height:40px;">'
linmrsany=linmrs.toString().split("")

if(linmrsany.length>1){

for(let i=0;i<linmrsany.length-1;i++){

bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+linmrsany[i]+'.png" style="height:150px;">'

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+linmrsany[i]+'.png" style="height:40px;">'

}

}

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/0'+(linmrs+1)+'.png" style="height:40px;">'

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/ge.png" style="height:40px;">'

$(".bgige2").html(bgige2)///圈風局

fdal=[]///上下壓

fdal[0]=[]
fdal[1]=[1]
fdal[2]=[1,2]
fdal[3]=[1,2,3]
fdal[4]=[1,2,3,4]
fdal[5]=[5]
fdal[6]=[3,6,7,8]
fdal[7]=[7,8,9]
fdal[8]=[8,9]
fdal[9]=[9]
fdal[10]=[10]
fdal[11]=[10,11]
fdal[12]=[10,11,12]
fdal[13]=[10,11,12,13]
fdal[14]=[14]
fdal[15]=[12,15,16,17]
fdal[16]=[16,17,18]
fdal[17]=[17,18]
fdal[18]=[18]
fdal[19]=[19]
fdal[20]=[19,20]
fdal[21]=[19,20,21]
fdal[22]=[19,20,21,22]
fdal[23]=[23]
fdal[24]=[21,24,25,26]
fdal[25]=[25,26,27]
fdal[26]=[26,27]
fdal[27]=[28]
fdal[28]=[]
fdal[29]=[]
fdal[30]=[]
fdal[31]=[]
fdal[32]=[]
fdal[33]=[]
fdal[34]=[]

ard=[]///一路性
ard[0]=[]
ard[1]=[]
ard[2]=[]
ard[3]=[]
ard[4]=[1,4,7]
ard[5]=[2,5,7]
ard[6]=[3,6,9]
ard[7]=[]
ard[8]=[]
ard[9]=[]
ard[10]=[]
ard[11]=[]
ard[12]=[]
ard[13]=[10,13,16]
ard[14]=[11,14,17]
ard[15]=[12,15,18]
ard[16]=[]
ard[17]=[]
ard[18]=[]
ard[19]=[]
ard[20]=[]
ard[21]=[]
ard[22]=[19,22,25]
ard[23]=[20,23,26]
ard[24]=[21,24,27]
ard[25]=[]
ard[26]=[]
ard[27]=[]
ard[28]=[]
ard[29]=[]
ard[30]=[]
ard[31]=[]
ard[32]=[]
ard[33]=[]
ard[34]=[]

clocad=[]///拆搭

clocad[0]=[]
clocad[1]=[1,2,3]
clocad[2]=[1,2,3,4]
clocad[3]=[1,2,3,4,5]
clocad[4]=[2,3,4,5,6]
clocad[5]=[3,4,5,6,7]
clocad[6]=[4,5,6,7,8]
clocad[7]=[5,6,7,8,9]
clocad[8]=[6,7,8,9]
clocad[9]=[7,8,9]
clocad[10]=[10,11,12]
clocad[11]=[10,11,12,13]
clocad[12]=[10,11,12,13,14]
clocad[13]=[11,12,13,14,15]
clocad[14]=[12,13,14,15,16]
clocad[15]=[13,14,15,16,17]
clocad[16]=[14,15,16,17,18]
clocad[17]=[15,16,17,18]
clocad[18]=[16,17,18]
clocad[19]=[19,20,21]
clocad[20]=[19,20,21,22]
clocad[21]=[19,20,21,22,23]
clocad[22]=[20,21,22,23,24]
clocad[23]=[21,22,23,24,25]
clocad[24]=[22,23,24,25,26]
clocad[25]=[23,24,25,26,27]
clocad[26]=[24,25,26,27]
clocad[27]=[25,26,27]
clocad[28]=[]
clocad[29]=[]
clocad[30]=[]
clocad[31]=[]
clocad[32]=[]
clocad[33]=[]
clocad[34]=[]


plerK[0]=JSON.parse(localStorage.getItem("charich"));
////最後一次玩的人物


if(plerK[0]=="8l"){

plerK[3]="7r"

plerK[2]="2c"

plerK[1]="5l"

}

if(plerK[0]=="7l"){

plerK[3]="3r"

plerK[2]="0c"

plerK[1]="8l"

}

if(plerK[0]=="6l"){

plerK[3]="5r"

plerK[2]="0c"

plerK[1]="3l"

}

if(plerK[0]=="5l"){

plerK[3]="6r"

plerK[2]="0c"

plerK[1]="7l"


}
if(plerK[0]=="3r"){

plerK[3]="5r"

plerK[1]="2l"

plerK[2]="0c"

}

if(plerK[0]=="2c"){

plerK[1]="6l"

plerK[2]="0c"

}

if(plerK[0]=="1l"){

plerK[1]="5l"

}

donlow=''

for(let i=1;i<4;i++){

donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/hv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/kil'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/mtkv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/nv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/psv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/ruv'+plerK[i]+'.png">'

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[i]+'.png">')

}

if(plerK[0]=="-1"){

pledpicmyslef = document.createElement('img');
pledpicmyslef.src = savedImage;
pledpicmyslef.style.height = "900px";
pledpicmyslef.style.width = "auto";
pledpicmyslef.style.display = "block";

///console.log(pledpicmyslef)

}

$(".piclond").html(donlow)

$(".pler1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[1]+'.png">').show()
$(".pler2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[2]+'.png">').show()
$(".pler3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[3]+'.png">').show()


$(".adown,.camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking").show()

pledbk=pled

for(let i=0;i<4;i++){

if(lbmgd[i]==1){

$(".ti"+i).show()

}

sortShowCad(i)///整理牌面顯示

for(let s=0;s<flocd[i].length;s++){

$("."+pldname[i]+" div .f"+(flocd[i].length)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .f"+(flocd[i].length)).show().animate({top:"0px",left:"0px"},200);

}

for(let s=0;s<flocd[i].length;s++){

$("."+pldname[i]+" div .f"+(s+1)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+flocd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .f"+(s+1)).show().animate({top:"0px",left:"0px"},200);

}


for(let s=0;s<otmgd[i].length;s++){

$("."+pldname[i]+" div .o"+(s+1)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+otmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .o"+(s+1)).show().animate({top:"0px",left:"0px"},200);

if(rcmgd[i].indexOf(s)!=-1){

$("."+pldname[i]+" div .o"+(s+1)+" div").css("filter","opacity(0.3)")

}

}

for(let s=0;s<rlmgd[i].length;s+=4){

if(ramgd[i].indexOf(rlmgd[i][s])==-1){

$("."+pldname[i]+" div .e"+(s+1)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+1)).show().animate({top:"0px",left:"0px"},200);

$("."+pldname[i]+" div .e"+(s+2)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s+1]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+2)).show().animate({top:"0px",left:"0px"},200);

$("."+pldname[i]+" div .e"+(s+3)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s+2]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+3)).show().animate({top:"0px",left:"0px"},200);

if(rbmgd[i].indexOf(s+4)!=-1){///明槓

$("."+pldname[i]+" div .e"+(s+4)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s+3]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)).show().animate({top:"0px",left:"0px"},200);

}

}

if(ramgd[i].indexOf(rlmgd[i][s])!=-1){///暗槓

for(let t=1;t<4;t++){

$("."+pldname[i]+" div .e"+(s+t)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+t)+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+t)+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+t)+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+t)+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[i]+" div .e"+(s+t)+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')

$("."+pldname[i]+" div .e"+(s+t)).show().animate({top:"0px",left:"0px"},200);

}

if(i!=0){

$("."+pldname[i]+" div .e"+(s+4)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s+3]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[i]+" div .e"+(s+4)+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')

$("."+pldname[i]+" div .e"+(s+4)).show().animate({top:"0px",left:"0px"},200);

}

if(i==0){///本家暗槓

$("."+pldname[i]+" div .e"+(s+4)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+rlmgd[i][s+3]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .e"+(s+4)).show().animate({top:"0px",left:"0px"},200);

}

}

}

if(pled==i&&epgmow==0&&mds<2){

delete plmgd[i][plmgd[i].indexOf(otc)]

plmgd[i]=plmgd[i].filter(Number)

plmgd[i].push(otc)

}

for(let s=0;s<plmgd[i].length;s++){

$("."+pldname[i]+" div .d"+(ethan[i]+s)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .d"+(ethan[i]+s)).show().animate({top:"0px",left:"0px"},200);


}
pled=i

sortCad()

atkCad()

pled=Number(pledbk)

egall=egmgd[i].toString().split("")

if(egmgd[i]<0){

$('.pler' + i).css("filter", "grayscale(100%)");

}

if(egmgd[i]>-1){

$('.pler' + i).css("filter", "none");

}


egnew=""

for(let s=0;s<egall.length;s++){

if(egmgd[i]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[s]+'.png">'

}

if(egmgd[i]<0&&s!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[s]+'.png">'

}

}

$("."+pldname[i]+" div .lifenum").html(egnew)

}

$("."+pldname[0]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[1]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[2]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[3]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})


pled=Number(pledbk)

plmgd[pled].sort(function (a, b) {

return a - b

});

outTinCd=1///挑戰模式

eatout=0///吃牌後的捨牌判斷

gunwin=0///搶槓胡

gunnout=-1///挑戰模式的槓牌

gunis=""

$(".outshowcad div").hide()

$(".etpgword img").hide()

///$(".f1,.f2,.f3,.f4,.f5,.f6,.f7,.f8,.o1,.o2,.o3,.o4,.o5,.o6,.o7,.o8,.o9,.o10,.o11,.o12,.o13,.o14,.o15,.o16,.o17,.o18,.o19,.o20,.o21,.o22,.o23,.o24,.o25,.o26,.o27,.o28,.o29,.o30,.e1,.e2,.e3,.e4,.e5,.e6,.e7,.e8,.e9,.e10,.e11,.e12,.e13,.e14,.e15,.e16,.e17,.e18,.e19,.e20,.d1,.d2,.d3,.d4,.d5,.d6,.d7,.d8,.d9,.d10,.d11,.d12,.d13,.d14,.d15,.d16,.d17,.ds17").hide()

$(".bk60").hide()

$(".coun3").hide()

$(".bk30").hide()

for(let i=1;i<18;i++){

$(".m"+i).show()

}

if(mds<2){


if(lbmgd[pled]==1&&lomgd[pled].indexOf(otc)==-1){

setTimeout('outCad2(plmgd[pled].indexOf('+otc+'))',500)

return

}

if(lbmgd[pled]!=1||lomgd[pled].indexOf(otc)!=-1){

if(nobackch==0){

setTimeout('outCad()',500)

}

}


return

}

if(mds==2){

outCad3(mdt)

return

}

return

}

/////////////////////////////////////

function savStorage(mds){////輸出紀錄

if(pled<4){

localStorage.setItem("sittwind", JSON.stringify(sittwind))///各家風位
localStorage.setItem("fowtwind", JSON.stringify(fowtwind))///各家花位
localStorage.setItem("plmgd", JSON.stringify(plmgd))
localStorage.setItem("spf", JSON.stringify(spf))///安全牌
localStorage.setItem("flocd", JSON.stringify(flocd))///四個玩家的花牌
localStorage.setItem("otmgd", JSON.stringify(otmgd))///四個玩家打出的牌
localStorage.setItem("bkmgd", JSON.stringify(bkmgd))
localStorage.setItem("akmgd", JSON.stringify(akmgd))///四個玩家吃碰槓後可增加組數的牌
localStorage.setItem("etmgd", JSON.stringify(etmgd))///四個玩家可吃的牌
localStorage.setItem("cnmgd", JSON.stringify(cnmgd))///四個玩家可碰的牌
localStorage.setItem("gnmgd", JSON.stringify(gnmgd))///四個玩家可槓的牌
localStorage.setItem("rlmgd", JSON.stringify(rlmgd))///四個玩家已吃碰槓的區域
localStorage.setItem("rcmgd", JSON.stringify(rcmgd))
localStorage.setItem("ramgd", JSON.stringify(ramgd))///四個玩家暗槓的牌
localStorage.setItem("rbmgd", JSON.stringify(rbmgd))///四個玩家暗槓的牌
localStorage.setItem("lomgd", JSON.stringify(lomgd))///四個玩家聽的牌
localStorage.setItem("lbmgd", JSON.stringify(lbmgd))///四個玩家是否宣佈聽牌
localStorage.setItem("daetp", JSON.stringify(daetp))///四個玩家吃碰槓的區域萬筒條的分布
localStorage.setItem("eemgd", JSON.stringify(eemgd))///四個玩家已吃的牌
localStorage.setItem("ppmgd", JSON.stringify(ppmgd))///四個玩家已碰的牌
localStorage.setItem("ethan", JSON.stringify(ethan))///四個玩家因吃碰槓後手上隱藏的張數
localStorage.setItem("etnum", JSON.stringify(etnum))///四個玩家吃碰槓的組數
localStorage.setItem("egmgd", JSON.stringify(egmgd))
localStorage.setItem("cantakenb", JSON.stringify(cantakenb))

///localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

localStorage.setItem("epgmow",JSON.stringify(epgmow));

localStorage.setItem("incard",JSON.stringify(pled));

localStorage.setItem("alsee",JSON.stringify(alsee))

localStorage.setItem("allmgd",JSON.stringify(allmgd))

localStorage.setItem("player",JSON.stringify(makrs));
////最後一次莊家
localStorage.setItem("chun",JSON.stringify(chnwind));
////最後一次圈
localStorage.setItem("fom",JSON.stringify(junwind));
////最後一次風
localStorage.setItem("laner",JSON.stringify(linmrs));
////最後一次連莊

localStorage.setItem("mds",JSON.stringify(mds));

if(mds==2){

localStorage.setItem("lastcard",JSON.stringify(cpds));////打出的牌

}

}

}


/////////////////////////////////////////////////

plerK=["0c","1l","2c","3r"]///玩家

pledpic=1

$(".playerpicup").hide()

$(".playerpicn").hide()

$(".made").hide()

$(".backindexword").hide()

$(".pledstanby").hide()

wintimce=0///胡牌次數



$(".g1").html("名字:"+plerinfor[pledpic].name)
$(".g2").html("班級:"+plerinfor[pledpic].class)
$(".g3").html("年齡:"+plerinfor[pledpic].age)
$(".g4").html("牌零:"+plerinfor[pledpic].page)
$(".g5").html("解鎖條件:"+plerinfor[pledpic].chk)
$(".g6").html("介紹:"+plerinfor[pledpic].inf)

inficon = document.querySelector(".inficon");

inficon.addEventListener("click",function () {

$(".made").toggle()

},false);

const input = document.querySelector(".mypic");
const playerpicDiv = document.querySelector(".playerpic");

// 儲存圖片到 localStorage

input.addEventListener("input", () => {
  const url = input.value.trim();

  if (url.length !== 0) {
    $(".playerpicup").hide();

    // 移除舊圖片（避免重複）
    document.querySelector(".playerpic").innerHTML = "";

    // 建立新圖片
    pledpicmyslef = document.createElement("img");
    pledpicmyslef.src = url;
    pledpicmyslef.style.height = "900px";
    pledpicmyslef.style.width = "auto";
    pledpicmyslef.style.display = "block";


///console.log(pledpicmyslef)


    // 加到 .playerpic 裡
    document.querySelector(".playerpic").appendChild(pledpicmyslef);
sessionStorage.setItem("charich", url);
localStorage.setItem('uploadedImage', JSON.stringify(url))


  }
});

function bkindex(){

plerK=["0c","1l","2c","3r"]///玩家

nobackch=1///無返回主畫面

pledpic=1

pledpicmyslef="-1"

$(".adown,.camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking").hide()

$(".f1,.f2,.f3,.f4,.f5,.f6,.f7,.f8,.o1,.o2,.o3,.o4,.o5,.o6,.o7,.o8,.o9,.o10,.o11,.o12,.o13,.o14,.o15,.o16,.o17,.o18,.o19,.o20,.o21,.o22,.o23,.o24,.o25,.o26,.o27,.o28,.o29,.o30,.e1,.e2,.e3,.e4,.e5,.e6,.e7,.e8,.e9,.e10,.e11,.e12,.e13,.e14,.e15,.e16,.e17,.e18,.e19,.e20,.d1,.d2,.d3,.d4,.d5,.d6,.d7,.d8,.d9,.d10,.d11,.d12,.d13,.d14,.d15,.d16,.d17,.ds17").hide()

$(".g1").html("名字:"+plerinfor[pledpic].name)
$(".g2").html("班級:"+plerinfor[pledpic].class)
$(".g3").html("年齡:"+plerinfor[pledpic].age)
$(".g4").html("牌零:"+plerinfor[pledpic].page)
$(".g5").html("解鎖條件:"+plerinfor[pledpic].chk)
$(".g6").html("介紹:"+plerinfor[pledpic].inf)

$(".pler1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv1l.png">').show()
$(".pler2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv2c.png">').show()
$(".pler3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv3r.png">').show()


$(".playerpic").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/stanbypled/cv0c.png">')

$(".playerpicup").hide()

$(".playerpicn").hide()

$(".stanbylonding").show()

$(".stanbylondingshap100").css("width","0px")

$(".stanbylondingshap100").animate({width:'100%'},5000);

setTimeout('$(".stanbylonding").hide();$(".pledstanby").show();',5000)

}



arrowL = document.querySelector(".arrowL");

arrowL.addEventListener("click",function () {

pledpic=(pledpic-1>-1)?pledpic-1:plerinfor.length-1

$(".playerpic").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/stanbypled/cv'+plerinfor[pledpic].pic+'.png">')

plerK[0]=plerinfor[pledpic].pic

plerK[0]=(plerK[0]=="-1")?"-1":plerK[0]

///console.log(plerK[0])

///console.log(pledpicmyslef)

sessionStorage.setItem("charich", plerK[0]);

pledpicmyslef="-1"

if(plerinfor[pledpic].cho==0){

$(".playerpicn").hide()

$(".choyon").html("<p>點選人物開始打麻將!!</p>")

}

$(".playerpicup").hide()

if(pledpic==0){

$(".playerpicup").show()

}

if(plerinfor[pledpic].cho!=0){

$(".playerpicn").show()

$(".choyon").html("<font color='red'>解鎖條件後啟用</font>")

}

$(".g1").html("名字:"+plerinfor[pledpic].name)
$(".g2").html("班級:"+plerinfor[pledpic].class)
$(".g3").html("年齡:"+plerinfor[pledpic].age)
$(".g4").html("牌零:"+plerinfor[pledpic].page)
$(".g5").html("解鎖條件:"+plerinfor[pledpic].chk)
$(".g6").html("介紹:"+plerinfor[pledpic].inf)

},false);

sessionStorage.setItem("charich", "0c");

arrowR = document.querySelector(".arrowR");

arrowR.addEventListener("click",function () {

pledpic=(pledpic+1<plerinfor.length)?pledpic+1:0

$(".playerpic").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/stanbypled/cv'+plerinfor[pledpic].pic+'.png">')

plerK[0]=plerinfor[pledpic].pic

plerK[0]=(plerK[0]=="-1")?"-1":plerK[0]

///console.log(plerK[0])

///console.log(pledpicmyslef)

sessionStorage.setItem("charich", plerK[0]);

pledpicmyslef="-1"

if(plerinfor[pledpic].cho==0){

$(".playerpicn").hide()

$(".choyon").html("<p>點選人物開始打麻將!!</p>")

}

$(".playerpicup").hide()

if(pledpic==0){

$(".playerpicup").show()

}

if(plerinfor[pledpic].cho!=0){

$(".playerpicn").show()

$(".choyon").html("<font color='red'>解鎖條件後啟用</font>")

}


$(".g1").html("名字:"+plerinfor[pledpic].name)
$(".g2").html("班級:"+plerinfor[pledpic].class)
$(".g3").html("年齡:"+plerinfor[pledpic].age)
$(".g4").html("牌零:"+plerinfor[pledpic].page)
$(".g5").html("解鎖條件:"+plerinfor[pledpic].chk)
$(".g6").html("介紹:"+plerinfor[pledpic].inf)

},false);



playerpicOK = document.querySelector(".playerpic");

playerpicOK.addEventListener("click",function () {

$("#bk90").show()


///$(".pledstanby").hide()

///londing()

},false);




function londing(){

localStorage.setItem("charich",JSON.stringify(plerK[0]));

if(plerK[0]=="8l"){

plerK[3]="7r"

plerK[2]="2c"

plerK[1]="5l"

}

if(plerK[0]=="7l"){

plerK[3]="3r"

plerK[2]="0c"

plerK[1]="8l"

}

if(plerK[0]=="6l"){

plerK[3]="5r"

plerK[2]="0c"

plerK[1]="3l"

}

if(plerK[0]=="5l"){

plerK[3]="6r"

plerK[2]="0c"

plerK[1]="7l"


}
if(plerK[0]=="3r"){

plerK[3]="5r"

plerK[1]="2l"

plerK[2]="0c"

}

if(plerK[0]=="2c"){

plerK[1]="6l"

plerK[2]="0c"

}

if(plerK[0]=="1l"){

plerK[1]="5l"

}

donlow=''

for(let i=1;i<4;i++){

donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/hv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/kil'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/mtkv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/nv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/psv'+plerK[i]+'.png">'
donlow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/ruv'+plerK[i]+'.png">'

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[i]+'.png">')

}

$(".piclond").html(donlow)


starbefore()

$(".table").show()

$(".londing").show()

$(".londingshap100").css("width","0px")

$(".londingshap100").animate({width:'100%'},10000);

setTimeout('$(".londing").hide()',10000)

setTimeout('begStar()',11000)

}


function starbefore(){

$(".adown,.camera,.mycad,.nextcad,.fontcad,.lastcad,.space,.etpghwordbk,.smoking").show()

$(".coun3").hide()

$("#bk90").hide()

$(".bk60").hide()

$(".bk30").hide()

otlisten=[]///聽牌

makrs=Math.floor(Math.random() * 4)///莊家

linmrs=0///連莊次數

chnwind=28///圈位

junwind=28///將位

egmgd=[40000,40000,40000,40000]///四個玩家的積分

pldname=["mycad","nextcad","fontcad","lastcad"]

for(let i=0;i<4;i++){

pled=i

egall=egmgd[pled].toString().split("")

egnew=""


if(egmgd[i]<0){

$('.pler' + i).css("filter", "grayscale(100%)");

}

if(egmgd[i]>-1){

$('.pler' + i).css("filter", "none");

}



for(let i=0;i<egall.length;i++){

if(egmgd[pled]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[i]+'.png">'

}

if(egmgd[pled]<0&&i!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[i]+'.png">'

}

}

$("."+pldname[pled]+" div .lifenum").html(egnew)

}

fdal=[]///上下壓

fdal[0]=[]
fdal[1]=[1]
fdal[2]=[1,2]
fdal[3]=[1,2,3]
fdal[4]=[1,2,3,4]
fdal[5]=[5]
fdal[6]=[3,6,7,8]
fdal[7]=[7,8,9]
fdal[8]=[8,9]
fdal[9]=[9]
fdal[10]=[10]
fdal[11]=[10,11]
fdal[12]=[10,11,12]
fdal[13]=[10,11,12,13]
fdal[14]=[14]
fdal[15]=[12,15,16,17]
fdal[16]=[16,17,18]
fdal[17]=[17,18]
fdal[18]=[18]
fdal[19]=[19]
fdal[20]=[19,20]
fdal[21]=[19,20,21]
fdal[22]=[19,20,21,22]
fdal[23]=[23]
fdal[24]=[21,24,25,26]
fdal[25]=[25,26,27]
fdal[26]=[26,27]
fdal[27]=[28]
fdal[28]=[]
fdal[29]=[]
fdal[30]=[]
fdal[31]=[]
fdal[32]=[]
fdal[33]=[]
fdal[34]=[]

ard=[]///一路性
ard[0]=[]
ard[1]=[]
ard[2]=[]
ard[3]=[]
ard[4]=[1,4,7]
ard[5]=[2,5,7]
ard[6]=[3,6,9]
ard[7]=[]
ard[8]=[]
ard[9]=[]
ard[10]=[]
ard[11]=[]
ard[12]=[]
ard[13]=[10,13,16]
ard[14]=[11,14,17]
ard[15]=[12,15,18]
ard[16]=[]
ard[17]=[]
ard[18]=[]
ard[19]=[]
ard[20]=[]
ard[21]=[]
ard[22]=[19,22,25]
ard[23]=[20,23,26]
ard[24]=[21,24,27]
ard[25]=[]
ard[26]=[]
ard[27]=[]
ard[28]=[]
ard[29]=[]
ard[30]=[]
ard[31]=[]
ard[32]=[]
ard[33]=[]
ard[34]=[]

clocad=[]///拆搭

clocad[0]=[]
clocad[1]=[1,2,3]
clocad[2]=[1,2,3,4]
clocad[3]=[1,2,3,4,5]
clocad[4]=[2,3,4,5,6]
clocad[5]=[3,4,5,6,7]
clocad[6]=[4,5,6,7,8]
clocad[7]=[5,6,7,8,9]
clocad[8]=[6,7,8,9]
clocad[9]=[7,8,9]
clocad[10]=[10,11,12]
clocad[11]=[10,11,12,13]
clocad[12]=[10,11,12,13,14]
clocad[13]=[11,12,13,14,15]
clocad[14]=[12,13,14,15,16]
clocad[15]=[13,14,15,16,17]
clocad[16]=[14,15,16,17,18]
clocad[17]=[15,16,17,18]
clocad[18]=[16,17,18]
clocad[19]=[19,20,21]
clocad[20]=[19,20,21,22]
clocad[21]=[19,20,21,22,23]
clocad[22]=[20,21,22,23,24]
clocad[23]=[21,22,23,24,25]
clocad[24]=[22,23,24,25,26]
clocad[25]=[23,24,25,26,27]
clocad[26]=[24,25,26,27]
clocad[27]=[25,26,27]
clocad[28]=[]
clocad[29]=[]
clocad[30]=[]
clocad[31]=[]
clocad[32]=[]
clocad[33]=[]
clocad[34]=[]

}


////////////////////////////////

function smokeshow(ply){

if(ply==0){$(".smok0").show().animate({left:"-200"},500).fadeOut(100);setTimeout('$(".smok0").css("left","-50")',600)}
if(ply==1){$(".smok1").show().animate({left:"1400",top:"700"},500).fadeOut(100);setTimeout('$(".smok1").css("left","1300").css("top","600")',600)}
if(ply==2){$(".smok2").show().animate({left:"1200"},500).fadeOut(100);setTimeout('$(".smok2").css("left","1100")',600)}
if(ply==3){$(".smok3").show().animate({left:"400",top:"150"},500).fadeOut(100);setTimeout('$(".smok3").css("left","350").css("top","200")',600)}

}

/////////////////////////////////

function starDice(){///骰骰子

bgige='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(chnwind-28)+'.png" style="height:150px;">'
bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/wn.png" style="height:150px;">'
bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(junwind-28)+'.png" style="height:150px;">'

bgige2='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(chnwind-28)+'.png" style="height:40px;">'
bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/wn.png" style="height:40px;">'
bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(junwind-28)+'.png" style="height:40px;">'
linmrsany=linmrs.toString().split("")

if(linmrsany.length>1){

for(let i=0;i<linmrsany.length-1;i++){

bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+linmrsany[i]+'.png" style="height:150px;">'

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+linmrsany[i]+'.png" style="height:40px;">'

}

}

bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/0'+(linmrs+1)+'.png" style="height:150px;">'

bgige+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/ge.png" style="height:150px;">'

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/0'+(linmrs+1)+'.png" style="height:40px;">'

bgige2+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/ge.png" style="height:40px;">'

$(".bgige").html(bgige)///圈風局
$(".bgige2").html(bgige2)///圈風局

$(".bk30").show()

di1 = Math.floor(Math.random() * 6+1);
di2 = Math.floor(Math.random() * 6+1);
di3 = Math.floor(Math.random() * 6+1);

$(".dice1 .dc"+di1).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/di2.png" style="width:100px;height:100px;">')
$(".dice1 .dc"+Math.abs(7-di1)).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/di5.png" style="width:100px;height:100px;">')
$(".dice1 .dc2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/di'+di1+'.png" style="width:100px;height:100px;">')
$(".dice1 .dc4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/di'+Math.abs(7-di1)+'.png" style="width:100px;height:100px;">')

$(".dice2 .dc"+di2).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/dg5.png" style="width:100px;height:100px;">')
$(".dice2 .dc"+Math.abs(7-di2)).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/dg6.png" style="width:100px;height:100px;">')
$(".dice2 .dc5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/dg'+di2+'.png" style="width:100px;height:100px;">')
$(".dice2 .dc6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/dg'+Math.abs(7-di2)+'.png" style="width:100px;height:100px;">')


$(".dice3 .dc"+di3).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/db3.png" style="width:100px;height:100px;">')
$(".dice3 .dc"+Math.abs(7-di3)).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/db1.png" style="width:100px;height:100px;">')
$(".dice3 .dc3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/db'+di3+'.png" style="width:100px;height:100px;">')
$(".dice3 .dc1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/db'+Math.abs(7-di3)+'.png" style="width:100px;height:100px;">')

$(".dice1").attr('class','dicem1');
$(".dice2").attr('class','dicem2');
$(".dice3").attr('class','dicem3');

hadow=makrs

outTinCd=1///挑戰模式

dial=Number(di1+di2+di3)

for(let i=1;i<dial;i++){

hadow=(hadow-1>-1)?hadow-1:3

}

nak=0-hadow///玩家位置

fowset=(nak+4==4)?0:nak+4

for(let i=0;i<4;i++){

fowtwind.push(fowset+1)///各家花位

sittwind.push(fowset+28)///各家風位

fowset=(fowset+1<4)?fowset+1:0

}

setTimeout('gamStar()',3000)

}


backindexword = document.querySelector(".backindex2");

backindexword.addEventListener("click",function () {

$(".backindexword").show()

})

backindexword2 = document.querySelector(".backindexword");

backindexword2.addEventListener("click",function () {

$(".backindexword").toggle()

})

etin = document.querySelector(".epgh4");

etin.addEventListener("click",function () {

$(".ti0").toggle()

tinmsalf=(tinmsalf==0)?1:0

otlistenod=[]

if(tinmsalf==1){

if(epgmow==0){

delete plmgd[0][plmgd[0].indexOf(tineptout)]

plmgd[0]=plmgd[0].filter(Number)

plmgd[0].push(tineptout)

}

for(let i=0;i<otlisten.length;i++){

otlistenod.push(plmgd[0][otlisten[i].td])

}

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
}

if(otlistenod.indexOf(cardNum)==-1){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

}

}

}

if(tinmsalf==0){

for(let i=1;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}

}



},false);



function begStar(){///開始

$(".gh1").hide()

nobackch=0///無返回主畫面

gunwin=0///搶槓胡

nogunwin=0///槓上開花

tinmsalf=0///手動聽牌

$(".etpghword img").hide()

$(".outshowcad div").hide()

$(".etpgword img").hide()

$(".tizunword img").hide()

$(".zun"+makrs).show()



sittwind=[]///各家風位

fowtwind=[]///各家花位

cantakenb=0

plmgd=[[],[],[],[]]

spf=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]///安全牌

flocd=[[],[],[],[]]///四個玩家的花牌

otmgd=[[],[],[],[]]///四個玩家打出的牌

bkmgd=[[],[],[],[]]

akmgd=[[],[],[],[]]///四個玩家吃碰槓後可增加組數的牌

etmgd=[[],[],[],[]]///四個玩家可吃的牌

cnmgd=[[],[],[],[]]///四個玩家可碰的牌

gnmgd=[[],[],[],[]]///四個玩家可槓的牌

rlmgd=[[],[],[],[]]///四個玩家已吃碰槓的區域

rcmgd=[[],[],[],[]]///四個玩家被吃碰槓的區域

ramgd=[[],[],[],[]]///四個玩家暗槓的牌

rbmgd=[[],[],[],[]]///四個玩家明槓的牌

lomgd=[[],[],[],[]]///四個玩家聽的牌

lbmgd=[0,0,0,0]///四個玩家是否宣佈聽牌

daetp=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]///四個玩家吃碰槓的區域萬筒條的分布

eemgd=[0,0,0,0]///四個玩家已吃的牌

ppmgd=[0,0,0,0]///四個玩家已碰的牌

ethan=[1,1,1,1]///四個玩家因吃碰槓後手上隱藏的張數

etnum=[0,0,0,0]///四個玩家吃碰槓的組數

alsee=[]///已見光的牌

epgmow=0///吃碰槓的場合

tinyk=0

pldname=["mycad","nextcad","fontcad","lastcad"]

allmgd=[]

pled=makrs


$(".dicem1").attr('class','dice1');
$(".dicem2").attr('class','dice2');
$(".dicem3").attr('class','dice3');


$("."+pldname[0]+" div .ds17").attr('class','d17');

$("."+pldname[1]+" div .ds17").attr('class','d17');

$("."+pldname[2]+" div .ds17").attr('class','d17');

$("."+pldname[3]+" div .ds17").attr('class','d17');

for(let i=1;i<18;i++){

$("."+pldname[0]+" div .d"+i).hide()
$("."+pldname[1]+" div .d"+i).hide()
$("."+pldname[2]+" div .d"+i).hide()
$("."+pldname[3]+" div .d"+i).hide()

$("."+pldname[0]+" div .d"+i+" .c1").html("")
$("."+pldname[1]+" div .d"+i+" .c1").html("")
$("."+pldname[2]+" div .d"+i+" .c1").html("")
$("."+pldname[3]+" div .d"+i+" .c1").html("")

$("."+pldname[0]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[1]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[2]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

$("."+pldname[3]+" div .d"+i).animate({},10,function(){

$(this).css({'transform':'translateX('+(0-540+i*60)+'px) rotateX(0deg)'})

})

}

$("."+pldname[0]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[1]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[2]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

$("."+pldname[3]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px)  rotateX(0deg)'})

})

for(let i=1;i<18;i++){

$(".m"+i).show()

}


$(".pler1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[1]+'.png">').show()
$(".pler2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[2]+'.png">').show()
$(".pler3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[3]+'.png">').show()

for(let i=1;i<9;i++){

$("."+pldname[0]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[1]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[2]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[3]+" div .f"+i).hide().animate({top:"-50px",left:"10px"},10);

$("."+pldname[0]+" div .f"+i+" .c1").html("")
$("."+pldname[1]+" div .f"+i+" .c1").html("")
$("."+pldname[2]+" div .f"+i+" .c1").html("")
$("."+pldname[3]+" div .f"+i+" .c1").html("")

}

for(let i=1;i<31;i++){

$("."+pldname[0]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[1]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[2]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);
$("."+pldname[3]+" div .o"+i).hide().animate({top:"-50px",left:"10px"},10);

$("."+pldname[0]+" div .o"+i+" .c1").html("")
$("."+pldname[1]+" div .o"+i+" .c1").html("")
$("."+pldname[2]+" div .o"+i+" .c1").html("")
$("."+pldname[3]+" div .o"+i+" .c1").html("")

$("."+pldname[0]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[1]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[2]+" div .o"+i+" div").css("filter","opacity(1)")
$("."+pldname[3]+" div .o"+i+" div").css("filter","opacity(1)")


}

for(let i=1;i<21;i++){

$("."+pldname[0]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[1]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[2]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);
$("."+pldname[3]+" div .e"+i).hide().animate({top:"0px",left:"50px"},10);

$("."+pldname[0]+" div .e"+i+" .c1").html("")
$("."+pldname[1]+" div .e"+i+" .c1").html("")
$("."+pldname[2]+" div .e"+i+" .c1").html("")
$("."+pldname[3]+" div .e"+i+" .c1").html("")

$("."+pldname[0]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[0]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[0]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[1]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[1]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[1]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[2]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[2]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[2]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[3]+" div .e"+i+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')
$("."+pldname[3]+" div .e"+i+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')
$("."+pldname[3]+" div .e"+i+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

}
$(".bk60").hide()

setTimeout('starDice()',1000)

}


function picinallshow(){

if(picinall==16){

$(".mycad div .d"+(plmgd[0].length-0)).show()
$(".mycad div .d"+(plmgd[0].length-1)).show()
$(".mycad div .d"+(plmgd[0].length-2)).show()
$(".mycad div .d"+(plmgd[0].length-3)).show()
$(".nextcad div .d"+(plmgd[0].length-0)).show()
$(".nextcad div .d"+(plmgd[0].length-1)).show()
$(".nextcad div .d"+(plmgd[0].length-2)).show()
$(".nextcad div .d"+(plmgd[0].length-3)).show()
$(".fontcad div .d"+(plmgd[0].length-0)).show()
$(".fontcad div .d"+(plmgd[0].length-1)).show()
$(".fontcad div .d"+(plmgd[0].length-2)).show()
$(".fontcad div .d"+(plmgd[0].length-3)).show()
$(".lastcad div .d"+(plmgd[0].length-0)).show()
$(".lastcad div .d"+(plmgd[0].length-1)).show()
$(".lastcad div .d"+(plmgd[0].length-2)).show()
$(".lastcad div .d"+(plmgd[0].length-3)).show()

if(plmgd[3].length!=16){

setTimeout('gamStar()',300)

}

if(plmgd[3].length==16){

if(testbigcad==1){

for(let i=0;i<16;i++){

delete allmgd[allmgd.indexOf(ormgd[0][i])]

allmgd=allmgd.filter(Number)

}


plmgd[0]=[28,28,28,28,29,29,29,30,30,30,31,31,31,32,32,33]///大四喜


///plmgd[0]=[28,28,28,29,29,29,30,30,30,31,31,31,32,32,33,33]///大四喜

///plmgd[0]=[1,1,2,2,2,3,3,3,6,6,6,7,7,7,9,9]///清一色

///plmgd[0]=[1,1,2,2,2,3,3,3,6,6,6,7,7,7,33,33]///萬字湊一色

}

setTimeout('gamStar2()',300)

}

}

}

function gamStar(){///抽出一開始的16張牌(不能重覆)

$(".gh2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/op'+sittwind[0]+'.png" style="width:50px;height:50px;">')

$(".gh1").show()

$(".bk30").hide()

testbigcad=0

if(testbigcad==1){


allmgd=[109,110,111,112,113,114,115,117,118,119,121,122,123,125,126,129]

///allmgd=[109,110,111,113,114,115,117,118,119,121,122,123,125,126,129,130]

///allmgd=[1,2,5,6,7,9,10,11,21,22,23,25,26,27,35,36]///清一色

///allmgd=[1,2,5,6,7,9,10,11,21,22,23,25,26,27,129,130]///萬字湊一色

}

ormgd=[[],[],[],[]]

picinall=0

for(let i=0;i<4;i++){

for(let s=0;s<4;s++){

var n = Math.floor(Math.random() * 144+1);///144

while(allmgd.indexOf(n)!=-1){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144+1);///144

}

if(n<137){

plmgd[i].push(Math.ceil(n/4))///放入玩家的手牌

const cardIndex = plmgd[i].length;

const img = new Image();

img.src = "https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/"+Math.ceil(n/4)+".png";

img.onload = function () {
  $("."+pldname[i]+" div .d"+cardIndex+" .c1").html(img);

picinall++

picinallshow()

};

}

if(n>=137){

plmgd[i].push(n)///放入玩家的手牌

const cardIndex = plmgd[i].length;

const img = new Image();
img.src = "https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/"+n+".png";

img.onload = function () {
  $("."+pldname[i]+" div .d"+cardIndex+" .c1").html(img);

picinall++

picinallshow()

};

}


allmgd.push(n)///放入全部的牌

ormgd[i].push(n)

}

}

}


function gamStar2(){///整理順序和花牌補花

$(".etpgword img").hide()

pledbk=pled

for(let i=0;i<4;i++){

pled=i

for(let s=0;s<16;s++){

if(plmgd[i][s]>=137){///花牌

flocd[i].push(plmgd[i][s])

$("."+pldname[i]+" div .f"+(flocd[i].length)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[i][s]+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .f"+(flocd[i].length)).show().animate({top:"0px",left:"0px"},200);

var n = allmgd[0]

while(allmgd.indexOf(n)!=-1){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144+1);///144

if(n>=137&&allmgd.indexOf(n)==-1){

flocd[i].push(n)

$("."+pldname[i]+" div .f"+(flocd[i].length)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+n+'.png" style="width:60px;height:80px;">')

$("."+pldname[i]+" div .f"+(flocd[i].length)).show().animate({top:"0px",left:"0px"},200);

allmgd.push(n)///放入全部的牌

}

}

plmgd[i][s]=(Math.ceil(n/4))///放入玩家的手牌

allmgd.push(n)///放入全部的牌

$("."+pldname[i]+" div .d"+(s+1)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+Math.ceil(n/4)+'.png" style="width:60px;height:80px;">')

}

}

sortShowCad(i)

sortCad()

atkCad()

}

$(".tkeflower").show()

pled=pledbk

setTimeout('sorOut()',500)

}

function sortShowCad(pld){///整理牌面顯示

plmgd[pld].sort(function (a, b) {

return a - b

});

for(let s=0;s<plmgd[pld].length;s++){

$("."+pldname[pld]+" div .d"+(ethan[pld]+s)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[pld][s]+'.png" style="width:60px;height:80px;">')

}

}

function winShow(){

$(".outshowcad div").hide()

$("."+pldname[pled]+" div .d"+ethan[pled]).animate({},200,function(){

$(this).css({'transform':'translateX('+(0-480+(ethan[pled]-1)*60)+'px) rotateX(90deg)'})

})

if(ethan[pled]<16){

ethan[pled]++

setTimeout('winShow()',100)

return

}


if(ethan[pled]==16){

if(pled==0){

wintimce++///胡牌次數

if(wintimce>=2){

plerinfor[6].cho=0

localStorage.setItem("ch6", 0);

}

}


bkmgds2=JSON.parse(JSON.stringify(plmgd[pled]))///複製

delete plmgd[pled][plmgd[pled].indexOf(wincad)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

lomgd[pled]=[]

bkmgds3=JSON.parse(JSON.stringify(plmgd[pled]))///複製

for(let s=1;s<35;s++){

plmgd[pled].push(s)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(Number(etnum[pled])+tsp==6){

lomgd[pled].push(s)

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgds3))///複製

}


plmgd[pled]=JSON.parse(JSON.stringify(bkmgds2))///複製

bigCadr()///台數統計

plmgd[pled]=JSON.parse(JSON.stringify(bkmgds3))///複製


wincadhand=""

for(let i=0;i<rlmgd[pled].length;i++){

wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/meup/'+rlmgd[pled][i]+'.png" style="width:70px;">'
wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/meup/'+rlmgd[pled][i+1]+'.png" style="width:70px;">'
wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/meup/'+rlmgd[pled][i+2]+'.png" style="width:70px;">'

i+=3

}

wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/meup/n.png" style="width:70px;">'

for(let i=0;i<plmgd[pled].length;i++){

wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mati/'+plmgd[pled][i]+'.png" style="width:70px;">'

}

wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/meup/n.png" style="width:70px;">'

wincadhand+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mati/'+wincad+'.png" style="width:70px;">'

$(".wincadhand").html(wincadhand)///手牌

wincadflow=""

for(let i=0;i<flocd[pled].length;i++){

wincadflow+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mati/'+flocd[pled][i]+'.png" style="width:50px;">'

}

$(".wincadflow").html(wincadflow)///花牌

winge='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(chnwind-28)+'.png" style="height:45px;">'
winge+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/wn.png" style="height:45px;">'
winge+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+(junwind-28)+'.png" style="height:45px;">'

linmrsany=linmrs.toString().split("")

if(linmrsany.length>1){

for(let i=0;i<linmrsany.length-1;i++){

winge+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/'+linmrsany[i]+'.png" style="height:45px;">'

}

}

winge+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/0'+(linmrs+1)+'.png" style="height:45px;">'

winge+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/ge.png" style="height:45px;">'

$(".winge").html(winge)///圈風局

wintaiall=''

ykany=yk0.toString().split("")

for(let i=0;i<ykany.length;i++){

wintaiall+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/bw'+ykany[i]+'.png">'

}
wintaiall+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/sen2.png">'

$(".wintaiall").html(wintaiall)///總台數

wintainu=1

wintaier=0

$(".wintai1").html("")
$(".wintai2").html("")
$(".wintai3").html("")
$(".wintai4").html("")

wintai=""

for(let i=0;i<whtai.length;i++){

wintai+=whtai[i]+'<p>'

wintaier++

if(wintaier==5||i+1==whtai.length){

$(".wintai"+wintainu).html(wintai)///台型

wintai=""

wintaier=0

wintainu++

}

}

if(mytsale==0){

ykall=yk0*500+1000

yksd=ykall

}

if(mytsale==1&&pled!=makrs){

ykall=(((yk0-(linmrs*2+1))*500+1000)*2)+(yk0*500+1000)

yksd=ykall

}

if(mytsale==1&&pled==makrs){

ykall=(yk0*500+1000)*3

yksd=ykall

}

ykall=ykall.toString().split("")


winco='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/add.png">'

for(let i=0;i<ykall.length;i++){

winco+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/co'+ykall[i]+'.png">'

}

$(".winco").html(winco)///得分

$(".winpler").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/mtkv'+plerK[pled]+'.png">')///人物

if(pled==0&&pledpicmyslef!="-1"){

$(".winpler").html($(pledpicmyslef));


}

egmgd[pled]+=yksd

egall=egmgd[pled].toString().split("")

egnew=""

for(let i=0;i<egall.length;i++){

if(egmgd[pled]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[i]+'.png">'

}

if(egmgd[pled]<0&&i!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[i]+'.png">'

}

}

$("."+pldname[pled]+" div .lifenum").html(egnew)

for(let s=0;s<4;s++){

if(s!=pled){

if(losgun!=-1&&losgun==s){///放槍

egmgd[s]-=yksd

egall=egmgd[s].toString().split("")

egnew=""

for(let i=0;i<egall.length;i++){

if(egmgd[s]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[i]+'.png">'

}

if(egmgd[s]<0&&i!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[i]+'.png">'

}

}

$("."+pldname[s]+" div .lifenum").html(egnew)

}

if(losgun==-1&&pled==makrs||losgun==-1&&pled!=makrs&&makrs==s){///自摸.胡牌是庄家/庄家

egmgd[s]-=(yk0*500+1000)

egall=egmgd[s].toString().split("")

egnew=""

for(let i=0;i<egall.length;i++){

if(egmgd[s]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[i]+'.png">'

}

if(egmgd[s]<0&&i!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[i]+'.png">'

}

}

$("."+pldname[s]+" div .lifenum").html(egnew)

}

if(losgun==-1&&pled!=makrs&&makrs!=s){///自摸庄家以外的

egmgd[s]-=((yk0-(linmrs*2+1))*500+1000)

egall=egmgd[s].toString().split("")

egnew=""

for(let i=0;i<egall.length;i++){

if(egmgd[s]>-1){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mr'+egall[i]+'.png">'

}

if(egmgd[s]<0&&i!=0){

egnew+='<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/m'+egall[i]+'.png">'

}

}

$("."+pldname[s]+" div .lifenum").html(egnew)

}

}

}


$(".tainame").html('')
if(whtai.indexOf("平胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/nopun.png">')}
if(whtai.indexOf("全求人")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/plzother.png">')}
if(whtai.indexOf("搶槓胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/othergunhu.png">')}
if(whtai.indexOf("河底撈魚")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/lastfish.png">')}
if(whtai.indexOf("海底撈月")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/lastmoon.png">')}
if(whtai.indexOf("槓上開花")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/gunhu.png">')}
if(whtai.indexOf("自摸")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/powtake.png">')}
if(whtai.indexOf("門清一摸三")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/mytakeall.png">')}
if(whtai.indexOf("三暗刻")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/punthree.png">')}
if(whtai.indexOf("碰碰胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/punall.png">')}
if(whtai.indexOf("四暗刻")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/punfour.png">')}
if(whtai.indexOf("五暗刻")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/punfive.png">')}
if(whtai.indexOf("七搶一")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/seventkone.png">')}
if(whtai.indexOf("八仙過海")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/godtosee.png">')}
if(whtai.indexOf("小三元")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/smothree.png">')}
if(whtai.indexOf("大三元")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/bigthree.png">')}
if(whtai.indexOf("小四喜")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/smofour.png">')}
if(whtai.indexOf("大四喜")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/bigfour.png">')}
if(whtai.indexOf("湊一色")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/onlynumber.png">')}
if(whtai.indexOf("清一色")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/numberall.png">')}
if(whtai.indexOf("字一色")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/wordall.png">')}
if(whtai.indexOf("人胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/humenhu.png">')}
if(whtai.indexOf("地胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/grundhu.png">')}
if(whtai.indexOf("天胡")!=-1){$(".tainame").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/word/godhu.png">')}

///setTimeout('$(".bk60").show(500)',1000)

setTimeout('$(".bk60").fadeIn(500)',1000)

if(pled!=makrs){

makrs=(makrs+1<4)?makrs+1:0

if(junwind==31){

setTimeout('tincode('+chnwind+')',10000)

return

}
chnwind=(junwind==31)?chnwind+1:chnwind///圈位

chnwind=(chnwind<32)?chnwind:28///圈位

junwind=(junwind+1<32)?junwind+1:28///將位



linmrs=0///連莊次數

setTimeout('begStar()',10000)

return

}

if(pled==makrs){

linmrs++///連莊次數

setTimeout('begStar()',10000)

return

}

}

}

function tincode(whe){

$(".tincode").show()

if(whe==28){

$(".tincode1").show()

setTimeout('$(".tincode1").hide();$(".tincode").hide();$(".londingtincode100").css("width","0px")',11000)

}

if(whe==29){

plerinfor[5].cho=0

localStorage.setItem("ch5", 0);


$(".tincode2").show()

setTimeout('$(".tincode2").hide();$(".tincode").hide();$(".londingtincode100").css("width","0px")',11000)

}

if(whe==30){

$(".tincode3").show()

setTimeout('$(".tincode3").hide();$(".tincode").hide();$(".londingtincode100").css("width","0px")',11000)

}

if(whe==31){

$(".tincode4").show()

setTimeout('$(".tincode4").hide();$(".tincode").hide();$(".londingtincode100").css("width","0px")',11000)

}


$(".londingtincode100").animate({width:'100%'},10000);

chnwind=(junwind==31)?chnwind+1:chnwind///圈位

chnwind=(chnwind<32)?chnwind:28///圈位

junwind=(junwind+1<32)?junwind+1:28///將位

linmrs=0///連莊次數

setTimeout('begStar()',11000)

}


//////////////////////////////////////////////////////////

function bigCadr(){///台數統計

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

yk0=0///目前台數

fourcdr=0

whtai=[]

rlmgdbk=JSON.parse(JSON.stringify(rlmgd[pled]))///複製

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

for(let i=0;i<5;i++){

rlmgd[pled][i*4+3]=[]

}

rlmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

for(let i=28;i<35;i++){

cpf[i]=(cpf[i]==4)?3:cpf[i]

}

biword=cpf[28]+cpf[29]+cpf[30]+cpf[31]+cpf[32]+cpf[33]+cpf[34]

//////////////////////////////////////////////////////////////////

if(plmgd[pled].length+ramgd[pled].length>=17){///門清

whtai=["門清"]

if(pled==0&&lbmgd[pled]==1){

plerinfor[9].cho=0

localStorage.setItem("ch9", 0);

}

yk0+=2

}

if(mytsale==1){///自摸

whtai=["自摸"]

yk0+=1

}

if(plmgd[pled].length+ramgd[pled].length>=17&&mytsale==1){///門清一摸三

whtai=["門清一摸三"]

}

if(lbmgd[pled]==1){///聽牌

whtai.push("聽牌")

yk0+=1

}


if(nogunwin==1){///槓上開花

whtai.push("槓上開花")

yk0+=1

}

////////////////////////////////////////////////////////////////清一色

for(let s=0;s<3;s++){

nuword=0

for(let i=s*9+1;i<s*9+10;i++){

nuword+=cpf[i]

}

if(nuword==0&&biword==17){

yk0+=16///字一色

whtai.push("字一色")

break

}

if(nuword==17&&biword==0){

yk0+=8///清一色

whtai.push("清一色")

break

}

if(biword+nuword==17&&biword>0){

yk0+=4///湊一色

whtai.push("湊一色")

break

}

}

////////////////////////////////////////////////////////////////天地胡

if(cantakenb==1&&mytsale==1&&pled==makrs){///天胡

yk0+=24

whtai.push("天胡")


}

if(cantakenb<5&&mytsale==1&&pled!=makrs){///地胡

yk0+=16

whtai.push("地胡")

}

if(cantakenb<5&&mytsale==0&&pled!=makrs){///人胡

yk0+=8

whtai.push("人胡")

}

/////////////////////四喜/三元台

if(cpf[28]+cpf[29]+cpf[30]+cpf[31]==12){///大四喜

yk0+=16

fourcdr=1

whtai.push("大四喜")

}

if(cpf[28]+cpf[29]+cpf[30]+cpf[31]==11){///小四喜

yk0+=8

fourcdr=1

whtai.push("小四喜")

}

if(cpf[32]+cpf[33]+cpf[34]==9){///大三元

yk0+=8

fourcdr=1

whtai.push("大三元")

}

if(cpf[32]+cpf[33]+cpf[34]==8){///小三元

yk0+=4

fourcdr=1

whtai.push("小三元")

}


if(fourcdr==0&&cpf[32]==3){///紅中

yk0+=1

whtai.push("紅中")

}

if(fourcdr==0&&cpf[33]==3){///發財

yk0+=1

whtai.push("發財")

}

if(fourcdr==0&&cpf[34]==3){///白板

yk0+=1

whtai.push("白板")

}


////////////////////////////////////////////////////////////////圈風台

if(cpf[sittwind[pled]]==3){///門風

yk0+=1

whtai.push("門風")

}

if(cpf[chnwind]==3){///圈風

yk0+=1

whtai.push("圈風")

}


////////////////////////////////////////////////////////////////暗刻台

dubnum=0

dimwincad=0///扣除胡的牌

plmgd[pled]=plmgd[pled].concat(ramgd[pled])


dubnum = 0;

ineyes=0

cpf = Array(35).fill(0);

if(mytsale!=1){///非自摸 扣掉胡牌

  const idx = plmgd[pled].indexOf(wincad);
  if (idx !== -1) plmgd[pled].splice(idx, 1);
  plmgd[pled].sort((a, b) => a - b);

sortCad()

if(crdeye==0){

plmgd[pled].push(wincad);
plmgd[pled].sort((a, b) => a - b);

ineyes=1

}

}

// 統計手牌張數
for (let i = 0; i < plmgd[pled].length; i++) {

  cpf[plmgd[pled][i]]++;

}


let i = 1;
let used = Array(35).fill(false); // 防止重複試同一個牌

while (i < 35) {
  if (cpf[i] >= 3 && !used[i]) {
    sortCad();
    let baseTSP = manum + ((crdeye > 0) ? 1 : 0);

    // 移除三張牌 i
    let removed = [];
    for (let j = plmgd[pled].length - 1; j >= 0 && removed.length < 3; j--) {
      if (plmgd[pled][j] === i) {
        removed.push(plmgd[pled][j]);
        plmgd[pled].splice(j, 1);
      }
    }

    sortCad();
    const newTSP = manum + ((crdeye > 0) ? 1 : 0);

    if (newTSP === baseTSP - 1 && crdeye > 0) {
      dubnum++;
      // 已經成功處理，不用還原
      used = Array(35).fill(false); // 重置 used（可能影響別的牌）
      i = 1; // 重新開始
    } else {
      // 沒成功，還原
      plmgd[pled] = plmgd[pled].concat(removed);
      plmgd[pled].sort((a, b) => a - b);
      used[i] = true; // 加入黑名單，下次不再試
      i++; // 試下一張
    }

    // 重建 cpf
    cpf = Array(35).fill(0);
    for (let k = 0; k < plmgd[pled].length; k++) {
      cpf[plmgd[pled][k]]++;
    }
  } else {
    i++;
  }
}


if(mytsale!=1&&ineyes==0){///非自摸 扣掉胡牌

plmgd[pled].push(wincad);
plmgd[pled].sort((a, b) => a - b);

}

sortCad()



if(dubnum==5&&crdeye==1&&manum+eemgd[pled]==0&&dimwincad==0){///五暗刻

yk0=yk0+8

whtai.push("五暗刻")

}

if(dubnum==4&&crdeye==1&&manum+eemgd[pled]==1&&dimwincad==0){///四暗刻

yk0=yk0+5

whtai.push("四暗刻")

}

if(dubnum==3&&crdeye==1&&manum+eemgd[pled]==2&&dimwincad==0){///三暗刻

yk0=yk0+2

whtai.push("三暗刻")

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

sortCad()

////////////////////////////////////////////////////////////////碰碰胡

for(let i=0;i<20;i++){

if(rlmgd[pled][i]==rlmgd[pled][i+1]&&rlmgd[pled][i+1]==rlmgd[pled][i+2]&&rlmgd[pled][i]!=undefined){

dubnum++

}

i+=3

}

if(dubnum==5){///碰碰胡

yk0+=4

whtai.push("碰碰胡")

}

if(dubnum==0&&crdeye==1&&manum+eemgd[pled]==5&&flocd[pled].length==0&&biword===0&&mytsale==0&&lomgd[pled].length>1){///無對子.聽雙頭.非自摸.無大字.無花牌

yk0+=2

whtai.push("平胡")

}

/////////////////////////////////////////////////////////////////

if(tinyk==1){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

rlmgd[pled]=JSON.parse(JSON.stringify(rlmgdbk))///複製

return yk0

}

////////////////////////////////////////////////////////////////花牌

foursea=flocd[pled].filter(function (value) {

return value <141

});

merlin=flocd[pled].filter(function (value) {

return value >140

});

if(flocd[pled].length==8){///八仙過海

yk0+=8

whtai.push("八仙過海")

}

if(flocd[pled].length==7&&flocd[losgun].length==1){///七搶一

yk0+=8

whtai.push("七搶一")

}

if(flocd[pled].indexOf(fowtwind[pled]+136)!=-1&&foursea.length!=4){

yk0+=1

whtai.push("花牌")

}

if(flocd[pled].indexOf(fowtwind[pled]+140)!=-1&&merlin.length!=4){

yk0+=1

if(whtai.indexOf("花牌")==-1){

whtai.push("花牌")

}

}

if(foursea.length==4||merlin.length==4){///花槓

yk0+=2

whtai.push("花槓")

}

if(gunwin==1&&mytsale==0){///搶槓胡

yk0+=1

whtai.push("搶槓胡")

}

/////////////////////////////////////////////////////////單吊


if(lomgd[pled].length==1){

yk0+=1

whtai.push("單吊")

if(pled==0&&lbmgd[pled]==1){

plerinfor[8].cho=0

localStorage.setItem("ch8", 0);

}

}


///////////////////////////////////////////////////////

if(allmgd.length==128&&mytsale==1){///海底撈月

yk0+=1

whtai.push("海底撈月")

}

if(allmgd.length==128&&mytsale==0){///河底撈魚

yk0+=1

whtai.push("河底撈魚")

}

if(plmgd[pled].length==2&&mytsale==0){///全求人

yk0+=1

whtai.push("全求人")

}


if(linmrs==0&&mytsale==1||linmrs==0&&pled==makrs||linmrs==0&&losgun==makrs){

yk0+=1///庄

whtai.push("庄家")

}

if(linmrs!=0&&mytsale==1||linmrs!=0&&pled==makrs||linmrs!=0&&losgun==makrs){

yk0+=(linmrs*2+1)///連庄

whtai.push("連"+linmrs+"拉"+linmrs)

}

if(whtai.length==0){

whtai=["屁胡"]

}

if(pled==0&&lomgd[pled].length>2){

plerinfor[7].cho=0

localStorage.setItem("ch7", 0);

}


plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

rlmgd[pled]=JSON.parse(JSON.stringify(rlmgdbk))///複製


sortCad()

}


//////////////////////////////////////////////////////////

function sorOut(){

savStorage(0)////輸出紀錄

cantoutcd=[]
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

eatout=0///吃牌後的捨牌判斷

gunwin=0///搶槓胡

gunnout=-1///挑戰模式的槓牌

gunis=""

$(".outshowcad div").hide()

$(".etpgword img").hide()

$(".pler1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[1]+'.png">').show()
$(".pler2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[2]+'.png">').show()
$(".pler3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/cv'+plerK[3]+'.png">').show()

var n = allmgd[0]

$(".sunche").html("剩餘張數 "+(127-allmgd.length))

while(allmgd.indexOf(n)!=-1){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144+1);///144

if(n>=137&&allmgd.indexOf(n)==-1){

flocd[pled].push(n)

$("."+pldname[pled]+" div .f"+(flocd[pled].length)+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+n+'.png" style="width:60px;height:80px;">')

setTimeout('$("."+pldname[pled]+" div .f"+(flocd[pled].length)).show().animate({top:"0px",left:"0px"},200);',500)

nogunwin=1///槓上開花

allmgd.push(n)///放入全部的牌

plednow=pled


const img = new Image();
img.src = "https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/"+n+".png";

img.onload = function () {
  $("."+pldname[plednow]+" div .d17 .c1").html(img);
  $("."+pldname[plednow]+" div .d17").show(); // 圖片載入完成後才顯示
};

if(flocd[pled].length==1){

for(let i=0;i<4;i++){

if(flocd[i].length==7){

mytsale=0///是否是自摸

losgun=pled///放槍

pled=i

wincad=cpd///胡的牌

v41.pause();

v41.currentTime = 0

v41.play();

if(pled<4){

localStorage.setItem("lastcard",JSON.stringify(Math.ceil(n/4)));////最後一次摸到的牌

}

savStorage(0)////輸出紀錄

setTimeout('winShow()',1000)///胡牌特效

return

}

}

}



setTimeout('sorOut()',500)

return

}

}


plmgd[pled].push(Math.ceil(n/4))///放入玩家的手牌

plmgd[pled].sort(function (a, b) {

return a - b

});


allmgd.push(n)///放入全部的牌

tineptout=Math.ceil(n/4)///自己摸進來聽牌

if(pled<4){

localStorage.setItem("lastcard",JSON.stringify(Math.ceil(n/4)));////最後一次摸到的牌

}

savStorage(0)////輸出紀錄


sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

atkCad()

cantakenb++

if(tsp+etnum[pled]==6){///自摸

for(let i=1;i<4;i++){

if(pled==i){

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/ruv'+plerK[i]+'.png">')

}

if(pled!=i){

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/kil'+plerK[i]+'.png">')

}

}

if(pled==0){

plerinfor[4].cho=0

localStorage.setItem("ch4", 0);


}

$(".flash"+pled).show()

setTimeout('$(".flash"+'+pled+').hide()',500)

$("."+pldname[pled]+" div .d17 .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+Math.ceil(n/4)+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px) rotateX(90deg)'})

})

$("."+pldname[pled]+" div .d17").show()

$("."+pldname[pled]+" div .d17").animate({top:"-800px",left:"-100px"},10);

$("."+pldname[pled]+" div .d17").animate({top:"0px",left:"0px"},590);

setTimeout('$("."+pldname[pled]+" div .d17").attr("class","ds17")',600)

mytsale=1///是否是自摸

losgun=-1///放槍

wincad=Math.ceil(n/4)///胡的牌

v41.pause();

v41.currentTime = 0

v41.play();


$(".mytake"+pled).show()

setTimeout('winShow()',2000)///胡牌特效

return

}

plednow=pled

const img = new Image();
img.src = "https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/"+Math.ceil(n/4)+".png";

img.onload = function () {
  $("."+pldname[plednow]+" div .d17 .c1").html(img);
  $("."+pldname[plednow]+" div .d17").show(); // 圖片載入完成後才顯示
};

///////////////////////////////////////////////////

savStorage(0)////輸出紀錄

nogunwin=0///槓上開花

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

cpd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

rlmgd[pled].forEach(function(x) { cpd[x] = (cpd[x] || 0)+1; })///計算出現過的總張數

for(let k=1;k<35;k++){

if(outTinCd==1&&pled==0&&lbmgd[0]==0&&cpd[k]==4&&plmgd[0].indexOf(k)!=-1){

gunis="gunadd"

otc=Math.ceil(n/4)

epgMself(k,pled,"gunadd")

return

}

if(outTinCd==1&&pled==0&&lbmgd[0]==0&&cpf[k]==4){

gunis="gundreak"

otc=Math.ceil(n/4)

epgMself(k,pled,"gundreak")

return

}

if(cpf[k]==4||cpd[k]==4&&plmgd[pled].indexOf(k)!=-1){

cpt=Number(k)

gunopen=0

for(let i=0;i<rlmgd[pled].length;i++){

if(rlmgd[pled][i]==cpt&&rlmgd[pled][i+1]==cpt&&rlmgd[pled][i+2]==cpt&&rlmgd[pled][i+3]==cpt){

gunopen=i+4

break

}

i+=3

}

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數


if(gunopen==0){

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

plmgd[pled]=plmgd[pled].filter(Number)


}

if(gunopen>0){

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

plmgd[pled]=plmgd[pled].filter(Number)

}

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

if(pled==0&&outTinCd==1&&lbmgd[0]==1&&cpf[cpt]==4&&epgmow==0&&tspsal+1==tsp&&gunopen==0&&cpt==Math.ceil(n/4)){///可槓

gunis="gundreak"

otc=Math.ceil(n/4)

epgMself(cpt,pled,"gundreak")

return

}

if(pled==0&&outTinCd==1&&lbmgd[0]==1&&cpd[cpt]==4&&gunopen>=1&&epgmow==0&&cpt==Math.ceil(n/4)){

gunis="gunadd"

otc=Math.ceil(n/4)

epgMself(cpt,pled,"gunadd")

return


}

if(outTinCd==1&&pled!=0&&lbmgd[pled]==0&&cpf[cpt]==4&&epgmow==0&&tspsal+1==tsp&&gunopen==0||outTinCd==1&&pled!=0&&lbmgd[pled]==0&&cpd[cpt]==4&&gunopen>=1&&epgmow==0&&plmgd[pled].indexOf(cpt)!=-1){///可槓

if(gunopen==0){

for(let s=0;s<4;s++){

rlmgd[pled].push(cpt)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpt+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}

}


if(gunopen>=1){

alsee.push(cpt)///已見光的牌

rbmgd[pled].push(gunopen)

$("."+pldname[pled]+" div .e"+gunopen).show()

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

plmgd[pled]=plmgd[pled].filter(Number)

}

if(gunopen==0){

daetp[pled][Math.floor(cpt/9)]++

for(let s=0;s<4;s++){

ramgd[pled].push(cpt)

delete plmgd[pled][plmgd[pled].indexOf(cpt)]

plmgd[pled]=plmgd[pled].filter(Number)

if(s==3){

break

}

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}

}

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

atkCad()

etnum[pled]+=(gunopen==0)?1:0

sortShowCad(pled)

$(".gun"+pled).show()

if(gunopen>=1){

pledbk=pled

winpled=(pled+1<4)?pled+1:0

for(let s=0;s<3;s++){///胡牌

if(lomgd[winpled].indexOf(cpt)!=-1){

pled=winpled

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

plmgd[pled].push(cpt)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(etnum[pled]+tsp==6){

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/hv'+plerK[pled]+'.png">')

}

if(pledbk!=0){

$(".pler"+pledbk).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/psv'+plerK[pledbk]+'.png">')

}

$(".flash"+pled).show()

setTimeout('$(".flash"+'+pled+').hide()',500)

$("."+pldname[pled]+" div .d17 .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpt+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px) rotateX(90deg)'})

})

$("."+pldname[pled]+" div .d17").show()

$("."+pldname[pled]+" div .d17").animate({top:"-800px",left:"-100px"},10);

$("."+pldname[pled]+" div .d17").animate({top:"0px",left:"0px"},590);

setTimeout('$("."+pldname[pled]+" div .d17").attr("class","ds17")',600)

$(".lose"+pledbk).show()

$(".hu"+pled).show()


mytsale=0///是否是自摸

losgun=pledbk///放槍

wincad=cpt///胡的牌

gunwin=1///搶槓胡

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('winShow()',2000)///胡牌特效

return

}///if(etnum[pled]+tsp==6){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

sortCad()

pled=pledbk

}///if(lomgd[winpled].indexOf(cpt)!=-1){

winpled=(winpled+1<4)?winpled+1:0

}///for(let s=0;s<3;s++){///胡牌

pled=pledbk

}///if(gunopen>=1){

epgmow=0///吃碰槓的場合

nogunwin=1///槓上開花

smokeshow(pled)

setTimeout('sorOut()',500)

return

}

}

}

////////////////////////////////////////////

cpd=Math.ceil(n/4)

if(flocd[pled].length==7){

for(let i=0;i<4;i++){

if(flocd[i].length==1){

mytsale=0///是否是自摸

losgun=i///放槍

wincad=cpd///胡的牌

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('winShow()',1000)///胡牌特效

return

}

}

}

if(flocd[pled].length==8){

mytsale=1///是否是自摸

losgun=null///放槍

wincad=cpd///胡的牌

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('winShow()',1000)///胡牌特效

return

}











if(lbmgd[pled]==1&&lomgd[pled].indexOf(Math.ceil(n/4))==-1){

otc=Math.ceil(n/4)

setTimeout('outCad2(plmgd[pled].indexOf('+otc+'))',500)

return

}

if(lbmgd[pled]!=1){

otc=Math.ceil(n/4)

if(nobackch==0){

setTimeout('outCad()',500)

}

}

}

////////////////////////////////////////////////////////////////////////////////

function safcad(saf){///安全牌判斷

spf[saf]+=0.25

if(saf>27){

spf[saf]+=3

}

if(otmgd[pled].length<7){///上下壓

for(let i=0;i<fdal[saf].length;i++){

spf[fdal[saf][i]]+=0.4

}

}

etfood=[0,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,28,28]

ethp=rlmgd[pled][rlmgd[pled].length-1]

if(saf<28&&epgmow==1&&saf<etfood[ethp]&&saf>etfood[ethp]-10){///吃碰槓後捨出同一門

for(let i=etfood[ethp]-9;i<etfood[ethp];i++){

spf[i]+=0.5

}

}

if(otmgd[pled].length>=7||saf<28&&epgmow==1&&saf<etfood[ethp]&&saf>etfood[ethp]-10&&otmgd[pled].length<7){///一路性

for(let i=0;i<ard[saf].length;i++){

spf[ard[saf][i]]+=(lbmgd.indexOf(1)==-1)?1:2

}

}

if(saf<28){

for(let i=0;i<clocad[saf].length;i++){

if(otmgd[pled].indexOf(clocad[saf][i],otmgd[pled].length-6)!=-1){///拆搭

for(let s=0;s<clocad[saf].length;s++){

spf[clocad[saf][s]]+=1

}

break

}

}

}

sao=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(alsee)

cansecad.forEach(function(x) { sao[x] = (sao[x] || 0)+1; })///計算出現過的總張數

for(let i=1;i<35;i++){

spf[i]=(sao[i]!=4)?spf[i]:1

}

}

////////////////////////////////////////////////////////////////////////////////

function outCad2(mdt){///捨牌2

$(".outshowcad div").hide()

if(epgmow==0){

$("."+pldname[pled]+" div .d17").hide()

}

cpd=plmgd[pled][mdt]

safcad(plmgd[pled][mdt])///安全牌判斷

if(epgmow==1){

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

sortCad()

sortShowCad(pled)

epgmow=0///吃碰槓的場合

}


cpo=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

otmgd[pled].forEach(function(x) { cpo[x] = (cpo[x] || 0)+1; })///計算出現過的總張數



if(pled!=0&&cpo[plmgd[pled][mdt]]>=1&&epgmow==0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/nv'+plerK[pled]+'.png">')

}







/////////////////////////////////

och=plmgd[pled][mdt]

cpd=plmgd[pled][mdt]

otmgd[pled].push(plmgd[pled][mdt])

$("."+pldname[pled]+" div .o"+otmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[pled][mdt]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .o"+otmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

$(".outshow"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[pled][mdt]+'.png">').show()

delete plmgd[pled][mdt]

plmgd[pled]=plmgd[pled].filter(Number)

sortShowCad(pled)

sortCad()

atkCad()

outCad3()

return

}


//////////////////////////////////////////

function outCad3(mdt){///捨牌2

cpds=cpd

savStorage(2)

$(".etpghword img").hide()

pledbk=pled

winpled=(pled+1<4)?pled+1:0

for(let s=0;s<3;s++){///胡牌

if(akmgd[winpled].indexOf(cpd)!=-1||lomgd[winpled].indexOf(cpd)!=-1){

pled=winpled

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

plmgd[pled].push(cpd)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(etnum[pled]+tsp==6){

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/hv'+plerK[pled]+'.png">')

}

if(pledbk!=0){

$(".pler"+pledbk).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/psv'+plerK[pledbk]+'.png">')

}

$(".flash"+pled).show()

setTimeout('$(".flash"+'+pled+').hide()',500)

$("."+pldname[pled]+" div .d17 .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px) rotateX(90deg)'})

})

$("."+pldname[pled]+" div .d17").show()

$("."+pldname[pled]+" div .d17").animate({top:"-800px",left:"-100px"},10);

$("."+pldname[pled]+" div .d17").animate({top:"0px",left:"0px"},590);

setTimeout('$("."+pldname[pled]+" div .d17").attr("class","ds17")',600)


$(".lose"+pledbk).show()

$(".hu"+pled).show()


mytsale=0///是否是自摸

losgun=pledbk///放槍

wincad=cpd///胡的牌

v41.pause();

v41.currentTime = 0

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('winShow()',2000)///胡牌特效

return

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

sortCad()

pled=pledbk

}

winpled=(winpled+1<4)?winpled+1:0

}
///////////////////////////////////////////////////

pled=pledbk

if(allmgd.length<125){

gunpled=(pled+1<4)?pled+1:0

for(let i=0;i<4;i++){

if(pledbk!=i&&gunpled!=i&&lbmgd[i]==0&&gnmgd[i].indexOf(cpd)!=-1){

if(outTinCd==1&&i==0&&lbmgd[i]==0){

epgMself(cpd,pledbk,"gun")

return

}

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[i].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

if(cpf[cpd]==3){///槓牌

pled=i

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

for(let s=0;s<3;s++){

delete plmgd[pled][plmgd[pled].indexOf(cpd)]

plmgd[pled]=plmgd[pled].filter(Number)

}

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

danowall=[]

danowall[0]=(dacadnum[0]+daetp[pled][0]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[1]=(dacadnum[1]+daetp[pled][1]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[2]=(dacadnum[2]+daetp[pled][2]+dacadnum[3]+daetp[pled][3]>=5)?5:0

if(danowall[Math.floor(cpd/9)]==0&&danowall.indexOf(5)!=-1){

pled=pledbk

break

}

if(tspsal+1==tsp||danowall[Math.floor(cpd/9)]==5){///可槓

for(let s=0;s<4;s++){

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}


for(let s=0;s<3;s++){

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}
alsee.push(cpd)///已見光的牌
alsee.push(cpd)///已見光的牌
alsee.push(cpd)///已見光的牌

etnum[pled]++

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

rbmgd[pled].push(rlmgd[pled].length)

sortShowCad(pled)

$(".gun"+pled).show()

atkCad()

nogunwin=1///槓上開花

v41.pause();

v41.currentTime = 0

v41.play();

smokeshow(pled)

setTimeout('sorOut()',500)

return

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

}

}

}

}

pled=pledbk

ponafter()

}

///////////////////////////////////////////////////

function ponafter(){

pledbk=pled

if(allmgd.length<125){

for(let i=0;i<4;i++){///碰牌

eatout=0

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[i].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

if(i!=pled&&lbmgd[i]==0&&cpf[otmgd[pled][otmgd[pled].length-1]]>=2){

if(outTinCd==1&&i==0&&lbmgd[i]==0){

if(etmgd[0].indexOf(otmgd[pled][otmgd[pled].length-1])!=-1&&pled==3){

break

}

epgMself(cpd,pledbk,"pon")

return

}

cpd=otmgd[pled][otmgd[pled].length-1]

pled=i

bkmgd3=JSON.parse(JSON.stringify(plmgd[pled]))///複製

sortCad()

atkCad()

cpfup=cpf.filter(e => e.ot >=2)

danowall=[]

danowall[0]=(dacadnum[0]+daetp[pled][0]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[1]=(dacadnum[1]+daetp[pled][1]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[2]=(dacadnum[2]+daetp[pled][2]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[3]=(cpfup+ppmgd[pled]>=5&&eemgd[pled]==0)?5:0

if(danowall[Math.floor(cpd/9)]==0&&danowall[3]==0&&danowall.indexOf(5)>-1&&danowall.indexOf(5)<3){

pled=pledbk

break

}

eatout=1///吃牌後的捨牌判斷

eatback=outCad()

etotcd2=plmgd[pled][eatback]

eatout=0///吃牌後的捨牌判斷

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

tspeye=crdeye///眼

atknumnew=atknum///可增加組數總張數

delete plmgd[pled][plmgd[pled].indexOf(cpd)]
delete plmgd[pled][plmgd[pled].indexOf(cpd)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

eatout=1///吃牌後的捨牌判斷

eatback=outCad()

etotcd=plmgd[pled][eatback]

delete plmgd[pled][eatback]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

alsee.push(cpd)///已見光的牌
alsee.push(cpd)///已見光的牌
alsee.push(etotcd)///已見光的牌

eatout=0///吃牌後的捨牌判斷

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

atkCad()

alsee.length=alsee.length-3

if(tspsal+1>tsp&&etotcd!=cpd||tspsal+1==tsp&&atknumnew<atknum&&tspeye>1&&etotcd!=cpd&&tspsal+1+etnum[pled]<5||tspsal+1+etnum[pled]==5&&atknumnew<atknum&&etotcd!=cpd||danowall[Math.floor(cpd/9)]==5&&etotcd!=cpd||danowall[3]==5&&etotcd!=cpd||etotcd2==cpd){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd3))///還原

delete plmgd[pled][plmgd[pled].indexOf(cpd)]
delete plmgd[pled][plmgd[pled].indexOf(cpd)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

for(let s=0;s<3;s++){

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).animate({top:"0px",left:"0px"},200);


for(let s=0;s<2;s++){

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}

alsee.push(cpd)///已見光的牌

alsee.push(cpd)///已見光的牌

sortCad()

atkCad()

etnum[pled]++

sortShowCad(pled)

epgmow=1///吃碰槓的場合

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

$(".pun"+pled).show()

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[pled]+'.png">')

}

ppmgd[pled]++

daetp[pled][Math.floor(cpd/9)]++


smokeshow(pled)

if(nobackch==0){

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('outCad()',500)

}
return

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd3))///還原

}

pled=pledbk

}

}

eatafter()

}




function eatafter(){

////////////////////////////////////

pledbk=pled

if(allmgd.length<125){

eatout=0///吃牌後的捨牌判斷

pledbk=pled

ltxk=(pled+1<4)?pled+1:0///下家

if(etmgd[ltxk].indexOf(otmgd[pled][otmgd[pled].length-1])!=-1&&lbmgd[ltxk]==0){///吃牌

cpd=otmgd[pled][otmgd[pled].length-1]

pled=ltxk

sortCad()

danowall=[]

danowall[0]=(dacadnum[0]+daetp[pled][0]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[1]=(dacadnum[1]+daetp[pled][1]+dacadnum[3]+daetp[pled][3]>=5)?5:0
danowall[2]=(dacadnum[2]+daetp[pled][2]+dacadnum[3]+daetp[pled][3]>=5)?5:0


tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

tspeye=crdeye///眼

atkCad()

atknumnew=atknum///可增加組數總張數

bkmgd3=JSON.parse(JSON.stringify(plmgd[pled]))///複製

etfood=[0,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,28,28]

etall=[]

for(let r=0;r<1;r++){

if(plmgd[pled].indexOf(cpd-1)!=-1&&plmgd[pled].indexOf(cpd+1)!=-1&&cpd+1<etfood[cpd]&&cpd-1>etfood[cpd]-10){///中洞

if(outTinCd==1&&pled==0&&lbmgd[0]==0){

etall.push({"cok":[cpd-1,cpd+1],"ot":atknum})

break

}

delete plmgd[pled][plmgd[pled].indexOf(cpd-1)]
delete plmgd[pled][plmgd[pled].indexOf(cpd+1)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});


eatout=1///吃牌後的捨牌判斷

eatback=outCad()

etotcd=plmgd[pled][eatback]

delete plmgd[pled][eatback]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

alsee.push(cpd-1)///已見光的牌
alsee.push(cpd+1)///已見光的牌
alsee.push(etotcd)///已見光的牌

atkCad()

if(tspsal+1>tsp&&etotcd!=cpd||tspsal+1==tsp&&atknumnew<atknum&&tspeye>1&&etotcd!=cpd&&tspsal+1+etnum[pled]<5||tspsal+1+etnum[pled]==5&&atknumnew<atknum&&etotcd!=cpd||danowall[Math.floor(cpd/9)]==5&&etotcd!=cpd){

etall.push({"cok":[cpd-1,cpd+1],"ot":atknum})

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd3))///還原

sortCad()

alsee.length=alsee.length-3

atkCad()

}

}

eatout=0///吃牌後的捨牌判斷

for(let r=0;r<1;r++){

if(plmgd[pled].indexOf(cpd-1)!=-1&&plmgd[pled].indexOf(cpd-2)!=-1&&cpd-2>etfood[cpd]-10){///

if(outTinCd==1&&pled==0&&lbmgd[0]==0){

etall.push({"cok":[cpd-1,cpd-2],"ot":atknum})

break

}

delete plmgd[pled][plmgd[pled].indexOf(cpd-1)]
delete plmgd[pled][plmgd[pled].indexOf(cpd-2)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

eatout=1///吃牌後的捨牌判斷

cantoutcd=[cpd]///不能捨出的牌
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

if(etfood[cpd-3]==etfood[cpd-2]){cantoutcd.push(cpd-3)}

eatback=outCad()

etotcd=plmgd[pled][eatback]

delete plmgd[pled][eatback]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

alsee.push(cpd-1)///已見光的牌
alsee.push(cpd-2)///已見光的牌
alsee.push(etotcd)///已見光的牌

atkCad()

if(tspsal+1>tsp&&cantoutcd.indexOf(etotcd)==-1||tspsal+1==tsp&&atknumnew<atknum&&tspeye>1&&cantoutcd.indexOf(etotcd)==-1&&tspsal+1+etnum[pled]<5||tspsal+1+etnum[pled]==5&&atknumnew<atknum&&cantoutcd.indexOf(etotcd)==-1||danowall[Math.floor(cpd/9)]==5&&cantoutcd.indexOf(etotcd)==-1){

etall.push({"cok":[cpd-1,cpd-2],"ot":atknum})

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd3))///還原

sortCad()

alsee.length=alsee.length-3

atkCad()

}

}

eatout=0///吃牌後的捨牌判斷

for(let r=0;r<1;r++){

if(plmgd[pled].indexOf(cpd+1)!=-1&&plmgd[pled].indexOf(cpd+2)!=-1&&cpd+2<etfood[cpd]){///

if(outTinCd==1&&pled==0&&lbmgd[0]==0){

etall.push({"cok":[cpd+1,cpd+2],"ot":atknum})

break

}

delete plmgd[pled][plmgd[pled].indexOf(cpd+1)]
delete plmgd[pled][plmgd[pled].indexOf(cpd+2)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

eatout=1///吃牌後的捨牌判斷

cantoutcd=[cpd]///不能捨出的牌
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

if(etfood[cpd+3]==etfood[cpd+2]){cantoutcd.push(cpd+3)}

eatback=outCad()

etotcd=plmgd[pled][eatback]

delete plmgd[pled][eatback]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});


sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

alsee.push(cpd+1)///已見光的牌
alsee.push(cpd+2)///已見光的牌
alsee.push(etotcd)///已見光的牌

atkCad()

if(tspsal+1>tsp&&cantoutcd.indexOf(etotcd)==-1||tspsal+1==tsp&&atknumnew<atknum&&tspeye>1&&cantoutcd.indexOf(etotcd)==-1&&tspsal+1+etnum[pled]<5||tspsal+1+etnum[pled]==5&&atknumnew<atknum&&cantoutcd.indexOf(etotcd)==-1||danowall[Math.floor(cpd/9)]==5&&cantoutcd.indexOf(etotcd)==-1){

etall.push({"cok":[cpd+1,cpd+2],"ot":atknum})

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd3))///還原

sortCad()

alsee.length=alsee.length-3

atkCad()

}

}

eatout=0///吃牌後的捨牌判斷

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

cpfup=cpf.filter(e => e.ot >=2)

if(danowall[Math.floor(cpd/9)]==0&&danowall.indexOf(5)!=-1||cpfup+ppmgd[pled]>=5&&eemgd[pled]==0){

///etall.length=0

}

if(etall.length!=0){

if(outTinCd==1&&pled==0&&lbmgd[0]==0){

epgMself(cpd,pledbk,"eat")

return

}

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

etall.sort(function (a, b) {///

return b.ot - a.ot

});


rlmgd[pled].push(etall[0].cok[0])

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+etall[0].cok[0]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(etall[0].cok[1])

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+etall[0].cok[1]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length)


cantoutcd=[rlmgd[pled][rlmgd[pled].length-1]]///不能捨出的牌
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

if(rlmgd[pled][rlmgd[pled].length-1]!=rlmgd[pled][rlmgd[pled].length-2]&&Math.abs(rlmgd[pled][rlmgd[pled].length-4]-rlmgd[pled][rlmgd[pled].length-2])==1){///吃

etfood=[0,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,28,28]

if(rlmgd[pled][rlmgd[pled].length-1]<rlmgd[pled][rlmgd[pled].length-2]&&rlmgd[pled][rlmgd[pled].length-1]<rlmgd[pled][rlmgd[pled].length-4]&&etfood[rlmgd[pled][rlmgd[pled].length-1]+3]==etfood[rlmgd[pled][rlmgd[pled].length-4]]){

cantoutcd.push(rlmgd[pled][rlmgd[pled].length-1]+3)}
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

if(rlmgd[pled][rlmgd[pled].length-1]>rlmgd[pled][rlmgd[pled].length-2]&&rlmgd[pled][rlmgd[pled].length-1]>rlmgd[pled][rlmgd[pled].length-4]&&etfood[rlmgd[pled][rlmgd[pled].length-1]-3]==etfood[rlmgd[pled][rlmgd[pled].length-4]]){

cantoutcd.push(rlmgd[pled][rlmgd[pled].length-1]-3)}
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

}

delete plmgd[pled][plmgd[pled].indexOf(etall[0].cok[0])]
delete plmgd[pled][plmgd[pled].indexOf(etall[0].cok[1])]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});


$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()
$("."+pldname[pled]+" div .d"+(ethan[pled]+1)).hide()

ethan[pled]+=2

sortCad()

atkCad()

etnum[pled]++

alsee.push(etall[0].cok[0])///已見光的牌
alsee.push(etall[0].cok[1])///已見光的牌

sortShowCad(pled)

epgmow=1///吃碰槓的場合

$(".eat"+pled).show()

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[pled]+'.png">')

}

eemgd[pled]++

daetp[pled][Math.floor(cpd/9)]++

smokeshow(pled)

if(nobackch==0){

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('outCad()',500)

}



return

}

}

pled=pledbk

sortCad()

atkCad()



}

////////////////////////////////////

pled++

if(pled>3){

pled=0

}


if(allmgd.length>=128){

pled=makrs

linmrs++///連莊次數

$(".nowin").show()

setTimeout('begStar()',500)

return

}

if(allmgd.length<128){

setTimeout('sorOut()',500)

}

}

///////////////////////////////////////////////////

function epgMself(och,pbk,rgh){

epgh=["epgh1b","epgh2b","epgh3b","epgh4b","epgh5b","epgh6"]

epgh[0]=(etmgd[0].indexOf(och)!=-1&&pbk==3)?"epgh1":"epgh1b"
epgh[1]=(cnmgd[0].indexOf(och)!=-1&&pbk!=0)?"epgh2":"epgh2b"
epgh[2]=(gnmgd[0].indexOf(och)!=-1&&pbk!=3||rgh=="gunadd"||rgh=="gundreak")?"epgh3":"epgh3b"


for(let i=0;i<6;i++){

$('.'+epgh[i]).show()

}

och=och

yonChance()

async function yonChance(){

yon=await epgMselfchance()

if(yon=="p"){rgh="pon"}

epgMselfchance2(yon,och,pbk,rgh)

return

}

}

//////////////////////////////////////////////

function epgMselfchance2(yon,och,pbk,rgh){

pled=pbk

$(".etpghword img").hide()

if(yon=="n"&&rgh=="gunadd"||yon=="n"&&rgh=="gundreak"){

pled=0

otc=och

if(nobackch==0){

outCad()

}

return

}

if(yon=="n"&&rgh=="gun"){

pled=pbk

cpd=och

ponafter()

return

}

if(yon=="n"&&rgh=="pon"){

pled=pbk

cpd=och

eatafter()

return

}

if(yon=="n"&&rgh=="end"||yon=="n"&&rgh=="eat"){

pled++

if(pled>3){

pled=0

}
if(allmgd.length>=128){

pled=makrs

linmrs++///連莊次數

$(".nowin").show()

begStar()

return

}

if(allmgd.length<128){

sorOut()

return

}

}


if(yon>-1&&yon<18){

$(".myselfup").show()

for(let i=0;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}

gunnout=-1

gunis=""


outMyself2(yon)

return

}

pled=0

pledbk=pbk

cpd=och


if(yon=="g"&&rgh=="gun"||yon=="g"&&rgh=="gunadd"||yon=="g"&&rgh=="gundreak"){

if(rgh=="gun"){

delete plmgd[pled][plmgd[pled].indexOf(cpd)]
delete plmgd[pled][plmgd[pled].indexOf(cpd)]
delete plmgd[pled][plmgd[pled].indexOf(cpd)]

}

if(rgh=="gunadd"){

delete plmgd[pled][plmgd[pled].indexOf(cpd)]

gunopen=0

for(let i=0;i<20;i++){

if(rlmgd[pled][i]==cpd&&rlmgd[pled][i+1]==cpd&&rlmgd[pled][i+2]==cpd&&rlmgd[pled][i+3]==cpd){

gunopen=i+4

rbmgd[pled].push(gunopen)

$("."+pldname[pled]+" div .e"+gunopen).show()

break

}

i+=3

}

}

if(rgh=="gundreak"){

for(let s=0;s<4;s++){

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);


if(pled==0&&s==3){

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c2").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/l.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c3").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/0.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c4").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/r.png" style="width:30px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c5").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/u.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c6").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/d.png" style="width:60px;height:30px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}

}

daetp[pled][Math.floor(cpd/9)]++

for(let s=0;s<4;s++){

ramgd[pled].push(cpd)

delete plmgd[pled][plmgd[pled].indexOf(cpd)]

plmgd[pled]=plmgd[pled].filter(Number)

if(s==3){

break

}

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}

etnum[pled]++

}



plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

if(rgh=="gun"){

for(let s=0;s<4;s++){

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}

rbmgd[pled].push(rlmgd[pled].length)

for(let s=0;s<3;s++){

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}

alsee.push(cpd)///已見光的牌
alsee.push(cpd)///已見光的牌
alsee.push(cpd)///已見光的牌

etnum[pled]++

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

}

sortShowCad(pled)

$(".gun"+pled).show()







if(rgh=="gunadd"){

for(let s=1;s<4;s++){///胡牌

if(lomgd[s].indexOf(cpd)!=-1){

pled=s

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

plmgd[pled].push(cpd)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(etnum[pled]+tsp==6){

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/hv'+plerK[pled]+'.png">')

}

$(".flash"+pled).show()

setTimeout('$(".flash"+'+pled+').hide()',500)

$("."+pldname[pled]+" div .d17 .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px) rotateX(90deg)'})

})

}


$("."+pldname[pled]+" div .d17").show()

$("."+pldname[pled]+" div .d17").animate({top:"-800px",left:"-100px"},10);

$("."+pldname[pled]+" div .d17").animate({top:"0px",left:"0px"},590);

setTimeout('$("."+pldname[pled]+" div .d17").attr("class","ds17")',600)


$(".lose"+0).show()

$(".hu"+pled).show()


mytsale=0///是否是自摸

losgun=0///放槍

wincad=cpd///胡的牌

gunwin=1///搶槓胡

v41.pause();

v41.currentTime = 0

v41.play();

setTimeout('winShow()',2000)///胡牌特效

return

}

}

}

sortCad()

atkCad()

smokeshow(pled)

nogunwin=1///槓上開花

sorOut()

return

}

if(yon=="p"&&cnmgd[0].indexOf(och)!=-1&&plmgd[0].indexOf(och)!=-1){

delete plmgd[pled][plmgd[pled].indexOf(cpd)]
delete plmgd[pled][plmgd[pled].indexOf(cpd)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

for(let s=0;s<3;s++){

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

}

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).animate({top:"0px",left:"0px"},200);


for(let s=0;s<2;s++){

$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()

ethan[pled]++

}

alsee.push(cpd)///已見光的牌

alsee.push(cpd)///已見光的牌

sortCad()

atkCad()

etnum[pled]++

sortShowCad(pled)

epgmow=1///吃碰槓的場合

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

$(".pun"+pled).show()

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[pled]+'.png">')

}

ppmgd[pled]++

daetp[pled][Math.floor(cpd/9)]++

smokeshow(pled)

if(nobackch==0){

outCad()

}
return

}


if(etmgd[0].indexOf(och)!=-1){

if(yon=="e1"){

etall.splice(0,1)

}

if(yon=="e2"){

etall.splice(0,2)

}

$("."+pldname[pledbk]+" div .o"+otmgd[pledbk].length+" div").css("filter","opacity(0.3)")

rcmgd[pledbk].push(otmgd[pledbk].length-1)

rlmgd[pled].push(etall[0].cok[0])

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+etall[0].cok[0]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(etall[0].cok[1])

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+etall[0].cok[1]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

rlmgd[pled].push(cpd)

$("."+pldname[pled]+" div .e"+rlmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+cpd+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .e"+rlmgd[pled].length)


delete plmgd[pled][plmgd[pled].indexOf(etall[0].cok[0])]
delete plmgd[pled][plmgd[pled].indexOf(etall[0].cok[1])]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});


$("."+pldname[pled]+" div .d"+(ethan[pled])).hide()
$("."+pldname[pled]+" div .d"+(ethan[pled]+1)).hide()

ethan[pled]+=2

sortCad()

atkCad()

etnum[pled]++

alsee.push(etall[0].cok[0])///已見光的牌
alsee.push(etall[0].cok[1])///已見光的牌

sortShowCad(pled)

epgmow=1///吃碰槓的場合

v41.pause();

v41.currentTime = 0

v41.play();


$(".eat"+pled).show()

if(pled!=0){

$(".pler"+pled).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/gv'+plerK[pled]+'.png">')

}

eemgd[pled]++

daetp[pled][Math.floor(cpd/9)]++

smokeshow(pled)

if(nobackch==0){

outCad()

}

return

}


}

//////////////////////////////////////////////

async function epgMselfchance(){

return new Promise(function(resolve, reject) {

if(gunis=="gunadd"||gunis=="gundreak"){

$(".myselfup").hide()

if(ethan[0]<2){

e1 = document.querySelector(".m1");

e1.addEventListener("click",function (event) {resolve(1);event.stopPropagation();return;},false);

}

if(ethan[0]<3){

e2 = document.querySelector(".m2");

e2.addEventListener("click",function (event) {resolve(2);event.stopPropagation();return;},false);

}

if(ethan[0]<4){

e3 = document.querySelector(".m3");

e3.addEventListener("click",function (event) {resolve(3);event.stopPropagation();return;},false);

}

if(ethan[0]<5){

e4 = document.querySelector(".m4");

e4.addEventListener("click",function (event) {resolve(4);event.stopPropagation();return;},false);

}

if(ethan[0]<6){

e5 = document.querySelector(".m5");

e5.addEventListener("click",function (event) {resolve(5);event.stopPropagation();return;},false);

}

if(ethan[0]<7){

e6 = document.querySelector(".m6");

e6.addEventListener("click",function (event) {resolve(6);event.stopPropagation();return;},false);

}

if(ethan[0]<8){

e7 = document.querySelector(".m7");

e7.addEventListener("click",function (event) {resolve(7);event.stopPropagation();return;},false);

}

if(ethan[0]<9){

e8 = document.querySelector(".m8");

e8.addEventListener("click",function (event) {resolve(8);event.stopPropagation();return},false);

}

if(ethan[0]<10){

e9 = document.querySelector(".m9");

e9.addEventListener("click",function (event) {resolve(9);event.stopPropagation();return;},false);

}

if(ethan[0]<11){

e10 = document.querySelector(".m10");

e10.addEventListener("click",function (event) {resolve(10);event.stopPropagation();return;},false);

}

if(ethan[0]<12){

e11 = document.querySelector(".m11");

e11.addEventListener("click",function (event) {resolve(11);event.stopPropagation();return;},false);

}

if(ethan[0]<13){

e12 = document.querySelector(".m12");

e12.addEventListener("click",function (event) {resolve(12);event.stopPropagation();return;},false);

}

if(ethan[0]<14){

e13 = document.querySelector(".m13");

e13.addEventListener("click",function (event) {resolve(13);event.stopPropagation();return;},false);

}

if(ethan[0]<15){

e14 = document.querySelector(".m14");

e14.addEventListener("click",function (event) {resolve(14);event.stopPropagation();return;},false);

}

if(ethan[0]<16){

e15 = document.querySelector(".m15");

e15.addEventListener("click",function (event) {resolve(15);event.stopPropagation();return;},false);

}

if(ethan[0]<17){

e16 = document.querySelector(".m16");

e16.addEventListener("click",function (event) {resolve(16);event.stopPropagation();return;},false);

}

if(ethan[0]<18){

e17 = document.querySelector(".m17");

e17.addEventListener("click",function (event) {resolve(17);event.stopPropagation();return;},false);

}

}

eeyn = document.querySelector(".epgh1");

eeyn.addEventListener("click",function (event) {

if(etall.length>1){

etallshow=[]

etallshow=etallshow.concat(etall[0].cok)
etallshow=etallshow.concat(etall[1].cok)
if(etall.length>2){
etallshow=etallshow.concat(etall[2].cok)
}

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
}

if(etallshow.indexOf(cardNum)==-1){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

}

}


$(".myselfup").hide()

fiseat=[]

eatmuch()

async function eatmuch(){

res=await outMyself()

if(res==-1){

return

}

cadlink=$("."+pldname[0]+" div .d"+res+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  res = plmgd[pled].indexOf(cardNum);
} else {
  res = -1; // 沒找到圖片數字
}

fiseat.push(plmgd[pled][res])

if(fiseat.length>=1){

cantchick=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]///不能點的牌

fiseat.length=1

etallshow=[]

if(etall[0].cok[0]==fiseat[0]){

etallshow=etallshow.concat(etall[0].cok[1])

}

if(etall[0].cok[1]==fiseat[0]){

etallshow=etallshow.concat(etall[0].cok[0])

}

if(etall[1].cok[0]==fiseat[0]){

etallshow=etallshow.concat(etall[1].cok[1])

}

if(etall[1].cok[1]==fiseat[0]){

etallshow=etallshow.concat(etall[1].cok[0])

}

if(etall.length>2){

if(etall[2].cok[0]==fiseat[0]){

etallshow=etallshow.concat(etall[2].cok[1])

}

if(etall[2].cok[1]==fiseat[0]){

etallshow=etallshow.concat(etall[2].cok[0])

}

}///if(etall.length>2){

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  }

if(etallshow.indexOf(cardNum)==-1){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

}


}

eatmuch2()

async function eatmuch2(){

res2=await outMyself()

if(res2==-1){

return

}


cadlink=$("."+pldname[0]+" div .d"+res2+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  res2 = plmgd[pled].indexOf(cardNum);
} else {
  res2 = -1; // 沒找到圖片數字
}
fiseat.push(plmgd[pled][res2])

fiseat.length=2

if(fiseat[0]!=fiseat[1]){

for(let i=0;i<etall.length;i++){

if(etall[i].cok.indexOf(fiseat[0])!=-1&&etall[i].cok.indexOf(fiseat[1])!=-1){

resolve("e"+i)

break

}

}

}

for(let i=0;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}



}

}///if(fiseat.length>=1){

}///async function eatmuch(){

}///if(etall.length>1){

if(etall.length==1){

resolve("e0")

}

event.stopPropagation()

return

},false);


ppyn = document.querySelector(".epgh2");

ppyn.addEventListener("click",function (event) {resolve("p");event.stopPropagation();

v41.pause();

v41.currentTime = 0

v41.play();



return;

},false);


ggyn = document.querySelector(".epgh3");

ggyn.addEventListener("click",function (event) {

resolve("g")

event.stopPropagation()

v41.pause();

v41.currentTime = 0

v41.play();


return

},false);


nnyn = document.querySelector(".epgh6");

nnyn.addEventListener("click",function (event) {

resolve("n");

event.stopPropagation();

for(let i=0;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}

return;

},false);

})

}

///////////////////////////////////////////////////

function outMyself(){

return new Promise(function(resolve, reject) {

backindex2 = document.querySelector(".backindex");

backindex2.addEventListener("click",function () {

window.location.href = "/"

return

},false);



if(ethan[0]<2&&cantchick[1]==0){

e1 = document.querySelector(".m1");

e1.addEventListener("click",function (event) {resolve(1);event.stopPropagation();return},false);

}

if(ethan[0]<3&&cantchick[2]==0){

e2 = document.querySelector(".m2");

e2.addEventListener("click",function (event) {resolve(2);event.stopPropagation();return},false);

}

if(ethan[0]<4&&cantchick[3]==0){

e3 = document.querySelector(".m3");

e3.addEventListener("click",function (event) {resolve(3);event.stopPropagation();return},false);

}

if(ethan[0]<5&&cantchick[4]==0){

e4 = document.querySelector(".m4");

e4.addEventListener("click",function (event) {resolve(4);event.stopPropagation();return},false);

}

if(ethan[0]<6&&cantchick[5]==0){

e5 = document.querySelector(".m5");

e5.addEventListener("click",function (event) {resolve(5);event.stopPropagation();return},false);

}

if(ethan[0]<7&&cantchick[6]==0){

e6 = document.querySelector(".m6");

e6.addEventListener("click",function (event) {resolve(6);event.stopPropagation();return},false);

}

if(ethan[0]<8&&cantchick[7]==0){

e7 = document.querySelector(".m7");

e7.addEventListener("click",function (event) {resolve(7);event.stopPropagation();return},false);

}

if(ethan[0]<9&&cantchick[8]==0){

e8 = document.querySelector(".m8");

e8.addEventListener("click",function (event) {resolve(8);event.stopPropagation();return},false);

}

if(ethan[0]<10&&cantchick[9]==0){

e9 = document.querySelector(".m9");

e9.addEventListener("click",function (event) {resolve(9);event.stopPropagation();return},false);

}

if(ethan[0]<11&&cantchick[10]==0){

e10 = document.querySelector(".m10");

e10.addEventListener("click",function (event) {resolve(10);event.stopPropagation();return},false);

}

if(ethan[0]<12&&cantchick[11]==0){

e11 = document.querySelector(".m11");

e11.addEventListener("click",function (event) {resolve(11);event.stopPropagation();return},false);

}

if(ethan[0]<13&&cantchick[12]==0){

e12 = document.querySelector(".m12");

e12.addEventListener("click",function (event) {resolve(12);event.stopPropagation();return},false);

}

if(ethan[0]<14&&cantchick[13]==0){

e13 = document.querySelector(".m13");

e13.addEventListener("click",function (event) {resolve(13);event.stopPropagation();return},false);

}

if(ethan[0]<15&&cantchick[14]==0){

e14 = document.querySelector(".m14");

e14.addEventListener("click",function (event) {resolve(14);event.stopPropagation();return},false);

}

if(ethan[0]<16&&cantchick[15]==0){

e15 = document.querySelector(".m15");

e15.addEventListener("click",function (event) {resolve(15);event.stopPropagation();return},false);

}

if(ethan[0]<17&&cantchick[16]==0){

e16 = document.querySelector(".m16");

e16.addEventListener("click",function (event) {resolve(16);event.stopPropagation();return},false);

}

if(ethan[0]<18&&cantchick[17]==0){

e17 = document.querySelector(".m17");

e17.addEventListener("click",function (event) {resolve(17);event.stopPropagation();return},false);

}

})

}

function outMyself2(mdt){

if(epgmow==0&&otlisten.length!=0){

cadlink=$("."+pldname[0]+" div .d"+mdt+" .c1").html().toString()
const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  mdt = plmgd[pled].indexOf(cardNum);
} else {
  mdt = -1; // 沒找到圖片數字
}
$("."+pldname[pled]+" div .d17").hide()

}

if(epgmow==0&&otlisten.length==0){

delete plmgd[pled][plmgd[pled].indexOf(otc)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].push(otc)

$("."+pldname[pled]+" div .d17").hide()



cadlink=$("."+pldname[0]+" div .d"+mdt+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  mdt = plmgd[pled].indexOf(cardNum);
} else {
  mdt = -1; // 沒找到圖片數字
}
}

if(epgmow==1){

$("."+pldname[pled]+" div .d"+ethan[pled]).hide()

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

cadlink=$("."+pldname[0]+" div .d"+mdt+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
  mdt = plmgd[pled].indexOf(cardNum);
} else {
  mdt = -1; // 沒找到圖片數字
}
ethan[pled]++

for(let i=1;i<16-plmgd[0].length;i++){

$(".m"+i).hide()

}

epgmow=0

}

if(otlisten.length!=0){

$(".ti"+pled).hide()

for(let i=0;i<otlisten.length;i++){

if(plmgd[0][otlisten[i].td]==plmgd[0][mdt]){

lomgd[pled]=JSON.parse(JSON.stringify(otlisten[i].ls))

akmgd[pled]=JSON.parse(JSON.stringify(otlisten[i].ls))

if(tinmsalf==1){

$(".ti"+pled).show()

$(".etpgword img").hide()

$(".tin"+pled).show()

lbmgd[pled]=1

}

break

}

for(let i=0;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}

}

tinmsalf=0

}

cpd=plmgd[pled][mdt]

otmgd[pled].push(plmgd[pled][mdt])

$("."+pldname[pled]+" div .o"+otmgd[pled].length+" .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+plmgd[pled][mdt]+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .o"+otmgd[pled].length).show().animate({top:"0px",left:"0px"},200);

delete plmgd[pled][mdt]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortShowCad(pled)

sortCad()

atkCad()

outCad3()

}

///////////////////////////////////////////////////

function outCad(){///捨牌

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

atkCad()

cantakenb++

if(tsp+etnum[pled]==6){///自摸

for(let i=1;i<4;i++){

if(pled==i){

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/ruv'+plerK[i]+'.png">')

}

if(pled!=i){

$(".pler"+i).html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/watse/kil'+plerK[i]+'.png">')

}

}

if(pled==0){

plerinfor[4].cho=0

localStorage.setItem("ch4", 0);


}

$(".flash"+pled).show()

setTimeout('$(".flash"+'+pled+').hide()',500)

$("."+pldname[pled]+" div .d17 .c1").html('<img src="https://cdn.jsdelivr.net/gh/supercatmach/pic@main/mach/'+otc+'.png" style="width:60px;height:80px;">')

$("."+pldname[pled]+" div .d17").animate({},10,function(){

$(this).css({'transform':'translateX(520px) rotateX(90deg)'})

})

$("."+pldname[pled]+" div .d17").show()

$("."+pldname[pled]+" div .d17").animate({top:"-800px",left:"-100px"},10);

$("."+pldname[pled]+" div .d17").animate({top:"0px",left:"0px"},590);

setTimeout('$("."+pldname[pled]+" div .d17").attr("class","ds17")',600)

mytsale=1///是否是自摸

losgun=-1///放槍

wincad=otc///胡的牌

v41.pause();

v41.currentTime = 0

v41.play();


$(".mytake"+pled).show()

setTimeout('winShow()',2000)///胡牌特效

return

}


savStorage(1)

gunnout=-1

gunis=""

otlisten=[]

otlistenall=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

if(outTinCd==1&&pled==0&&eatout==0&&lbmgd[pled]==0&&nobackch==0){///挑戰模式

$(".myselfup").hide()

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(Number(tsp)+Number(etnum[pled])>=4&&lbmgd[pled]==0){

bkmgdtinbk=JSON.parse(JSON.stringify(plmgd[pled]))///複製

for(let i=1;i<35;i++){

plmgd[pled].push(i)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(Number(tsp)+Number(etnum[pled])>=6){///聽牌

bkmgdtin=JSON.parse(JSON.stringify(plmgd[pled]))///複製

for(let s=0;s<plmgd[pled].length;s++){

pds=plmgd[pled][s]

if(pds!=i){

delete plmgd[pled][s]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

if(Number(tspsal)+Number(etnum[pled])>=6){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtin))///還原

if(otlistenall[pds].indexOf(i)==-1){

otlistenall[pds].push(i)

}

}

}///if(pds!=i){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtin))///還原

}///for(let s=0;s<plmgd[pled].length;s++){

}///if(Number(tsp)+Number(etnum[pled])==6){///聽牌

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtinbk))///還原

}///for(let i=1;i<35;i++){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtinbk))///還原

sortCad()

if(epgmow==0){

delete plmgd[pled][plmgd[pled].indexOf(otc)]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].push(otc)

}

for(let i=1;i<35;i++){

if(otlistenall[i].length!=0){

otlisten.push({"td":plmgd[pled].indexOf(i),"ls":JSON.parse(JSON.stringify(otlistenall[i]))})

}

}

if(epgmow==0){

plmgd[pled].sort(function (a, b) {

return a - b

});

}

if(otlisten.length!=0&&tinmsalf==0){

epgh=["epgh1b","epgh2b","epgh3b","epgh4","epgh5b","epgh6"]

for(let i=0;i<6;i++){

$('.'+epgh[i]).show()

}

}

}///if(Number(tsp)+Number(etnum[pled])==5){


if(epgmow==0){

for(let i=1;i<17-plmgd[0].length+1;i++){

$(".m"+i).hide()

}

}

if(epgmow==1){

for(let i=1;i<16-plmgd[0].length+1;i++){

$(".m"+i).hide()

}

}

outMycad()

async function outMycad(){

cantchick=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]///不能點的牌

if(epgmow==1){

if(rlmgd[0][rlmgd[0].length-1]!=rlmgd[0][rlmgd[0].length-2]&&Math.abs(rlmgd[0][rlmgd[0].length-4]-rlmgd[0][rlmgd[0].length-2])==1){///吃

cantoutcd=[rlmgd[0][rlmgd[0].length-1]]///不能捨出的牌
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

etfood=[0,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,28,28]

if(rlmgd[0][rlmgd[0].length-1]<rlmgd[0][rlmgd[0].length-2]&&rlmgd[0][rlmgd[0].length-1]<rlmgd[0][rlmgd[0].length-4]&&etfood[rlmgd[0][rlmgd[0].length-1]+3]==etfood[rlmgd[0][rlmgd[0].length-4]]){

cantoutcd.push(rlmgd[0][rlmgd[0].length-1]+3)}
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌


if(rlmgd[0][rlmgd[0].length-1]>rlmgd[0][rlmgd[0].length-2]&&rlmgd[0][rlmgd[0].length-1]>rlmgd[0][rlmgd[0].length-4]&&etfood[rlmgd[0][rlmgd[0].length-1]-3]==etfood[rlmgd[0][rlmgd[0].length-4]]){

cantoutcd.push(rlmgd[0][rlmgd[0].length-1]-3)}
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

cantoutcd=cantoutcd.filter(Number)
localStorage.setItem("cantoutcd",JSON.stringify(cantoutcd))///吃碰後不能捨的牌

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
 
}

if(cantoutcd.indexOf(cardNum)!=-1){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

cantchick[i]=1

}

}

}

if(rlmgd[0][rlmgd[0].length-1]!=rlmgd[0][rlmgd[0].length-2]&&Math.abs(rlmgd[0][rlmgd[0].length-4]-rlmgd[0][rlmgd[0].length-2])==2){///吃中洞

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
}

if(rlmgd[0][rlmgd[0].length-1]==cardNum){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

cantchick[i]=1

}

}
}

if(rlmgd[0][rlmgd[0].length-1]==rlmgd[0][rlmgd[0].length-2]){///碰

for(let i=1;i<18;i++){

cadlink=$("."+pldname[0]+" div .d"+i+" .c1").html().toString()

const match = cadlink.match(/\/mach\/(\d+)\.png/);
if (match) {
  cardNum = Number(match[1]); // 例如 31
}

if(rlmgd[0][rlmgd[0].length-1]==cardNum){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(100%) brightness(50%)")

cantchick[i]=1

}

}

}

}
$(".backindex2").hide()

mdt=await outMyself()

if(mdt==-1){

return

}

$(".backindex2").show()

$(".myselfup").show()

for(let i=1;i<18;i++){

$("."+pldname[0]+" div .d"+i+" div").css("filter","sepia(0%) brightness(100%)")

}

gunnout=-1

gunis=""

outMyself2(mdt)

}

}

if(outTinCd==1&&pled==0&&eatout==0&&lbmgd[pled]==0){

return

}

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

otbigword=[]///大字

otstanby=[]///孤張

otorder=[]///延牌

otruncd=[]///閃避

otlisten=[]///聽牌

otbigbrk=[]///大牌

otsafe=[]///防守


//////////////////////////////////////////////////////////////////////////

spfbk=JSON.parse(JSON.stringify(spf))///防守複製

if(egmgd[pled]>55000){///無視防守

spf=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

}

////////////////////////////////////////////////////////////////////////防守

if(allmgd.length>=110&&tsp+etnum[pled]<5&&egmgd[pled]<=55000||egmgd[pled]<=20000&&allmgd.length>=96&&tsp+etnum[pled]<4){

for(let i=0;i<plmgd[pled].length;i++){

otsafe.push({"td":i,"ot":spf[i]})

}

otsafe.sort(function (a, b) {///防守捨出排序

return b.ot - a.ot

});

if(cantoutcd.lrngth!=0){

otsafe=otsafe.filter(e => cantoutcd.indexOf(plmgd[pled][e.td])==-1)

}

if(eatout==1){///吃牌後的捨牌判斷

return otsafe[0].td

}

outCad2(otsafe[0].td)

return

}


/////////////////////////////////////////////////////////////////////////聽牌捨出


if(Number(tsp)+Number(etnum[pled])>=4){

otlistenall=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

otlisyk=[]///胡台數

for(let s=0;s<plmgd[pled].length;s++){

otlisyk[s]=0

}


cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

if(otf.every(e => e < 5)==false){

return

}

bkmgdtinbk=JSON.parse(JSON.stringify(plmgd[pled]))///複製

for(let i=1;i<35;i++){

if(otf[i]<5){

plmgd[pled].push(i)

plmgd[pled].sort(function (a, b) {

return a - b

});


sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數


if(Number(tsp)+Number(etnum[pled])==6){///聽牌

bkmgdtin=JSON.parse(JSON.stringify(plmgd[pled]))///複製

for(let s=0;s<plmgd[pled].length;s++){



pds=plmgd[pled][s]

if(cantoutcd.length!=0&&cantoutcd.indexOf(pds)!=-1){

pds=i

}

if(pds!=i){

delete plmgd[pled][s]

plmgd[pled]=plmgd[pled].filter(Number)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數

if(Number(tspsal)+Number(etnum[pled])==6){

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtin))///還原

tinyk=1

mytsale=-1

losgun=4///放槍

wincad=i///胡的牌

yknow=bigCadr()///台數統計

otlisyk[s]=(yknow>otlisyk[s])?yknow:otlisyk[s]

tinyk=0

if(cantoutcd.length==0||cantoutcd.indexOf(pds)==-1){

if(otlistenall[pds].indexOf(i)==-1){

otlistenall[pds].push(i)

}

}


}

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtin))///還原

}

}

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtinbk))///還原

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgdtinbk))///還原

sortCad()

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])


otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

for(let i=1;i<35;i++){

lisatk=0

if(otlistenall[i].length!=0){

for(let s=0;s<otlistenall[i].length;s++){

lisatk+=4-otf[otlistenall[i][s]]

}

otlisten.push({"td":plmgd[pled].indexOf(i),"ot":lisatk,"oc":otlisyk[plmgd[pled].indexOf(i)],"ls":JSON.parse(JSON.stringify(otlistenall[i]))})

}

}

if(egmgd[pled]>55000){///無視防守

spf=JSON.parse(JSON.stringify(spfbk))///防守復原

}


if(otlisten.length!=0){

otlisten.sort(function (a, b) {///

return b.od - a.od

});

otlisten.filter(e => e.od ==otlisten[0].od)

otlisten.sort(function (a, b) {///聽牌捨出排序

return b.ot - a.ot

});

if(eatout==1){///吃牌後的捨牌判斷

return otlisten[0].td

}

lbmgd[pled]=(otlisten[0].ot>=6)?1:0

if(lbmgd[pled]==1){

$(".ti"+pled).show()

$(".etpgword img").hide()

$(".tin"+pled).show()

}

lomgd[pled]=JSON.parse(JSON.stringify(otlisten[0].ls))

akmgd[pled]=JSON.parse(JSON.stringify(otlisten[0].ls))

outCad2(otlisten[0].td)

return

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

}

////////////////////////////////////////////////////////大字捨出

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

for(let i=0;i<plmgd[pled].length;i++){

if(plmgd[pled][i]>=28&&cpf[plmgd[pled][i]]<2){

otbigword.push({"td":i,"ot":(4-otf[plmgd[pled][i]])*spf[i]})

}

if(plmgd[pled][i]>=28&&cpf[plmgd[pled][i]]==2&&otf[plmgd[pled][i]]==4&&crdeye>1){

otbigword.push({"td":i,"ot":0})

}

}

if(egmgd[pled]>55000){///無視防守

spf=JSON.parse(JSON.stringify(spfbk))///防守復原

}


if(cantoutcd.lrngth!=0){

otbigword=otbigword.filter(e => cantoutcd.indexOf(plmgd[pled][e.td])==-1)

}


if(otbigword.length!=0){

otbigword.sort(function (a, b) {///大字捨出排序

return a.ot - b.ot

});

if(eatout==1){///吃牌後的捨牌判斷

return otbigword[0].td

}

outCad2(otbigword[0].td)

return

}

/////////////////////////////////////////////////////孤張捨出

sortCad()

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數


for(let s=0;s<3;s++){

for(let i=0;i<plmgd[pled].length;i++){

lotsm=dacadnum[Math.floor(plmgd[pled][i]/9)]///手牌的分布
losep=daetp[pled][Math.floor(plmgd[pled][i]/9)]///吃碰槓區域的分布

if(cpf[plmgd[pled][i]]==1){

if(plmgd[pled].indexOf(plmgd[pled][i]+1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]+2)==-1&&plmgd[pled][i]<s*9+8&&plmgd[pled].indexOf(plmgd[pled][i]-1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]-2)==-1&&plmgd[pled][i]>s*9+2){

otstanby.push({"td":i,"ot":lotsm,"od":losep,"oc":((4-otf[plmgd[pled][i]+1])+(4-otf[plmgd[pled][i]+2])+(4-otf[plmgd[pled][i]-1])+(4-otf[plmgd[pled][i]-2])+(4-otf[plmgd[pled][i]]))*spf[i]})

}

if(plmgd[pled].indexOf(plmgd[pled][i]+1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]+2)==-1&&plmgd[pled][i]==s*9+1){

otstanby.push({"td":i,"ot":lotsm,"od":losep,"oc":((4-otf[plmgd[pled][i]+1])+(4-otf[plmgd[pled][i]+2])+(4-otf[plmgd[pled][i]]))*spf[i]})

}

if(plmgd[pled].indexOf(plmgd[pled][i]-1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]-2)==-1&&plmgd[pled][i]==s*9+9){

otstanby.push({"td":i,"ot":lotsm,"od":losep,"oc":((4-otf[plmgd[pled][i]-1])+(4-otf[plmgd[pled][i]-2])+(4-otf[plmgd[pled][i]]))*spf[i]})

}

if(plmgd[pled].indexOf(plmgd[pled][i]+1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]-1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]+2)==-1&&plmgd[pled][i]==s*9+2){

otstanby.push({"td":i,"ot":lotsm,"od":losep,"oc":((4-otf[plmgd[pled][i]+1])+(4-otf[plmgd[pled][i]+2])+(4-otf[plmgd[pled][i]-1])+(4-otf[plmgd[pled][i]]))*spf[i]})

}

if(plmgd[pled].indexOf(plmgd[pled][i]-1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]+1)==-1&&plmgd[pled].indexOf(plmgd[pled][i]-2)==-1&&plmgd[pled][i]==s*9+8){

otstanby.push({"td":i,"ot":lotsm,"od":losep,"oc":((4-otf[plmgd[pled][i]+1])+(4-otf[plmgd[pled][i]-1])+(4-otf[plmgd[pled][i]-2])+(4-otf[plmgd[pled][i]]))*spf[i]})

}

}

}

}

if(egmgd[pled]>55000){///無視防守

spf=JSON.parse(JSON.stringify(spfbk))///防守復原

}

if(cantoutcd.lrngth!=0){

otstanby=otstanby.filter(e => cantoutcd.indexOf(plmgd[pled][e.td])==-1)

}

if(otstanby.length!=0){

otstanby.sort(function (a, b) {///孤張捨出排序

return a.ot - b.ot

});

otstanle=otstanby.length

otstanby.filter(e => e.ot ==otstanby[0].ot)

if(otstanle==otstanby.length){

otstanby.sort(function (a, b) {///孤張捨出排序

return a.od - b.od

});

otstanby.filter(e => e.od ==otstanby[0].od)

}

otstanby.sort(function (a, b) {///孤張捨出排序

return a.oc - b.oc

});



if(eatout==1){///吃牌後的捨牌判斷

return otstanby[0].td

}

if(otstanby.length!=0){

outCad2(otstanby[0].td)

return

}

}


/////////////////////////////////////////////////////延牌閃避捨出

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

if(otf.every(e => e < 5)==false){

return

}


cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

bkmgd[pled]=JSON.parse(JSON.stringify(plmgd[pled]))///複製

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數


tspbig=manum///組數

tspeye=crdeye///眼

atkCad()

atknumnew=atknum///可增加組數總張數

for(let i=0;i<plmgd[pled].length;i++){

lotsm=dacadnum[Math.floor(plmgd[pled][i]/9)]///手牌的分布
losep=daetp[pled][Math.floor(plmgd[pled][i]/9)]///吃碰槓區域的分布

delete plmgd[pled][i]

plmgd[pled]=plmgd[pled].filter(Number)

sortCad()

tspsal=manum///組數

tspsal+=(crdeye>0)?1:0///組數


tspbignew=manum///組數

tspeyenew=crdeye///眼


if(tsp==tspsal&&tsp+etnum[pled]<6){

atkCad()///可增加組數的牌

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數

etfood=[0,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,28,28]

colcad=0///鄰近的張數

for(let k=-2;k<3;k++){

if(bkmgd[pled][i]+k>etfood[bkmgd[pled][i]]-10&&bkmgd[pled][i]+k<etfood[bkmgd[pled][i]]){

colcad+=4-otf[bkmgd[pled][i]+k]

}

}

if(atknumnew==atknum){

otorder.push({"td":i,"ot":lotsm,"od":losep,"oc":colcad*spf[i]})

}


if(atknumnew>atknum&&tspeye==0){

otorder.push({"td":i,"ot":lotsm,"od":losep,"oc":atknum*spf[i]})

}

if(tspbig==tspbignew&&tspeye>1&&tspeyenew>=1){

otruncd.push({"td":i,"od":(lotsm+losep+dacadnum[3]+daetp[pled][3]),"ot":tspeyenew,"oc":colcad*spf[i]})///閃避

}

if(tspbig==tspbignew&&tspeye<=1){

otruncd.push({"td":i,"od":(lotsm+losep+dacadnum[3]+daetp[pled][3]),"ot":atknum,"oc":colcad*spf[i]})///閃避

}

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd[pled]))///還原

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(egmgd[pled]>55000){///無視防守

spf=JSON.parse(JSON.stringify(spfbk))///防守復原

}

if(cantoutcd.length!=0){

otorder=otorder.filter(e => cantoutcd.indexOf(plmgd[pled][e.td])==-1)

}

if(otorder.length!=0){

otorder.sort(function (a, b) {///

return a.ot - b.ot

});

otordle=otorder.length

otorder.filter(e => e.ot ==otorder[0].ot)

if(otordle==otorder.length){

otorder.sort(function (a, b) {///

return a.od - b.od

});

otorder.filter(e => e.od ==otorder[0].od)

}

otorder.sort(function (a, b) {///延牌捨出排序

return b.ot - a.ot

});

if(eatout==1){///吃牌後的捨牌判斷

return otorder[0].td

}

if(otorder.length!=0){

outCad2(otorder[0].td)

return

}

}

otruncdbk=JSON.parse(JSON.stringify(otruncd))

otruncd.filter(e => e.od >=5)

if(otruncd.length==0){

otruncd=JSON.parse(JSON.stringify(otruncdbk))

}

if(otruncd.length!=0&&tspeye>1){

otruncd.sort(function (a, b) {///確認眼的數量是否不同

return a.ot - b.ot

});

otruncd.filter(e => e.ot ==otruncd[0].ot)

otruncd.sort(function (a, b) {///相同眼的情況下捨出可等張多的

return b.oc - a.oc

});

if(eatout==1){///吃牌後的捨牌判斷

return otruncd[0].td

}

if(otruncd.length!=0){

outCad2(otruncd[0].td)

return

}

}

if(cantoutcd.length!=0){

otruncd=otruncd.filter(e => cantoutcd.indexOf(plmgd[pled][e.td])==-1)

}

if(otruncd.length!=0){

otruncd.sort(function (a, b) {///閃避捨出排序

return b.ot - a.ot

});


if(eatout==1){///吃牌後的捨牌判斷

return otruncd[0].td

}

if(otruncd.length!=0){

outCad2(otruncd[0].td)

return

}

}

///////////////////////////////////////////////////


for(let i=0;i<plmgd[pled].length;i++){

otsafe.push({"td":i,"ot":spf[i]})

}

otsafe.sort(function (a, b) {///防守捨出排序

return b.ot - a.ot

});

if(eatout==1){///吃牌後的捨牌判斷

return otsafe[0].td

}

outCad2(otsafe[0].td)

return


}






function atkCad(){///可增加組數的牌

akmgd[pled]=[]

atknum=0///總張數

bkmgd2=JSON.parse(JSON.stringify(plmgd[pled]))///複製

cansecad=otmgd[0].concat(otmgd[1])
cansecad=cansecad.concat(otmgd[2])
cansecad=cansecad.concat(otmgd[3])
cansecad=cansecad.concat(plmgd[pled])
cansecad=cansecad.concat(alsee)
cansecad=cansecad.concat(ramgd[pled])

otf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

cansecad.forEach(function(x) { otf[x] = (otf[x] || 0)+1; })///計算已知牌的張數


sortCad()

tspnew=manum///組數

tspnew+=(crdeye>0)?1:0///組數

for(let i=1;i<35;i++){

if(otf[i]!=4){

plmgd[pled].push(i)

plmgd[pled].sort(function (a, b) {

return a - b

});

sortCad()

tspnow=manum///組數

tspnow+=(crdeye>0)?1:0///組數

if(tspnow>tspnew){

akmgd[pled].push(i)

atknum+=(4-otf[i])

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd2))///還原

}

}

plmgd[pled]=JSON.parse(JSON.stringify(bkmgd2))///還原

sortCad()

tspnew=manum///組數

tspnew+=(crdeye>0)?1:0///組數

}



function sortCad(){///整理方式

manum=0///組數

crdeye=0///眼

dacadnum=[]///萬筒條各個組數

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

canet=[]
canet[0]=[]
canet[1]=[3]
canet[2]=[1,4]
canet[3]=[2,5]
canet[4]=[3,6]
canet[5]=[4,7]
canet[6]=[5,8]
canet[7]=[6,9]
canet[8]=[7]
canet[9]=[]
canet[10]=[12]
canet[11]=[10,13]
canet[12]=[11,14]
canet[13]=[12,15]
canet[14]=[13,16]
canet[15]=[14,17]
canet[16]=[15,18]
canet[17]=[16]
canet[18]=[]
canet[19]=[21]
canet[20]=[19,22]
canet[21]=[20,23]
canet[22]=[21,24]
canet[23]=[22,25]
canet[24]=[23,26]
canet[25]=[24,27]
canet[26]=[25]
canet[27]=[]



plmgd[pled].forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

cnmgd[pled]=[]

gnmgd[pled]=[]

etmgd[pled]=[]

for(let i=1;i<35;i++){

if(cpf[i]>=2){

cnmgd[pled].push(i)///四個玩家可碰的牌

}

if(cpf[i]>=3){

cnmgd[pled].push(i)///四個玩家可碰的牌

gnmgd[pled].push(i)///四個玩家可槓的牌

}

}

cpf.splice(0,1)

cpf.length=34


for(let i=27;i<34;i++){

if(cpf[i]>0){///超過1

cpf[i]=(cpf[i]<5)?cpf[i]:4

if(zutop[cpf[i]]!=undefined){

manum+=zutop[cpf[i]][0]///組數

crdeye+=zutop[cpf[i]][1]///眼

}

}

}

for(let k=0;k<3;k++){

lanhow=[]///連號

for(let i=k*9;i<k*9+9;i++){

if(cpf[i]>0&&i==k*9+8){///超過1

cpf[i]=(cpf[i]<5)?cpf[i]:4

lanhow.push(cpf[i])

lanhow=lanhow.join("")

if(zutop[lanhow]!=undefined){

manum+=zutop[lanhow][0]///組數

crdeye+=zutop[lanhow][1]///眼

}

if(zutop[lanhow]==undefined){

manum+=0///組數

crdeye+=0///眼

}

lanhow=[]

break

}


if(cpf[i]>0){///超過1

cpf[i]=(cpf[i]<5)?cpf[i]:4

lanhow.push(cpf[i])

for(let s=i+1;s<k*9+9;s++){

if(cpf[s]>0){///超過1

etmgd[pled]=etmgd[pled].concat(canet[s])

cpf[s]=(cpf[s]<5)?cpf[s]:4

lanhow.push(cpf[s])

}

if(cpf[s]==0&&cpf[s+1]>0&&s+1<=k*9+8){///

etmgd[pled].push(s+1)

}

if(cpf[s]==0||s==k*9+8){///沒超過1

lanhow=lanhow.join("")


if(zutop[lanhow]!=undefined){

manum+=zutop[lanhow][0]///組數

crdeye+=zutop[lanhow][1]///眼

}

if(zutop[lanhow]==undefined){

manum+=0///組數

crdeye+=0///眼

alert(lanhow)

}

lanhow=[]

i=s///(s!=8)?s-1:s

break

}

}

}

}

dacadnum.push(manum+crdeye)

}

dacadnum[1]=dacadnum[1]-dacadnum[0]
dacadnum[2]=dacadnum[2]-dacadnum[1]-dacadnum[0]
dacadnum[3]=0

for(let i=27;i<34;i++){

if(cpf[i]>=2){///

dacadnum[3]++

}

}

for(let k=0;k<3;k++){

for(let i=k*9;i<k*9+9;i++){

if(cpf[i]>0&&cpf[i+1]>0&&cpf[i+2]>0&&i+2<k*9+9){

etmgd[pled].push(i+2)

}

}

}

etmgd[pled]=etmgd[pled].filter( (el, i, arr) => arr.indexOf(el) === i);///移除重覆

}






