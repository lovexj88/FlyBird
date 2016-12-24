/**
 * Created by QIXIN on 2016/12/23.
 */

var baseObj = {
    /**
     *  随机数生成器
     * @param low  低值
     * @param high  高值
     * @returns {number} 介于低值和高值之间的一个随机值
     */
    getRandom: function (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    },
    /**
     * 获取DOM元素
     * @param selector
     * @returns {Element|NodeList}
     */
    queryElement: function (selector) {
        return document.querySelector(selector) || document.getElementById(selector);
    },
    /**
     * 生成div 元素
     * @param blockClassName  需要添加的类名
     * @returns {Element}   返回新建的div元素对象
     */
    createDiv: function (blockClassName) {
        var div = document.createElement('div');
        div.className = blockClassName + '';
        return div;
    },
    /**
     * 移除父元素中的子元素
     * @param parent 要操作的父元素
     * @param child  要移除的子元素
     */
    removeDiv: function (parent, child) {
        parent.removeChild(child);
    },
    /**
     * 两个矩形的碰撞检测
     * @param rect1
     * @param rect2
     * @returns {boolean} 表示是否发生了碰撞,默认是false
     */
    rectangleCrashExamine: function (rect1, rect2) {
        var isCrashed = false;
        
        var rect1Left = rect1.offsetLeft,
            rect1Top = rect1.offsetTop,
            rect1Width = rect1.offsetWidth,
            rect1Height = rect1.offsetHeight;
        
        var rect2Left = rect2.offsetLeft,
            rect2Top = rect2.offsetTop,
            rect2Width = rect2.offsetWidth,
            rect2Height = rect2.offsetHeight;
        
        // 碰撞的4种可能情况
        var crash = {
            // rect1碰到了rect2的左边界
            crashLeft: (rect1Left + rect1Width >= rect2Left && rect1Left + rect1Width <= rect2Left + rect2Width && rect1Top >= rect2Top && rect1Top <= rect2Top + rect2Height),
            // rect1碰到rect2的上边界
            crashTop: (rect1Left >= rect2Left && rect1Left <= rect2Left + rect2Width && rect1Top + rect1Height >= rect2Top && rect1Top + rect1Height <= rect2Top + rect2Height ),
            // rect1碰到rect2的右边界
            crashRight: (rect1Left >= rect2Left && rect1Left <= rect2Left + rect2Width && rect1Top >= rect2Top && rect1Top <= rect2Top + rect2Height),
            // rect1碰到rect2的下边界
            crashBottom: (rect1Left >= rect2Left && rect1Left <= rect2Left + rect2Width && rect1Top >= rect2Top && rect1Top <= rect2Top + rect2Height)
        };
        if (crash.crashTop || crash.crashRight || crash.crashBottom || crash.crashLeft) {
            isCrashed = true;
        }
        return isCrashed;
    }
};









