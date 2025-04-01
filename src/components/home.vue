<template>
    <div class="poster-container">
        <el-image
          class="poster-image"
          :src="serverAddress+currentPosterUrl"
          fit="cover"
        />
    </div>
    <el-button @click="test">test</el-button>
  </template>
  
  <script>
import axios from 'axios';
import authService from '../utils/authService';

  export default{
    data(){
        return{
            serverAddress:authService.serverAddress(),
            currentPosterUrl : '/images/3c54e10e-cb96-4921-bd7d-3786d287aece_吞噬星空.jpg'
        }
    },
    methods:{
        async test(){
            const danmaku={userId:46}
            const response = await axios.post('http://localhost:8080/api/getDanmaku',danmaku)
            console.log(response)
  }
    }
  }
  
//   const currentPosterUrl = ("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg")

 
  </script>
  
  <style scoped>
  .poster-container {
    width: 100px;
    height: 100px;
    display: inline-block;
  }
  
  .poster-image {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: block;
  }
  </style>


<!-- <template>
    <div style="position: relative; display: inline-block;">
        <el-image style="width: 100px; height: 100px; cursor: pointer;" :src="currentPosterUrl"
            :preview-src-list="[currentPosterUrl]" fit="cover" @mouseenter="showOptions = true"
            @mouseleave="showOptions = false">
        </el-image>

        <div v-if="showOptions" class="poster-options" @mouseenter="showOptions = true"
            @mouseleave="showOptions = false">
            <el-upload action="/api/upload" :show-file-list="false" :before-upload="beforeUpload"
                :on-success="handleUploadSuccess">
                <el-link type="success">Replace</el-link>
            </el-upload>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const currentPosterUrl = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg');
const showOptions = ref(false);

// 上传前的校验
const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        ElMessage.error('只能上传图片文件！');
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！');
    }

    return isImage && isLt2M;
};

// 上传成功后的回调
const handleUploadSuccess = (response) => {
    currentPosterUrl.value = response.url;  // 假设后端返回新图片 URL
    ElMessage.success('海报替换成功！');
};
</script>

<style scoped>
.poster-options {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    /* background: rgba(0, 0, 0, 0.5); */
}

.poster-options .el-link {
    font-size: 12px;
}
</style> -->


<!-- <template>
    <div style="position: relative;display: inline-block;">
      <el-image
        style="width: 100px; height: 100px;cursor: pointer;"
        :src="url"
        :preview-src-list="[url]"
        fit="cover"
        @mouseenter="showOptions=true"
        @mouseleave="showOptions=false"
      >
      </el-image>
      <div
      v-if="showOptions"
      class="poster-options"
      @mouseenter="showOptions = true"
      @mouseleave="showOptions = false"
    >
      <el-button size="small" @click="handlePreview">预览</el-button>
      <el-upload
        action="/api/upload" 
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
      >
        <el-button size="small">替换</el-button>
      </el-upload>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const showOptions = ref(false)
  const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'

// 点击预览（直接使用 el-image 的预览功能）
const handlePreview = () => {
  // 由于 el-image 已经内置预览，这里不需要额外逻辑
};

// 上传前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('只能上传图片文件！');
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！');
  }

  return isImage && isLt2M;
};

// 上传成功后的回调
const handleUploadSuccess = (response) => {
  currentPosterUrl.value = response.url;  // 假设后端返回新图片 URL
  ElMessage.success('海报替换成功！');
};
  </script>
  <style scoped>
  .poster-options {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  
  .poster-options .el-button {
    padding: 4px 8px;
    font-size: 12px;
  }
  </style> -->


<!-- <template>
    <div>
        <el-button @click="testLimite">testLimite</el-button>
        {{ data }}
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user:{
                userId:24,
                userPhone:178,
                userPassword:'132'
            },
            data: '',
        }
    },
    methods: {
        async testLimite() {
            try{
            // const response=await axios.get('http://localhost:8080/api/test?videoId=2',{withCredentials:true})
            // const response=await axios.get('http://localhost:8080/api/hello/2',{withCredentials:true})
            // const response=await axios.post('http://localhost:8080/api/postTest',this.user,{withCredentials:true})
            // const response=await axios.get('http://localhost:8080/api/exception?videoId=3',{withCredentials:true})
            // const response=await axios.post('http://localhost:8080/api/test',{withCredentials:true})
            const response=await axios.post('http://localhost:8080/api/test1',{withCredentials:true})
            console.log(response)
            if(response.status==200){
                console.log(response.data)
                this.data=response.data
            }
        }catch(error){
            if(error.response.status==429){
                console.error(error)
                this.$message.warning({message:error.response.data.message,showClose:true})
                console.log(error.response.data.message)
            }else{
                console.log('请求失败'+error.message)
            }
        }
        }
    }
}
</script> -->


