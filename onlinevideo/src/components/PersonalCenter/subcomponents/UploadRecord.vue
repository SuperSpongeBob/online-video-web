<template>
    <el-divider content-position="center">历史专辑</el-divider>

    <el-card>
        <el-table :data="AlbumData" style="width: 99%" max-height="250">
            <el-table-column fixed="left" prop="name" label="专辑名" width="180" />
            <el-table-column prop="id" label="专辑id" width="120" />
            <el-table-column prop="last" label="最新集数" width="120" />
            <el-table-column prop="director" label="导演" width="120" />
            <el-table-column prop="channel" label="频道" width="120" />
            <el-table-column prop="area" label="地区" width="120" />
            <el-table-column prop="actor" label="演员" width="180" />
            <el-table-column fixed="right" label="操作" width="180">

                <template #default="scope">

                    <el-popover placement="bottom-start" :width="900" trigger="click">
                        <template #reference>
                            <el-button link type="primary" @click="viewDetail(scope.row)">查看详情</el-button>
                        </template>

                        <el-table :data="popoverVideoData" max-height="240">
                            <el-table-column fixed="left" width="50" property="id" label="id" />
                            <el-table-column width="150" property="name" label="视频名称" />
                            <el-table-column width="100" property="status" label="审核状态">
                                <template #default="scope">
                                    <span :style="getStatusColor(scope.row.status)">{{ scope.row.status }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="250" property="title" label="标题" />
                            <el-table-column fixed="right" label="Operations" width="200">
                                <template #default="scope">
                                    <el-button link type="primary" @click="playVideo(scope.row)">播放视频</el-button>
                                    <el-popconfirm title="Are you sure to delete this?"
                                        @confirm="deleteVideo(scope.row)">
                                        <template #reference>
                                            <el-button link type="danger">下架视频</el-button>
                                        </template>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-popover>

                    <el-popconfirm title="Are you sure to delete this?" @confirm="deleteAlbum(scope.row)">
                        <template #reference>
                            <el-button link type="danger">删除专辑</el-button>
                        </template>
                    </el-popconfirm>
                </template>

            </el-table-column>
        </el-table>
    </el-card>

    <el-divider content-position="center">历史视频</el-divider>

    <el-card>
        <el-table :data="videoData" style="width: 99%;" max-height="240">
            <el-table-column fixed="left" width="50" property="id" label="id" />
            <el-table-column width="150" property="name" label="视频名称" />
            <el-table-column width="100" property="status" label="审核状态">
                <template #default="scope">
                    <span :style="getStatusColor(scope.row.status)">{{ scope.row.status }}</span>
                </template>
            </el-table-column>
            <el-table-column width="240" property="title" label="标题" />
            <el-table-column fixed="right" label="Operations" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="playVideo(scope.row)">播放视频</el-button>
                    <el-popconfirm title="Are you sure to delete this?" @confirm="deleteVideo(scope.row)">
                        <template #reference>
                            <el-button link type="danger">下架视频</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <el-dialog v-model="centerDialogVisible" width="1000" align-center>

        <video id="myVideo" controls controlsList="nodownload" :src="url"
            style="width: 100%; height: 60%;object-fit: contain;max-width: 90vw;max-height: 80vh;;">
            您的浏览器不支持视频播放。
        </video>
        <div>审核状态：<span :style="getStatusColor(this.dialogVideoData.status)">{{ this.dialogVideoData.status }}</span>
        </div>
        <div>视频id：{{ this.dialogVideoData.id }}</div>
        <div>视频名称：{{ this.dialogVideoData.name }} </div>
        <span>视频标题：{{ this.dialogVideoData.title }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-tooltip content="申诉重新审核" placement="bottom">
                    <el-button type="warning" plain :disabled="this.dialogVideoData.status != '禁播'"
                        @click="reiterate(dialogVideoData)">重申</el-button>
                </el-tooltip>
                <el-button type="primary" plain @click="previousVideo(dialogVideoData)">上一个</el-button>
                <el-button type="primary" plain @click="nextVideo(dialogVideoData)">下一个</el-button>
            </div>
        </template>

    </el-dialog>

</template>

<script>
import { ref } from 'vue';
import authService from '../../../utils/authService';



export default {
    data() {
        return {
            video: {
                userId: "",
                videoAlbumId: "",
                videoAlbum: {
                    userId: "",
                }
            },
            videoAlbum: {
                userId: ""
            },

            videoData: [],                              //  获取所有的视频数据
            popoverVideoData: [],                       //  存放弹出框所需的视频数据
            AlbumData: [],                              //  专辑数据
            centerDialogVisible: ref(false),             //  对话框是否显示
            url: '',                                     //  对话框中的视频url
            dialogVideoData: [],                         //  存放对话框所需的视频数据
        }
    },
    methods: {
        //  根据不同状态显示不同颜色字体
        getStatusColor(status) {
            switch (status) {
                case "审核通过":
                    return { color: 'green' };
                case "待审核":
                    return { color: 'orange' };
                case "禁播":
                    return { color: 'red' };
                default:
                    return {}
            }
        },

        //  重新申述视频，只针对禁播的视频
        reiterate(row) {
            this.$message.warning({ message: '重申视频：' + row.id, showClose: true })
            //  这里更改videoApprovalStatus为“待审核”即可
        },

        //  对话框中获取上一个视频
        async previousVideo(row) {
            const index = this.videoData.findIndex(item => item.id === row.id)
            if (index !== -1 && index > 0) {
                this.dialogVideoData = this.videoData[index - 1]
                // const response = await axios.get(`http://localhost:8080/api/video/${this.dialogVideoData.id}`);
                // this.url = response.data
                this.url = await authService.videoURL(this.dialogVideoData.id)
            } else {
                this.$message.warning({ message: '已经是第一个视频啦', showClose: true })
            }
        },

        //  对话框中获取下一个视频
        async nextVideo(row) {
            console.log(row.id)
            const index = this.videoData.findIndex(item => item.id === row.id)
            if (index !== -1 && index + 1 < this.videoData.length) {
                this.dialogVideoData = this.videoData[index + 1]
                // const response = await axios.get(`http://localhost:8080/api/video/${this.dialogVideoData.id}`);
                // this.url = response.data
                this.url = await authService.videoURL(this.dialogVideoData.id)
            } else {
                this.$message.warning({ message: '没有更多审核视频', showClose: true })
            }
        },


        //  播放视频
        async playVideo(row) {
            console.log(row.id)
            this.dialogVideoData = row
            this.centerDialogVisible = true
            // const response = await axios.get(`http://localhost:8080/api/video/${row.id}`);  //  根据视频id获取服务器静态资源中的视频地址
            // const response = await axios.get(`http://localhost:8080/static/video?videoId=${row.id}`)
            // this.url = response.data
            // this.url=`http://localhost:8080/static/video?videoId=${row.id}`
            this.url = await authService.videoURL(row.id)
        },
        //  删除专辑
        async deleteAlbum(row) {
            // const hasData = this.videoData.some(item => item.VAId === row.id)
            //  先判断该专辑下是否还有视频
            const video = { videoAlbumId: row.id }
            const existsVideo = await authService.existsVideo(video)
            if (existsVideo.data == true) {      //  判断该专辑下是否还有视频
                this.$message.warning({ message: '请先删除该专辑下的所有视频' + row.id, showClose: true })
            } else {
                const album = { videoAlbumId: row.id }
                const response = await authService.deleteAlbum(album)
                if (response.status == 200) {
                    this.AlbumData = this.AlbumData.filter(item => item.id !== row.id)
                    this.$message.warning({ message: '删除专辑' + row.id, showClose: true })
                } else {
                    this.$message.error({ message: 'error!!!删除异常' })
                }

            }
        },
        //  删除视频
        async deleteVideo(row) {
            //  根据id过滤掉数据、根据id删除数据
            const response = await authService.deleteVideo(row.id)
            if (response.status == 200) {
                this.videoData = this.videoData.filter(item => item.id !== row.id)
                this.popoverVideoData = this.popoverVideoData.filter(item => item.id !== row.id)
                this.$message.warning({ message: '下架视频：' + row.id, showClose: true })
            } else {
                this.$message.error({ message: 'error!!!删除视频失败' })
            }

        },

        //  根据专辑id查看详情视频信息
        async viewDetail(row) {
            this.video.videoAlbumId = row.id
            // 过滤出 VAId 为 row.id 的数据并赋值给 popoverVideoData
            this.popoverVideoData = this.videoData.filter(item => item.VAId === row.id);
            console.log(row)
            console.log(this.popoverVideoData)
        },

        //  根据用户id获取专辑
        async getVideoAlbum() {
            // const userId = 41
            this.videoAlbum.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
            try {
                // const response = await axios.post(`http://localhost:8080/api/videoAlbums`, this.videoAlbum, { withCredentials: true });
                const response = await authService.getVideoAlbums(this.videoAlbum)
                console.log(response.data)

                //  将数据映射到AlbumData中
                this.AlbumData = response.data.map(item => ({
                    id: item.videoAlbumId,
                    last: item.videoLastUpdate,
                    date: item.videoReleaseDate,
                    name: item.videoAlbumName,
                    director: item.videoDirector,
                    channel: item.videoChannel,
                    area: item.videoArea,
                    actor: item.videoActor,
                }))


            } catch (error) {
                console.error(error)
            }
        },

        //  根据用户id获取视频信息
        async getVideo() {
            // this.videoAlbum.userId = 41
            //  从当前会话中获取用户Id
            this.video.videoAlbum.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
            // const response = await axios.post('http://localhost:8080/api/videos', this.video)
            const response = await authService.getVideos(this.video)
            // console.log(response.data)

            //  将数据映射到videoData中
            this.videoData = response.data.map(item => ({
                id: item.videoId,
                VAId: item.videoAlbumId,
                name: item.videoName,
                status: item.videoApprovalStatus,
                title: item.videoTitle,
                url: item.videoPath
            }))
        }
    },
    mounted() {
        this.getVideoAlbum()
        this.getVideo()
    }
}
</script>







<!-- <template>
    <el-card>
        <h3>历史专辑</h3>
        <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed="left" prop="name" label="Name" width="180" />
            <el-table-column prop="id" label="id" width="120" />
            <el-table-column prop="last" label="最新集数" width="120" />
            <el-table-column prop="director" label="Director" width="120" />
            <el-table-column prop="channel" label="Channel" width="120" />
            <el-table-column prop="area" label="Area" width="120" />
            <el-table-column prop="actor" label="Actor" width="180" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default="scope">
                    <el-button link type="primary" @click="editItem(scope.row)">Select</el-button>
                    <el-button link type="primary" @click="deleteItem(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';


export default {
    data() {
        return {
            tempVAData: ref([]),
            tableData: ref([]),
            videoAlbum: {
                userId: ""
            }
        }
    },
    methods: {
        editItem(row){
            console.log(row.id)
        },
        async getVideoAlbum() {
            // const userId = 41
            this.videoAlbum.userId = 41
            try {
                const response = await axios.post(`http://localhost:8080/api/videoAlbums`, this.videoAlbum);
                console.log(response.data)
                //   responseData.value=response.data
                this.tempVAData = response.data
                this.tableData = response.data.map(item => ({
                    id: item.videoAlbumId,
                    last: item.videoLastUpdate,
                    date: item.videoReleaseDate,
                    name: item.videoAlbumName,
                    director: item.videoDirector,
                    channel: item.videoChannel,
                    area: item.videoArea,
                    actor: item.videoActor,
                    id: item.videoAlbumId
                }));
                console.log(this.tableData)
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.getVideoAlbum()
    }
}
</script> -->