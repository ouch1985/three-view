const isSupportTouch = "ontouchend" in document ? true : false;

export default {
    mousedown: isSupportTouch ? 'touchstart' : 'mousedown',
    mousemove: isSupportTouch ? 'touchmove' : 'mousemove',
    mouseup: isSupportTouch ? 'touchend' : 'mouseup'
}
