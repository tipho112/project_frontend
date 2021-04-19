<template>
    <body>
        <table>
            <thead>
                <strong> 녹화장치 정보 </strong>
                <button @click="ShowInsertModal()"> 추가 </button>
                <button @click="delRecoInfo(checkedGroup)"> 삭제 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소 </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델 </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(GroupInfo, i) in GroupInfos" :key="i" class="list-unstyled">
                    <td><input type="checkbox" :value="GroupInfo.id" v-model="checkedGroup"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td><span> {{ GroupInfo.name }} </span></td>
                    <td><span> {{ GroupInfo.address }} </span></td>
                    <td><span> {{ GroupInfo.vendor }} </span></td>
                    <td><span> {{ GroupInfo.manufacturer }} </span></td>
                </tr>
            </tfoot>
        </table>

        <!-- <RecoInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRecoInfo()">
        </RecoInsert> -->

    </body>
</template>

<script>
// import RecoInsert from './Modals/RecoInsert.vue';
// import RecoUpdate from './Modals/RecoUpdate.vue';

export default {
    mounted() {
        this.getGroupInfo()
    },
    data() {
        return {
            InsertModal: false,
            selectAll: false,
            GroupInfos:[],
            checkedGroup:[],
            recoId: '',
        }
    },
    methods: {
        checkAll() {
            this.checkedGroup = [];
            if(!this.selectAll) {
                for(let i in this.GroupInfos) {
                    this.checkedGroup.push(this.GroupInfos[i].id)
                }
            }
        },
        getGroupInfo () {
            this.$http.get('http://localhost:3000/RecoInfoData')
            .then((res) => {
                this.GroupInfos = res.data
            })
        },
        delRecoInfo (checkedGroup) {
            if(this.checkedGroup.length == 0)
            {
                alert('그룹을 선택하세요')
            }
            else {
                for(let i = 0; i < checkedGroup.length; i++)
                {
                    this.$http.delete('http://localhost:3000/RecoInfoData/'+checkedGroup[i])
                .then((res) => {
                    this.getGroupInfo()
                 })
                }
            }
            this.checkedGroup = [];
        },
        ShowInsertModal() {
            
                this.InsertModal = !this.InsertModal;
        },
    },
    components: {
        // RecoInsert: RecoInsert,
        // RecoUpdate: RecoUpdate,
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