<!-- <template>
    <div>
        <video :src="url" ref="myVideo" controls muted @timeupdate="updatePercentage"></video>
        <el-button @click="getHistory">getHistory</el-button>
        <p>{{ timestamp }}</p>
        <p>{{ formatedDate }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            url: 'http://localhost:8081/static/video?videoId=38',
            watchedSeconds: null,
            timestamp: null,
            formatedDate: '',
        };
    },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        async getHistory() {
            return
            const condition = {
                // videoId: 38
            }
            const response = await axios.post('http://localhost:8081/api/getHistory', condition)
            console.log(response)
            this.watchedSeconds = response.data[0].watchedSeconds
        },

        saveWatchHistory() {
            return
            const video = this.$refs.myVideo
            const currentTime = Math.floor(video.currentTime)
            const videoId = 38
            const userId = 46
            const data = {
                videoId: videoId,
                userId: userId,
                watch_seconds: currentTime
            }
            const jsonData = JSON.stringify(data)
            const serverAddress = 'http://localhost:8081'
            navigator.sendBeacon(`${serverAddress}/api/test`, jsonData)
            // navigator.sendBeacon('http://localhost:8081/api/test')
        }

    },
    async mounted() {
        this.timestamp = Date.now()
        this.formatedDate = this.formatDate(this.timestamp)
        
        this.getHistory()
        const video = this.$refs.myVideo
        // 监听元数据加载完成事件
        video.addEventListener('loadedmetadata', () => {
            console.log('视频元数据已加载'); // 检查控制台是否有输出
            console.log(this.watchedSeconds)
            video.currentTime = this.watchedSeconds
            video.play();
        });

        window.addEventListener('beforeunload', this.saveWatchHistory)
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.saveWatchHistory)
    }
};
</script> -->


<!-- <template>
    <div class="login-container">
        <el-card class="login-card">
            <el-form>
                <el-form-item label="账号">
                    <el-input placeholder="手机号" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" placeholder="密码" />
                </el-form-item>
                <div style="margin: 3vh; display: flex; justify-content: center;">
                    <el-button style="width: 180px;" type="primary" round>登录</el-button>
                </div>
                <el-form-item>
                    <el-button link style="margin-left: 80%" type="primary" @click="this.$router.push('/register')">
                        前往注册<el-icon><Right /></el-icon>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
</script>

<style scoped>
.login-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: transparent;
}

.login-card {
    max-width: 600px;
    width: 100%;
    padding: 15px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
}

.el-form-item {
    margin-bottom: 5px;
}

.el-form-item__label {
    width: 80px;
}

.el-input {
    width: 240px;
}
</style> -->


<!-- <template>
    <div>
        <el-card>
            <el-form>
            <el-form-item  label="账号">
                <el-input  placeholder="手机号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" placeholder="密码" />
            </el-form-item>
            <div style="margin: 3vh;display: flex;justify-content: center;">
                <el-button style="width: 180px;" type="primary" round >登录</el-button>
            </div>
            <el-form-item>
                <el-button link style="margin-left: 80%" type="primary">
                </el-button>
            </el-form-item>
        </el-form>
        </el-card>
        
    </div>
</template>

<script setup>

</script> -->

<!-- <template>
    <el-input
      v-model="textarea"
      style="width: 240px"
      :rows="2"
      type="textarea"
      placeholder="Please input"
      :suffix-icon="Search"
    />
  </template>
  
  <script lang="ts" setup>
  import { Search } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  const textarea = ref('')
  </script> -->


<!-- <template>
    <img :src="this.url" @error="handleError" />
  </template>
  
  <script>
  // 静态导入图片
  import fallbackImage from '../assets/vue.svg';
  
  export default {
    data() {
      return {
        url: null
      };
    },
    methods: {
      handleError(event) {
        // 使用导入的图片作为备用
        event.target.src = fallbackImage;
      }
    }
  };
  </script> -->



<!-- <template>
    <div class="demo-image__preview">
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="srcList"
        show-progress
        :initial-index="4"
        fit="cover"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
  ]
  </script>
  
  <style scoped>
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .el-icon {
    font-size: 30px;
  }
  .demo-image__error .el-image {
    width: 100%;
    height: 200px;
  }
  </style> -->


<!-- <template>
    <el-bottom>an</el-bottom>
    {{ this.videoIsVip }}
    <el-form>
        <el-form-item label="视频类型">
            <el-select v-model="this.videoIsVip" placeholder="视频类型" clearable>
                <el-option label="免费" value=1 />
                <el-option label="VIP" value=2 />
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            videoIsVip: 2
        }
    }, 
    created(){
        // console.log(this.videoIsVip)
        this.getData()
    },
    methods: {
        async getData() {
            // this.$router.push('/login')
            this.videoIsVip=this.videoIsVip.toString()
        }
    }
}
</script> -->



<!-- <template>
    <div style="display: flex; align-items: center;justify-content: center;height: 100vh;">
        <el-form>
            <el-form-item :data="this.user" label="账号">
                <el-input v-model="user.userPhone" placeholder="手机号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="user.userPassword" placeholder="密码" />
            </el-form-item>
            <div style="margin: 3vh;display: flex;justify-content: center;">
                <el-button style="width: 180px;" type="primary" round @click="submit">登录</el-button>
            </div>
            <el-form-item>
                <el-button link type="primary">
                    <router-link to="/register">前往注册</router-link>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import authService from '../utils/authService';
