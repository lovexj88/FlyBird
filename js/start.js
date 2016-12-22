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
var headerWaveTimer = setInterval(headerWave, 200);

function headerWave() {
    
    //  标题在原位置的]-Y,Y]范围内来回摆动
    Y *= -1;
    gameTitle.style.top = gameTitle.offsetTop + Y + 'px';
    
    // 切换小鸟图片
    bird.src = imgUrlArr[index++];
    if(index == 2) {
        index = 0;
    }
}


/**
 *  草地移动
 */
// 获取两个草地
var grassLandOne = document.querySelector('.grass-land-one');
var grassLandTwo = document.querySelector('.grass-land-two');

var landTimer = setInterval(landRun, 30);
function landRun() {
    
    // 边界值检查
    if(grassLandOne.offsetLeft <= -343) {
        grassLandOne.style.left = '343px';
    }
    if(grassLandTwo.offsetLeft <= -343) {
        grassLandTwo.style.left = '343px';
    }
    // 更改left值,草地滚动
    grassLandOne.style.left = grassLandOne.offsetLeft - 3 + 'px';
    grassLandTwo.style.left = grassLandTwo.offsetLeft - 3 + 'px';
}

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
    
    // 点击一次游戏画面,让小鸟上移一个位移
    gameWrapper.onclick = function (e) {
        console.log('click up....');
        birdObj.fallSpeed = birdUpOffset;
    };
   
}, false);












