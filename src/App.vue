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
        width: 500px;
        display: flex;
        flex-direction: column;
    }


    #content {
        flex-grow: 1;
    }

    #header {
        flex-grow: 0;
    }
</style>
