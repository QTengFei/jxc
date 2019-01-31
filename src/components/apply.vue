<template>
    <div>
        <div class="container" style="margin-top: 80px;">
            <el-row>
                <el-col :span="16" :offset="4">
                    <img class="top img-responsive center-block" src="images/小云朵.png">
                </el-col>
            </el-row>

            <div class="row" style="margin-top: 10px">
                <hr style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
            </div>

            <div class="row" style="margin-top: 20px">
                <h4 style="text-align: center;">请选择需要申请的类别</h4>
            </div>

            <el-row>
                <el-col :span="8" :offset="8">
                    <img src="images/申请页面申请.png" class="img-responsive center-block" style="margin-top: 20px">
                </el-col>
            </el-row>

            <el-row style="margin-top: 30px;">
                <el-col :span="10" :offset="2">
                    <div class="grid-content bg-purple">
                        <router-link to="/delivery">
                            <el-button round>进货申请</el-button>
                        </router-link>
                    </div>
                </el-col>
                <el-col :span="10" :offset="2">
                    <div class="grid-content bg-purple-light">
                        <router-link to="/purchase">
                            <el-button round>提货申请</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
            }
        },
        mounted() {
            var role = sessionStorage.getItem("role");
            console.log(role)

            var tile = document.getElementsByClassName("tile")
            console.log(tile)

            if (role == 3) {
                tile[2].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 2) {
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 1) {
                tile[2].style.display = "none";
                tile[4].style.display = "none";
                tile[6].style.display = "none";
            }
        },
        methods: {
            water: function () {
                this.$router.push('record')
            },
            query: function () {
                this.$router.push('query')
            },
            apply: function () {
                this.$router.push('apply')
            },
            input: function () {
                this.$router.push('input')
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage: function () {
                this.$router.push('homepage')
            },
            stop: function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                this.$router.push('/')
            },
            center: function () {
                var role = sessionStorage.getItem("role");
                console.log(role)
                if (role == 3) {
                    this.$router.push("centerThree")
                } else if (role == 2) {
                    this.$router.push("centerTwo")
                } else if (role == 1) {
                    this.$router.push("center")
                }
            },
            back: function () {
                // window.history.back(-1)
                this.$router.push("homepage")
            }
        }
    }
</script>