export default {
    data() {
        return {
            user: {
                userPhone: "18613163197",
                userPassword: "zyx123456"
            },
            route: useRouter()
        }
    },
    methods: {
        async submit() {
            // console.log(this.user)
            try {
                const response = await authService.login(this.user)
                if (response.status == 200) {
                    console.log(response.data[0].userId)
                    this.$message.success({ message: '登录成功', showClose: true })

                    sessionStorage.setItem("LoginState", true),      //登录状态

                        sessionStorage.setItem("userId", response.data[0].userId)        //登录成功后保存从后端传回的userId
                    sessionStorage.setItem("userIsVip", response.data[0].userIsVip)   //用于观看视频时验证是否为VIP
                    localStorage.setItem("userName", response.data[0].userName)       //暂时用于评论时的评论功能
                    this.route.push("/index")

                } else {
                    this.$message.error({ message: '登录失败', showClose: true })
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}

</script> -->


<!-- <template>
    <el-form :model="form"  ref="form">
      
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
    </el-form>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          userPassword: ''
        },
      };
    },
    methods: {
      async submitForm(formName) {
        const response=await axios.delete(`http://localhost:8080/admin/deleteUser/47`)
        if(response.status==200){
            console.log('success')
        }
      }
    }
  };
  </script>
   -->

<!-- <template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select
          v-model="formInline.region"
          placeholder="Activity zone"
          clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="Pick a date"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  
  const formInline = reactive({
    user: '',
    region: '',
    date: '',
  })
  
  const onSubmit = () => {
    console.log(formInline)
  }
  </script>
  
  <style>
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
  
  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
  </style> -->




<!-- <template>
    <el-table :data="tableData" height="400" @scroll="handleScroll" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
    { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    // ... more data
]);

function handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    console.log('Vertical scroll position:', scrollTop);
}
</script>

<style scoped>
/* Add any custom styles here */
</style> -->



<!-- <template>
    <div @scroll="handleScroll" style="max-height: 300px;overflow-y: auto;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  
  export default {
    components: {
      ElTable,
      ElTableColumn,
    },
    setup() {
      const tableData = ref([
        { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
        // Add more data as needed
      ]);
  
      const handleScroll = (event) => {
        // const scrollTop = event.target.scrollTop;
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight ) { // Adjust the threshold as needed
          console.log('Scrolled to bottom');
        }
        // console.log('Vertical scroll position:', scrollTop);
        // console.log(scrollHeight+":"+clientHeight)
      };
  
      return {
        tableData,
        handleScroll,
      };
    },
  };
  </script>
  
  <style scoped>
  .scroll-container {
    height: 300px; /* Set a fixed height for the container */
    overflow-y: auto; /* Enable vertical scrolling */
  }
  </style> -->


<!-- <template>

    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="所有用户" name="1">
            
            <div  style="overflow: auto;"v-infinite-scroll="handleScroll" >
                <el-table :data="userData" border stripe style="width: 100%;" max-height="300">
                    <el-table-column fixed prop="id" label="id" width="100" />
                    <el-table-column prop="vip" label="等级" width="60" />
                    <el-table-column prop="name" label="Name" width="120" />
                    <el-table-column prop="nickname" label="nickname" width="120" />
                    <el-table-column prop="gender" label="性别" width="60" />
                    <el-table-column prop="phone" label="电话" width="120" />
                    <el-table-column prop="credibility" label="信誉度" width="70" />
                    <el-table-column prop="money" label="余额" width="70" />
                    <el-table-column prop="idCard" label="身份证" width="180" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="ip" label="注册地址" width="120" />
                    <el-table-column fixed="right" label="Operations" min-width="120">
                        <template #default>
                            <el-button link type="primary" size="small">
                                Detail
                            </el-button>
                            <el-button link type="primary" size="small">Edit</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-collapse-item>

        <el-collapse-item title="查询用户">
            <div  v-infinite-scroll="handleScroll" style="overflow: auto;max-height: 300px;">
                <el-table :data="userData" border stripe style="width: 100%" max-height="300">
                <el-table-column fixed prop="id" label="id" width="100" />
                <el-table-column prop="vip" label="等级" width="60" />
                <el-table-column prop="name" label="Name" width="120" />
                <el-table-column prop="nickname" label="nickname" width="120" />
                <el-table-column prop="gender" label="性别" width="60" />
                <el-table-column prop="phone" label="电话" width="120" />
                <el-table-column prop="credibility" label="信誉度" width="70" />
                <el-table-column prop="money" label="余额" width="70" />
                <el-table-column prop="idCard" label="身份证" width="180" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column prop="ip" label="注册地址" width="120" />
                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small">
                            Detail
                        </el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            
        </el-collapse-item>
    </el-collapse>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                pageNum: 1,             //  初始化页码
                pageSize: 10,           //  设置加载每页大小
                isLoading: false         //  是否正在加载
            },
            userData: [],               //  所有用户表格中的数据
            activeName: '1',            //  默认打开所有用户的折叠面板
            loading: false,              //  加载状态
            hasMoreData: true // 假设初始状态下有更多数据
        }
    },
    methods: {
        async getUsers() {
            try {
                if (this.user.isLoading) return      //  如果正在加载直接退出
                this.user.isLoading = true
                const response = await axios.post('http://localhost:8080/admin/users', this.user)
                const newUserData = response.data
                const formattedNewUserData = newUserData.map(item => ({
                    id: item.userId,
                    vip: item.userIsVip,
                    name: item.userName,
                    nickname: item.userNickname,
                    gender: item.userGender,
                    phone: item.userPhone,
                    idCard: item.userIdcard,
                    email: item.userEmail,
                    credibility: item.userCredibility,
                    addTime: item.userAddTime,
                    ip: item.userLoginIp,
                    money: item.userMoney
                }));
                // 将新数据合并到现有数据中
                this.userData = [...this.userData, ...formattedNewUserData];
                this.user.pageNum++
                this.user.isLoading = false
            } catch (error) {
                console.error(error)
            }
        },
        handleScroll() {
     
                    console.log('滚动到底部了');

            // this.getUsers()

        }
    },
    mounted() {
        this.getUsers()

    }
}
</script> -->


