const zutop = require("./zutop.js");
const { parentPort , isMainThread} = require("worker_threads");

console.log(zutop["1"]);

plgamealread=0///是否開始遊戲

lopal=0

function otemit(ioname,iodata){

parentPort.postMessage({
  eventName: ioname,
  data: iodata

});

}
function handleMessage(msg) {
  if (msg && msg.eventName && eventHandlers[msg.eventName]) {
    eventHandlers[msg.eventName](msg.data);
  } else {
    console.warn("未知事件或格式錯誤", msg);
  }
}

const eventHandlers = {

wantinvit: (rooms) => {

roomId=rooms

console.log("加入房間",rooms);

otemit("myche", JSON.stringify([roomId,"maxatkc"]));

},

///////////////////////////////////////////////

playerJoined: (datainf) => {

if(datainf.roomSize==4){

otemit("myname",roomId);

otemit("dice",roomId);

}

},

///////////////////////////////////////////////

myname: (data) => {

idfme=JSON.parse(data)[0]
allplad=JSON.parse(data)[1]

myl=allplad.indexOf(idfme)

allplad=allplad.slice(myl).concat(allplad.slice(0, myl));

console.log(allplad)

},

///////////////////////////////////////////////

dice: (data) => {

otemit("gamStar",roomId);

gtcd=0

lbmgd=0

lbmgds=[0,0,0,0]

flmgd=[]

etmgd=[]

plmgd=[]

allmgd=[]

alloutcd=[[],[],[],[]]

daetp=[0,0,0,0]

allmgds=65

ephchick=0

},

///////////////////////////////////////////////

getnewcard2: (ples) => {

console.log("剩下張數:",(128-allmgds))

allmgds++

},

///////////////////////////////////////////////

nowin: (data) => {///流局

setTimeout(begStar,500)

},

///////////////////////////////////////////////

needgetcard: (card) => {

otemit("getnewcard",JSON.stringify([roomId,"new"]));

},

///////////////////////////////////////////////
star: (card) => {

cantoutcd=[]///不能捨的牌

plmgd=JSON.parse(card)

plmgd.sort(function (a, b) {

return a - b

});

setTimeout(() => {

for(let i=9;i<17;i++){

if(plmgd[i]>34){

otemit("flower",JSON.stringify([roomId,plmgd[i]]));

otemit("getnewcard",JSON.stringify([roomId]));

}

}

plmgd=plmgd.filter(num => num < 35);

plmgd=plmgd.filter(Number)


if(gtcd==0&&plmgd.length==16){

otemit("befbegin",JSON.stringify([roomId]));

gtcd=1

}


}, 2500);

},

///////////////////////////////////////////////

caneph: (data) => {

pled=JSON.parse(data)[0]
card=JSON.parse(data)[1]
epgtw=JSON.parse(data)[2]///哪一種狀態

ple=allplad.indexOf(pled)

if(epgtw=="tin"){

lbmgds[ple]=1

ephchick=(ephchick==1)?1:0

return

}

if(ephchick==1&&ple!=0&&epgtw!="tin"){///如果有吃碰槓.但是被強制取消則返回

///otemit("needgetcard",JSON.stringify([roomId,pled,card[1]]));

otemit("noepgh",JSON.stringify([roomId,card[1]]));

ephchick=0

}

if(epgtw=="gun"&&card[0]!="X"&&card[1]=="X"){

ephchick=0

if(ple==0){

delete plmgd[plmgd.indexOf(Number(card[3]))]

plmgd=plmgd.filter(Number)

allmgd.push(card[3])

otemit("needgetcardgun",JSON.stringify([roomId,allplad[ple]]));

otemit("epghpk",JSON.stringify([roomId,0]));

}

if(ple!=0){

plmgd.sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(tsp+etmgd.length>=4){

bkmgd2=JSON.parse(JSON.stringify(plmgd))///複製

plmgd.push(Number(card[3]))

plmgd.sort(function (a, b) {

return a - b

});

sortCad()

tsptin=manum///組數

tsptin+=(crdeye>0)?1:0///組數

if(tsptin+etmgd.length==6){

plmgd=JSON.parse(JSON.stringify(bkmgd2))///複製

plmgd.push(Number(card[3]))

otemit("epghpk",JSON.stringify([roomId,3]));

otemit("mywin",JSON.stringify([roomId,plmgd,lbmgd,flmgd,etmgd]));

return

}///if(tsptin+etmgd.length==6){

plmgd=JSON.parse(JSON.stringify(bkmgd2))///複製

}///if(tsp+etmgd.length>=4&&lbmgd==0){

otemit("needgetcardgun",JSON.stringify([roomId,allplad[ple]]));

otemit("epghpk",JSON.stringify([roomId,0]));

return

}

}


if(epgtw=="gun"&&card[0]=="X"){

ephchick=0

if(ple==0){

delete plmgd[plmgd.indexOf(Number(card[3]))]
delete plmgd[plmgd.indexOf(Number(card[3]))]
delete plmgd[plmgd.indexOf(Number(card[3]))]
delete plmgd[plmgd.indexOf(Number(card[3]))]

plmgd=plmgd.filter(Number)

etmgd.push([card[3],card[3],card[3],card[3]])

allmgd.push(card[3])
allmgd.push(card[3])
allmgd.push(card[3])
allmgd.push(card[3])

otemit("gunget",JSON.stringify([roomId]));

}

return

}


if(epgtw=="gun"&&card[0]!="X"&&card[1]!="X"){

ephchick=0

if(ple==0){

delete plmgd[plmgd.indexOf(Number(card[0]))]
delete plmgd[plmgd.indexOf(Number(card[1]))]
delete plmgd[plmgd.indexOf(Number(card[2]))]

plmgd=plmgd.filter(Number)

etmgd.push([card[0],card[1],card[2],card[3]])

allmgd.push(card[0])
allmgd.push(card[0])
allmgd.push(card[0])
allmgd.push(card[0])

otemit("gunget",JSON.stringify([roomId]));

}

return

}

////////////////////////////////

if(epgtw=="win"){

console.log(plmgd)

setTimeout(begStar,11000)

}

///////////////////////////////////

if(epgtw=="eat"||epgtw=="pon"){

ephchick=0

if(ple==0){

delete plmgd[plmgd.indexOf(Number(card[0]))]
delete plmgd[plmgd.indexOf(Number(card[2]))]

plmgd=plmgd.filter(Number)

etmgd.push([card[0],card[1],card[2]])

allmgd.push(card[0])
allmgd.push(card[1])
allmgd.push(card[2])

plmgd.sort(function (a, b) {

return a - b

});

cantoutcd = getCantOutCards(card, epgtw);

console.log(cantoutcd)

///setTimeout(() => {

outcard(card[1])

///},100)

}

}

},

///////////////////////////////////////////////

getnewcard: (card) => {

cantoutcd=[]///不能捨的牌

gunall=[]

if(Number(card)>34){

otemit("flower",JSON.stringify([roomId,Number(card)]));

otemit("getnewcard",JSON.stringify([roomId]));

return

}



plmgd=plmgd.filter(num => num < 35);

plmgd=plmgd.filter(Number)

bkmgd=JSON.parse(JSON.stringify(plmgd))///複製

wincard=Number(card)

plmgd.push(wincard)

plmgd.sort(function (a, b) {

return a - b

});

if(gtcd==2){

console.log("摸牌 :",plmgd,"進張 :",wincard)

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(tsp+etmgd.length==6){

plmgd=JSON.parse(JSON.stringify(bkmgd))///複製

plmgd.push(wincard)

otemit("epghpk",JSON.stringify([roomId,3]));

otemit("mywin",JSON.stringify([roomId,plmgd,lbmgd,flmgd,etmgd]));

return

}

plmgdbkgun = JSON.parse(JSON.stringify(plmgd));

if (tryGunDecision(Number(card), lbmgd)) return;

plmgd = JSON.parse(JSON.stringify(plmgdbkgun));



if(lbmgd==0){

setTimeout(() => {

outcard(Number(card))

},100)

return

}

if(lbmgd==1){


setTimeout(() => {


console.log("捨牌 :",plmgd,"捨張 :",Number(card))

  const idx = plmgd.indexOf(Number(card));
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

otemit("outcard", JSON.stringify([roomId, Number(card)]));


},100)


}


}

if(gtcd==0&&plmgd.length==16){

otemit("befbegin",JSON.stringify([roomId]));

gtcd=1

}

},

///////////////////////////////////////////////

befbegin: (card) => {

otemit("begin",JSON.stringify([roomId]));

gtcd=2

},

///////////////////////////////////////////////


outcard: (outcardinf) => {

winp=0

pled=JSON.parse(outcardinf)[0]
mtd=JSON.parse(outcardinf)[1]
mtd=Number(mtd)

wincard=mtd

ple=allplad.indexOf(pled)

alloutcd[ple].push(mtd)

allmgd.push(mtd)

console.log("收到捨牌",mtd,"來自",ple)

if(ple==0){

otemit("epghpk",JSON.stringify([roomId,0]));

otemit("outchak",JSON.stringify([roomId,mtd]));

console.log("傳送確認吃碰槓")

ephchick=0

return

}

if(ple!=0){

ephchick=0

bkmgd=JSON.parse(JSON.stringify(plmgd))///複製

plmgd.push(Number(mtd))

plmgd.sort(function (a, b) {

return a - b

});

sortCad()

tsp=manum///組數

tsp+=(crdeye>0)?1:0///組數

if(tsp+etmgd.length==6){

plmgd=JSON.parse(JSON.stringify(bkmgd))///複製

plmgd.push(Number(mtd))

otemit("epghpk",JSON.stringify([roomId,3]));

winp=1

ephchick=1

bkmgdwin=JSON.parse(JSON.stringify(plmgd))///複製

}

plmgd=JSON.parse(JSON.stringify(bkmgd))///複製

if(lbmgd==0){

cpf=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

plmgd.forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

if(cpf[mtd]==3&&ple!=3){

otemit("epghpk",JSON.stringify([roomId,2]));

ephchick=1

}

if(cpf[mtd]>=2&&lopal>=3){

otemit("epghpk",JSON.stringify([roomId,2]));

ephchick=1

}

mtd=Number(mtd)

if(mtd<28&&ple==3&&lopal==4){///吃

if(mtd>2&&cpf[mtd-1]>0&&cpf[mtd-2]>0&&Math.ceil((mtd-2)/9)==Math.ceil(mtd/9)&&Math.ceil((mtd-1)/9)==Math.ceil(mtd/9)){

otemit("epghpk",JSON.stringify([roomId,1]));

ephchick=1

}

if(mtd<26&&cpf[mtd+1]>0&&cpf[mtd+2]>0&&Math.ceil((mtd+2)/9)==Math.ceil(mtd/9)&&Math.ceil((mtd+1)/9)==Math.ceil(mtd/9)){

otemit("epghpk",JSON.stringify([roomId,1]));

ephchick=1

}

if(mtd<27&&mtd>1&&cpf[mtd+1]>0&&cpf[mtd-1]>0&&Math.ceil((mtd+1)/9)==Math.ceil(mtd/9)&&Math.ceil((mtd-1)/9)==Math.ceil(mtd/9)){

otemit("epghpk",JSON.stringify([roomId,1]));

ephchick=1

}

}///if(mtd<28&&ple==3&&lopal==4){///吃


}///if(lbmgd==0){

if(ephchick==0){///如果沒有吃碰槓胡則返回

otemit("epghpk",JSON.stringify([roomId,0]));

}
}///if(ple!=0){

otemit("outchak",JSON.stringify([roomId,mtd]));

},

///////////////////////////////////////////////

outchak: (outchakinf) => {

mtd=JSON.parse(outchakinf)[1]
mtd=Number(mtd)

wincard=mtd

bkmgds22=JSON.parse(JSON.stringify(plmgd))

if(winp==1){

plmgd=JSON.parse(JSON.stringify(bkmgdwin))///複製

console.log("win")

otemit("win",JSON.stringify([roomId,plmgd,lbmgd,flmgd,etmgd]));

return

}

if(ephchick==1&&(128-allmgds)>=5&&ple!=0){

///otemit("needgetcard",JSON.stringify([roomId,pled]));



console.log("進入吃碰判斷",pled)

setTimeout(() => {

simulateEatPonGun(ple, mtd, plmgd, allmgd, etmgd, roomId);

},10)

console.log("離開吃碰判斷")


return

}

if(ephchick==0||(128-allmgds)<5&&ephchick==1){///如果沒有吃碰槓胡則返回

otemit("needgetcard",JSON.stringify([roomId,pled,mtd]));

}


}



};

