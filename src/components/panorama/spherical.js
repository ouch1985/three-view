import {
    WebGLRenderer, PerspectiveCamera, Scene, Mesh, SphereGeometry, MeshBasicMaterial, Color, Vector3, TextureLoader
} from '@/plugins/three.minimum.js'
import FirstPersonControl from '../../controls/first.person.js'

function SphericalPanorama (container) {
    let camera, scene, renderer, canvas, control;
    let geometry, material, mesh;
    let animateId = null;
    let size = {width: container.clientWidth, height: container.clientHeight};

    function init(){
        // 相机
        camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 20000);
        camera.target = new Vector3( 0, 0, 0 );

        // 渲染器
        renderer = new WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(size.width, size.height);
        canvas = renderer.domElement;
        container.appendChild(canvas);

        // 立方体、材质、网格对象、场景
        geometry = new SphereGeometry(1000, 32, 32);
        geometry.scale( - 1, 1, 1 );
        geometry.rotateY(-Math.PI / 2);

        material = new MeshBasicMaterial();
        mesh = new Mesh(geometry, material);

        scene = new Scene();
        scene.background = new Color(0xF7F7F7);
        scene.add(mesh);

        // 控制器
        control = new FirstPersonControl(camera, container);
    }

    function reload(src){
        new TextureLoader().load(src, (texture)=>{
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
        }, ()=>{

        }, (err)=>{
            console.log('加载失败', JSON.stringify(err));
        }, canvas);
    }

    function animate() {
        animateId = requestAnimationFrame(animate);
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.02;
        control.update();
        renderer.render(scene, camera);
    }

    function dispose(){
        control.dispose();
        if(animateId)cancelAnimationFrame(animateId);
        animateId = null;

        container.removeChild(canvas);
    }

    this.dispose = dispose;
    this.reload = reload;

    init();
    animate();
}

export default SphericalPanorama;
