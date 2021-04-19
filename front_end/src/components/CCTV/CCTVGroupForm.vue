<template>
    <body>
        <div>
            <thead>
                <strong> 그룹 목록 </strong>
                <button @click="makeGroup()"> 추가 </button>
                <button @click="ShowGroupUpdateModal()"> 수정 </button>
                <button @click="delGroup(checkedGroup)"> 삭제 </button>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll" ></td>
                    <td><strong> 그룹명 </strong></td>
                </tr>
                <tr v-for="(group, i) in groups" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="group.id" v-model="checkedGroup"></td>
                    <td><span> {{ group.name }}  </span></td>
                </tr>
            </tbody>
        </div>
        <div>
            <thead>
                <strong> 카메라 목록 </strong>
                <button @click="loadCCTV()"> 조회 </button>
                <button @click="insertGroupID()"> 추가 </button>
                <button > 삭제 </button>
            </thead>

            
        </div>
        <!-- <thead>
            <strong> 녹화장치 정보 </strong>
            <button @click="ShowInsertModal()"> 추가 </button>
            <button @click="ShowUpdateModal()"> 수정 </button>
            <button @click="delRecoInfo(checkedReco)"> 삭제 </button>
        </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 서버이름 </strong></td>
                        <td><strong> IP 주소 </strong></td>
                        <td><strong> 업체명 </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(RecoInfo, i) in RecoInfos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="RecoInfo.id" v-model="checkedReco"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td><span> {{ RecoInfo.serverName }} </span></td>
                    <td><span> {{ RecoInfo.ipAddress }} </span></td>
                    <td><span> {{ RecoInfo.vendor }} </span></td>
                </tr>
            </tfoot> -->
        <!-- <RecoInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRecoInfo()">
        </RecoInsert> -->

        <GroupUpdate :group_id.sync="group_id" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getGroup()">
        </GroupUpdate>
        <InsertGroupId :group_id.sync="group_id" v-if="insertGroupIDModal" @close="insertGroupIDModal = false" v-on:close="getGroup()">
        </InsertGroupId>
    </body>
</template>

<script>
import GroupUpdate from './Modals/CCTVGroup/UpdateModal.vue'
import InsertGroupId from './Modals/CCTVGroup/InsertGroupId.vue';

export default {
    mounted() {
        this.getGroup()
    },
    data() {
        return {
            UpdateModal: false,
            insertGroupIDModal: false,
            selectAll: false,
            groups:[],
            checkedGroup:[],
            group_id: '',
            selected: '',
        }
    },
    methods: {
        checkAll() {
            this.checkedGroup = [];
            if(!this.selectAll) {
                for(let i in this.groups) {
                    this.checkedGroup.push(this.groups[i].id)
                }
            }
        },
        getGroup () {
            this.$http.get('http://localhost:3000/group_data')
            .then((res) => {
                this.groups = res.data
            })
        },
        makeGroup() {
            this.$http.post('http://localhost:3000/group_data', {
                name: '새 그룹',
                control: false,
            })
            .then((res) => {
                this.groups.push(res.data);
            })

            this.getGroup();
        },
        ShowGroupUpdateModal() {
            if(0 == this.checkedGroup.length)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.checkedGroup.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                this.group_id = this.checkedGroup[0];
                this.UpdateModal = !this.UpdateModal;
            }
        },
        delGroup (checkedGroup) {
            if(this.checkedGroup.length == 0)
            {
                alert('그룹을 선택하세요')
            }
            else {
                for(let i = 0; i < checkedGroup.length; i++)
                {
                    this.$http.delete('http://localhost:3000/group_data/'+checkedGroup[i])
                .then((res) => {
                    this.getGroup()
                 })
                }
            }
            
            this.checkedGroup = [];
        },
        loadCCTV() {

        },
        insertGroupID() {
            if(0 == this.checkedGroup.length)  {
                alert('그룹을 선택해주세요.')
            }
            else if (this.checkedGroup.length > 1) {
                alert('그룹을 하나만 선택해주세요.')
            }
            else {
                this.group_id = this.checkedGroup[0];
                this.insertGroupIDModal = !this.insertGroupIDModal;
            }
        },
        // ShowInsertModal() {
            
        //         this.InsertModal = !this.InsertModal;
        // },
        // ShowUpdateModal() {
        //     if(0 == this.checkedReco.length)  {
        //         alert('녹화장치를 선택해주세요.')
        //     }
        //     else if (this.checkedReco.length > 1) {
        //         alert('녹화장치를 하나만 선택해주세요.')
        //     }
        //     else {
        //         this.recoId = this.checkedReco[0];
        //         this.UpdateModal = !this.UpdateModal;
        //     }
        // }
    },
    components: {
        // RecoInsert: RecoInsert,
        // RecoUpdate: RecoUpdate,
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