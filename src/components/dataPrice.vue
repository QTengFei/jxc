<template>
    <div>

        <el-row style="margin-top: 120px">
            <h3 style="text-align: center;margin-bottom: 4px">工地材料价格变化趋势图</h3>
            <div style="width:200px;margin: 0 auto">
                <el-date-picker
                        style="width: 200px"
                        v-model="value1"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始">
                </el-date-picker>
                <el-date-picker
                        style="width: 200px;margin-top: 10px"
                        v-model="value2"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束">
                </el-date-picker>
            </div>

            <div style="width:200px;margin: 0 auto">
                <!--<el-col :span="12" :offset="6">-->
                <el-select v-model="value3" filterable placeholder="工地类型" style="width: 200px;margin-top: 10px">
                    <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value" id="di">
                    </el-option>
                </el-select>
                <!--</el-col>-->
            </div>
            <div style="width:200px;margin: 0 auto">
                <el-select style="width: 200px;margin-top: 10px" v-model="value4"  placeholder="请选择所查询的工地材料">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </div>
            <div style="width:200px;margin: 0 auto">
                <!--<el-col :span="12" :offset="6">-->
                <el-button type="primary" style="margin-top: 10px;width: 200px" @click="search">搜索</el-button>
                <!--</el-col>-->
            </div>
        </el-row>
        <div id="dataprice" style="width: 350px;height:400px;top: 30px;margin: 0 auto"></div>
    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/line')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        data() {
            return {
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                option1s: [],
                options1:[],
                xAxis:[],
                series:[],
                pricesTrend:{}
            }
        },
        created: function () {
            this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var option1s = response.data.data.siteList;
                    console.log(option1s)
                    for (var i = 0; i < option1s.length; i++) {
                        var obj = {};
                        obj.value = option1s[i].id;
                        obj.label = option1s[i].siteName;
                        this.option1s.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
            this.$axios.get(contaUrl.contaUrl + '/material/getAll',{
                params:{
                }
            }).then(res=>{
                if(res.data.code ==200){
                    // var options=res.data.data.cailiao1list;
                    var options1=res.data.data.materialList;
                    for(var i=0;i<options1.length;++i){
                        var obj={};
                        obj.value=options1[i].id;
                        obj.label=options1[i].materialName;
                        this.options1.push(obj)
                    }
                }
            },function () {
                alert("error")
            })
        },
        mounted(){
            // this.search();
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
        methods:{
            search(){
                // 基于准备好的dom，初始化echarts实例
                let material1 = this.$echarts.init(document.getElementById('dataprice'))
                let option1 = {
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line'
                    }]
                }
                // material1.setOption(option1)
                if(this.value==""||this.value3==""||this.value2==""||this.value1==""){
                    this.$message.warning("查询条件不能为空！");
                    return;
                }
                this.$axios.get(contaUrl.contaUrl + '/report/material_price',{
                    params:{
                        start:this.value1,
                        end:this.value2,
                        siteId:this.value3,
                    }
                }).then(res => {

                    // console.log(Array.from(res.data))
                    const data = res.data;
                    this.pricesTrend = data
                    if(res.data.materialName==undefined||Array.from(this.goods1.data)==undefined){
                        this.$message.warning("数据为空！");
                        return;
                    }
                    // console.log(this.goods.name)
                    // console.log(this.goods);
                    // console.log(this.goods.data);
                    console.log(Array.from(this.pricesTrend.data));
                    const arr = Array.from(this.pricesTrend.data)
                    for (var i = 0; i < arr.length; i++) {
                        this.xAxis[i] = arr[i].value
                        this.series[i] = arr[i].name

                    }
                    material1.setOption({
                        xAxis: {
                            type: 'category',
                            data: this.xAxis
                        },


                        series: [
                            {
                                data: this.series,
                                type: 'line'
                            }
                        ]
                    })
                })


            },

        }
    }
</script>

<style>

</style>