<!-- <template>

    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="所有用户" name="1">
            
            <div v-infinite-scroll="handleScroll" style="overflow: auto;max-height: 300px;">
                <el-table :data="userData" border stripe style="width: 100% ;">
                    <el-table-column fixed prop="id" label="id" width="100" />
                    <el-table-column prop="vip" label="等级" width="60" />
                    <el-table-column prop="name" label="Name" width="120" />
                    <el-table-column prop="nickname" label="nickname" width="120" />
                    <el-table-column prop="gender" label="性别" width="60" />
                    <el-table-column prop="phone" label="电话" width="120" />
                    <el-table-column prop="credibility" label="信誉度" width="70" />
                    <el-table-column prop="money" label="余额" width="70" />
                    <el-table-column prop="idCard" label="身份证" width="180" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="ip" label="注册地址" width="120" />
                    <el-table-column fixed="right" label="Operations" min-width="120">
                        <template #default>
                            <el-button link type="primary" size="small">
                                Detail
                            </el-button>
                            <el-button link type="primary" size="small">Edit</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-collapse-item>

        <el-collapse-item title="查询用户">
            <el-table :data="userData" border stripe style="width: 100%" max-height="400">
                <el-table-column fixed prop="id" label="id" width="100" />
                <el-table-column prop="vip" label="等级" width="60" />
                <el-table-column prop="name" label="Name" width="120" />
                <el-table-column prop="nickname" label="nickname" width="120" />
                <el-table-column prop="gender" label="性别" width="60" />
                <el-table-column prop="phone" label="电话" width="120" />
                <el-table-column prop="credibility" label="信誉度" width="70" />
                <el-table-column prop="money" label="余额" width="70" />
                <el-table-column prop="idCard" label="身份证" width="180" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column prop="ip" label="注册地址" width="120" />
                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small">
                            Detail
                        </el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-collapse-item>
    </el-collapse>



</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                pageNum: 1,             //  初始化页码
                pageSize: 10,           //  设置加载每页大小
                isLoading: false         //  是否正在加载
            },
            userData: [],               //  所有用户表格中的数据
            activeName: '1',            //  默认打开所有用户的折叠面板
            loading: false,              //  加载状态
            hasMoreData: true // 假设初始状态下有更多数据
        }
    },
    methods: {
        async getUsers() {
            try {
                if (this.user.isLoading) return      //  如果正在加载直接退出
                this.user.isLoading = true
                const response = await axios.post('http://localhost:8080/admin/users', this.user)
                const newUserData = response.data
                const formattedNewUserData = newUserData.map(item => ({
                    id: item.userId,
                    vip: item.userIsVip,
                    name: item.userName,
                    nickname: item.userNickname,
                    gender: item.userGender,
                    phone: item.userPhone,
                    idCard: item.userIdcard,
                    email: item.userEmail,
                    credibility: item.userCredibility,
                    addTime: item.userAddTime,
                    ip: item.userLoginIp,
                    money: item.userMoney
                }));
                // 将新数据合并到现有数据中
                this.userData = [...this.userData, ...formattedNewUserData];
                this.user.pageNum++
                this.user.isLoading = false
            } catch (error) {
                console.error(error)
            }
        },
        handleScroll() {
            console.log("lifuagii")
        }
    },
    mounted() {
        this.getUsers()

    }
}
</script> -->


<!-- <template>
    <ul v-infinite-scroll="load" style="overflow: auto;height: 300px;">
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  const count = ref(0)
  const load = () => {
    count.value += 2
  }
  </script>
  
  <style>
  .infinite-list {
    /* height: 300px; */
    /* padding: 0;
    margin: 0; */
    /* list-style: none; */
  }
  .infinite-list .infinite-list-item {
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    /* height: 50px; */
    /* background: var(--el-color-primary-light-9); */
    /* margin: 10px; */
    /* color: var(--el-color-primary); */
  }
  .infinite-list .infinite-list-item + .list-item {
    /* margin-top: 10px; */
  }
  </style> -->




