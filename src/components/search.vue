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
            <hr  style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
        </div>

        <div class="row" style="margin-top: 20px">
            <h4 style="text-align: center;">库存明细</h4>
        </div>

        <el-row style="margin-top: 10px;margin-bottom: 15px" >
            <el-col :span="12" :offset="6"><el-button plain size="medium" @click="to" style="width: 200px">查看具体的流水明细</el-button></el-col>
        </el-row>

        <el-row style="margin-top: 10px" >
            <el-col :span="12" :offset="6" >
                <el-select  v-model="value" size="medium" placeholder="查看其他仓库" style="width: 200px">
                    <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px" >
            <el-col :span="12" :offset="6"><el-select  v-model="value1" size="medium" placeholder="查看材料分类" style="width: 200px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select></el-col>
        </el-row>

        <el-row style="margin-top: 10px" >
            <el-col :span="12" :offset="6">
                <el-input  size="medium" v-model="input" placeholder="请输入内容" style="width: 200px"></el-input>
            </el-col>

        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="12" :offset="6">
                <el-button plain size="medium" @click="search" style="width: 200px">搜索</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px" >
            <el-col :span="12" :offset="6">
            </el-col>
        </el-row>

        <el-dialog :visible.sync="dialogTableVisible" width="90%">
            <el-row class="row" >
                <el-col  :span="22" style="margin-bottom: 6px">
                    <h5>查询结果如下</h5>
                </el-col>
            </el-row>
            <el-table :data="tableData3" border style="width: 100%;margin-top: 10px" height="260" >
                <el-table-column fixed prop="id" label="id" width="40"></el-table-column>

                <el-table-column prop="materialTypeName" label="材料分类" width="80"></el-table-column>

                <el-table-column prop="materialName" label="材料名称" width="80"></el-table-column>

                <el-table-column prop="amount" label="进货数量" width="80"></el-table-column>

                <el-table-column prop="materialStandard" label="归属工地" width="80"></el-table-column>


            </el-table>

        </el-dialog>


    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";

    export default {
        data(){
            return{
                dialogTableVisible: false,
                drawer:null,
                tableData3: [],
                input:'',
                options: [],
                option1s: [],
                value: '',
                value1: '',
                role:''
            }
        },
        methods:{
            query:function(){
                this.$router.push('query')
            },
            ordinary:function(){
                this.$router.push('ordinary')
            },
            back: function () {
                // window.history.back(-1)
                this.$router.push('query')
            },
            apply:function(){
                this.$router.push('apply')
            },
            input1:function(){
                this.$router.push('input')
            },
            water:function(){
                this.$router.push('record')
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
            to:function(){
                this.$router.push('detail')
            },
            search:function (){
                this.dialogTableVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/record/searchMaterial', {
                    params: {
                        siteId:this.value,
                        name:this.input,
                        typeId:this.value1,
                        token:sessionStorage.getItem('token')
                        //token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                        this.tableData3=response.data.data.inventory;
                        console.log(this.inventory)
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
                params: {
                }
            }).then((response)=>{
                if (response.data.code == 200) {
                    var options = response.data.data.types;
                    console.log(options)
                    for(var i=0;i<options.length;++i){
                        var obj={};
                        obj.value=options[i].id;
                        obj.label=options[i].typeName;
                        this.options.push(obj);
                    }
                }
            }).catch((error)=>{
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                params: {
                }
            }).then((response)=>{
                if (response.data.code == 200) {
                    var option1s = response.data.data.siteList;
                    console.log(option1s)
                    for(var i=0;i<option1s.length;++i){
                        var obj={};
                        obj.value=option1s[i].id;
                        obj.label=option1s[i].siteName;
                        this.option1s.push(obj);
                    }
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
</script>

<style>

</style>