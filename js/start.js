/**
 * Created by QIXIN on 2016/12/22.
 */


/**
 * 让开始标题摆动,同时切换小鸟的图片,使其动起来
 */

// 游戏容器
var gameWrapper = document.querySelector('.game-wrapper');

// 获取游戏标题,和小鸟图片
var gameTitle = document.querySelector('.game-title'),
    bird = document.querySelector('.bird');

var Y = 5; // 整个标题摆动的幅度

// 小鸟图片的路径数组,通过切换图片,来显示出小鸟翅膀摆动的样子
var imgUrlArr = ['./images/bird1.png', './images/bird0.png'];
var index = 0; // 数组索引

// 标题摆动的定时器
var headerWaveTimer = setInterval(function () {
    //  标题在原位置的]-Y,Y]范围内来回摆动
    Y *= -1;
    gameTitle.style.top = gameTitle.offsetTop + Y + 'px';
    
    // 切换小鸟图片
    bird.src = imgUrlArr[index++];
    if (index == 2) {
        index = 0;
    }
}, 200);


/**
 *  草地移动
 */
// 获取两个草地
var grassLandOne = document.querySelector('.grass-land-one');
var grassLandTwo = document.querySelector('.grass-land-two');

// 草地滚动的定时器
var landTimer = setInterval(function () {
    // 边界值检查
    if (grassLandOne.offsetLeft <= -343) {
        grassLandOne.style.left = '343px';
    }
    if (grassLandTwo.offsetLeft <= -343) {
        grassLandTwo.style.left = '343px';
    }
    // 更改left值,草地滚动
    grassLandOne.style.left = grassLandOne.offsetLeft - 3 + 'px';
    grassLandTwo.style.left = grassLandTwo.offsetLeft - 3 + 'px';
    
}, 30);


/**
 *  start按钮
 */
var startBtn = document.querySelector('.start-btn');
var birdUpOffset = -8;  // 小鸟每次上移的偏移量

// 添加点击事件
startBtn.addEventListener('click', function () {
    
    // 关掉标题摆动的定时器
    clearInterval(headerWaveTimer);
    
    // 隐藏标题
    gameTitle.style.display = 'none';
    // 隐藏开始按钮
    startBtn.style.display = 'none';
    
    // 点击开始按钮,进入游戏界面
    birdObj.showBirdObj(gameWrapper);    // 小鸟在界面显示
    birdObj.flyBirdObj();                // 小鸟的上下飞行
    birdObj.wingWave();               // 启动翅膀摆动
    
    var newBlock = new Block();    // 显示管道
    newBlock.createBlock();
    blocksArr.push(newBlock);
    
    // 点击一次游戏画面,让小鸟上移一个位移
    gameWrapper.onclick = function (e) {
        birdObj.fallSpeed = birdUpOffset;
    };
    // 按下空格键,小鸟同样上移
    window.onkeydown = function (e) {
        if(e.keyCode == 32) {
            birdObj.fallSpeed = birdUpOffset;
        }
    }
}, false);


/**
 * 生成管道,并移动
 */
var blocksArr = []; // 保存生成的block
// 一个随机的位置,大概当blockArr中的最后一个管道移动到居中的位置就生成新的block
var blockDistance = baseObj.getRandom(130,250);

// 管道启动定时器
var blockTimer = setInterval(function () {
    
    if(blocksArr.length) {
      
        blocksArr.forEach(function (block) {
            
            block.pipeMove(); // 让每一个管道开始移动
            
            // 判断是否碰撞
            var crashTop = baseObj.rectangleCrashExamine(birdObj.div, block.upBlockWrapper);
            var crashBottom = baseObj.rectangleCrashExamine(birdObj.div, block.downBlockWrapper);
            // 如果发生碰撞
            if(crashBottom || crashTop) {
                clearInterval(blockTimer); // 管道停止移动
                clearInterval(landTimer); // 草地停止移动
    
                gameWrapper.onclick = null; // 取消游戏界面的点击事件
            }
        });
        
        // 当blocksArr中的数组中最后一个管道移动到指定位置时,添加一个管道.
        if(blocksArr[blocksArr.length - 1].upBlockWrapper.offsetLeft <= (450 - blockDistance)) {
            blockDistance = baseObj.getRandom(130,250);
            var newBlock = new Block();
            newBlock.createBlock();
            blocksArr.push(newBlock);
        }
            
        // 当blocksArr中第一个管道移到界面以外就移除它
        if(blocksArr[0].upBlockWrapper.offsetLeft < -50) {
            baseObj.removeDiv(gameWrapper, blocksArr[0].upBlockWrapper);
            baseObj.removeDiv(gameWrapper, blocksArr[0].downBlockWrapper);
            blocksArr.shift();
        }
    }
}, 30);













