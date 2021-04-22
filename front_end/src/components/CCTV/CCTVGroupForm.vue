<template>
    <body>
        <span>
            <thead>
                <strong> 그룹 목록 </strong>
                <button @click="makeGroup()"> 추가 </button>
                <button @click="ShowGroupUpdateModal()"> 수정 </button>
                <button @click="delGroup()"> 삭제 </button>
            </thead>
            <tbody>
                <tr>
                    <td><strong> 그룹명 </strong></td>
                </tr>
                <tr>
                    <select v-model="Group_Name" multiple>
                        <option v-for="(Group_Info, i) in Group_Infos" :key="i">
                            <span :value="Group_Info.id" > {{ Group_Info.name }} </span>
                        </option>
                    </select>
                </tr>
                {{Group_Name}}
            </tbody>
        </span>
        <span>
            <thead>
                <strong> 카메라 목록 </strong>
                <button @click="getCCTVInfos()"> 초기화 </button>
                <button @click="loadCCTVinGroup()"> 조회 </button>
                <button @click="insertGroupID()"> 추가 </button>
                <button @click="delCCTVGroup()"> 삭제 </button>
            </thead>
            <tbody>
                <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll" ></td>
                <td><strong> 번호 </strong></td>
                <td><strong> 사용 </strong></td>
                <td><strong> 장치 이름 </strong></td>
                <td><strong> 모델명 </strong></td>
                <td><strong> 주소 </strong></td>
                <td><strong> 웹 포트 </strong></td>
                <td><strong> 서비스 포트 </strong></td>
                <td><strong> 제조사 </strong></td>
                <td><strong> 장치 종류 </strong></td>
            </tbody>
            <tfoot>
                <tr v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="CCTV_Info.id" v-model="checkedCCTV"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td>
                        <span v-if="CCTV_Info.ptz_control_usage == 1"> 정상 </span>
                        <span v-else-if="CCTV_Info.ptz_control_usage == 0"> 고장 </span>
                    </td>
                    <td><span> {{ CCTV_Info.name }} </span></td>
                    <td><span> {{ CCTV_Info.model }} </span></td>
                    <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }}</span></td>
                    <td><span> {{ CCTV_Info.manage_port }} </span></td>
                    <td><span> {{ CCTV_Info.rtsp_port }} </span></td>
                    <td><span> {{ CCTV_Info.manufacturer }} </span></td>
                    <td><span> {{ CCTV_Info.camera_type }} </span></td>
                </tr>
            </tfoot>
        </span>

        <GroupUpdate :group_id.sync="group_id" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getGroupInfos()">
        </GroupUpdate>
        <InsertGroupId :group_id.sync="group_id" v-if="InsertModal" @close="InsertModal = false" v-on:close="loadCCTVinGroup()">
        </InsertGroupId>
    </body>
</template>

<script>
import GroupUpdate from './Modals/CCTVGroup/UpdateModal.vue'
import InsertGroupId from './Modals/CCTVGroup/InsertGroupId.vue';

export default {
    mounted() {
        this.getGroupInfos();
        this.getCCTVInfos();
    },
    data() {
        return {
            Group_Infos:[],
            CCTV_Infos:[],
            checkedCCTV: [],
            selectAll : false,
            Group_Name : [],
            group_id: 0,
            UpdateModal:false,
            InsertModal: false,
            Copy_CCTV: []
        }
    },
    methods: {
        getGroupInfos () {
            this.$http.get('http://localhost:3000/cctvgroup_infos')
            .then((res) => {
                this.Group_Infos = res.data
            })
        },
        getCCTVInfos() {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTV_Infos = res.data
            })
        },
        makeGroup() {
            this.$http.post('http://localhost:3000/cctvgroup_infos', {
                name: '새 그룹'
            })
            .then((res) => {
                this.Group_Infos.push(res.data);
            })

            this.getGroupInfos();
        },
        delGroup () {
            for(let i = 0; i < this.Group_Name.length; i++){
                for(let j = 0; j < this.Group_Infos.length; j++) {
                    if(this.Group_Name[i] == this.Group_Infos[j].name) {
                        this.$http.delete('http://localhost:3000/cctvgroup_infos/'+this.Group_Infos[j].id)
                        .then((res) => {
                            this.getGroupInfos();
                        })
                    }
                }
            }
        },
        ShowGroupUpdateModal() {
            if(this.Group_Name.length == 0)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.Group_Name.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name[0]) {
                        this.group_id = this.Group_Infos[i].id
                    }
                }
                this.UpdateModal = !this.UpdateModal;
            }
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.CCTV_Infos) {
                    this.checkedCCTV.push(this.CCTV_Infos[i].id)
                }
            }
        },
        loadCCTVinGroup() {
            if(this.Group_Name.length == 0)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.Group_Name.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name[0]) {
                        this.group_id = this.Group_Infos[i].id
                    }
                }
            }

            if(this.CCTV_Infos.length > 0) {
                this.CCTV_Infos = [];
            }

            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.Copy_CCTV = res.data
            })

            for(let i = 0; i < this.Copy_CCTV.length; i++) {
                if(this.Copy_CCTV[i].group_id == this.group_id) {
                    this.CCTV_Infos.push({
                        id: this.Copy_CCTV[i].id,
                        ptz_control_usage: this.Copy_CCTV[i].ptz_control_usage,
                        name: this.Copy_CCTV[i].name,
                        model: this.Copy_CCTV[i].model,
                        area1: this.Copy_CCTV[i].area1,
                        area2: this.Copy_CCTV[i].area2,
                        area3: this.Copy_CCTV[i].area3,
                        manage_port: this.Copy_CCTV[i].manage_port,
                        rtsp_port: this.Copy_CCTV[i].rtsp_port,
                        manufacturer: this.Copy_CCTV[i].manufacturer,
                        camera_type: this.Copy_CCTV[i].camera_type,
                    })
                }
            }

            this.Copy_CCTV = [];
        },
        insertGroupID() {
            if(this.Group_Name.length == 0)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.Group_Name.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name[0]) {
                        this.group_id = this.Group_Infos[i].id
                    }
                }
                this.InsertModal = !this.InsertModal;
            }
        },
        delCCTVGroup() {
            if(this.Group_Name.length == 0)  {
                alert('그룹을 선택해주세요.')
                this.getCCTVInfos();
            }
            else if (this.Group_Name.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
                this.getCCTVInfos();
            }
            else {
                for(let i = 0; i < this.checkedCCTV.length; i++) {
                    this.$http.patch('http://localhost:3000/cctv_infos/'+this.checkedCCTV[i], {
                        group_id: 0
                    })
                    .then((res) => {
                        this.loadCCTVinGroup();
                    })
                }
                checkedCCTV = [];
            }
            
            
        }
    },
    components: {
        GroupUpdate: GroupUpdate,
        InsertGroupId: InsertGroupId,
    },
}
</script>


<style scoped>
.tBody {
    border: 3px solid black;
}

td {
    border: 1px solid #bcbcbc;
}


</style>