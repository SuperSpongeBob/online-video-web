<template>
    <div style="display: flex;">

        <div style="width: 80%;">
            <!-- 视频容器 -->
            <div class="video-container">
                <video ref="videoRef" @timeupdate="handleTimeUpdate" @pause="handlePause" @play="handlePlay"
                    id="myVideo" controls muted controlsList="nodownload" :src="url" autofocus
                    style="width: 100%; max-height: 80vh;object-fit: contain;">
                    您的浏览器不支持视频播放。
                </video>
                <!-- 弹幕容器 -->
                <div class="danmaku-container" ref="danmakuContainer" v-if="showDanmakus">
                    <div v-for="(danmaku, index) in currentDanmakus" :key="index" :style="{
                        top: danmaku.top + 'px',
                        animationDuration: danmaku.duration + 's',
                        left: '100%',
                        animationPlayState: danmaku.paused ? 'paused' : 'running',
                        willChange: 'transform'
                    }" class="danmaku">
                        {{ danmaku.text }}
                    </div>
                </div>
                <!-- 发送弹幕输入框和按钮 -->
                <div style="text-align: center;">
                    <el-input v-model="danmakuText" placeholder="输入弹幕内容" @keyup.enter="sendDanmaku" maxlength="30"
                        clearable style="max-width: 500px;flex: 1;">
                        <template #append>
                            <el-button icon="Promotion" @click="sendDanmaku"></el-button>
                        </template>
                    </el-input>
                    &nbsp;
                    <!-- 显示/隐藏弹幕按钮 -->
                    <el-switch v-model="showDanmakus" class="ml-2" inline-prompt active-text="弹幕" inactive-text="弹幕" />
                </div>

            </div>

            <h3>{{ this.videoName }}</h3>
            <span>{{ this.VIP === '2' ? "VIP" : "免费" }}视频</span>
            <h4>标题：{{ this.videoTitle }}</h4>
        </div>


        <div style="width: 20%;">

            <div @scroll="handleScroll"
                style="height: 96vh;position: relative;overflow-y: auto;  border-left: 1px solid #ccc; scrollbar-width: none;">
                <el-card v-if="comments.length > 0" v-for="comment in comments" @click="Reply"
                    :key="comment.videoCommentId">
                    <p>{{ comment.userName }}</p>
                    <p>&nbsp;&nbsp;&nbsp; {{ comment.videoCommentContent }}</p>
                    <p style="font-size:small;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：{{ comment.videoCommentTime }}</p>
                </el-card>

                <div v-else style="text-align: center;">
                    暂时没有评论
                </div>

            </div>

            <div>
                <el-input v-model="addComment.videoCommentContent" maxlength="100" :rows="2" clearable
                    placeholder="评论内容">
                    <template #append>
                        <el-button icon="Promotion" @click="AddComment"></el-button>
                    </template>
                </el-input>
                <!-- <el-button type="primary" @click="AddComment">提交评论</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import authService from '../utils/authService';

