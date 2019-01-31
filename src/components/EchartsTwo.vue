<template>
    <div>
        <el-row style="margin-top: 120px">
            <h3 style="text-align: center;margin-bottom: 4px">不同工地材料使用量对比</h3>
            <div style="width:200px;margin: 0 auto">
                <el-date-picker
                        style="width: 200px"
                        v-model="value2"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始">
                </el-date-picker>
                <el-date-picker
                        style="width: 200px;margin-top: 10px"
                        v-model="value3"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束">
                </el-date-picker>
            </div>

            <div style="width:200px;margin: 0 auto">
                <el-select
                        v-model="value"
                        multiple
                        collapse-tags
                        style="width: 200px;margin-top: 10px"
                        placeholder="请选择不同工地">
                    <el-option
                            v-for="item in option1s"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:200px;margin: 0 auto">
                <el-select
                        v-model="value1"
                        multiple
                        collapse-tags
                        style="width: 200px;margin-top: 10px"
                        placeholder="请选择不同工地材料">
                    <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:200px;margin: 0 auto">
                <!--<el-col :span="12" :offset="6">-->
                <el-button type="primary" style="margin-top: 10px;width: 200px" @click="search">搜索</el-button>
                <!--</el-col>-->
            </div>
        </el-row>
        <div id="main" style="width: 370px;height:450px;margin: 0 auto;"></div>
    </div>

</template>

<script>
    import contaUrl from "../../public/js/contaUrl";
    import qs from 'qs'

    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        data() {
            return {
                value:[],
                value1:[],
                value2:'',
                value3:'',
                option1s: [],
                options1:[],
                dosages:{},
                xAxis:[],
                legend:[],
                series:[],
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
            search() {
                let myChart = this.$echarts.init(document.getElementById('main'));
                let posList = [
                    'left', 'right', 'top', 'bottom',
                    'inside',
                    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
                ];

                app.configParameters = {
                    rotate: {
                        min: -90,
                        max: 90
                    },
                    align: {
                        options: {
                            left: 'left',
                            center: 'center',
                            right: 'right'
                        }
                    },
                    verticalAlign: {
                        options: {
                            top: 'top',
                            middle: 'middle',
                            bottom: 'bottom'
                        }
                    },
                    position: {
                        options: echarts.util.reduce(posList, function (map, pos) {
                            map[pos] = pos;
                            return map;
                        }, {})
                    },
                    distance: {
                        min: 0,
                        max: 100
                    }
                };

                app.config = {
                    rotate: 90,
                    align: 'left',
                    verticalAlign: 'middle',
                    position: 'insideBottom',
                    distance: 15,
                    onChange: function () {
                        let labelOption = {
                            normal: {
                                rotate: app.config.rotate,
                                align: app.config.align,
                                verticalAlign: app.config.verticalAlign,
                                position: app.config.position,
                                distance: app.config.distance
                            }
                        };
                        myChart.setOption({
                            series: [{
                                label: labelOption
                            }, {
                                label: labelOption
                            }, {
                                label: labelOption
                            }, {
                                label: labelOption
                            }]
                        });
                    }
                };


                let labelOption = {
                    normal: {
                        show: true,
                        position: app.config.position,
                        distance: app.config.distance,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        rotate: app.config.rotate,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                };

                let option = {
                    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: []
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barGap: 0,
                            label: labelOption,
                            data: []
                        },
                        {
                            name: '',
                            type: 'bar',
                            label: labelOption,
                            data: []
                        },
                        {
                            name: '',
                            type: 'bar',
                            label: labelOption,
                            data: []
                        },
                        {
                            name: '',
                            type: 'bar',
                            label: labelOption,
                            data: []
                        }
                    ]
                };
                if(this.value==""||this.value3==""||this.value2==""||this.value1==""){
                    this.$message.warning("查询条件不能为空！");
                    return;
                }

                this.$axios.get(contaUrl.contaUrl + '/report/use_amount', {
                    params:{
                        start:this.value2,
                        end:this.value3,
                        siteList:this.value,
                        materialList:this.value1,
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { indices: false })
                    }
                }).then(res => {
                    if(option.xAxis.data==undefined||option.legend.data==undefined||option.series==undefined){
                        this.$message.warning("数据为空！");
                        return;
                    }
                    const data = res.data;
                    this.dosages = data

                    const arr = Array.from(this.dosages.data)
                    //
                    for (var i = 0; i < arr.length; i++) {
                        this.xAxis[i] = arr[i].name

                    }

                    for (var j = 0; j < arr.length; j++) {
                        this.legend[j] = arr[j].content

                    }

                    for (var k = 0; k < arr.length; k++) {
                        this.series[k] = arr[k].value
                    }

                    var SeriesTotal = []
                    var xAxisdata = []
                    var legends = []
                    var ItemBar = function () {
                        return {

                            name: '',
                            type: 'bar',
                            label: labelOption,
                            data: []

                        }
                    }

                    for (var m in arr) {
                        xAxisdata.push(arr[m].name)
                        legends.push(arr[m].content)
                        var itembar = new ItemBar()
                        itembar.name = this.legend[m]
                        itembar.data = this.series
                        SeriesTotal.push(itembar)
                    }

                    option.xAxis.data = xAxisdata
                    option.legend.data = legends
                    option.series = SeriesTotal

                    myChart.setOption({
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {show: false},
                                data: option.xAxis.data
                            }
                        ],
                        legend: {
                            data: option.legend.data
                        },
                        series:
                        option.series

                    })


                })

            }
        }
    }
</script>

<style>

</style>