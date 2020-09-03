import {Quaternion, Euler, Vector2, Spherical, MathUtils} from '../plugins/three.minimum.js'
import constants from '../commons/constants'
import utils from '../commons/utils'

// 第一人称控制器
const FirstPersonControl = function(camera, container){

    // 内部变量
    let spherical = new Spherical(1000, 0, 0);
    let action = ''; // 鼠标动作类型
    let euler = new Euler(); // 相机的欧拉角
    let quaternion = new Quaternion(); // 相机的旋转属性
    let needsUpdate = true; // 是否需要更新
    let delta = null;

    let dding = false;

    spherical = utils.observe(spherical, function(){
        needsUpdate = true;
    });


    // touchstart或者mousedown
    function mousedown(event){
        dding = true;
        delta = null;
        let last = null;

        // touchmove或者mousemove
        function mousemove(event){
            let points = utils.event2point(event, container);


            switch (action) {
                case 'rotate':
                    // 屏幕从左到右，从上到下，就是180度
                    delta = points[0].clone().sub(last[0]);
                    delta.x = delta.x/container.clientWidth * Math.PI;
                    delta.y = delta.y/container.clientHeight * Math.PI;
                    rotate(delta);
                    break;
                default:

            }

            last = points;
        }

        // touchend或者mouseup
        function mouseup(event){
            dding = false;
            container.removeEventListener(constants.mousemove, mousemove);
            container.removeEventListener(constants.mouseup, mouseup);

            // switch (action) {
            //     case 'rotate':
            //
            //         break;
            //     default:
            //
            // }
        }

        // mousedown的时候再去监听 mousemove和mouseup
        container.addEventListener(constants.mousemove, mousemove);
        container.addEventListener(constants.mouseup, mouseup);

        // 获取时间点击全局坐标
        let points = last = utils.event2point(event, container);

        // 动作类型
        switch (points.length) {
            // 一个手指，那就是旋转
            case 1:
                action = 'rotate';
                break;
            // 两个手指，那就是缩放
            case 2:
                action = 'scale';
                break;
            default:
        }
    }

    // 将垂直的角度，限制到两个极角内
    function adjustPhi(phi) {
        return MathUtils.clamp(phi, -Math.PI / 1.95, Math.PI / 1.95);
    }

    // 旋转
    function rotate(delta){
        spherical.theta = spherical.theta + delta.x;
        spherical.phi = adjustPhi(spherical.phi + delta.y);
        euler.set(spherical.phi, spherical.theta, 0, 'YXZ');
	    quaternion.setFromEuler(euler);
    }

    // 初始化
    function init(){
        container.addEventListener(constants.mousedown, mousedown);

    }

    // 更新相机
    function update(){
        // 惯性滑动，这里还要优化
        if(!dding && delta){
            delta.multiplyScalar(0.98);
            if(Math.abs(delta.x) < 0.01 && Math.abs(delta.y) < 0.01){
                delta = null;
            }else{
                rotate(delta.clone().multiplyScalar(0.2));
            }
        }

        if(needsUpdate){
            camera.quaternion.copy(quaternion);
            needsUpdate = false;
        }
    }

    // 销毁
    function dispose(){
        container.removeEventListener(constants.mousedown, mousedown);
    }

    this.dispose = dispose;
    this.update = update;

    init();
};

export default FirstPersonControl;
