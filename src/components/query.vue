<template>
    <div>
        <div id="myVue" class="container" style="margin-top: 100px;">
            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>

            <div class="row" style="margin-top: 10px">
                <hr style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
            </div>

            <el-row class="row" style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择材料分类</span></el-col>
                <el-col :span="15">
                    <el-select class="col-xs-7 " v-model="value1" size="medium" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择材料名称</span></el-col>
                <el-col :span="15">
                        <el-input v-model="name2" size="medium" style="width: 200px" placeholder="请输入材料名称"></el-input>
                </el-col>
            </el-row>
            <el-row class="row" style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>查看仓库库存</span></el-col>
                <el-col :span="15">
                    <el-select class="col-xs-7 " v-model="value" size="medium" placeholder="请选择仓库库存" style="width: 200px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>


            <el-row style="margin-top: 10px">
                <el-col :span="6" :offset="9">
                    <el-button plain size="medium" @click="search" style="width: 200px;">搜索</el-button>
                </el-col>
            </el-row>
            <el-dialog :visible.sync="dialogTableVisible" width="90%">
                <el-row class="row">
                    <el-col :span="22" style="margin-bottom: 6px">
                        <h5>查询结果如下</h5>
                    </el-col>
                </el-row>
                <el-table :data="tableData3" border height="260">
                    <el-table-column fixed prop="id" label="id" width="40"></el-table-column>

                    <el-table-column prop="materialTypeName" label="材料分类" width="78"></el-table-column>

                    <el-table-column prop="materialName" label="材料名称" width="78"></el-table-column>

                    <el-table-column prop="amount" label="进货数量" width="78"></el-table-column>

                    <el-table-column prop="materialStandard" label="归属工地" width="78"></el-table-column>

                </el-table>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";

    export default {
        data() {
            return {
                dialogTableVisible: false,
                drawer: null,
                tableData3: [],
                options: [],
                options1:[],
                options2:[],
                value1: '',
                name: '',
                name2:'',
                value: '',
                input: ''
            }
        },
        methods: {
            query: function () {
                // this.$router.push('query')
                window.location.reload();
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            back: function () {
                // window.history.back(-1)
                this.$router.push('homepage')
            },
            apply: function () {
                this.$router.push('apply')
            },
            input1: function () {
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
            search: function () {
                this.dialogTableVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/record/searchMaterial', {
                    params: {
                        siteId: this.value,
                        name:this.name2,
                        typeId:this.value1,
                        token: sessionStorage.getItem('token')
                        //token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"

                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.tableData3 = response.data.data.inventory;
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

            var role = sessionStorage.getItem("role");
            console.log(role)
            var tile = document.getElementsByClassName("tile")
            console.log(tile)

            if (role == 3) {
                tile[2].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
                this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                    params: {}
                }).then((response) => {
                    if (response.data.code == 200) {
                        var options = response.data.data.siteList;
                        console.log(options)
                        for (var i = 0; i < options.length; ++i) {
                            var obj = {};
                            obj.value = options[i].id;
                            obj.label = options[i].siteName;
                            this.options.push(obj);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            } else if (role == 2) {
                tile[3].style.display = "none";
                tile[7].style.display = "none";

                this.$axios.get(contaUrl.contaUrl+'/user/getUserSites',{
                    params:{
                        token:sessionStorage.getItem('token')
                    }
                }).then((response)=>{
                    if (response.data.code == 200) {
                        var options = response.data.data.siteList;
                        console.log(options)
                        for (var i = 0; i < options.length; ++i) {
                            var obj = {};
                            obj.value = options[i].id;
                            obj.label = options[i].siteName;
                            this.options.push(obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error)
                })

            } else if (role == 1) {
                tile[2].style.display = "none";
                tile[4].style.display = "none";
                tile[6].style.display = "none";

                this.$axios.get(contaUrl.contaUrl+'/user/getUserSites',{
                    params:{
                        token:sessionStorage.getItem('token')
                    }
                }).then((response)=>{
                    if (response.data.code == 200) {
                        var options = response.data.data.siteList;
                        console.log(options)
                        for (var i = 0; i < options.length; ++i) {
                            var obj = {};
                            obj.value = options[i].id;
                            obj.label = options[i].siteName;
                            this.options.push(obj);
                        }
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            }



            this.$axios.get(contaUrl.contaUrl + '/system/getTypes', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var options1 = response.data.data.types;
                    console.log(options1)
                    for (var i = 0; i < options1.length; ++i) {
                        var obj = {};
                        obj.value = options1[i].id;
                        obj.label = options1[i].typeName;
                        this.options1.push(obj);
                    }

                }
            }).catch((error) => {
                console.log(error);
            })
            this.$axios.get(contaUrl.contaUrl + '/material/getAll', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var options2 = response.data.data.materialList;
                    // console.log(options1)
                    for (var i = 0; i < options2.length; ++i) {
                        var obj = {};
                        obj.value = options2[i].id;
                        obj.label = options2[i].materialName;
                        // obj.value = options1[i].materialTypeName;
                        this.options2.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
</script>

<style>

</style>