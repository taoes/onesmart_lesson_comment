<template>
    <div>
        <div id="footer">
            <el-link type="primary" @click="openWebSite('https://www.zhoutao123.com')">
                <i class="el-icon-user-solid"></i>
                个人网站
            </el-link>
            <el-link type="primary" @click="openWebSite('https://github.com/taoes/onesmart_lesson_comment/blob/master/README.md')">
                <i class="el-icon-s-tools"></i>
                安装教程
            </el-link>

            <el-link type="primary" @click="openWebSite('https://github.com/taoes/onesmart_lesson_comment')">
                <i class="el-icon-info"></i>
                源代码开放
            </el-link>
        </div>
        <p align="center" class="emailSpan">
            <b>Email: </b>
             <a href="mailto:zhoutao825639@vip.qq.com">zhoutao825639@vip.qq.com</a>
        </p>
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


    .emailSpan {
        font-size: 10px;
    }


    .el-link--inner {
        color: black !important;
    }
</style>
