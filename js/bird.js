/**
 * Created by QIXIN on 2016/12/22.
 */

/**
 *  小鸟对象
 */

var birdObj = {
    flyTimer: null,  // 小鸟飞翔定时器
    wingTimer: null, // 小鸟翅膀摆动定时器
    fallSpeed: 0,    // 小鸟下落速度
    
    div: document.createElement('div'),
    /**
     * 点击开始按钮后,显示小鸟
     * @param gameWrapper 游戏容器
     */
    showBirdObj: function (gameWrapper) {
        this.div.className = 'fly-bird';
        gameWrapper.appendChild(this.div); // 将小鸟插入游戏界面
    },
    /**
     *  不点击画面时,小鸟下落
     */
    flyBirdObj: function () {
        // 启动小鸟下落定时器
        birdObj.flyTimer = setInterval(function() {
            birdObj.div.style.top = birdObj.div.offsetTop + (birdObj.fallSpeed++) + 'px';
    
            // 小鸟不应该飞离上边界
            if(birdObj.div.offsetTop < 0) {
                birdObj.div.style.top = '2px';
                birdObj.fallSpeed = 2;
            }
            
            // 小鸟掉到地面, 清除下落定时器,清除翅膀摆动定时器
            if(birdObj.div.offsetTop >= 395) {
                birdObj.div.style.top = '395px';
                birdObj.fallSpeed = 0;
                clearInterval(birdObj.flyTimer);
                clearInterval(birdObj.wingTimer);
                clearInterval(blockTimer); // 管道停止移动
                clearInterval(landTimer); // 草地停止移动
            }
            
            // 小鸟的最大下落速度控制在15以内
            if(birdObj.fallSpeed >= 15) {
                birdObj.fallSpeed = 15;
            }
        }, 50);
        
    },
    /**
     *  小鸟翅膀煽动的函数,两个状态--上升和下降
     */
    wingWave: function () {
        var i = 0, j = 0;
        // 小鸟向上飞时的图片
        var up = ['url(./images/up_bird0.png)', 'url(./images/up_bird1.png)'];
        // 小鸟向下飞时的图片
        var down = ['url(./images/down_bird0.png)', 'url(./images/down_bird1.png)'];
        
        birdObj.wingTimer = setInterval(function () {
            // 下落
            if(birdObj.fallSpeed > 0) {
                birdObj.div.style.backgroundImage = down[i++];
                if (i == 2) i = 0;
            }
            // 上升
            if(birdObj.fallSpeed < 0) {
                birdObj.div.style.backgroundImage = up[j++];
                if(j == 2) j = 0;
            }
        }, 120);
    }
};









