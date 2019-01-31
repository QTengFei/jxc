<template>
    <div>

        <div id="myVue" class="container" style="margin-top:  100px;">

            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>

            <div class="row" style="margin-top:  10px">
                <hr style="height:  3px;background-color:#D1D1D1;border:  none;margin:5px">
            </div>

            <div class="row" style="margin-top:  10px;margin-bottom: 10px;">
                <h4 style="text-align:  center;">到货系统录入</h4>
            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     style="margin:  0px">
                <el-form-item label="项目部" prop="court" size="medium" style="margin-bottom:20px">
                    <el-select v-model="ruleForm.court" placeholder="请选择所属项目" size="medium" style="width:  200px">
                        <el-option v-for="item  in  option1s" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <!--  <el-form-item  label="申请编号"  prop="identifier"  size="medium"  style="margin-bottom:20px">
                          <el-input  v-model="ruleForm.identifier"  size="medium"  style="width:  200px"></el-input>
                  </el-form-item>-->
                <el-form-item label="申请编号" prop="identifier" size="medium" style="margin-bottom:20px">
                    <el-button style="width:  200px" size="medium" @click="plaese">点击选择申请编号
                    </el-button>

                    <el-dialog title="选择申请编号" :visible.sync="dialogVisible" width="100%">
                        <el-table :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)" stripe
                                  style="width:100%" :row-class-name="tableRowClassName" ref="multipleTable">
                            <el-table-column property="applyPeopleName" label="申请人" width="70"></el-table-column>
                            <el-table-column property="materialName" label="材料" width="70"></el-table-column>
                            <el-table-column property="planAmount" label="数量" width="70"></el-table-column>
                            <el-table-column property="recordNumber" label="编号" width="70"></el-table-column>
                            <el-table-column fixed="right" label="选中" width="50">
                                <!--   <template slot-scope="scope">
                                       <el-radio v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                   </template>-->
                                <template scope="scope">
                                    <el-radio :label="scope.$index+1" v-model="templateRadio"
                                              @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;
                                    </el-radio>
                                </template>

                            </el-table-column>
                        </el-table>


                        <el-input v-model="search" placeholder="请输入内容"
                                  style="margin-top: 20px;margin-bottom: 20px;"></el-input>
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                           :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                                           layout="total, sizes, prev, pager, next" :total="total">
                            </el-pagination>
                        </div>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="getIndex">确 定</el-button>
                        </div>

                    </el-dialog>

                </el-form-item>

                <el-form-item label="申请数量" prop="place" style="margin-bottom:20px">
                    <el-input
                            placeholder="请输入内容"
                            v-model="place"
                            :disabled="checkBox"
                            style="width: 200px">
                    </el-input>
                </el-form-item>

                <!--   <el-form-item label="是否全部到货" prop="find1" style="margin-bottom:20px;">
                       <el-radio v-model="find1" label="1">是</el-radio>
                       <el-radio v-model="find1" label="2">否</el-radio>
                   </el-form-item>-->

                <el-form-item label="到货数量" prop="number" size="medium" style="margin-bottom:20px">
                    <el-input v-model="ruleForm.number" size="medium" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="未到货数量" prop="lock" style="margin-bottom:20px">
                    <el-input
                            placeholder="请输入内容"
                            v-model="lock"
                            :disabled="checkLock"
                            style="width: 200px">
                    </el-input>
                </el-form-item>

                <el-form-item label="金额" prop="money" size="medium" style="margin-bottom:20px">
                    <el-input v-model="ruleForm.money" size="medium" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="供应商" prop="supplier" size="medium" style="margin-bottom:20px">
                    <el-input v-model="ruleForm.supplier" size="medium" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="入库单" size="medium" style="margin-bottom:20px">
                    <div>
                        <h5 class="content-header"></h5>
                        <div class="image-list">
                            <div ref="divGenres" class="list-default-img" v-show="isPhoto" @click.stop="addPic">
                                <img src="../../public/images/add.jpg" width="50px"/>&nbsp;&nbsp;
                                <span style="vertical-align: 20px;">点击拍摄上传</span>
                                <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" capture="camera"
                                       @change="onFileChange" style="display: none;">
                            </div>
                            <ul class="list-ul" v-show="!isPhoto">
                                <li class="list-li " v-for="(iu, index) in imgUrls">
                                    <a class="list-link" @click='previewImage(iu)'>
                                        <img :src="iu">
                                    </a>
                                    <span class="list-img-close" @click='delImage(index)'></span>
                                </li>
                                <li class="list-li">
                                    <span class="add-img" @click.stop="addPic"> </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </el-form-item>


                <el-form-item label="备注" prop="beizhu" size="medium" style="margin-bottom:20px">
                    <el-input v-model="ruleForm.beizhu" size="medium" style="width: 200px"></el-input>
                </el-form-item>

            </el-form>


            <el-row style="margin-top: 20px;margin-bottom: 50px">
                <el-col :span="6" :offset="9">
                    <el-button plain size="medium" @click="luru">录入库存</el-button>
                </el-col>
            </el-row>

        </div>
    </div>

