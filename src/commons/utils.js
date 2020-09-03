import {Vector2} from '@/plugins/three.minimum.js'

function touch2point(touchs, box){
    var points = [];
    for(let i=0;i<touchs.length;i++){
        let touch = touchs[i];
        let x = touch.x || touch.clientX;
        let y = touch.y || touch.clientY;
        x -= box.left;
        y -= box.top;

        points.push(new Vector2(x, y));
    }


    return points;
}

export default {
    // 事件转成相对于 container 的坐标
    event2point(event, container){
        let box = container.getBoundingClientRect();
        if(event.touches && event.touches.length > 0){
            return touch2point(event.touches, box);
        }else if(event.changedTouches && event.changedTouches.length > 0){
            return touch2point(event.changedTouches, box);
        }else if(event.clientX !== undefined){
            return [new Vector2(event.clientX - box.left, event.clientY - box.top)];
        }

        return [];
    },

    // 简单的观察属性变化，然后回调
    observe(target, callback){
        let timeoutId = null;
        if(typeof(Proxy) === 'function'){
            return new Proxy(target, {
                set(obj, prop, value){
                    if(value !== obj[prop] && !timeoutId){
                        timeoutId = setTimeout(function(){
                            timeoutId = null;
                            callback && callback();
                        });
                    }

                    return Reflect.set(...arguments);
                }
            });
        }else if(Object.observe){ // IE和其他不支持Proxy的
            Object.observe(target, function(){
                if(!timeoutId){
                    timeoutId = setTimeout(function(){
                        timeoutId = null;
                        callback && callback();
                    });
                }
            });
        }else{
            console.log('惨了,observe和Proxy都不支持');
        }

        return target;
    }
}
