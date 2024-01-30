
//指定拷贝到根目录下的Cesium
window.CESIUM_BASE_URL = './Cesium/';

import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

let viewer
let pointEntities = [] // 存放点位视图

// entities实体 - 三维地图上放置一些模型 eg: 房子、工厂模型 在Cesium中统称为实体
let pointInfos = null
const loadPoints = () => {
    // 点位信息
    pointInfos = [
        {
            id: "392f7fbb-ae25-4eef-ac43-58fd91148d1f",
            latitude: "31.87532",
            longitude: "120.55538",
            psName: "XXX小学",
            pointTypeId: 'school',
        },
        {
            id: "0278a88c-b4f4-4d64-9ccb-65831b3fb19d",
            latitude: "31.991057",
            longitude: "120.700713",
            psName: "XXX有限公司",
            pointTypeId: 'corp',
        },
        {
            id: "248f6853-2ced-4aa6-b679-ea6422a5f3ac",
            latitude: "31.94181",
            longitude: "120.51517",
            psName: "XXX股份有限公司",
            pointTypeId: 'corp',
        },
        {
            id: "F8DADA95-A438-49E1-B263-63AE3BD7DAC4",
            latitude: "31.97416",
            longitude: "120.56132",
            psName: "XXX中学",
            pointTypeId: 'school',
        },
        {
            id: "9402a911-78c5-466a-9162-d5b04d0e48f0",
            latitude: "31.91604",
            longitude: "120.57771",
            psName: "有限公司5",
            pointTypeId: 'corp',
        },
        {
            id: "EB392DD3-6998-437F-8DCB-F805AD4DB340",
            latitude: "31.88727",
            longitude: "120.48887",
            psName: "XXX工厂",
            pointTypeId: 'factory',
        },
    ]
    addMarkers(pointInfos)
}
const addMarkers = (pointInfos = []) => {
    viewer.entities.removeAll()
    pointInfos.forEach(item => {
        viewer.entities.add({
            name: item.psName,
            id: item.id,
            show: true,
            position: Cesium.Cartesian3.fromDegrees(
                item.longitude * 1,
                item.latitude * 1,
                // 100
            ),
            // 文字标签
            label: {
                text: item.psName,
                font: '18px sans-serif Bold',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: Cesium.Color.fromCssColorString('#fff'),
                outlineWidth: 4,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -20), // 偏移量
                show: true,
                showBackground: true,
            },
            // 图标
            billboard: getBillboardByType(item)
            // // 点对象属性
            // point: {
            //     pixelSize: 5,
            //     color: Cesium.Color.RED,
            //     outlineColor: Cesium.Color.WHITE,
            //     outlineWidth: 2,
            // }
        })
    })
}

const getBillboardByType = (pointObj) => {
    let billboardObj = null;
    if (pointObj.pointTypeId === 'corp') {
        billboardObj = {
            image: 'src/assets/images/corp.svg',
            width: 35,
            height: 30,

        }
    }
    if (pointObj.pointTypeId === 'school') {
        billboardObj = {
            image: 'src/assets/images/school.svg',
            width: 35,
            height: 30,
        }
    }
    if (pointObj.pointTypeId === 'factory') {
        billboardObj = {
            image: 'src/assets/images/factory.svg',
            width: 35,
            height: 30,
        }
    }
    return billboardObj;
}

const buildViewer = () => {
    //填写官网注册的ion，否则也会找不到东西
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMjVjZGM1Zi1kMjI5LTQ4ZDYtYmEyZi02ZWZjZWVjMjU3NjMiLCJpZCI6MTkwMDI1LCJpYXQiOjE3MDU0MDExODF9.E695v_GBSTkSjmCfaCFSwAlx5LjpPNoDcDuLrwvrP7E';
    // 初始化
    viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false, // 是否显示点击要素之后显示的信息 取消报错
        baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
        geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
        navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
        homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
        sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
        animation: false, // 如果设置为false，将不会创建左下角动画小部件。
        timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
        fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
        scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
        shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
        // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
        sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
        // selectionIndicator: false, // Cesium 关闭点击绿色框
        // 高德影像地形地图：
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //     url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        //     minimumLevel: 4,
        //     maximumLevel: 18
        // }),
        vrButton: true
    });

    // 高德影像注记地图
    // viewer.imageryLayers.addImageryProvider(
    //     new Cesium.UrlTemplateImageryProvider({
    //         url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    //         maximumLevel: 18,
    //         minimumLevel: 1,
    //         credit: 'Amap'
    //     })
    // )
    //1.Cesium加载高德矢量地图
    var layer = new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        minimumLevel: 4,
        maximumLevel: 18
    })
    viewer.imageryLayers.addImageryProvider(layer);

//2.Cesium加载高德影像
    var imgLayer = new Cesium.UrlTemplateImageryProvider({
        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        minimumLevel: 3,
        maximumLevel: 18
    })
    viewer.imageryLayers.addImageryProvider(imgLayer);

//3.Cesium加载注记要素
    var annLayer = new Cesium.UrlTemplateImageryProvider({
        url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        minimumLevel: 3,
        maximumLevel: 18
    })
    viewer.imageryLayers.addImageryProvider(annLayer);

    // 设置初始位置 Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid)
    const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(120.55538, 31.87532, 100),
        15000
    );
    // 定位到初始位置
    viewer.camera.flyToBoundingSphere(boundingSphere, {
        // 定位到初始位置的过渡时间，设置成0，就没有过渡，类似一个过场的动画时长
        duration: 0,
    });
    viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
}
export const initCesium = async () => {
    await buildViewer();
    loadPoints();
    // 增加实体模型
    const blueBox = viewer.entities.add({
        name: "Blue box",
        position: Cesium.Cartesian3.fromDegrees(120.55538, 31.87532, 100.0),
        box: {
            // new Cesium.Cartesian3(长, width, height)
            dimensions: new Cesium.Cartesian3(40.0, 100.0, 150.0),
            material: Cesium.Color.BLUE, // 配置颜色
            material: Cesium.Color.RED.withAlpha(0.5), // 配置颜色透明度
            fill: false, // 配置 是否填满
            outline: true, // 配置 是否显示外边框线
            outlineColor: Cesium.Color.YELLOW, // 配置 设置外边框线颜色
        },
    });
    viewer.zoomTo(blueBox); // 定位到实体
    return viewer
}