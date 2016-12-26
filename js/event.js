/**
 * Created by QIXIN on 2016/12/25.
 */
/**
 * 各种事件处理程序都保存在events对象中
 * @type {{}}
 */
var events = {
    init: function () {
        // 游戏容器
        gameWrapper = gameWrapper || baseObj.queryElement('.game-wrapper');
        // 管道容器
        pipeWrapper = pipeWrapper || baseObj.queryElement('.pipe-wrapper');
        // 获取游戏标题,和小鸟图片
        gameTitle = gameTitle || baseObj.queryElement('.game-title');
        bird      = bird || baseObj.queryElement('.bird');
        
        // 开始按钮
        startBtn = baseObj.queryElement('.start-btn');
        
        // 游戏结束的div容器
        gameOver = baseObj.queryElement('.game-over');
        
        // 小鸟每次上移的偏移量
        birdUpOffset = -15;
        
        Y = 5; // 整个标题摆动的幅度
        // 显示标题,小鸟
        gameTitle.style.display = 'block';
        bird.style.display      = 'block';
        
        // 显示开始按钮
        startBtn.style.display = 'block';
        // 初始化分数
        score   = 0;
        centile = 0; // 百位
        decade  = 0; // 十位
        unit    = 0;  // 个位
        
        // 启动标题摆动的定时器
        headerWaveTimer = setInterval(events.handleTitleWave, 200);
    
        // 启动草地滚动的定时器
        landTimer = setInterval(events.handleLandMove, 30)
        
        // 隐藏计分器
        gameOver.style.display = 'none';
    
        // 点击开始游戏按钮,进入游戏界面
        startBtn.addEventListener('click', events.handleStartBtnClick, false);
        
    },
    /**
     *  标题摆动的处理函数
     */
    handleTitleWave: function () {
        //  标题在原位置的]-Y,Y]范围内来回摆动
        Y *= -1;
        gameTitle.style.top = gameTitle.offsetTop + Y + 'px';
        
        // 切换小鸟图片
        bird.src = imgUrlArr[index++];
        if (index == 2) {
            index = 0;
        }
    },
    /**
     *  草地滚动的处理函数
     */
    handleLandMove: function () {
        // 获取两个草地
        var grassLandOne = baseObj.queryElement('.grass-land-one');
        var grassLandTwo = baseObj.queryElement('.grass-land-two');
        
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
        
    },
    
    /**
     *  开始按钮的点击事件处理程序
     */
    handleStartBtnClick: function () {
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
        
        // 获取飞行中的小鸟
        flyBird = baseObj.queryElement('.fly-bird');
        flyBird.style.top = '200px';
        
        blocksArr = [];
        var newBlock = new Block();    // 显示管道
        newBlock.createBlock();
        blocksArr.push(newBlock);
    
        // 显示计分器,初始状态下显示个位
        scoreWrapper.style.display = 'block';
		playingCentile.style.display = 'none';
        playingDecade.style.display = 'none';
        playingUnit.style.display = 'block';
        playingUnit.style.background = 'url(./images/0.jpg)';

                
    
        // 启动管道移动定时器
        blockTimer = setInterval(events.handleBlockMove, 20);
        
        
        // 点击一次游戏画面,让小鸟上移一个位移
        gameWrapper.onclick = function (e) {
            birdObj.fallSpeed = birdUpOffset;
        };
        // 按下空格键,小鸟同样上移
        window.onkeydown = function (e) {
            if (e.keyCode == 32) {
                birdObj.fallSpeed = birdUpOffset;
            }
        }
    },
    /**
     *  管道启动的处理函数
     */
    handleBlockMove: function () {
        if (blocksArr.length) {
            
            blocksArr.forEach(function (block) {
                
                block.pipeMove(); // 让每一个管道开始移动
                
                // 判断是否碰撞
                var crashTop = baseObj.rectangleCrashExamine(birdObj.div, block.upBlockWrapper);
                var crashBottom = baseObj.rectangleCrashExamine(birdObj.div, block.downBlockWrapper);
                
                // 如果发生碰撞,游戏结束
                if (crashBottom || crashTop) {
                    
                    isGameOver = true;                      // 表明游戏结束
                    events.handleGameOver();
                }
            });
            
            // 当blocksArr中的数组中最后一个管道移动到指定位置时,添加一个管道.
            if (blocksArr[blocksArr.length - 1].upBlockWrapper.offsetLeft <= (450 - blockDistance)) {
                blockDistance = baseObj.getRandom(130, 250);
                var newBlock = new Block();
                newBlock.createBlock();
                blocksArr.push(newBlock);
            }
            
            // 每当第一个管道的offsetLeft小于-10px时,说明小鸟飞过了一个管道,此时计分器加一
            if (blocksArr[0].upBlockWrapper.offsetLeft == -12) {
                score++;
                if (score < 10) {
                    unit = score;
                    
                    playingUnit.style.display = 'block';
                    playingUnit.style.background = 'url(./images/' + unit + '.jpg)';
                }
                else if (score >= 10 && score < 100) {
                    decade = parseInt(score / 10);
                    unit = parseInt(score % 10);
                    
                    scoreWrapper.style.marginLeft = '-28px';
                    playingDecade.style.display = 'block';
                    
                    playingDecade.style.background = 'url(./images/' + decade + '.jpg)';
                    playingUnit.style.background = 'url(./images/' + unit + '.jpg)';
                }
                else if (score >= 100 && score < 1000) {
                    centile = parseInt(score / 100);
                    decade = parseInt(score / 10) % 10;
                    unit = parseInt(score % 10);
                    
                    scoreWrapper.style.marginLeft = '-42px';
                    playingCentile.style.display = 'block';
                    playingCentile.style.background = 'url(./images/' + centile + '.jpg)';
                    playingDecade.style.background = 'url(./images/' + decade + '.jpg)';
                    playingUnit.style.background = 'url(./images/' + unit + '.jpg)';
                }
            }
            // 当blocksArr中第一个管道移到界面以外就移除它
            if (blocksArr[0].upBlockWrapper.offsetLeft < -50) {
                baseObj.removeDiv(pipeWrapper, blocksArr[0].upBlockWrapper);
                baseObj.removeDiv(pipeWrapper, blocksArr[0].downBlockWrapper);
                blocksArr.shift();
            }
        }
    },
    /**
     *  游戏结束的处理函数
     */
    handleGameOver: function () {
        
        clearInterval(blockTimer);              // 管道停止移动
        clearInterval(landTimer);               // 草地停止移动
        
        scoreWrapper.style.display = 'none';    // 隐藏计分器
        
        gameWrapper.onclick = null;             // 取消游戏界面的点击事件
        window.onkeydown = null;                // 取消按键事件
        
        gameOver.style.display = 'block';       // 显示结束面板


// 获取显示游戏结束时的分数的元素
        var currentScoreCentile = baseObj.queryElement('.cur-centile', '.current-score'),
            currentScoreDecade = baseObj.queryElement('.cur-decade', '.current-score'),
            currentScoreUnit = baseObj.queryElement('.cur-unit', '.current-score'),
            bestScoreCentile = baseObj.queryElement('.bs-centile', '.best-score'),
            bestScoreDecade = baseObj.queryElement('.bs-decade', '.best-score'),
            bestScoreUnit = baseObj.queryElement('.bs-unit', '.best-score');
        var centileImageUrl = 'url(' + imageBaseUrl + numberScore + centile + '.png)';
        var decadeImageUrl = 'url(' + imageBaseUrl + numberScore + decade + '.png)';
        var unitImageUrl = 'url(' + imageBaseUrl + numberScore + unit + '.png)';
        
        /*** 在分数面板显示分数  ***/
        // 当前分数
        currentScoreCentile.style.backgroundImage = centileImageUrl;
        currentScoreDecade.style.backgroundImage = decadeImageUrl;
        currentScoreUnit.style.backgroundImage = unitImageUrl;
        
        // 如果在本地没有保存过当前最高分数,则创建一个记录
        if (!sessionStorage.getItem('bast-score')) {
            sessionStorage.setItem('bast-score', score);
        }
        else {
            // 否则获取当前的最高分
            var bestScoreInlocalStorage = sessionStorage.getItem('bast-score');
            // 判断当前游戏分数是否大于最高分
            if (Number(bestScoreInlocalStorage) > score) {
                var bs = Number(bestScoreInlocalStorage);
                bscentile = parseInt(bs / 100);
                bsdecade = parseInt(bs / 10) % 10;
                bsunit = parseInt(bs % 10);
                
                bestScoreCentile.style.backgroundImage = 'url(' + imageBaseUrl + numberScore + bscentile + '.png)';
                bestScoreDecade.style.backgroundImage = 'url(' + imageBaseUrl + numberScore + bsdecade + '.png)';
                bestScoreUnit.style.backgroundImage = 'url(' + imageBaseUrl + numberScore + bsunit + '.png)';
            }
            else {
                // 当前分数大于历史最高分,则更新记录
                sessionStorage.setItem('bast-score', score);
                
                bestScoreCentile.style.backgroundImage = centileImageUrl;
                bestScoreDecade.style.backgroundImage = decadeImageUrl;
                bestScoreUnit.style.backgroundImage = unitImageUrl;
            }
        }
        
    },
    
    handleGameRestart: function () {
        
        
        // 清空管道
        while (pipeWrapper.hasChildNodes()){
            pipeWrapper.removeChild(pipeWrapper.firstChild);
        }
        
        // 移除飞行中的小鸟
        gameWrapper.removeChild(flyBird);
		events.init();
	}
};
