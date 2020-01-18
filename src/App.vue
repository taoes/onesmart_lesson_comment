<template>
    <div id="app">


        <div id="content">
            <Content></Content>
        </div>
        <div id="header">
            <hr>
            <Header></Header>
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
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }


    #content {
        flex-grow: 1;
    }

    #header {
        flex-grow: 0;
    }
</style>