export default {
    data() {
        return {
            url: '',                 // 替换为你的视频文件路径
            videoName: '',
            videoTitle: '',
            VIP: '',
            commentContent: '',
            comments: [],            //存储评论数据的数组
            addComment: {
                userName: '',
                videoCommentContent: "",
                videoCommentTime: '',
                userId: '',
                videoId: ''
            },
            reqComment: {
                videoId: null,       // 视频id
                pageNum: 1,         //  当前页码
                pageSize: 6,
                isLoading: false
            },
            userName: {},
            userInfo: JSON.parse(sessionStorage.getItem("userInfo")),    //  获取登录时保存的用户信息

            //  以下为弹幕数据
            danmakuText: '', // 输入的弹幕内容
            addDanmaku: { videoId: '', text: '', time: '' },     //  添加到数据库
            danmakus: [], // 所有弹幕列表
            currentDanmakus: [], // 当前需要显示的弹幕列表
            trackCount: 30, // 弹幕轨道数量
            trackHeight: 10, // 每条轨道的高度
            danmakuDuration: 10, // 弹幕动画持续时间（秒）
            maxDanmakuCount: 20, // 最大弹幕数量，可根据实际情况调整
            danmakuElements: [],
            intervalId: null,
            showDanmakus: true, // 控制弹幕显示或隐藏的开关

            //  history
            watchedSeconds: null,    //  已观看时间

        };

    },
    computed: {
        //  对评论区的展示顺序按评论时间进行倒序排序，等实现点赞功能后再按点赞数排序
        sortedComments() {
            return this.comments.sort((a, b) => {
                const dateA = new Date(a.videoCommentTime);
                const dateB = new Date(b.videoCommentTime);
                return dateB - dateA;
            });
        }
    },
    methods: {

        //  技术更新，暂时用不上了
        restrict() {
            this.videoPlay()
            const video = document.getElementById('myVideo');

            const maxDuration = 6 * 60 * 1000;      // 6分钟转换为毫秒

            video.addEventListener('timeupdate', () => {
                if (video.currentTime > maxDuration / 1000) {
                    this.$message.warning({ message: '试看时间已结束，请购买完整版观看！', showClose: true })
                    video.pause();
                    video.currentTime = 0;
                }
            });
        },

        //  技术更新，暂时不用
        async verify() {
            return
            //  从url中获取视频ID
            const urlParams = new URLSearchParams(window.location.search)
            const movieId = urlParams.get("movieId")      //获取movieId
            let userId = sessionStorage.getItem("userId")   //  该获取方法弃用
            console.log(userId)
            if (userId == null) {
                userId = "0"
            }
            const response = await axios.get(`http://localhost:8080/api/verify?videoId=${movieId}&userId=${userId}`)

            console.log(response.data)
            if (response.data === true) {
                console.log("可播放")
                this.videoPlay()
            } else {
                this.$message.warning({ message: '非VIP不可观看全部视频，可试看六分钟', showClose: true })
                console.log("不可播放")
                this.restrict()
            }

        },

        async videoPlay() {
            try {
                const urlParams = new URLSearchParams(window.location.search)
                //  movieId为从videoList传来的videoId
                const movieId = urlParams.get("movieId")             //从URL中获取movieId
                this.videoName = urlParams.get("videoName")
                this.videoTitle = urlParams.get("videoTitle")
                this.VIP = urlParams.get("VIP")
                this.reqComment.videoId = this.addComment.videoId = movieId
                this.url = await authService.videoURL(movieId)

                //  验证用户是否可以观看视频，仅用于提示作用，如果该用户是这个视频的作者，即使为VIP视频也可以观看
                const response = await authService.verify(movieId)
                console.log(response)
                //  获取视频信息
                if (response.status == 200) {
                    this.url = await authService.videoURL(movieId)
                    await authService.increasePlayNum(movieId)
                }

            } catch (error) {
                console.error(error)
                if (error.response.status == 401 || error.isUnauthorizedError == true) {
                    this.$message.warning({ message: '视频为VIP视频，非会员禁止观看', showClose: true })
                }
            }

        },

        //  加载更多评论
        async loadMoreComments() {
            // try {
                const urlParams = new URLSearchParams(window.location.search)
                const movieId = urlParams.get("movieId")              //获取movieId
                this.reqComment.videoId = this.addComment.videoId = movieId

                if (this.reqComment.isLoading) return;               // 如果已经在加载，直接返回
                this.reqComment.isLoading = true;                   // 设置加载状态为true
                // console.log(this.reqComment)
                // 获取评论
                // const response = await axios.post(`http://localhost:8080/api/videoComment`, this.reqComment);
                const response = await authService.videoComment(this.reqComment)
                const reGetComments = await response.data;
                this.comments = [...this.comments, ...reGetComments]; // 合并新数据
                // console.log(this.comments)
                this.reqComment.pageNum++;                   // 增加页码
                this.reqComment.isLoading = false;           // 重置加载状态
            // } catch (error) {
            //     console.error(error)
            // }

        },

        //  检测滚动情况
        handleScroll(event) {
            const container = event.target;
            const scrollTop = container.scrollTop;
            const clientHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            //  检查是否滚动到底部
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                this.loadMoreComments();                         // 加载更多评论
            }
        },

        //评论
        async AddComment() {

            try {
                // const urlParams = new URLSearchParams(window.location.search)
                // this.addComment.videoId = urlParams.get("movieId")

                //  从session中获取用户信息
                this.addComment.videoCommentTime = (new Date().toLocaleString());
                const userId = this.userInfo.userId
                console.log(userId)

                if (!this.addComment.videoCommentContent.trim()) {
                    this.$message.warning({ message: '评论内容不能为空', showClose: true });
                    return;
                } else if (userId == null) {
                    this.$message.warning({ message: '登录后即可评论', showClose: true })
                    return;
                } else {
                    this.addComment.userId = userId
                    this.addComment.userName = this.userInfo.userName          //从本地存储获取用户名
                    console.log(this.addComment)
                    this.comments = [this.addComment, ...this.comments]; // 合并新数据
                    // await axios.post('http://localhost:8080/api/addComment', this.addComment);
                    const response = await authService.addComment(this.addComment)
                    if (response.status == 200) {
                        this.addComment = []                                                 //清空评论输入框，避免双向数据绑定
                        this.$message.success({ message: '评论成功', showClose: true });
                    } else {
                        this.$message.error({ message: '出错啦', showClose: true })
                    }

                }
            } catch (error) {
                console.error('提交评论失败：', error);
                this.$message.error({ messsage: '提交评论失败', showClose: true });
            }
        },

        //评论回复功能
        async Reply() {
            this.$message.warning({ message: '暂不支持回复评论功能', showClose: true })
        },
        //  从url中获取视频id
        getVideoIdByURL() {
            const urlParams = new URLSearchParams(window.location.search)
            const movieId = urlParams.get("movieId")              //获取movieId
            return movieId
        },


        //  以下为弹幕操作函数

        //  获取弹幕数据
        async getDanmakus() {
            const danmaku = { videoId: this.getVideoIdByURL() ,userId:46}
            // const response = await axios.post('http://localhost:8080/api/getDanmaku', danmaku)
            const response = await authService.getDanmakus(danmaku)
            const dbDanmakus = response.data
            console.log(dbDanmakus)

            // 为从数据库获取的数据添加top，duration和paused属性
            this.danmakus = dbDanmakus.map(danmaku => ({
                ...danmaku,
                top: Math.floor(Math.random() * this.trackCount) * this.trackHeight,
                duration: this.danmakuDuration,
                paused: false
            }))
        },

        //  发送弹幕
        async sendDanmaku() {
            try {
                if (this.danmakuText.trim() === '') return
                if (this.userInfo.userId == null) {
                    this.$message.warning({ message: '请先登录', showClose: true })
                    return;
                }
                // 记录当前视频时间
                const currentTime = this.video.currentTime
                const danmaku = {
                    text: this.danmakuText,
                    time: currentTime,
                    top: Math.floor(Math.random() * this.trackCount) * this.trackHeight
                }
                //  从url中获取视频ID
                const videoId = this.getVideoIdByURL()      //获取movieId
                this.addDanmaku.videoId = videoId
                this.addDanmaku.userId = this.userInfo.userId
                this.addDanmaku.text = this.danmakuText
                this.addDanmaku.time = currentTime

                // 避免时间为0时服务器出错
                if (this.addDanmaku.time == 0) {
                    this.addDanmaku.time++
                }
                //  添加弹幕数据到服务器
                // const response = await axios.post('http://localhost:8080/api/addDanmaku', this.addDanmaku)
                const response = await authService.addDanmaku(this.addDanmaku)
                if (response.status == 200) {
                    this.danmakus.push(danmaku)
                    console.log(this.danmakus)
                    //  清空输入框
                    this.danmakuText = ''
                    this.$message.success({ message: '发送弹幕成功', showClose: true })
                } else {
                    this.$message.error({ message: '出错啦~~~', showClose: true })
                }
            } catch (error) {
                this.$message.error({ message: '出错啦~~~~', showClose: true })
                console.error(error)
            }
        },

        // 处理视频时间更新事件
        handleTimeUpdate() {
            const currentTime = this.video.currentTime
            // 对弹幕数据按时间排序
            const sortedDanmakus = this.danmakus.sort((a, b) => a.time - b.time);
            //  过滤出当前时间需要显示的弹幕
            const filteredDanmakus = sortedDanmakus.filter(danmaku => {
                return currentTime >= danmaku.time && currentTime < danmaku.time + this.danmakuDuration
            })
            //  只有当过滤后的弹幕列表发生变化时才更新currentDanmakus
            //  为每条弹幕添加而外属性
            if (JSON.stringify(filteredDanmakus) !== JSON.stringify(this.currentDanmakus)) {
                this.currentDanmakus = filteredDanmakus.map(danmaku => {
                    return {
                        ...danmaku,
                        duration: this.danmakuDuration,
                        paused: false
                    }
                })
                // console.log(this.currentDanmakus)

            }

        },

        //  处理视频暂停时间
        handlePause() {
            this.currentDanmakus.forEach(danmaku => {
                danmaku.paused = true
            })
        },

        //  处理视频播放事件
        handlePlay() {
            this.currentDanmakus.forEach(danmaku => {
                danmaku.paused = false
            })
        },
        // 切换弹幕显示或隐藏状态
        toggleDanmakus() {
            this.showDanmakus = !this.showDanmakus;
        },

        //  观看历史记录
        async getHistory() {
            const historyId = localStorage.getItem("historyId")
            console.log(historyId)
            //  立即删除historyId避免影响到后续视频
            localStorage.removeItem('historyId')
            console.log(localStorage.getItem('historyId'))
            if (historyId == null) return

            const condition = {
                historyId: historyId
            }
            console.log(condition)
            const response = await authService.historyByHistoryId(condition)
            console.log(response)
            this.watchedSeconds = response.data.watchedSeconds
            
            


        },

        //  保存观看历史记录
        async saveWatchHistory() {
            const video = this.$refs.videoRef
            const currentTime = Math.floor(video.currentTime)   //  获取当前视频时间
            const historyData = {
                videoId: this.getVideoIdByURL(),
                userId: this.userInfo.userId,
                watchedSeconds: currentTime,
                timestamp:Date.now()
            }
            const jsonData = JSON.stringify(historyData)
            const serverAddress = authService.serverAddress()
            const options = new Blob([jsonData], {
                type: 'application/json'
            });
            navigator.sendBeacon(`${serverAddress}/api/insertHistory`, options)
        }


    },
    mounted() {
        // this.videoPlay();
        this.loadMoreComments()

        this.videoPlay()
        //  禁用右键
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);

        //  获取弹幕数据
        this.getDanmakus()

        this.video = this.$refs.videoRef
        this.danmakuContainer = this.$refs.danmakuContainer
        //  获取所有弹幕元素
        this.danmakuElements = this.danmakuContainer.children

        //  history
        this.getHistory()
        const video = this.$refs.videoRef
        //  监听元数据加载完成事件
        video.addEventListener('loadedmetadata', () => {
            console.log("视频元数据已加载")
            video.currentTime = this.watchedSeconds
            video.play()
        })
        window.addEventListener('beforeunload', this.saveWatchHistory)


        //  离开页面时触发提示框，暂时没什么用，先保留下来
        return
        window.addEventListener('beforeunload', function (e) {
            var confirmationMessage = '确定要离开吗？';
            (e || this.window.Event).returnValue = confirmationMessage; // Gecko + IE
            return confirmationMessage; // Webkit, Safari, Chrome etc.
        });
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.saveWatchHistory)
    }
};
</script>





<style scoped>
.video-container {
    position: relative;
    width: 100%;
    max-width: 80vw;
    /* max-width: 800px; */
    margin: 0 auto;
}

video {
    width: 100%;
    height: auto;
}

.danmaku-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.danmaku {
    position: absolute;
    white-space: nowrap;
    color: white;
    font-size: 16px;
    animation-name: danmakuMove;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes danmakuMove {
    from {
        left: 100%;
    }

    to {
        left: -100%;
    }
}

/* .comment-section {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
} */
</style>