///////////////////////////////////////////////

function begStar(){

otemit("dice",roomId);

}

////////////////////////////////////////////////////////////////////

function getCantOutCards(card, epgtw) {
  const cantoutcd = [Number(card[1])]; // 中間牌必不能捨

  if (epgtw === "eat") {
    const c0 = Number(card[0]);
    const c1 = Number(card[1]); // 中間
    const c2 = Number(card[2]);

    const min = Math.min(c0, c1, c2);
    const max = Math.max(c0, c1, c2);

    const isValidSuit = (a, b) => isSameSuit(a, b);

    // 向下吃（如 2,3,4）-> mtd 是最大值 -> 保護 min -1
    if (c1 === max) {
      const protect = min - 1;
      if (isValidSuit(min, protect)) cantoutcd.push(protect);
    }

    // 向上吃（如 4,5,6）-> mtd 是最小值 -> 保護 max +1
    else if (c1 === min) {
      const protect = max + 1;
      if (isValidSuit(max, protect)) cantoutcd.push(protect);
    }

    // 中間吃（如 3,4,5），不需要額外保護
  }

  return cantoutcd;
}

// 判斷是否同一花色
function isSameSuit(a, b) {
  return Math.ceil(a / 9) === Math.ceil(b / 9);
}
////////////////////////////////////////////////////////////////////
function tryGunDecision(card, lbmgd) {

  const originalHand = JSON.parse(JSON.stringify(plmgd));
  const baseTSP = manum + (crdeye > 0 ? 1 : 0) + etmgd.length;
  const baseImproving = countTotalImprovingTiles(originalHand, allmgd);

  // 計算手牌中各牌張數
  const tileCount = Array(35).fill(0);
  for (let t of originalHand) tileCount[t]++;

  // ===== 暗槓（手牌中有4張相同）=====
  for (let i = 1; i <= 34; i++) {
    if (tileCount[i] >= 4) {
      if (lbmgd === 1) continue; // 聽牌中不能暗槓

      const testHand = originalHand.filter(t => t !== i);
      plmgd = testHand.slice();
      sortCad();

      const newTSP = manum + (crdeye > 0 ? 1 : 0) + etmgd.length;
      const newImproving = countTotalImprovingTiles(plmgd, allmgd);

      if (newTSP+1 >= baseTSP && newImproving >= baseImproving) {
        const caneph = ["X", "X",  "X", i];

otemit("epghpk",JSON.stringify([roomId,2]));

plmgd = JSON.parse(JSON.stringify(plmgdbkgun));

        otemit("gun", JSON.stringify([roomId, caneph]));

        console.log("執行暗槓", i);


        return true;
      }
    }
  }

  // ===== 加槓（已碰，且有第4張）=====
  for (let j = 0; j < etmgd.length; j++) {
    const group = etmgd[j];
    if (group.length === 3 && group[0] === group[1] && group[2] === group[0]) {
      const tile = group[0];

      // ==== 例外允許：摸進來的牌是第4張 ====
      if (Number(card) === tile) {
        const testHand = originalHand.slice();
        const idx = testHand.indexOf(tile);
        if (idx !== -1) testHand.splice(idx, 1);

        plmgd = testHand.slice();
        sortCad();

        const newTSP = manum + (crdeye > 0 ? 1 : 0) + etmgd.length;
        const newImproving = countTotalImprovingTiles(plmgd, allmgd);

        if (newTSP >= baseTSP && newImproving >= baseImproving) {

          const caneph = [j, "X", "X", tile];


otemit("epghpk",JSON.stringify([roomId,2]));

plmgd = JSON.parse(JSON.stringify(plmgdbkgun));

          otemit("gun", JSON.stringify([roomId, caneph]));

          console.log("執行加槓（摸牌）", tile);


          return true;
        }
      }

      // ==== 正常加槓（來自手牌） ====
      if (originalHand.includes(tile)) {
        if (lbmgd === 1) continue; // 聽牌中不能手牌加槓

        const testHand = originalHand.slice();
        const idx = testHand.indexOf(tile);
        if (idx !== -1) testHand.splice(idx, 1);

        plmgd = testHand.slice();
        sortCad();

        const newTSP = manum + (crdeye > 0 ? 1 : 0) + etmgd.length;
        const newImproving = countTotalImprovingTiles(plmgd, allmgd);

        if (newTSP >= baseTSP && newImproving >= baseImproving) {

          const caneph = [j, "X", "X", tile];

otemit("epghpk",JSON.stringify([roomId,2]));

plmgd = JSON.parse(JSON.stringify(plmgdbkgun));

          otemit("gun", JSON.stringify([roomId, caneph]));

          console.log("執行加槓（手牌）", tile);


          return true;
        }
      }
    }
  }

  return false;
}
////////////////////////////////////////////////////////////////////