<!-- 
<template>
    <div v-infinite-scroll="handleScroll" style="overflow: auto;max-height: 300px;">
      <el-table
        :data="tableData"
       
        style="width: 100%; position: relative;
      overflow-y: auto;"
      >
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [
          { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
          { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
          

          // ... more data
        ],
      };
    },
    methods: {
      handleScroll(event) {
        console.log("fangweg")
        // const scrollTop = event.target.scrollTop;
        // const scrollHeight = event.target.scrollHeight;
        // const clientHeight = event.target.clientHeight;
  
        // if (scrollTop + clientHeight >= scrollHeight - 10) {
        //   console.log('Table is at the bottom');
        // } else if (scrollTop <= 10) {
        //   console.log('Table is at the top');
        // } else {
        //   console.log('Table is scrolling');
        // }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
   -->




<!-- <template>
    <el-table
      :data="userData"
      border
      stripe
      style="width: 100%;overflow: auto;"
      max-height="400"
      v-infinite-scroll="handleScroll"
    >
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="ip" label="注册地址" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
          <el-button link type="primary" size="small">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        user: {
                pageNum: 1,             //  初始化页码
                pageSize: 10,           //  设置加载每页大小
                isLoading: false         //  是否正在加载
            },
            userData: [],               //  所有用户表格中的数据
            activeName: '1',            //  默认打开所有用户的折叠面板
            loading: false,              //  加载状态
            hasMoreData: true // 假设初始状态下有更多数据
      };
    },
    methods: {
        async getUsers() {
            try {
                if (this.user.isLoading) return      //  如果正在加载直接退出
                this.user.isLoading = true
                const response = await axios.post('http://localhost:8080/admin/users', this.user)
                const newUserData = response.data
                const formattedNewUserData = newUserData.map(item => ({
                    id: item.userId,
                    vip: item.userIsVip,
                    name: item.userName,
                    nickname: item.userNickname,
                    gender: item.userGender,
                    phone: item.userPhone,
                    idCard: item.userIdcard,
                    email: item.userEmail,
                    credibility: item.userCredibility,
                    addTime: item.userAddTime,
                    ip: item.userLoginIp,
                    money: item.userMoney
                }));
                // 将新数据合并到现有数据中
                this.userData = [...this.userData, ...formattedNewUserData];
                this.user.pageNum++
                this.user.isLoading = false
            } catch (error) {
                console.error(error)
            }
        },
      handleScroll(event) {
        console.log(event)
        // const tableBody = event.target.querySelector('.el-table__body-wrapper');
        // if (tableBody) {
        //   const scrollTop = tableBody.scrollTop;
        //   const scrollHeight = tableBody.scrollHeight;
        //   const clientHeight = tableBody.clientHeight;
        //   if (scrollTop + clientHeight >= scrollHeight - 1) {
        //     console.log('滚动到底部了');
        //   }
        // }
      },
    },
    mounted(){
        this.getUsers()
    }
  };
  </script> -->



<!-- <template>
    <el-button plain @click="centerDialogVisible = true">
      Click to open the Dialog
    </el-button>
  
    <el-dialog
      v-model="centerDialogVisible"
      width="1000"
      align-center
    >
     <div>视频名称：    视频id：</div>
    <video id="myVideo" controls controlsList="nodownload" :src="url"
      style="width: 100%; height: 60%;object-fit: contain;">
      您的浏览器不支持视频播放。
    </video>
    <div></div>
      <span>视频标题：</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
      
    </el-dialog>
  </template>
  <script>
  import { ref } from 'vue'
  export default{
    data(){
        return{
            centerDialogVisible:ref(false),
            url:'http://localhost:8080/videos/遮天.mp4'
        }
    }
  }
  
  </script> -->



<!-- <template>
  <el-table :data="AlbumData" style="width: 100%" max-height="250">
    <el-table-column fixed="left" prop="name" label="Name" width="180" />
    <el-table-column prop="id" label="id" width="120" />
    <el-table-column prop="last" label="最新集数" width="120" />
    <el-table-column prop="director" label="Director" width="120" />
    <el-table-column prop="channel" label="Channel" width="120" />
    <el-table-column prop="area" label="Area" width="120" />
    <el-table-column prop="actor" label="Actor" width="180" />
    <el-table-column fixed="right" label="Operations" width="180">
      <template #default="scope">
        <el-popover placement="left" :width="600" trigger="click">
      <template #reference>
        <el-button link type="primary" @click="editItem(scope.row)">查看</el-button>
      </template>
      <el-table :data="videoData" max-height="240">
        <el-table-column fixed="left" width="50" property="id" label="id" />
        <el-table-column width="150" property="name" label="视频名称" />
        <el-table-column width="100" property="status" label="审核状态" />
        <el-table-column width="250" property="title" label="标题" />
        <el-table-column fixed="right" label="Operations" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="edit(scope.row)">Select</el-button>
            <el-button link type="primary" @click="deleteItem(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-popover>
        <el-button link type="primary" @click="deleteItem(scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import axios from 'axios';



