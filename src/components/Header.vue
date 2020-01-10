<template>
    <div id="footer">
        <el-link type="primary" @click="openWebSite('https://www.zhoutao123.com')">
            <i class="el-icon-user-solid"></i>
            个人网站
        </el-link>
        <el-link type="primary" @click="openWebSite('https://github.com/taoes')">
            <i class="el-icon-s-tools"></i>
            安装教程
        </el-link>

        <el-link type="primary" @click="openWebSite('https://github.com/taoes/onesmart_lesson_comment.git')">
            <i class="el-icon-info"></i>
            源代码开放
        </el-link>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {},
    })
    export default class Header extends Vue {


        private openMyWebSite() {
            window.open("https://www.zhoutao123.com");
        }

        private openWebSite(url: string) {
            window.open(url);
        }
    }
</script>

<style>

    #footer {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        margin-top: 30px;
    }

</style>