///////////////////////////////////////
function lonmds() {
  let bkmgd = JSON.parse(JSON.stringify(plmgd));  // 備份手牌
  let tingpai = [];  // 聽牌種類
  let leftcount = {}; // 每種可胡的牌剩幾張

  for (let i = 1; i <= 34; i++) {
    // 加入牌
    plmgd.push(i);
    plmgd.sort((a, b) => a - b);

    sortCad();  // 執行組合分析

    let tsp = manum + (crdeye > 0 ? 1 : 0);
    if (tsp+etmgd.length == 6) {
      tingpai.push(i);

      // 計算這張牌還剩幾張
      let countInAll = allmgd.filter(x => x === i).length;
      let countInHand = plmgd.filter(x => x === i).length;
      let countLeft = 4 - (countInAll + countInHand - 1); // 減去剛剛加進來的1張
      leftcount[i] = countLeft > 0 ? countLeft : 0;
    }

    // 還原
    plmgd = JSON.parse(JSON.stringify(bkmgd));
  }

  // 最後還原
  plmgd = JSON.parse(JSON.stringify(bkmgd));
  
  return { tingpai, leftcount };
}

///////////////////////////////////////////////////////

function findBest(hand, allmgd, cantoutcd) {
  const candidate = [];

  // 統計手牌中 28~34 的出現次數
  const countMap = {};
  for (let i = 28; i <= 34; i++) {
    countMap[i] = plmgd.filter(x => x === i).length;
  }

  // 統計見光數量
  const seenMap = {};
  for (let i = 28; i <= 34; i++) {
    seenMap[i] = allmgd.filter(x => x === i).length;
  }

  // 找出手中只有一張且不在 cantoutcd 的牌
  for (let i = 28; i <= 34; i++) {
    if (countMap[i] === 1 && !cantoutcd.includes(i)) {
      candidate.push(i);
    }
  }

  // 優先找出見光 >= 2 的「已沒用」牌
  const forcedDiscard = candidate.filter(i => seenMap[i] >= 2);
  if (forcedDiscard.length > 0) {
    return forcedDiscard.sort((a, b) => seenMap[b] - seenMap[a]); // 越見光越多越優先
  }

  // 否則按見光多寡排序
  return candidate.sort((a, b) => seenMap[b] - seenMap[a]);
}
//////////////////////////////////////////////////////////
function findIsolated(hand, allmgd, cantoutcd) {
  const groupRanges = [
    [1, 9],    // 萬子
    [10, 18],  // 筒子
    [19, 27],  // 條子
  ];

  // 判斷是否屬於同一組
  const isInSameGroup = (num, group) => num >= group[0] && num <= group[1];

  // 統計張數
  const countAll = (arr) => {
    const map = {};
    for (let i = 1; i <= 34; i++) map[i] = 0;
    for (let x of arr) map[x]++;
    return map;
  };

  const handCount = countAll(plmgd);
  const seenCount = countAll(allmgd);

  const result = [];

  for (let i = 1; i <= 27; i++) {
    // 1. 手上只有一張
    if (handCount[i] !== 1) continue;

    // 2. 不在禁打清單
    if (cantoutcd.includes(i)) continue;

    // 3. 判斷組別
    const group = groupRanges.find(grp => isInSameGroup(i, grp));
    if (!group) continue;

    // 4. 檢查是否有靠張（同組內的±1 或 ±2 有出現在手牌）
    let hasKaozhang = false;
    for (let d = -2; d <= 2; d++) {
      if (d === 0) continue;
      const n = i + d;
      if (isInSameGroup(n, group) && handCount[n] > 0) {
        hasKaozhang = true;
        break;
      }
    }

    // 5. 有靠張 → 不算孤張
    if (hasKaozhang) continue;

    // 6. 計算靠張剩餘張數
    let kaozhang = 0;
    for (let d = -2; d <= 2; d++) {
      if (d === 0) continue;
      const n = i + d;
      if (isInSameGroup(n, group)) {
        const remain = 4 - handCount[n] - seenCount[n];
        kaozhang += Math.max(remain, 0);
      }
    }

    // 7. 是孤張 → 加入清單
    result.push({ tile: i, remain: kaozhang });
  }

  // 8. 按靠張剩餘量排序（越少越先丟）
  result.sort((a, b) => a.remain - b.remain);

  // 9. 回傳 tile 陣列（可加上備註）
  return result.map(obj => obj.tile);
}
//////////////////////////////////////////////////////////////


