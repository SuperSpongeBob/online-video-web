<template>
    <h4 class="text-center">基本信息</h4>
    <el-container>
        <el-main>
            <el-card style="width: 400px;margin:0 auto;">
                <el-form ref="form" :model="form" label-width="40%">
                    <el-form-item label="Id">
                        <div>{{ form.userId }}</div>
                    </el-form-item>
                    <el-form-item label="姓名"> {{ form.userName }} </el-form-item>
                    <el-form-item label="邮箱"> {{ form.userEmail }} </el-form-item>
                    <el-form-item label="性别"> {{ form.userGender }} </el-form-item>
                    <el-form-item label="电话"> {{ form.userPhone }} </el-form-item>
                    <el-form-item label="注册时间"> {{ form.userAddTime }} </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
import authService from "../../../utils/authService";
export default {
    data() {
        return {
            province: '',
            form: {
                userId: "",
                userAddTime: "",
                userEmail: "",
                userGender: "",
                userName: "",
                userPassword: "",
                userPhone: "",
            },
        };
    },

    methods: {
        async userInfo() {
            try {
                // this.form.userId = sessionStorage.getItem("userId");        //获取登录时保存的userId用于根据id查询数据库的所有信息

                // const response = await authService.search(this.form.userId);
                // Object.assign(this.form, response.data[0]);        //将查询到的所有信息传递到form中

                //  从session中获取登录时获取的数据
                const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                Object.assign(this.form, userInfo)           //  将userInfo的数据传递到form中

                console.log(this.form)
                // console.log(response.data[0])
                //保存所有用户信息
                // localStorage.setItem("userName", this.form.userName)   //本地保存用于其他网页评论时获取
                // sessionStorage.setItem("userInfo", JSON.stringify(response.data[0]));
            } catch (error) {
                console.error(error);
            }

        },
    },
    mounted() {
        this.userInfo();
    },
};
</script>
