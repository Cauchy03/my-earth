
//指定拷贝到根目录下的Cesium
window.CESIUM_BASE_URL = './Cesium/';

import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

export const initCesium = () => {
    //填写官网注册的ion，否则也会找不到东西
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMjVjZGM1Zi1kMjI5LTQ4ZDYtYmEyZi02ZWZjZWVjMjU3NjMiLCJpZCI6MTkwMDI1LCJpYXQiOjE3MDU0MDExODF9.E695v_GBSTkSjmCfaCFSwAlx5LjpPNoDcDuLrwvrP7E';
    // 初始化
    const viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false, // 取消报错
    });
    viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
}