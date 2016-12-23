/**
 * Created by QIXIN on 2016/12/23.
 */

/**
 * 管道类构造函数
 * @constructor
 */
function Block() {
    
    // 管道移动的速度
    this.moveSpeed = 3;
    
    // 上下管道容器
    this.upBlockWrapper = null;
    this.downBlockWrapper = null;
    
    // 下管道的高度取[0,150]之间的一个随机数
    this.downBlockHeight = baseObj.getRandom(0,150);
    // 中间的间隔高度,取[120,150].控制难度
    this.gapHeight = baseObj.getRandom(120,150);
    // 上管道的高度等于总的高度-中间间隔-下管道的高.
    this.upBlockHeight = 432 - this.gapHeight - this.downBlockHeight - 120;
    
}

/**
 * 生成上下管道容器,每个容器包含两个div,一个是管道底座,一个是管道口
 */
Block.prototype.createBlock = function () {
    
    // 上下管道容器
    this.upBlockWrapper = baseObj.createDiv('up-block-wrapper');
    this.downBlockWrapper = baseObj.createDiv('down-block-wrapper');
    
    // 上下管道的底座和管道口
    this.upDivMod = baseObj.createDiv('up-div-mod');
    this.upDivPipe = baseObj.createDiv('up-div-pipe');
    this.downDivMod = baseObj.createDiv('down-div-mod');
    this.downDivPipe = baseObj.createDiv('down-div-pipe');
    // 设置各个管道的高,其中上下管道口的高是固定的.
    this.upDivMod.style.height = this.upBlockHeight + 'px';
    this.upDivPipe.style.height = '60px';
    this.downDivMod.style.height = this.downBlockHeight + 'px';
    this.downDivPipe.style.height = '60px';
    
    this.downBlockWrapper.style.top = 432 - this.downBlockHeight - 68  + 'px';
    
    // 添加到容器中
    this.upBlockWrapper.appendChild(this.upDivMod);
    this.upBlockWrapper.appendChild(this.upDivPipe);
    this.downBlockWrapper.appendChild(this.downDivPipe);
    this.downBlockWrapper.appendChild(this.downDivMod);
    
    // 添加到游戏界面
    gameWrapper.appendChild(this.upBlockWrapper);
    gameWrapper.appendChild(this.downBlockWrapper);
};

/**
 * 管道移动
 */
Block.prototype.pipeMove = function () {
    this.upBlockWrapper.style.left = this.upBlockWrapper.offsetLeft - this.moveSpeed + 'px';
    this.downBlockWrapper.style.left = this.downBlockWrapper.offsetLeft - this.moveSpeed + 'px';
};