function findDefensiveListenDiscardV5(hand, etlen, allmgd, cantoutcd, lbmgds) {
  // 初始化與分析原始手牌
  const originalHand = JSON.parse(JSON.stringify(hand));
plmgd=JSON.parse(JSON.stringify(hand))
  sortCad();
  const baseTSP = manum + (crdeye > 0 ? 1 : 0);
  const baseEye = crdeye;
  const baseImproving = countTotalImprovingTiles(originalHand, allmgd);

 /// if (baseTSP + etlen < 4) return [];

  const otlistenall = Array(35).fill().map(() => []);

  const knownTiles = plmgd.concat(allmgd);
  const otf = Array(35).fill(0);
  knownTiles.forEach(x => { otf[x] = (otf[x] || 0) + 1; });

  if (otf.some(e => e > 4)) return [];

  const originalCopy = JSON.parse(JSON.stringify(plmgd));

  for (let i = 1; i < 35; i++) {
    if (otf[i] >= 4) continue;

    plmgd.push(i);
    plmgd.sort((a, b) => a - b);
    sortCad();
    const tsptemp = manum + (crdeye > 0 ? 1 : 0);

    if (tsptemp + etlen === 6) {
      const backupHand = JSON.parse(JSON.stringify(plmgd));

      for (let s = 0; s < plmgd.length; s++) {
        const pds = plmgd[s];
        if (pds === i || cantoutcd.includes(pds)) continue;

        const testHand = JSON.parse(JSON.stringify(plmgd));
        testHand.splice(s, 1);
        plmgd = JSON.parse(JSON.stringify(testHand));
        sortCad();
        const tspsim = manum + (crdeye > 0 ? 1 : 0);
///console.log("v4組數q",tsptemp + etlen,tspsim + etlen,plmgd)
        if (tspsim + etlen === 6) {
          if (!otlistenall[pds].includes(i)) {
            otlistenall[pds].push(i);
          }
        }

        plmgd = JSON.parse(JSON.stringify(backupHand));
      }
    }

    plmgd = JSON.parse(JSON.stringify(originalCopy));
  }

  // 重算可見牌數
  const allSeen = plmgd.concat(allmgd);
  otf.fill(0);
  allSeen.forEach(x => { otf[x] = (otf[x] || 0) + 1; });

  const otlisten = [];

  for (let i = 1; i < 35; i++) {
    if (otlistenall[i].length === 0) continue;

if (!plmgd.includes(i)) continue;

let lisatk = 0;
for (const winTile of otlistenall[i]) {
  lisatk += 4 - otf[winTile];
}

otlisten.push({
  td: i,
  ot: lisatk,
  ls: [...otlistenall[i]]
});

  }

  if (otlisten.length === 0) return [];

  otlisten.sort((a, b) => b.ot - a.ot);
otlistenwho=otlisten[0].ot
  return [otlisten[0].td];
}
/////////////////////////////////////////////////


