<template>
    <div class='hello'>

        <div id="buttonArea">

            <div style="margin-top: 20px">
                <el-button type="primary" plain @click="openWebSite('http://home2.onesmart.org/')">精锐家园(外网)</el-button>
            </div>

            <div style="margin-top: 20px">
                <el-button type="primary" plain @click="openWebSite('http://home.onesmart.org/')">精锐家园(内网)</el-button>
            </div>
        </div>


        <el-divider>
            <i class="el-icon-s-tools"></i>
            系统配置
        </el-divider>
        <div class='layout'>
            <span class="label"></span>
            <el-checkbox v-model='config.skipIndex'>跳过首页按钮</el-checkbox>
        </div>

        <div class='layout'>
            <span class="label"></span>
            <el-checkbox v-model='config.statistics'>显示课程统计</el-checkbox>
        </div>

        <div class='layout'>
            <span class="label"></span>
            <el-checkbox v-model='config.submit'>错题选择后立即提交</el-checkbox>
        </div>


        <el-divider>
            <i class="el-icon-s-cooperation"></i>
            填充配置
        </el-divider>


        <div class='layout'>
            <span class="label">默认星级：</span>
            <el-rate v-model="config.defaultRate" :texts="rateText" show-text></el-rate>
        </div>

        <div class='layout'>
            <span class="label">掌握情况：</span>
            <el-select v-model='config.status' collapse-tags placeholder='默认课堂掌握情况' size='small' value=''>
                <el-option
                        v-for='status in allStatusList'
                        :key='status'
                        :label='status'
                        :value='status'>
                </el-option>
            </el-select>
        </div>

        <div class='layout'>
            <span class="label">最多错题:</span>
            <el-input-number v-model='config.maxWrongQuestion' size='mini' :min='1' :max='10'/>

        </div>

        <div class='layout'>
            <span class="label"> 错误原因:</span>
            <el-select v-model='config.reasonList' multiple collapse-tags placeholder='请选择多个' size='small' value=''>
                <el-option
                        v-for='reason in allReasonList'
                        :key='reason'
                        :label='reason'
                        :value='reason'>
                </el-option>
            </el-select>
        </div>

        <div class='layout'>
            <span class="label">答案选项:</span>
            <el-select v-model='config.answerList' multiple collapse-tags placeholder='请选择多个' size='small' value=''>
                <el-option
                        v-for='answer in allAnswerList'
                        :key='answer'
                        :label='answer'
                        :value='answer'>
                </el-option>
            </el-select>
        </div>

        <div class='layout'>
            <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入预设的评论内容"
                    v-model="config.comment">
            </el-input>
        </div>


        <el-divider>
            <i class="el-icon-success"></i>
            保存设置
        </el-divider>

        <div class="layout center">
            <el-button type="primary" size="small" @click="saveConfig">保存</el-button>
            <el-button type="primary" size="small" @click="resetDefaultConfig">恢复默认</el-button>
            <el-button type="primary" size="small" @click="closePage">关闭</el-button>
        </div>


    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Content extends Vue {

        private config = {
            submit: true,
            skipIndex: false,
            statistics: true,
            comment: "",
            maxWrongQuestion: 3,
            status: "掌握",
            reasonList: ["语法问题", "词汇欠缺", "阅读细节", "阅读推断"],
            answerList: ["A", "B", "C", "D"],
            defaultRate: 5,
        };


        // 元数据
        private allStatusList: string[] = ["知道", "理解", "掌握", "运用"];
        private allReasonList: string[] = ["语法问题", "词汇欠缺", "阅读细节", "阅读推断", "策略失当", "记忆问题"];
        private allAnswerList: string[] = ["不选择", "A", "B", "C", "D"];
        private rateText: string[] = ['1分', '2分', '3分', '4分', '5分'];

        private saveConfig() {
            localStorage.setItem("config", JSON.stringify(this.config));
            this.$message({
                message: "配置已经成功保存",
                center: true,
                type: "success",
            });
        }

        // 关闭窗体
        private closePage() {
            window.close();
        }

        // 打开新的页面
        private openWebSite(url: string) {
            window.open(url);
        }


        private resetDefaultConfig() {
            const
                config = {
                    submit: true,
                    skipIndex: false,
                    statistics: true,
                    comment: "",
                    maxWrongQuestion: 3,
                    status: "掌握",
                    reasonList: ["语法问题", "词汇欠缺", "阅读细节", "阅读推断"],
                    answerList: ["A", "B", "C", "D"],
                    defaultRate: 5,
                };
            localStorage.setItem("config", JSON.stringify(config));
            this.config = config;
            this.$message({
                message: "配置已经成功恢复",
                center: true,
                type: "success",
            });
        }

        // 生命周期方法
        private mounted() {
            const config = localStorage.getItem("config");
            if (config) {
                this.config = JSON.parse(config);
            }
        }

    }
</script>


<style scoped>
    .layout {
        display: flex;
        flex-direction: row;
        padding: 10px;
        align-items: baseline;
    }

    .el-input-number--mini {
        margin-left: 10px;
        margin-right: 10px;
    }

    .center {
        justify-content: center;
    }

    .label {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }


    /*   访问连接区域*/

    #buttonArea {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
    }
</style>