</template>

<script>
    import contaUrl from "../../public/js/contaUrl";
    import lrz from 'lrz'

    export default {
        data() {
            return {
                templateRadio: '',
                checkLock: true,
                lock: '',
                find1: '1',
                place: '',
                checkBox: true,
                search: '',
                dialogVisible: false,
                radio: '',
                pageSize: 5, // 每页大小默认值
                pageIndex: 1, // 默认第一页
                // search: '',
                tableData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,

                show: false,
                imgUrls: [],
                urlArr: [],
                isPhoto: true,
                btnTitle: '',
                isModify: false,
                previewImg: '',
                isPreview: false,

                drawer: null,
                options: [],
                option1s: [],
                ruleForm: {
                    court: '',
                    name: '',
                    norm: '',
                    identifier: '',
                    region: '',
                    unit: '',
                    number: '',
                    money: '',
                    daohuobianhao: '',
                    supplier: '',
                    arrivaltime: '',
                    upload: '',
                    beizhu: '',
                    role: '',
                    // mainPage: ''
                    lock: '',
                    place: '',
                    find: ''
                },
                fileList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入材料名称', trigger: 'blur'},
                        //{ min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                    ],
                    norm: [
                        {required: true, message: '请输入材料规格', trigger: 'blur'},
                    ],
                    region: [
                        {required: true, message: '请选择材料分类', trigger: 'change'}
                    ],
                    court: [
                        {required: true, message: '请选择项目部', trigger: 'change'}
                    ],
                    identifier: [
                        {required: true, message: '请输入到货编号', trigger: 'blur'},
                    ],
                    unit: [
                        {required: true, message: '请输入计量单位', trigger: 'blur'},
                    ],
                    daohuobianhao: [
                        {required: true, message: '请输入归属申请人', trigger: 'blur'},
                        //{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ],
                    supplier: [
                        {required: true, message: '请输入供应商', trigger: 'blur'},
                        //{ min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                    ],
                    arrivaltime: [
                        {required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    number: [
                        {required: true, message: '请输入数量', trigger: 'blur'},
                        //{ type: 'number', message: '数量必须为数字',trigger: 'blur' }
                    ],
                    money: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        //{ type: 'number', message: '金额必须为数字',trigger: 'blur'}
                    ],
                    lock: [
                        {required: true, message: '请输入未到货数量', trigger: 'blur'},
                        //{ type: 'number', message: '金额必须为数字',trigger: 'blur'}
                    ],
                    place: [
                        {required: true, message: '请输入申请数量', trigger: 'blur'}
                    ],
                    find1: [
                        {required: true, message: '请选择是否全部到货', trigger: 'blur'}
                    ]


                },
                rowPlanAmount: '',
                rowArrviedNumber: '',
                rowRecordNumber: ''
            }
        },
        watch: {
            imgUrls: 'toggleAddPic',
            // 检测表格数据过滤变化，自动跳到第一页
            tables() {
                this.pageIndex = 1
            }
        },
        mounted: function () {
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

            this.$axios.get(contaUrl.contaUrl + '/user/getUserSites', {
                params: {
                    token: sessionStorage.getItem('token')
                }
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
                    if (this.ruleForm.court == '') {
                        this.ruleForm.court = this.option1s[0].value;
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        methods: {
            getIndex: function () {
                this.dialogVisible = false;
                this.place = this.rowPlanAmount;
                this.lock = this.rowPlanAmount - this.rowArrviedNumber;
                console.log(this.templateRadio)
                if (this.templateRadio == '') {
                    this.dialogVisible = true;
                    this.$message.error('请勾选申请编号!')
                } else {
                    this.dialogVisible = false;
                }
            },
            getTemplateRow(index, row) {
                console.log(this.templateSelection = row)
                console.log(row.planAmount)
                // row.arrviedNumber = 100;
                console.log(row.arrviedNumber)
                console.log(row.recordNumber)
                this.rowRecordNumber = row.recordNumber;
                this.rowPlanAmount = row.planAmount;
                this.rowArrviedNumber = row.arrviedNumber;
            },
            plaese() {
                this.dialogVisible = true;
                var param = {
                    siteId: this.ruleForm.court,
                }
                if (this.search !== '') {
                    param.searchContent = this.search;
                }

                this.$axios.get(contaUrl.contaUrl + '/apply/getAllUnArrivedList', {
                    params: param
                }).then((response) => {
                    if (response.data.code == 200) {
                        // console.log(response.data.data.applyList);
                        this.tableData = response.data.data.applyList;
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            // 前端过滤
            format(val) {
                val = val.toString()
                if (val.indexOf(this.search) !== -1 && this.search !== '') {
                    return val.replace(this.search, '<font color="red">' + this.search + '</font>')
                } else {
                    return val
                }
            },
            handleSizeChange(val) {
                this.pageSize = val
            },
            handleCurrentChange(val) {
                this.pageIndex = val
            },
            siteTableHeader() {
                return 'sws-table-header'
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2) {
                    return 'warning-row'
                } else {
                    return 'success-row'
                }
            },

            /* photo */
            toggleAddPic: function () {
                let vm = this;
                console.log(vm.imgUrls)
                if (vm.imgUrls.length >= 1) {
                    vm.isPhoto = false;
                } else {
                    vm.isPhoto = true;
                }
            },
            addPic: function (e) {
                let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
                els[0].click()
                return false
            },
            onFileChange: function (e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files, e);
            },
            createImage: function (file, e) {
                let vm = this;
                lrz(file[0], {
                    width: 480
                }).then(function (rst) {
                    vm.imgUrls.push(rst.base64);
                    return rst;
                }).always(function () {
// 清空文件上传控件的值
                    e.target.value = null;
                });
            },
            delImage: function (index) {
                let vm = this;
                vm.$vux.confirm.show({
                    title: '确定删除该图片?',
                    onConfirm() {
                        vm.imgUrls.splice(index, 1);
                    }
                })

            },
            previewImage: function (url) {
                let vm = this;
                vm.isPreview = true;
                vm.previewImg = url;
            },
            closePreview: function () {
                let vm = this;
                vm.isPreview = false;
                vm.previewImg = "";
            },
            saveImage: function () {
                let vm = this;
                let urlArr = [],
                    imgUrls = this.imgUrls;

                for (let i = 0; i < imgUrls.length; i++) {
                    if (imgUrls[i].indexOf('file') == -1) {
                        urlArr.push(imgUrls[i].split(',')[1]);
                    } else {
                        urlArr.push(imgUrls[i]);
                    }
                }
//数据传输操作
            }
            ,
            query: function () {
                this.$router.push('query')
            }
            ,
            apply: function () {
                this.$router.push('apply')
            }
            ,
            input: function () {
                // this.$router.push('input')
                window.location.reload();
            }
            ,
            ordinary: function () {
                this.$router.push('ordinary')
            }
            ,
            water: function () {
                this.$router.push('record')
            }
            ,
            money: function () {
                this.$router.push('money')
            }
            ,
            homepage: function () {
                this.$router.push('homepage')
            }
            ,
            stop: function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                this.$router.push('/')
            }
            ,
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
            }
            ,
            back: function () {
                // window.history.back(-1)
                this.$router.push('homepage')
            }
            ,
            handleRemove(file, fileList) {
                console.log(file, fileList);
            }
            ,
            handlePreview(file) {
                console.log(file);
            }
            ,
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
            ,
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            }
            ,
            luru: function () {
                var params = new FormData();
                params.append('recordNumber', this.rowRecordNumber);
                params.append('amount', this.ruleForm.number);
                params.append('unitPrice', this.ruleForm.money);
                params.append('provider', this.ruleForm.supplier);
                params.append('img', this.imgUrls[0]);
                params.append('comment', this.ruleForm.beizhu)
                params.append("token", sessionStorage.getItem("token"));
                this.$axios.post(contaUrl.contaUrl + '/inventory/record', params).then((response) => {
                    if (response.data.code == 200) {
                        console.log(response.data.data)
                        this.$message({
                            message: '恭喜你，录入成功',
                            type: 'success'
                        });
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000)
                        if (this.templateRadio == '') {
                            this.$message.error('录入失败!');
                        }
                    } else {
                        this.$message.error('录入失败!');
                    }
                }).catch((error) => {
                    console.log(error);
                })


            }
        }
        ,
        computed: {
            // 前端过滤
            tables() {
                const search = this.search
                if (search) {
                    return this.tableData.filter(dataNews => {
                        return Object.keys(dataNews).some(key => {
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
            ,
            // 总条数
            total() {
                return this.tables.length
            }
        }
    }
</script>

<style>
    .list-ul {
        list-style: none;
        /* 去掉ul前面的符号 */
        margin: 0px;
        /* 与外界元素的距离为0 */
        padding: 0px;
        /* 与内部元素的距离为0 */
        /* 宽度根据元素内容调整 */
    }

    /* 所有class为menu的div中的ul中的li样式 */

    .list-li {
        float: left;
        /* 向左漂移，将竖排变为横排 */
        /* 与内部元素的距离为0 */
        display: inline-block;
        position: relative;
        text-align: center;
    }

    .list-link img {
        width: 50px;
        height: 50px;
    }

    /* 所有class为menu的div中的ul中的a样式(包括尚未点击的和点击过的样式) */

    .list-link a:visited {
        background-color: #465c71;
        /* 背景色 */
        border: 1px #4e667d solid;
        /* 边框 */
        color: #dde4ec;
        /* 文字颜色 */
        display: flex;
        /* 此元素将显示为块级元素，此元素前后会带有换行符 */
        line-height: 1.35em;
        /* 行高 */
        padding: 4px 20px;
        /* 内部填充的距离 */
        text-decoration: none;
        /* 不显示超链接下划线 */
        white-space: nowrap;
        /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
        overflow: hidden;
    }

    /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */

    .list-link a:hover {
        background-color: #bfcbd6;
        /* 背景色 */
        color: #465c71;
        /* 文字颜色 */
        text-decoration: none;
        /* 不显示超链接下划线 */
    }

    /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */

    .list-link a:active {
        background-color: #465c71;
        /* 背景色 */
        color: #cfdbe6;
        /* 文字颜色 */
        text-decoration: none;
        /* 不显示超链接下划线 */
    }

    .list-img-close {
        border-color: #ff4a00;
        background-position: center;
        background-size: 35px 35px;
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 5%;
        left: 71%;
        margin-top: 0px;
        margin-left: 0px;
        padding: 8px;
        z-index: 10;
        border-radius: 5px;
        text-align: center;
    }

    .add-img {
        display: block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100px 100px;
    }

    /*    .el-form-item__label {
            padding-right: 5px !important;
        }*/

</style>