export default {
  data() {
    return {
      video: {
        videoAlbumId: ""
      },
      videoData: [],
      videoAlbum: {
        userId:""
      },
      AlbumData: []
    }
  },
  methods: {
    editItem(){
    },
    async editItem(row) {
      this.video.videoAlbumId = row.id
      const response = await axios.post("http://localhost:8080/api/videos", this.video)
      this.videoData = response.data.map(item => ({
        id: item.videoId,
        name: item.videoName,
        status: item.videoApprovalStatus,
        title: item.videoTitle
      }))
      
    },
    deleteItem(row){
      console.log("删除专辑："+row.id)
    },

    async getVideoAlbum() {
      // const userId = 41
      this.videoAlbum.userId = 41
      try {
        const response = await axios.post(`http://localhost:8080/api/videoAlbums`, this.videoAlbum);
        console.log(response.data)
        this.AlbumData = response.data.map(item => ({
          id: item.videoAlbumId,
          last: item.videoLastUpdate,
          date: item.videoReleaseDate,
          name: item.videoAlbumName,
          director: item.videoDirector,
          channel: item.videoChannel,
          area: item.videoArea,
          actor: item.videoActor,
          id: item.videoAlbumId
        }))
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




<!-- <template>
  <el-button text @click="table = true"
    >Open Drawer with nested table</el-button  >

  <el-drawer
    v-model="table"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
  >
    <el-table :data="this.gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-drawer>

  
</template>

<script>
import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'


export default{
  data(){
    return{
      table:(false),
      gridData:[]
    }
  }
}

// const table = ref(false)

// const gridData = [
//   {
//     date: '2016-05-02',
//     name: 'Peter Parker',
//     address: 'Queens, New York City',
//   },
//   {
//     date: '2016-05-04',
//     name: 'Peter Parker',
//     address: 'Queens, New York City',
//   },
//   {
//     date: '2016-05-01',
//     name: 'Peter Parker',
//     address: 'Queens, New York City',
//   },
//   {
//     date: '2016-05-03',
//     name: 'Peter Parker',
//     address: 'Queens, New York City',
//   },
// ]

</script> -->



<!-- <template>
  <el-card>
    <h3>历史专辑</h3>
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed="left" prop="name" label="Name" width="180" />
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




  <el-column v-for="movie in movies">
    <el-space direction="vertical" alignment="flex-start">

      <el-skeleton style="width: 240px;" :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
        <template #default>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" style="width: 240px;height: 300px;margin: 5px;">
            <img :src="movie.videoAlbum.videoPostPath" style="width: 240px; height: 180px;" class="image" />
            <div style="padding: 14px">
              <span>{{ movie.videoIsVip }}</span>
              <div class="bottom card-header">
                <div>{{ movie.videoName }}</div>
                <el-button text class="button">Operation button</el-button>
              </div>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </el-space>
  </el-column>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(false)
    const currentDate = new Date().toDateString()
    return { loading, currentDate }
  },
  data() {
    return {
      movies: [],
      tempVAData: ref([]),
      tableData: ref([]),
      videoAlbum: {
        userId: ""
      },
      req: {
        // videoApprovalStatus:"审核通过",     //  只加载审核通过的视频
        pageNum: 1,                       //  初始化页码
        pageSize: 128,                     //  设置加载每页大小
        isLoading: false                  //  是否真正加载
      }
    }
  },
  methods: {
    async getVideoAlbum() {
      // const userId = 41
      this.videoAlbum.userId = 41
      try {
        const response = await axios.post(`http://localhost:8080/api/videoAlbums`, this.videoAlbum);
        console.log(response.data)
        //   responseData.value=response.data
        this.tempVAData = response.data
        this.tableData = response.data.map(item => ({
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
    },

    async fetchMovies() {
      try {
        const response = await axios.post('http://localhost:8080/api/videos', this.req)
        const newMovies = response.data
        this.movies = [...this.movies, ...newMovies]
        console.log(this.movies)
      } catch (error) {
        console.error(error)
      }
    },




  },
  mounted() {
    // this.fetchMovies()
    this.getVideoAlbum()
  },

}
</script> -->





<!-- <template>
  <el-row class="tac">
    <el-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>Navigator One</span>
          </template>

          <el-menu-item index="1-1"><el-icon>
              <Search />
            </el-icon>item one</el-menu-item>
          <el-menu-item index="1-2"><el-icon>
              <EditPen />
            </el-icon>item two</el-menu-item>
          <el-menu-item index="1-3">item three</el-menu-item>

          <router-link class="alink" to="/personalCenterIndex/securityCenter">
            <el-menu-item index="1-4">
              <el-icon><More /></el-icon>
              安全中心
            </el-menu-item>
          </router-link>

        </el-sub-menu>

        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon>
            <User />
          </el-icon>
          <span>Navigator Three</span>
        </el-menu-item>

        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  EditPen,
  Menu as IconMenu,
  Location,
  Search,
  Setting,
  User,
  UserFilled,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script> -->

<!-- <template>
  <el-card style="width: 49%;">
      <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>

  <el-button class="mt-4" style="width: 100%" @click="onAddItem">
    Add Item
  </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const now = new Date()

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
</script> -->



<!-- <template>
    <div id="app">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        accept="video/*"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传mp4, avi格式的视频文件，且不超过50MB</div>
      </el-upload>
    </div>
  </template>
  
  <script>
  import { ElUpload } from 'element-plus';
  
  export default {
    name: 'App',
    components: {
      ElUpload
    },
    methods: {
      handlePreview(file) {
        console.log('预览文件:', file);
      },
      handleRemove(file, fileList) {
        console.log('移除文件:', file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
    }
  };
  </script>
<style>
  #app {
    text-align: center;
    margin-top: 60px;
  }
  </style> -->



<!-- <template>
  <el-form :model="video" label-width="120px">
    <el-row>
    <el-card style="width: 40%;">
      <el-form-item label="视频名称">
        <el-input v-model="video.videoName"></el-input>
      </el-form-item>
      <el-form-item label="视频标题">
        <el-input v-model="video.videoTitle"></el-input>
      </el-form-item>
      <el-form-item label="专辑名">
        <el-input v-model="videoAlbum.videoAlbumName"></el-input>
      </el-form-item>
      <el-form-item label="上传用户名">
        <el-input v-model="videoAlbum.videoAddUser"></el-input>
      </el-form-item>
      <el-form-item label="上映日期">
        <el-date-picker v-model="videoAlbum.videoReleaseDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="视频简介">
        <el-input type="textarea" v-model="videoAlbum.videoSummary"></el-input>
      </el-form-item>
      <el-form-item label="视频频道">
        <el-select v-model="videoAlbum.videoChannel" placeholder="请选择">
          <el-option label="电影" value="电影"></el-option>
          <el-option label="电视剧" value="电视剧"></el-option>
          <el-option label="动漫" value="动漫"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导演">
        <el-input v-model="videoAlbum.videoDirector"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="videoAlbum.videoArea"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker v-model="videoAlbum.videoUpdateTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="最新更新集数">
        <el-input v-model="videoAlbum.videoLastUpdate"></el-input>
      </el-form-item>
      <el-form-item label="演员">
        <el-input v-model="videoAlbum.videoActor"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">上传视频</el-button>
      </el-form-item>
      
    </el-card>
    
    <el-card style="width: 40%;">
      {{ this.video }}
      <br/><br/>
      {{ this.videoAlbum }}
    </el-card>
  </el-row>
  </el-form>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
        video: {
          videoId:1,
          videoIsVip:1,
          videoName:"视频名称",
          videoTitle:"视频标题"
        },
        videoAlbum: {
          videoAlbumName:"videoAlbumName",  //专辑名
          videoAddUser:"zyx",                  //上传用户名
          videoReleaseDate:"2024/10/21",              //上映日期
          videoSummary:"测试简介",                  //视频简介
          videoChannel:"动漫",                  //视频频道
          videoDirector:"ZYX",                 //导演
          videoArea:"中国",                     //地区
          videoUpdateTime:"2020/10/21",               //更新时间
          videoLastUpdate:"1",               //最新更新集数
          videoActor:"演员1、演员2",                    //演员
          videoApprovalStatus:"未审核"            //审核状态
        },
        file:null

    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      // 处理文件，例如读取文件内容、生成缩略图等
      // 将处理后的结果存储到 videoUploadRequest.video 中
      this.videoUploadRequest.file = file; // 假设我们直接使用文件对象作为视频数据
    },
  async  uploadVideo() {
      // 使用 axios 或其他 HTTP 库发送 POST 请求，将 videoUploadRequest 对象发送到后端 API
      const formData = new FormData();
      formData.append('videoFile',this.videoUploadRequest.file)   //视频流MP4
      // formData.append('videoUpload',JSON.stringify(this.videoUploadRequest))
      formData.append('video',JSON.stringify(this.videoUploadRequest.video))
      formData.append('videoAlbum',JSON.stringify(this.videoUploadRequest.videoAlbum))
      // 如果还有其他需要提交的 videoAlbum 信息，可以继续添加到 formData 中
      // 示例代码：
      axios.post('http://localhost:8080/upload', formData
      , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
        .then(response => {
          // 处理成功响应
          console.log('上传成功', response);
        })
        .catch(error => {
          // 处理错误响应
          console.error('上传失败', error);
        });
      console.log(this.videoUploadRequest)
      console.log(formData)
    }
  }



  // name: 'VideoUpload',
  // setup() {
  //   const video = ref({
  //     videoId: 1,
  //     videoIsVip: 1,
  //     videoName: '',
  //     videoTitle: ''
  //   });

  //   const videoAlbum = ref({
  //     videoAlbumName: '',
  //     videoAddUser: '',
  //     videoReleaseDate: '',
  //     videoSummary: '',
  //     videoChannel: '',
  //     videoDirector: '',
  //     videoArea: '',
  //     videoUpdateTime: '',
  //     videoLastUpdate: '',
  //     videoActor: ''
  //   });

  //   const handleSubmit = () => {
  //     // 这里可以添加你的上传逻辑，比如调用API等
  //     ElMessage.success('视频信息已提交');
  //     console.log(video.value);
  //     console.log(videoAlbum.value);
  //   };

  //   return {
  //     video,
  //     videoAlbum,
  //     handleSubmit
  //   };
  // },
 
};
</script>

<style scoped>
/* 你可以在这里添加一些自定义样式 */
</style> -->



<!-- <template>
  <div class="upload-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="视频标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="视频类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="电视剧" value="电视剧"></el-option>
          <el-option label="电影" value="电影"></el-option>
          <el-option label="动漫" value="动漫"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传时间">
        <el-date-picker v-model="form.uploadDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item label="导演">
        <el-input v-model="form.director"></el-input>
      </el-form-item>
      <el-form-item label="演员">
        <el-input v-model="form.actors"></el-input>
      </el-form-item>
      <el-form-item label="视频简介">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handleChange"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过500MB</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'VideoUpload',
  setup() {
    const form = ref({
      title: '',
      type: '',
      uploadDate: '',
      region: '',
      director: '',
      actors: '',
      description: '',
    });
    const fileList = ref([]);

    const handleChange = (file) => {
      fileList.value = [file];
    };

    const beforeUpload = (file) => {
      const isMp4 = file.type === 'video/mp4';
      const isLt500M = file.size / 1024 / 1024 < 50000;
      if (!isMp4) {
        ElMessage.error('上传视频只能是 MP4 格式!');
      }
      if (!isLt500M) {
        ElMessage.error('上传视频大小不能超过 500MB!');
      }
      return isMp4 && isLt500M;
    };

    const submitUpload = () => {
      // if (fileList.value.length === 0) {
      //   ElMessage.error('请先选择一个文件!');
      //   return;
      // }
      console.log(fileList)
      // 这里可以添加实际的上传逻辑，比如调用API上传文件等
      ElMessage.success('上传成功!');
    };

    return {
      form,
      fileList,
      handleChange,
      beforeUpload,
      submitUpload,
    };
  },
};
</script>

<style scoped>
/* .upload-container {
  width: 60%;
  margin: 0 auto;
}
.upload-demo {
  margin-top: 20px;
} */
</style> -->


<!-- <template>
  <div>
    <h2>上传视频</h2>
    <form @submit.prevent="uploadVideo">
  
      <div>
        <label for="file">选择视频文件：</label>
        <input type="file" id="file" @change="onFileChange" required>
      </div> 
      <button type="submit">上传</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      videoUploadRequest: {
        video: {
          videoId:1,
          videoIsVip:1,
          videoName:"视频名称",
          videoTitle:"视频标题"
        },
        videoAlbum: {
          videoAlbumName:"videoAlbumName",  //专辑名
          videoAddUser:"zyx",                  //上传用户名
          videoReleaseDate:"2024/10/21",              //上映日期
          videoSummary:"测试简介",                  //视频简介
          videoChannel:"动漫",                  //视频频道
          videoDirector:"ZYX",                 //导演
          videoArea:"中国",                     //地区
          videoUpdateTime:"2020/10/21",               //更新时间
          videoLastUpdate:"1",               //最新更新集数
          videoActor:"演员1、演员2",                    //演员
          videoApprovalStatus:"未审核"            //审核状态
        },
        file:null
      },

    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      // 处理文件，例如读取文件内容、生成缩略图等
      // 将处理后的结果存储到 videoUploadRequest.video 中
      this.videoUploadRequest.file = file; // 假设我们直接使用文件对象作为视频数据
    },
  async  uploadVideo() {
      // 使用 axios 或其他 HTTP 库发送 POST 请求，将 videoUploadRequest 对象发送到后端 API
      const formData = new FormData();
      formData.append('videoFile',this.videoUploadRequest.file)   //视频流MP4
      formData.append('video',JSON.stringify(this.videoUploadRequest.video))
      formData.append('videoAlbum',JSON.stringify(this.videoUploadRequest.videoAlbum))
      // 如果还有其他需要提交的 videoAlbum 信息，可以继续添加到 formData 中
      // 示例代码：
      console.log(this.formData)
      axios.post('http://localhost:8080/upload', formData
      , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
        .then(response => {
          // 处理成功响应
          console.log('上传成功', response);
        })
        .catch(error => {
          // 处理错误响应
          console.error('上传失败', error);
        });
      console.log(this.videoUploadRequest)
      console.log(formData)
    }
  }
};
</script> -->


<!-- <template>
  <div style="display: flex;">
    <video id="myVideo" controls :src="url" style="width: 80%; height: 800px;object-fit: contain;">
      您的浏览器不支持视频播放。
    </video>
    <div style="width: 20%; ">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: '', // 替换为你的视频文件路径
      vali:{
        userId:'',
        
      }
    };

  },
  methods: {
    restrict() {
      const video = document.getElementById('myVideo');
      const maxDuration = 6 * 60 * 1000; // 6分钟转换为毫秒

      video.addEventListener('timeupdate', () => {
        if (video.currentTime > maxDuration / 1000) {
          alert('试看时间已结束，请购买完整版观看！');
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    IsVip(){
      const videoIsVip=1
      const userIsVip=0
      if(userIsVip===1){
        return
      }else if(videoIsVip===1){
        this.restrict()
      }
    },
    async videoPlay() {
      try {
        //从url中获取视频ID
        // const urlParams = new URLSearchParams(window.location.search)
        // const movieId = urlParams.get("movieId")
        const movieId = 2

        const validate=await axios.get(`http://localhost:8080/api`)

        //获取视频
        const response = await axios.get(`http://localhost:8080/api/video/${movieId}`);
        console.log(response.data); // 输出视频URL
        this.url = response.data
      } catch (error) {
        console.error(error)
      }

    },

  },
  mounted() {
    this.videoPlay();
    this.IsVip();
  }
};
</script> -->


<!-- <template>
  <div id="app">
    <div @scroll="handleScroll" style="height: 50px;position: relative;overflow-y: auto;  border-left: 1px solid #ccc;">
      <li v-for="comment in comments" :key="comment.id">{{ comment.videoCommentContent }}</li>

    </div>
    <ul>
      <li v-for="comment in comments" :key="comment.id">{{ comment.videoCommentContent }}</li>
    </ul>
    <button ref="scrollContainer" @scroll="handleScroll">farg</button>
    <div ref="scrollContainer" @scroll="handleScroll">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [], // 存储评论数据的数组
      reqComment: {
        videoId: '2',
        pageNum: 1, // 当前页码
        pageSize: 5,
        isLoading: false, // 是否正在加载数据的标志 
      }

    };
  },
  methods: {
    async loadMoreComments() {
      if (this.reqComment.isLoading) return; // 如果已经在加载，直接返回
      this.reqComment.isLoading = true; // 设置加载状态为true

      // 模拟异步请求数据
      const response = await axios.post(`http://localhost:8080/api/videoComment`, this.reqComment);
      const newComments = await response.data;
      // console.log(newComments)
      this.comments = [...this.comments, ...newComments]; // 合并新数据
      console.log(this.comments)
      this.reqComment.pageNum++; // 增加页码
      this.reqComment.isLoading = false; // 重置加载状态
    },
    //   handleScroll(event) {
    //   const target = event.target;
    //   if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    //     this.loadMoreComments();
    //   }
    // },
    handleScroll(event) {
      const container = event.target;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      // 检查是否滚动到底部
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.loadMoreComments(); // 加载更多评论
      }
    },
  },
  mounted() {
    // 初始加载第一页数据
    this.loadMoreComments();
  },
};
</script> -->


<!-- 
<template>
    <h1>home</h1>
    <button @click="black">后退</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router=useRouter()
const black=()=>{
  localStorage.removeItem('token')
    router.push('/login')
}
</script> -->