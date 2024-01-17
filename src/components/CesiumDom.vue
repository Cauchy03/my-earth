<template>
    <div id="cesiumContainer"></div>
    <PopupInfoBox ref="popUp" :positionXy="state.positionXy">
    </PopupInfoBox>
</template>

<script setup>
import * as Cesium from "cesium";
import { initCesium } from "../js/initCesium";
import { ref, reactive, onMounted} from "vue";
import PopupInfoBox from './PopupInfoBox.vue'

let viewer
onMounted(async () => {
    viewer = await initCesium()
    initClickPopupEvent()
})

const state = reactive({
    positionXy: {
        xAxis: 0,
        yAxis: 0,
    },
    popData: {
        title: '',
        id: '',
    }
})

const popUp = ref(null)

// 添加弹窗
const initClickPopupEvent = () => {
    // 监听地图点击事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
        popUp.value.onOpen()
        console.log('output-> 点击事件', click.position)
        // 屏幕坐标转世界坐标 - keypoint
        let cartesian3Position = viewer.scene.camera.pickEllipsoid(click.position);
        // 世界坐标转为WGS-84
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian3Position);
        // 获取经纬度
        let lng = Cesium.Math.toDegrees(cartographic.longitude)
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        let height = Cesium.Math.toRadians(cartographic.height);
        console.log('output-> {lng, lat, height}', { lng, lat, height })
        // 获取地图上的点位实体（entity）坐标
        const pickTarget = viewer.scene.pick(click.position)
        console.log('output-> pickTarget::: ', pickTarget)
        console.log('output-> Cesium.defined(pickTarget)::: ', Cesium.defined(pickTarget))
        // 如果pickTarget不是undefined则说明点击到具体对象了
        if (Cesium.defined(pickTarget)) {
            // 定位到地图中心
            locationToCenter(lng, lat, viewer)
            // 实时更新位置 这个很重要 不然弹框会固定在屏幕的一个位置不随地图转动
            viewer.scene.postRender.addEventListener(() => {
                // console.log('output-> 监听事件',)
                let windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian3Position)
                if (windowPosition.x && windowPosition.y) {
                    state.positionXy.xAxis = windowPosition.x - 100 
                    state.positionXy.yAxis = windowPosition.y - 200
                }
            })
        } else {
            popUp.value.onClose();
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// 定位到地图中心
const locationToCenter = (lng, lat, viewer) => {
    const pointLocation = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(lng * 1, lat * 1, 100), 15000); // 120.55538, 31.87532
    viewer.camera.flyToBoundingSphere(pointLocation);
}
</script>

<style scoped>
#cesiumContainer {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>