function findBestDiscardByImprovingAndKaozhang(hand, etlen ,allmgd, cantoutcd = []) {


console.log(hand)
  const originalHand = JSON.parse(JSON.stringify(hand));
plmgd=JSON.parse(JSON.stringify(hand))
  sortCad();
  const baseTSP = manum + (crdeye > 0 ? 1 : 0);
  const baseEye = crdeye;
  const baseImproving = countTotalImprovingTiles(originalHand, allmgd);

  const candidates = [];

  for (let i = 0; i < originalHand.length; i++) {
    const card = originalHand[i];
    if (cantoutcd.includes(card)) continue;

    const testHand = [...originalHand];
    testHand.splice(i, 1);

    plmgd = JSON.parse(JSON.stringify(testHand));
    sortCad();
    const newTSP = manum + (crdeye > 0 ? 1 : 0);
    const newEye = crdeye;

    if (newTSP === baseTSP && baseTSP + etlen < 6) {
      const newImproving = countTotalImprovingTiles(plmgd, allmgd);
      const kaozhang = countAdjacentAvailableTiles(card, allmgd);

///console.log(`模擬捨出 ${card} → improving=${newImproving}, kaozhang=${kaozhang}, tsp=${newTSP}, eye=${newEye}`);
      candidates.push({
        index: i,
        card,
        improving: newImproving,
        eye: newEye,
        kaozhang,
      });
    }
  }

  // 還原 plmgd
  plmgd = JSON.parse(JSON.stringify(originalHand));
  sortCad();

  if (candidates.length === 0) return null;

  // 分群處理
  const group1 = candidates.filter(c => c.improving === baseImproving);
  const group2 = candidates.filter(c => c.improving < baseImproving);




  if (group1.length > 0) {
    group1.sort((a, b) => b.kaozhang - a.kaozhang); // 保留靠張多的

    return [group1[0].card];

  }

  // 進張下降情況，選下降最少且靠張最多的
///console.log("排序前", group2);
group2.sort((a, b) => {
  if (a.improving !== b.improving) return a.eye - b.eye;  // 進張多的在前

  if (baseEye > 1) {
    if (a.eye !== b.eye) {
      return a.eye - b.eye;  // eye 小的在前面
    }
  }

  return a.kaozhang - b.kaozhang; //靠張少的在前（升序）
});
///console.log("排序後", group2);

  return [group2[0].card];
}

function countAdjacentAvailableTiles(card, allmgd) {
  let total = 0;
  for (let d = -2; d <= 2; d++) {
    const t = card + d;
    if (t >= 1 && t <= 34 && Math.floor(t / 9) === Math.floor(card / 9)) {
      const used = allmgd.filter(x => x === t).length;
      total += Math.max(0, 4 - used);
    }
  }
  return total;
}

//////////////////////////////////////////////////

function tryDeclareReady(outcard) {
  // 1. 模擬丟出牌
  let bk = JSON.parse(JSON.stringify(plmgd));
  let idx = plmgd.indexOf(outcard);
  if (idx === -1) return false; // 找不到牌不能喊聽
  plmgd.splice(idx, 1);

  // 2. sortCad 分析結構
  sortCad();
  let tsp = manum + (crdeye > 0 ? 1 : 0);
  if (tsp + etmgd.length !== 5) {
    plmgd = JSON.parse(JSON.stringify(bk)); // 還原
    return false;
  }

  // 3. 嘗試進入聽牌
  const { tingpai, leftcount } = lonmds();

  // 4. 計算總張數
  let total = Object.values(leftcount).reduce((a, b) => a + b, 0);

  // 5. 是否可喊聽
  let ready = total >= 5;

  // 6. 設定 lbmgd 狀態
  if (ready) {
    lbmgd = 1; // 喊聽
  }

  plmgd = JSON.parse(JSON.stringify(bk));; // 還原手牌

  return {
    ready,
    tingpai,
    leftcount,
    total
  };
}

