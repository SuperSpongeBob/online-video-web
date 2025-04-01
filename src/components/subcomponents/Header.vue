<template>
    <el-header class="header">
        <div class="logo">
            <img src="../../assets/logo.png" alt="商标" />
            OnLineVideo &nbsp;&nbsp;<el-button v-if="role == '[ROLE_ADMIN]'" type="primary"
                @click="this.$router.push('/admin')">前往后台</el-button>
        </div>
        <div class="search-box">
            <el-input v-model="this.searchText" placeholder="输入搜索内容" @keyup.enter.native="search" maxlength="10">
                <template #append>
                    <el-button icon="Search" @click="search" />
                </template>
            </el-input>
        </div>
        
        <div class="right-nav">
            <el-switch v-model="this.backgroundSwitch" @change="closeParticles" inline-prompt active-text="粒子" inactive-text="粒子" />
            <div class="history">
                <el-tooltip content="历史记录" placement="bottom" effect="light">
                    <Clock @click="gotoHistory" style="width: 2em; height: 2em; margin-right: 8px" />
                </el-tooltip>
            </div>

            <div class="history">
                <el-tooltip content="上传视频" placement="bottom" effect="light">
                    <UploadFilled @click="gotoVideoUpload" style="width: 2em; height: 2em; margin-right: 8px" />
                </el-tooltip>
            </div>

            <div class="user-avatar">
                <el-dropdown>
                    <UserFilled style="width: 2em; height: 2em; margin-right: 8px" />

                    <template #dropdown>
                        <el-dropdown-menu v-if="LogStatus">
                            <el-dropdown-item @click="goToPersonal">个人中心</el-dropdown-item>
                            <!-- <el-dropdown-item @click="test">设置</el-dropdown-item> -->
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu v-else="LogStatus">
                            <el-dropdown-item @click="goToLogin">登录<el-icon>
                                    <ArrowRight />
                                </el-icon></el-dropdown-item>
                            <el-dropdown-item @click="test">设置</el-dropdown-item>
                            <el-dropdown-item @click="goToRegister">注册<el-icon>
                                    <ArrowRight />
                                </el-icon></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script>
import { ref } from "vue";
import authService from "../../utils/authService";
import eventBus from "../../utils/eventBus";
export default {
    data() {
        return {
            role: sessionStorage.getItem("Role"),        //  获取当前用户的角色
            searchText: '',
            LogStatus: sessionStorage.getItem("LoginState") === "true",
            backgroundSwitch: true,
        }
    },
    created(){
        if(localStorage.getItem('switch')==undefined)return
        this.backgroundSwitch=localStorage.getItem('switch') == 'true'
    },
    methods: {
        closeParticles(value) {
            console.log(value)
            if (value) {
                eventBus.emit('open-particles');
            } else {
                eventBus.emit('close-particles');
            }
            localStorage.setItem('switch', value.toString())
        },
        test() {
            // alert(this.backgroundSwitch+"   "+localStorage.getItem('switch'))
            // return
            console.log(localStorage.removeItem("switch"))
        },

        gotoVideoUpload() {
            window.open(`/videoUpload`)
        },
        gotoHistory() {
            window.open('/History')
        },
        search() {
            this.$router.push(`/index/search/${this.searchText}`)
            // this.$message.warm({message:'$route.params.name'})
        },

        goToLogin() {
            this.$router.push('/login')
        },
        async logout() {
            sessionStorage.setItem("LoginState", false);
            try {

                // sessionStorage.removeItem('userId')

                sessionStorage.removeItem("userInfo")
                sessionStorage.removeItem("Role")
                console.log(this.LogStatus);
                const response = await authService.logout()
                console.log(response)
                if (response.status == 200) {
                    this.$message.success({ message: 'LogoutSucceed', showClose: true })
                }
            } catch (error) {
                if (error.response.status == 401) {
                    this.$message.error({ message: '请先登录', showClose: true })
                }
                if (error.response.status == 500) {
                    this.$message.warm({ message: '服务器出错啦', showClose: true })
                }
            }
            window.location.reload();


        },
        goToPersonal() {
            console.log(sessionStorage.removeItem('switch'))
            this.$router.push("/personalCenterIndex");
        },
        goToRegister() {
            this.$router.push('/register')
        },
    }
}
</script>

<!-- <script setup>
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled, UserFilled,Search } from "@element-plus/icons-vue";
import { ElDropdownMenu, ElDropdown, ElDropdownItem, ElIcon } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("")
const gotoVideoUpload=()=>{
  window.open(`/videoUpload/?userId=${sessionStorage.getItem("userId")}`)
}
const goto = () => {
  router.push(`/index/search/${name.value}`)

}

//获取登录状态
const isLoggedIn = sessionStorage.getItem("LoginState") === "true";
const search = () => {
  router.push(`/index/search/${name.value}`)

};

const goToLogin = () => {
  router.push("/login");
};

const logout = () => {
  sessionStorage.setItem("LoginState", false);
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('userInfo')
  console.log(isLoggedIn);
  window.location.reload();
};

const goToPersonal = () => {
  router.push("/personalCenterIndex");
};

const goToRegister = () => {
    this.$router.push('/register')
};
</script> -->


<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    gap: 0px;
    /* 元素间距 */
}

.logo img {
    height: 40px;
    margin-right: 25px;
    display: flex;
}

.search-box {
    max-width: 500px;
    flex: 1;
    text-align: center;
}

.right-nav {
    display: flex;
    align-items: center;
}

.history,
.user-avatar {
    margin-left: 20px;
}

.user-avatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>

<!-- <template>
    <div class="layout-header-container" :style="{ opacity: 0.8 }">
        <div class="layout-header-left">
            <img class="layout-header-left-img" src="../../assets/logo.png" alt="">
            <h4 class="layout-header-left-title ml-3">onlinevideo</h4>
        </div>
        <div class="layout-header-right">
            <button type="button" class="btn btn-light" @click="onLogout">退出</button>
        </div>
        
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const onLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
}
</script>

<style lang="less" scoped>
.layout-header-container {
    height: 60px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    background-color: #c7bfbf;

    .layout-header-left {
        display: flex;
        align-items: center;
        color: #fff;
    }
}

.layout-header-left-img {
    height: 50px;
}

.layout-header-right {
    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background-color: #5f9ea0;
        color: #fff;
    }

    .btn:hover {

        color: #999;
        opacity: 0.5;
        background-color: #fff;
    }
}
</style> -->

<!-- <template>
    <div class="indexHeader">
        <div class="layout-header-left">
            <h4>onlinevideo</h4>
        </div>
        <div class="layout-header-middle">
            <el-input placeholder="请输入内容"  clearable
                />
            <el-button type="primary" >搜索</el-button>
        </div>
        <div class="layout-header-right">

        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
.indexHeader {
    height: 60px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 0 0.5rem;
    background-color: aquamarine;
}

.font-color {
    color: #000000;
}
</style> -->
