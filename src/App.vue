<template>
    <div id="app">
        <div id="header">
            <Header></Header>
        </div>

        <div id="content">
            <Content></Content>
        </div>


    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HelloWorld from "./components/Content.vue";
    import Content from "@/components/Content.vue";
    import Header from "@/components/Header.vue";

    @Component({
        components: {
            Header,
            Content,
            HelloWorld,
        },
    })
    export default class App extends Vue {

    }
</script>

<style>
    #app {
        width: 350px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 20px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }


    #content {
        flex-grow: 1;
    }

    #header {
        flex-grow: 0;
    }
</style>