////////////////////////////////////////////////////////
function findDefensiveByDangerScore(hand, allmgd, cantoutcd, alloutcd, lbmgds) {
  const originalHand = JSON.parse(JSON.stringify(plmgd));
  const baseImproving = countTotalImprovingTiles(originalHand, allmgd);

  // 判斷要防守的對象
  const totalTing = lbmgds.reduce((a, b) => a + b, 0);
  let targetPlayer = null;

  // 生成危險分數表（只針對要防的玩家）
  const dangerMap = getDangerScoresFromAlloutcd(alloutcd, targetPlayer);  // 加入 targetPlayer 支援

  const candidates = [];

const seen = new Set();
for (let i = 0; i < originalHand.length; i++) {
  const card = originalHand[i];
  if (seen.has(card)) continue;
  seen.add(card);
  const dangerScore = dangerMap[card] || 0;
  candidates.push({ card, dangerScore });
}

plmgd=JSON.parse(JSON.stringify(hand))

  if (candidates.length === 0) return [];

  candidates.sort((a, b) => a.dangerScore - b.dangerScore || b.improving - a.improving);
  return candidates;
}
//////////////////////////////////////////////////////
function getDangerScoresFromAlloutcd(alloutcd, targetIdx = null) {
  const dangerMap = Array(35).fill(0);

  for (let i = 0; i < 4; i++) {
    if (targetIdx !== null && i !== targetIdx) continue;

    const outs = alloutcd[i];

    for (let j = 0; j < outs.length; j++) {
      const card = outs[j];

      // 字牌安全性
      if (card >= 28) {
        dangerMap[card] = 0;
        continue;
      }

      // 上下壓（僅前 3 張數牌有效）
      if (j < 3) {
        if (card % 9 === 1) {
          dangerMap[card + 1] += 1;
          dangerMap[card + 2] += 2;
        } else if (card % 9 === 2) {
          dangerMap[card - 1] += 1;
          dangerMap[card + 1] += 2;
        } else if (card % 9 === 3) {
          dangerMap[card - 2] += 1;
          dangerMap[card - 1] += 2;
        } else if (card % 9 === 8) {
          dangerMap[card - 1] += 1;
          dangerMap[card - 2] += 2;
        } else if (card % 9 === 7) {
          dangerMap[card - 1] += 2;
          dangerMap[card + 1] += 1;
        } else if (card % 9 === 6) {
          dangerMap[card + 1] += 1;
          dangerMap[card + 2] += 2;
        }
      }

      // 一路性
      const group = card % 9;
      if (group === 1 || group === 4 || group === 7) {
        if (group === 1) {
          dangerMap[card + 3] += 1; // 打1 → 可能不要4
        } else if (group === 4) {
          dangerMap[card - 3] += 1; // 打4 → 可能不要1
          dangerMap[card + 3] += 1; // 打4 → 可能不要7
        } else if (group === 7) {
          dangerMap[card - 3] += 1; // 打7 → 可能不要4
        }
      }

      // 拆搭/連打（若有連續打出類似搭子的牌）
      if (j >= 1) {
        const prev = outs[j - 1];
        if (Math.abs(card - prev) === 1 || Math.abs(card - prev) === 2) {
          const min = Math.min(card, prev);
          const max = Math.max(card, prev);
          for (let k = min - 1; k <= max + 1; k++) {
            if (k >= 1 && k <= 27) dangerMap[k] += 1;
          }
        }
      }
    }
  }

  return dangerMap;
}
//////////////////////////////////////////////////////
function selectBestCompromiseDiscard(outcards, dangerCandidates) {
  if (!Array.isArray(outcards) || outcards.length === 0) return [];

  // 如果沒有危險資訊，直接回傳最優先的進攻牌
  if (!Array.isArray(dangerCandidates) || dangerCandidates.length === 0) {
    return [outcards[0]];
  }

  const dangerMap = {};
  for (let dc of dangerCandidates) {
    dangerMap[dc.card] = dc.dangerScore;
  }

  // 優先選擇第一張安全的牌
  for (let card of outcards) {
    if (!dangerMap[card] || dangerMap[card] === 0) {
      return [card];
    }
  }

  // 全是危險牌 → 選 dangerScore 最小的
  let bestCard = outcards[0];
  let minDanger = dangerMap[bestCard] ?? Infinity;

  for (let card of outcards) {
    const danger = dangerMap[card] ?? Infinity;
    if (danger < minDanger) {
      minDanger = danger;
      bestCard = card;
    }
  }

  return [bestCard];
}
//////////////////////////////////////////////////////

///////////////////////////////////////////

//////////////////////////////////////////////////

///////////////////////////////////////////////////////

