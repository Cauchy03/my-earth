<template>
    <!--  这里的 positionXy.xAxis、positionXy.yAxis 是动态传入的-->
    <div v-if="infoShow" class="content_info"
        :style="{ top: `${props.positionXy.yAxis}px`, left: `${props.positionXy.xAxis}px` }">
        <BorderBox10>
            弹窗内容
            {{
                props.positionXy
            }}
        </BorderBox10>
    </div>
</template>

<script setup>
import { ref } from "vue";

let infoShow = ref(false)
const props = defineProps({
    positionXy: {
        type: Object,
        default: {
            xAxis: 0,
            yAxis: 0,
        }
    }
})

function onClose() {
    infoShow.value = false
}

function onOpen() {
    console.log('output-> 打开信息弹窗',)
    infoShow.value = true
}

defineExpose({
    onOpen,
    onClose,
})
</script>

<style scoped lang="scss">
.content_info {
    width: 200px;
    height: 150px;
    position: absolute;
    color: white;
    font-size: 17px;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    padding: 10px 10px 15px;
    z-index: 9999;
    user-select: text;
    pointer-events: auto;
    background-color: rgba(3, 22, 37, .85);

    .close_btn {
        position: absolute;
        top: 2px;
        right: 2px;
    }

    .title {
        font-size: 12px;
        font-weight: 700;

        // transform: scale(.8);
        .title_content {
            font-size: 12px;
            // transform: scale(.8);
            font-weight: normal;
            color: #555555;
        }
    }
}

.info_triangle {
    width: 0;
    height: 0;
    border: 15px solid;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    left: 50%;
    bottom: -29px;
    transform: translateX(-50%);
}
</style>