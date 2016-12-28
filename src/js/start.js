/**
 * Created by QIXIN on 2016/12/22.
 */

// 所有用到的图片得到公共URL
var imageBaseUrl = './src/images/';
// 分数图片的公共名字
var numberScore = 'number_score_0';
// 音效URL
var musicUrl = './src/audio/';

/**
 * 让开始标题摆动,同时切换小鸟的图片,使其动起来
 */

// 游戏容器
var gameWrapper = null;

// 管道容器
var pipeWrapper = null;

// 获取游戏标题,和小鸟图片
var gameTitle = null;
    bird      = null;
    flyBird   = null; // 游戏中的小鸟

var Y = 0;  // 小鸟每次上移的偏移量

// 小鸟图片的路径数组,通过切换图片,来显示出小鸟翅膀摆动的样子
var imgUrlArr = ['./src/images/bird1.png', './src/images/bird0.png'];
var index     = 0; // 数组索引

// 纪录游戏中的分数
var score   = 0, // 游戏最后的总分数(经过的管道数)
    centile = 0, // 百位
    decade  = 0, // 十位
    unit    = 0; // 个位

// 游戏中的计分器元素
var scoreWrapper   = baseObj.queryElement('.score'),
    playingCentile = baseObj.queryElement('.centile'),
    playingDecade  = baseObj.queryElement('.decade'),
    playingUnit    = baseObj.queryElement('.unit');


var gameOver = null;      // 游戏结束面板
var isGameOver = false;   // ?判断游戏是否结束

// 背景音乐,游戏音效
var BGM = baseObj.queryElement('#bg-music');
var infoMusic = baseObj.queryElement('#info-music');
var flyMusic = baseObj.queryElement('#fly-music');
var crashMusic = baseObj.queryElement('#crash-music');

// 标题摆动的定时器
var headerWaveTimer = null;

// 草地滚动的定时器
var landTimer = null;

/**
 *  start按钮
 */
var startBtn = null;

var birdUpOffset = 0;  // 小鸟每次上移的偏移量


/**
 * 生成管道,并移动
 */
var blocksArr = []; // 保存生成的block
// 一个随机的位置,大概当blockArr中的最后一个管道移动到居中的位置就生成新的block
var blockDistance = baseObj.getRandom(130, 250);

// 管道启动定时器
var blockTimer = null;

// 重新开始游戏的按钮
var restartBtn   = baseObj.queryElement('.game-restart');//重新开始的按钮

// 绑定重新开始的事件
restartBtn.onclick = events.handleGameRestart;

window.onload = events.init();