///////////////////////////////////////
function outcard(card) {


bkmgd=JSON.parse(JSON.stringify(plmgd))///複製

v4 = findDefensiveListenDiscardV5(plmgd, etmgd.length, allmgd, cantoutcd, lbmgds)

plmgd=JSON.parse(JSON.stringify(bkmgd))///複製

///console.log("v4",v4)

if(v4.length>0){

console.log("捨出聽牌 :",plmgd,"捨張 :",v4[0],v4)

otemit("outcard", JSON.stringify([roomId, v4[0]]));

if(otlistenwho>4){

lbmgd=1
otemit("tin",JSON.stringify([roomId,v4[0]]));

}

  const idx = plmgd.indexOf(v4[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return

}


v1 = findBest(plmgd, allmgd, cantoutcd)

if(v1.length>0){

result = tryDeclareReady(v1[0]);

if (result.ready) {
  console.log("可以喊聽！",plmgd);
  console.log("聽牌：", result.tingpai);
  console.log("每張剩餘張數：", result.leftcount);
  console.log("總共可胡：", result.total);

console.log("捨牌 :",plmgd,"捨張 :",v1[0])

otemit("outcard", JSON.stringify([roomId, v1[0]]));

otemit("tin",JSON.stringify([roomId,v1[0]]));

  const idx = plmgd.indexOf(v1[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return
} 

console.log("捨牌 :",plmgd,"捨張 :",v1[0])

otemit("outcard", JSON.stringify([roomId, v1[0]]));

  const idx = plmgd.indexOf(v1[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return

}

v2=findIsolated(plmgd, allmgd, cantoutcd)

if(v2.length>0){

result = tryDeclareReady(v2[0]);

if (result.ready) {
  console.log("可以喊聽！",plmgd);
  console.log("聽牌：", result.tingpai);
  console.log("每張剩餘張數：", result.leftcount);
  console.log("總共可胡：", result.total);

console.log("捨牌 :",plmgd,"捨張 :",v2[0])

otemit("outcard", JSON.stringify([roomId, v2[0]]));

otemit("tin",JSON.stringify([roomId,v2[0]]));


  const idx = plmgd.indexOf(v2[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return
} 

console.log("捨牌 :",plmgd,"捨張 :",v2[0])

otemit("outcard", JSON.stringify([roomId, v2[0]]));

  const idx = plmgd.indexOf(v2[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return

}


v3=findBestDiscardByImprovingAndKaozhang(plmgd,etmgd.length, allmgd, cantoutcd );

if(v3.length>0){

result = tryDeclareReady(v3[0]);

if (result.ready) {

  console.log("可以喊聽！",plmgd);
  console.log("聽牌：", result.tingpai);
  console.log("每張剩餘張數：", result.leftcount);
  console.log("總共可胡：", result.total);

console.log("捨牌 :",plmgd,"捨張 :",v3[0])

otemit("outcard", JSON.stringify([roomId, v3[0]]));

otemit("tin",JSON.stringify([roomId,v3[0]]));

  const idx = plmgd.indexOf(v3[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return

} 

console.log("捨牌 :",plmgd,"捨張 :",v3[0])

otemit("outcard", JSON.stringify([roomId, v3[0]]));

  const idx = plmgd.indexOf(v3[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);

return

}

console.log("捨牌 :",plmgd,"捨張 :",plmgd[0])

  const idx = plmgd.indexOf(plmgd[0]);
  if (idx !== -1) plmgd.splice(idx, 1);
  plmgd.sort((a, b) => a - b);



otemit("outcard", JSON.stringify([roomId, plmgd[0]]));



}


////////////////////////////////////////////////////
function countTotalImprovingTiles(hand, allmgd) {
  const originalHand = [...hand];
  const backup = [...plmgd]; // 備份 plmgd
  plmgd = [...originalHand];
  sortCad();
  const originalTsp = manum + (crdeye > 0 ? 1 : 0);

  let total = 0;

  for (let i = 1; i <= 34; i++) {
    const testHand = [...originalHand, i];
    testHand.sort((a, b) => a - b);
    plmgd = [...testHand];  // 明確指定要改全域 plmgd
    sortCad();
    const newTsp = manum + (crdeye > 0 ? 1 : 0);

    if (newTsp > originalTsp) {
      const inHand = testHand.filter(x => x === i).length;
      const inAll = allmgd.filter(x => x === i).length;
      const left = Math.max(0, 4 - (inHand + inAll - 1));
      total += left;
    }
  }

  plmgd = [...backup]; // 還原
  return total;
}
////////////////////////////////////////////////////
function countTotalKaozhang(plmgd, allmgd) {
  const totalCount = Array(35).fill(0);
  const handCount = Array(35).fill(0);
  const allCount = Array(35).fill(0);

  // 統計每張牌在手牌與見光牌中的出現數
  for (let card of plmgd) handCount[card]++;
  for (let card of allmgd) allCount[card]++;

  // 計算剩餘張數
  for (let i = 1; i <= 34; i++) {
    totalCount[i] = Math.max(0, 4 - handCount[i] - allCount[i]);
  }

  let totalKaozhang = 0;

  for (let tile of plmgd) {
    if (tile >= 1 && tile <= 27) {
      // 數牌：找 ±2 範圍內不跨組的牌
      const groupStart = Math.floor((tile - 1) / 9) * 9 + 1;
      const groupEnd = groupStart + 8;

      for (let offset = -2; offset <= 2; offset++) {
        const nei = tile + offset;
        if (nei >= groupStart && nei <= groupEnd) {
          totalKaozhang += totalCount[nei];
        }
      }
    } else if (tile >= 28 && tile <= 34) {
      // 字牌：最多只能靠 2 張
      totalKaozhang += Math.min(2, totalCount[tile]);
    }
  }

  return totalKaozhang;
}

///////////////////////////////////////


////////////////////////////////////////////////////////////////////

function simulateEatPonGun(ple, mtd, hand, allmgd, etmgd, roomId) {
  const original = JSON.parse(JSON.stringify(plmgd));
  const originalTsp = (() => { sortCad(); return manum + (crdeye > 0 ? 1 : 0); })();
  const originalEff = countEffectiveTiles(getEffectiveTiles(plmgd), allmgd, plmgd);
  const etlen = etmgd.length;
  let actions = [];

  // 槓
  if (ple !== 3 && plmgd.filter(x => x === mtd).length >= 3) {
    let simulated = plmgd.filter(x => x !== mtd).slice(0);
    sortCad.call({ plmgd: simulated });
    const tsp = manum + (crdeye > 0 ? 1 : 0);
    const eff = countEffectiveTiles(getEffectiveTiles(simulated), allmgd, simulated);
    if ((tsp + etlen + 1 > originalTsp + etlen) ||
        ((tsp + etlen + 1 === originalTsp + etlen) && eff >= originalEff)) {
      actions.push({ type: "gun", tiles: [mtd, mtd, mtd, mtd], newHand: simulated });
    }
  }

  // 碰
  if (plmgd.filter(x => x === mtd).length >= 2) {
    let newHands = plmgd.reduce((acc, val, i, arr) => {
      if (val === mtd) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] === mtd) {
            let tmp = [...arr];
            tmp.splice(j, 1);
            tmp.splice(i, 1);
            acc.push(tmp);
            break;
          }
        }
      }
      return acc;
    }, []);
    newHands.forEach(newHand => {
      sortCad.call({ plmgd: newHand });
      const tsp = manum + (crdeye > 0 ? 1 : 0);
      const eff = countEffectiveTiles(getEffectiveTiles(newHand), allmgd, newHand);
      if ((tsp + etlen + 1 > originalTsp + etlen) ||
          ((tsp + etlen + 1 === originalTsp + etlen) && eff >= originalEff)) {
        actions.push({ type: "pon", tiles: [mtd, mtd, mtd], newHand });
      }
    });
  }
///console.log(ple, mtd, plmgd, etmgd)
  // 吃
  if (ple === 3 && mtd >= 1 && mtd <= 27) {
    const g = Math.floor((mtd - 1) / 9);  // 判斷組別
    const candidates = [
      [mtd - 2, mtd - 1],
      [mtd - 1, mtd + 1],
      [mtd + 1, mtd + 2]
    ];
    for (let pair of candidates) {
      if (pair.some(p => p < 1 || p > 27 || Math.floor((p - 1) / 9) !== g)) continue;
      if (pair.every(p => plmgd.includes(p))) {
        let newHand = plmgd.slice();
        newHand.splice(newHand.indexOf(pair[0]), 1);
        newHand.splice(newHand.indexOf(pair[1]), 1);
        sortCad.call({ plmgd: newHand });
        const tsp = manum + (crdeye > 0 ? 1 : 0);
        const eff = countEffectiveTiles(getEffectiveTiles(newHand), allmgd, newHand);
        if ((tsp + etlen + 1 > originalTsp + etlen&&crdeye>0) ||
            ((tsp + etlen + 1 === originalTsp + etlen) && eff >= originalEff)) {
          let sortedEat = [pair[0], mtd, pair[1]];
          actions.push({ type: "eat", tiles: sortedEat, newHand });
console.log({ type: "eat", tiles: sortedEat, newHand })
        }
      }
    }
  }

  // 測試每個模擬動作是否能成功進入出牌邏輯
console.log(actions)
let resultV4 = null;
let resultV1 = null;
let resultV2 = null;
let resultV22 = null;
let resultV3 = null;

for (let act of actions) {
  const epgtw = act.type;
  const cardGroup = act.tiles;
  const testHand = JSON.parse(JSON.stringify(act.newHand));
  cantoutcd = getCantOutCards(cardGroup, epgtw);

  let v4 = findDefensiveListenDiscardV5(testHand, etlen + 1, allmgd, cantoutcd, lbmgds);
  let v1 = findBest(testHand, allmgd, cantoutcd);
  let v2 = findIsolated(testHand, allmgd, cantoutcd);
  let v22 = findIsolated(testHand, allmgd, []);

let isDifferent =
  v2?.length !== v22?.length ||
  v2?.some((val, idx) => val !== v22?.[idx]);

  let v3 = findBestDiscardByImprovingAndKaozhang(testHand,etlen + 1, allmgd, cantoutcd );
  if (typeof v3 === 'number') v3 = [v3]; // 統一格式

   if (!resultV4 && v4?.[0] != null) {
    resultV4 = { source: "V4", data: [cardGroup, epgtw] ,card:v4[0]};
  }

  if (!resultV1 && v1?.[0] != null) {
    resultV1 = { source: "V1", data: [cardGroup, epgtw],card:v1[0] };
  }

  if (!resultV2 && v2?.[0] != null) {
    resultV2 = { source: "V2", data: [cardGroup, epgtw],card:v2[0] };
  }

if (isDifferent) {

resultV2 = { source: "V22", data: [cardGroup, epgtw],card:v22[0] };

}
  if (!resultV3 && v3?.[0] != null) {
    resultV3 = { source: "V3", data: [cardGroup, epgtw],card:v3[0] };
  }
}

// 優先選擇順序
let result = resultV4 || resultV1 || resultV2|| resultV22 || resultV3 || null;

plmgd= JSON.parse(JSON.stringify(original));

console.log(result)


if (result&&result.source!="V22") {
  console.log("吃碰槓 :", result.data, "吃的牌 :", result.data[0], "策略：", result.source,"捨出 : ",result.card);

      otemit(result.data[1], JSON.stringify([roomId, result.data[0]]));

  return;
}else{

ephchick=0

otemit("noepgh",JSON.stringify([roomId,mtd]));

 console.log("不吃碰",plmgd)

}
}
////////////////////////////////////////////////////////////////////
function getEffectiveTiles(hand) {
  const eff = new Set();
  for (let i = 0; i < hand.length; i++) {
    for (let j = i + 1; j < hand.length; j++) {
      let a = hand[i], b = hand[j];
      if (a === b && hand.filter(x => x === a).length >= 2) {
        eff.add(a); // 對子可刻子
      }
      if (Math.abs(a - b) <= 2 && Math.floor((a - 1) / 9) === Math.floor((b - 1) / 9)) {
        let min = Math.min(a, b), max = Math.max(a, b);
        if (max - min === 1) {
          eff.add(min - 1);
          eff.add(max + 1);
        } else if (max - min === 2) {
          eff.add(min + 1);
        }
      }
    }
  }
  return Array.from(eff).filter(x => x >= 1 && x <= 34);
}

function countEffectiveTiles(tiles, allmgd, hand) {
  return tiles.reduce((sum, tile) => {
    const used = allmgd.filter(x => x === tile).length + hand.filter(x => x === tile).length;
    return sum + Math.max(0, 4 - used);
  }, 0);
}

////////////////////////////////////////////////////////////////////

// ✅ 如果是被 Worker 執行
if (!isMainThread) {
console.log("maxatk上線");
parentPort.on("message", (msg) => {
  handleMessage(msg);
});
}

// ✅ 如果是直接用 node ai.js 測試
if (isMainThread) {
  console.log("🧪 單機測試 AI...");

  const mockData = JSON.stringify(["AI1", ["AI1", "B", "C", "D"]]);
  handleMessage({ eventName: "myname", data: mockData });

  // 你可以在這裡測試更多事件
  // handleMessage({ eventName: "something", data: ... });
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



plmgd.forEach(function(x) { cpf[x] = (cpf[x] || 0)+1; })///計算出現過的總張數

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

cpf[s]=(cpf[s]<5)?cpf[s]:4

lanhow.push(cpf[s])

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

}

///////////////////////////////////////


/////////////////////////////////////////////////////////
