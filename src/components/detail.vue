<template>
    <div>
        <div style="margin-top: 100px;">
            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>
        </div>

        <div class="row" style="margin-top: 10px">
            <hr style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
        </div>

        <div class="row" style="margin-top: 10px">
            <span style="text-align: center;font-size: 16px;display: block;">请查看具体的流水明细</span>
        </div>

        <el-row class="row" style="margin-top: 20px">
            <el-col :span="9" style="margin-top: 6px"><span style="margin-left: 20px">请选择工地</span></el-col>
            <el-select v-model="value" size="medium" placeholder="请选择" style="width: 200px;">
                <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-row>

        <el-row class="row" style="margin-top: 10px">
            <el-col :span="9" style="margin-top: 6px"><span style="margin-left: 20px">请选择材料分类</span></el-col>            <el-select v-model="value1" size="medium" placeholder="请选择" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-col :span="9" style="margin-top: 6px"><span style="margin-left: 20px">请选择材料名称</span></el-col>
            <el-col :span="14">
                <el-input size="medium" v-model="name" placeholder="请输入内容" style="width: 200px;"></el-input>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-col :span="9" style="margin-top: 6px"><span style="margin-left: 20px;">请选择初始日期</span></el-col>
            <el-col :span="14">
                <div class="block">
                    <el-date-picker size="medium" v-model="starttime" type="datetime" placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss" style="width: 200px;">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-col :span="9" style="margin-top: 6px"><span style="margin-left: 20px">请选择结束日期</span></el-col>
            <el-col :span="15">
                <div class="block">
                    <el-date-picker size="medium" v-model="endtime" type="datetime" placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss" style="width: 200px;">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;margin-bottom: 50px">
            <el-col :span="6" :offset="9">
                <el-button plain size="medium" @click="search" style="width: 200px;"> 搜索明细</el-button>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="dialogTableVisible" width="100%">
            <el-row >
                <table v-for="item in gridData" style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px" border="1"  >
                    <tr>
                        <td>申请日期</td>
                        <td>{{item.applyTime}}</td>

                    </tr>

                    <tr>
                        <td>材料名称</td>
                        <td>{{item.materialName}}</td>
                    </tr>
                    <tr>
                        <td>数量</td>
                        <td>{{item.amount}}</td>
                    </tr>
                    <tr>
                        <td>工具类</td>
                        <td>{{item.materialTypeName}}</td>
                    </tr>
                    <tr>
                        <td>价格</td>
                        <td>{{item.price}}</td>
                    </tr>
                    <tr>
                        <td>工地名称</td>
                        <td>{{item.siteName}}</td>
                    </tr>
                    <tr>
                        <td>人</td>
                        <td>{{item.provider}}</td>
                    </tr>

                </table>
            </el-row>
        </el-dialog>

    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";

    export default {
        data() {
            return {
                drawer: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                outerVisible: false,
                innerVisible: false,
                options: [],
                option1s: [],
                value: '',
                name: '',
                value1: '',
                starttime: '',
                endtime: '',
                gridData: [],
                role: '',
                gridData: [
                ],
            }
        },
        methods: {
            handleClick(row) {
                this.innerVisible = true
            },
            search: function () {
                this.dialogTableVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/record/stockList', {

                    params: {
                        siteId: this.value,
                        typeId: this.value1,
                        name: this.name,
                        start: this.starttime,
                        end: this.endtime,
                        token: sessionStorage.getItem('token')
                    }
                }).then(function (response) {
                    if(response.data==null){
                        this.$message.warning("数据为空！");
                        return;
                    }
                    if (response.data.code == 200) {
                        this.gridData = response.data.data.stockList;
                        console.log(this.gridData)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
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

            this.$axios.get(contaUrl.contaUrl + '/system/getTypes', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var options = response.data.data.types;
                    console.log(options)

                    for (var i = 0; i < options.length; ++i) {
                        var obj = {};
                        obj.value = options[i].id;
                        obj.label = options[i].typeName;
                        this.options.push(obj);
                    }

                }
            }).catch((error) => {
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var option1s = response.data.data.siteList;
                    console.log(option1s)

                    for (var i = 0; i < option1s.length; ++i) {
                        var obj = {};
                        obj.value = option1s[i].id;
                        obj.label = option1s[i].siteName;
                        this.option1s.push(obj);
                    }

                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .ul {
        display: inline-block;
        padding: 0;
        list-style: none;
        margin-left: 10px;
    }

    .ul:last-child {
        background-color: #f7f7f7;
        margin-left: 0;
    }

    .ul li {
        border: 1px solid #d7d7d7;
        width: 130px;
        height: 35px;
        text-align: center;
        line-height: 35px;
    }
</style>