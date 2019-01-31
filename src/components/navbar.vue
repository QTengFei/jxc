<template>
    <div>
        <div>
            <v-app id="inspire">
                <v-navigation-drawer fixed v-model="drawer" app>
                    <v-list dense>
                        <div>
                            <img src="../../public/images/小云朵.png" alt="图片受损">
                        </div>
                        <v-list-tile class="tile" @click="homepage">
                            <v-list-tile-action>
                                <!--<v-icon>home</v-icon>-->
                                <!--<img src="../../public/images/主页.png" alt="图片受损" width="20px" height="10px">-->
                                <i class="el-icon-home"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>主页</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="center">
                            <v-list-tile-action>
                                <!--<v-icon>people</v-icon>-->
                                <i class="el-icon-iconfontgerenzhongxin"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>个人中心</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="input">
                            <v-list-tile-action>
                                <!--<v-icon>edit</v-icon>-->
                                <i class="el-icon-qichukucunluru"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>库存录入</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="apply">
                            <v-list-tile-action>
                                <!--<v-icon>filter_frames</v-icon>-->
                                <i class="el-icon-shenqing"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>材料申请</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="query">
                            <v-list-tile-action>
                                <!--<v-icon>search</v-icon>-->
                                <i class="el-icon-kucunchaxun"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>库存查询</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="water">
                            <v-list-tile-action>
                                <!--<v-icon>assignment_turned_in</v-icon>-->
                                <i class="el-icon-zhanghumingxi"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>明细流水</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="money">
                            <v-list-tile-action>
                                <!--<v-icon>bar_chart</v-icon>-->
                                <i class="el-icon-caiwufenxi"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>财务分析</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile class="tile" @click="ordinary">
                            <v-list-tile-action>
                                <!--<v-icon>search</v-icon>-->
                                <i class="el-icon-wodekucun_huaban"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>我的库存</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="stop">
                            <v-list-tile-action>
                                <!--<v-icon>block</v-icon>-->
                                <i class="el-icon-zhuxiaodenglu"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>注销登录</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
                <v-toolbar color="indigo" dark fixed app>
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                    <div style="position: absolute;line-height: 10px;right: 20px;" class="path" v-show="isShowBack">
                        <i class="el-icon-return" @click="back">
                        </i>
                    </div>
                </v-toolbar>

            </v-app>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                drawer:null,
                handClose:true
            }
        },
        mounted: function () {
            var role = sessionStorage.getItem("role");
            console.log(role)
            var li = document.getElementsByClassName("t-li");
            console.log(li)
            var tile = document.getElementsByClassName("tile")
            console.log(tile)

            if (role == 3) {
                li[3].style.display = "none";
                li[5].style.display = "none";
                li[6].style.display = "none";
                tile[2].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 2) {
                li[3].style.display = "none";
                li[6].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 1) {
                li[0].style.display = "none";
                li[4].style.display = "none";
                li[5].style.display = "none";
                tile[2].style.display = "none";
                tile[4].style.display = "none";
                tile[6].style.display = "none";
            }
        },
        methods: {
            query: function () {
                this.$router.push('query')
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            apply: function () {
                this.$router.push('apply')
            },
            input: function () {
                this.$router.push('input')
            },
            water: function () {
                this.$router.push('record')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage: function () {
                this.$router.push('homepage')
                // window.location.reload()
            },
            stop: function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem("token");
                this.$router.push('/')
            },
            center: function () {
                var role = sessionStorage.getItem("role");
                console.log(role)
                if (role == 3) {
                    this.$router.push("CenterThree")
                } else if (role == 2) {
                    this.$router.push("CenterTwo")
                } else if (role == 1) {
                    this.$router.push("Center")
                }
            },
            back:function () {
                window.history.back(-1)
                // this.$router.go(-1)
            }
        },
        computed:{
            isShowBack:function () {
                if(this.$route.path=="/homepage"){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
</script>

<style>

</style>