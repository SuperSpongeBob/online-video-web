<template>
    <div class="login-container">

        <el-card class="login-card">
            <el-form ref="form" :model="form" :rules="validationRules" label-width="80px">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="form.userName" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userGender">
                    <el-radio-group v-model="form.userGender">
                        <el-radio value="男">男</el-radio>
                        <el-radio value="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="form.userEmail" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userPhone">
                    <el-input v-model="form.userPhone" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-input type="password" v-model="form.userPassword" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.confirmPassword" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 240px;" type="primary" round @click="submitForm('form')">注册</el-button>
                </el-form-item>
            </el-form>
            <el-form-item>
                <el-button link style="margin-left: 0%" type="primary" @click="this.$router.push('/login')">
                    <el-icon><Back /></el-icon>返回登录
                </el-button>
            </el-form-item>
        </el-card>
    </div>
</template>

<script>
import { ref } from "vue";
import authService from "../utils/authService";
import { isUserName, isPassword, isMobilePhoneNumber, isEmail, checkExist, } from "../utils/validationRules";

export default {
    data() {
        const confirmPassword = (rule, str, callback) => {
            if (str === null || typeof str === "undefined" || str === "") {
                callback("请输入密码");
            } else if (str !== this.form.userPassword) {
                callback("两次输入密码不一致!");
            } else {
                callback();
            }
        };

        return {
            form: {
                userName: "",
                userGender: "",
                userEmail: "",
                userPhone: "",
                userPassword: "",
                userAddTime: "",
                confirmPassword: "",
            },
            validationRules: {
                userName: [
                    { required: true, message: "用户名不能为空", trigger: "blur" },
                    { validator: isUserName, trigger: "blur" },
                    { validator: checkExist, trigger: "blur" },
                ],
                userPhone: [
                    { required: true, message: "手机号码不能为空", trigger: "blur" },
                    { validator: isMobilePhoneNumber, trigger: "blur" },
                    { validator: checkExist, trigger: "blur" },
                ],
                userGender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
                userEmail: [
                    { required: true, message: "邮箱不能为空", trigger: "blur" },
                    { validator: isEmail, trigger: "blur" },
                    { validator: checkExist, trigger: "blur" },
                ],
                userPassword: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    // { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
                    { validator: isPassword, trigger: "blur" },
                ],
                confirmPassword: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { validator: confirmPassword, trigger: ["change", "blur"] },
                ],
            },
        };
    },
    methods: {
        // 提交表单事件
        async submitForm(formName) {
            //获取当前注册时间
            // this.form.userAddTime = ref(new Date().toLocaleString());
            this.form.userAddTime = Date.now()

            this.$refs[formName].validate((valid) => {
                const registerData = { user: this.form, userRole: { roleId: "1" } }
                if (valid) {
                    authService
                        .register(registerData)
                        .then((response) => {
                            if (response) {
                                this.$message.success({ message: "注册成功", showClose: true })
                                console.log("注册成功");
                                this.$router.push("login"); //注册成功跳转到登录页
                            } else {
                                this.$message.warning({ message: "该电话号码已被注册，请更换手机号", showClose: true })
                                console.log("该账号已存在");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    this.$message.error({ message: "表单验证失败", showClose: true });
                    return false;
                }
            });
        },

        // // 提交表单事件
        // submitForm(formName) {
        //   this.$refs[formName].validate((valid) => {
        //     if (valid) {

        //       const response = await authService.register(this.form)
        //   // const response = await axios.post('http://localhost:8080/api/register', this.form)

        //   //根据后端的返回值(ture&flase)判断是否注册成功
        //   if (response) {
        //     alert('注册成功')
        //     router.push('/login')//注册成功跳转到登录页
        //   } else {
        //     console.log('fail')
        //     alert('该账号已存在')
        //   }

        //       // // 格式没问题，提交注册信息
        //       // postRequest("/api/register", this.form)
        //       //   .then((res) => {
        //       //     if (res === false) {
        //       //       // 注册失败
        //       //       this.$message.error("注册失败，请重新注册");
        //       //       this.reload();
        //       //     } else {
        //       //       this.$message.success("注册成功");
        //       //       this.reload();
        //       //     }
        //       //   })
        //       //   .catch((err) => {
        //       //     // message.error(err)
        //       //     console.error(err);
        //       //   });

        //     } else {
        //       this.$message.error("表单验证失败");
        //       return false;
        //     }
        //   });
        // },
    },
};

// const router = useRouter()
// const form = ref({
//   userName: '',
//   userNickname: '',
//   userGender: '',
//   userEmail: '',
//   userPhone: '',
//   userPassword: '',
//   userCredibility: '100',//默认注册时的信誉分数为100
//   userAddTime: '',
//   userLoginIp: '',
//   confirmPassword: '',
// })
// const submitForm = async () => {
//   try {
//     //获取当前注册时间
//     const currentTime = ref(new Date().toLocaleString());

//     //通过发送请求到后端服务器获取IP地址
//     const ipAddress = ref('')
//     const res = await axios.get('https://api.ipify.org?format=json');
//     ipAddress.value = res.data.ip;

//     //将输入的参数传到validator进行校验
//     const errors = validateForm(form.value)
//     if (Object.keys(errors).length !== 0) {
//       // this.$message.error('表单验证失败，请检查输入信息')
//       console.log(errors)
//       alert('表单验证失败，请检查信息')
//       // alert(errors.userName,errors.userNickname,errors.userGender,errors.userEmail,errors.userPhone,errors.userPassword,errors.confirmPassword)

//     } else {

//       console.log('成功向后端发送数据')
//       const response = await authService.register({ ...form.value, userAddTime: currentTime.value, userLoginIp: ipAddress.value })
//       // const response = await axios.post('http://localhost:8080/api/register', this.form)

//       //根据后端的返回值(ture&flase)判断是否注册成功
//       if (response) {
//         alert('注册成功')
//         router.push('/login')//注册成功跳转到登录页
//       } else {
//         console.log('fail')
//         alert('该账号已存在')
//       }

//     }
//   } catch (error) {
//     console.error(error)
//   }
// }
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
    margin-bottom: 15px;
}

.el-form-item__label {
    width: 80px;
}

.el-input {
    width: 240px;
}
</style>

<!-- <script>
import authService from '../utils/authService';
import { validateForm } from '../utils/validator';
export default {
  data() {
    return {
      form: {
        userName: '',
        userNickname: '',
        userGender: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
        userCredibility: '',
        userAddTime: '',
        userLoginIp: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        //获取当前注册时间
        const currentTime = new Date().toISOString();
        this.form.userAddTime = currentTime

        //获取本机登录IP（仅使用浏览器环境）
        const userArent = navigator.userAgent
        const ipRegex = /(?:[0-9]{1.3}\.){3}[0-9]{1,3}/
        const ipMatch = userArent.match(ipRegex);
        const localIP = ipMatch ? ipMatch[0] : 'unknown'
        this.form.userLoginIp = localIP

        //默认注册时的分数为100
        this.form.userCredibility = "100"

        // 调用后端 API 保存注册信息到数据库
        const errors = validateForm(this.form)
        if (Object.keys(errors).length !== 0) {
          // this.$message.error('表单验证失败，请检查输入信息')
          console.log(errors)
          alert('表单验证失败，请检查信息')
          // alert(errors.userName,errors.userNickname,errors.userGender,errors.userEmail,errors.userPhone,errors.userPassword,errors.confirmPassword)

        } else {
          
          console.log('成功向后端发送数据')
          const response = await authService.register(this.form)
          // const response = await axios.post('http://localhost:8080/api/register', this.form)
          // console.log(response)

          //根据后端的返回值判断是否注册成功
          if (response) {
            this.$message.success('success')
            alert('注册成功')
            //这里需要路由跳转到login登录页面
            this.$router
          } else {
            console.log('fail')
            alert('该账号已存在')
          }

        }
      } catch (error) {
        console.error(error)
      }
    }
  },
}

</script> -->

<!-- 
<template>
    <div>
        <h1>dfghjj</h1>
        <button @click="register"></button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router=useRouter()
const register=()=>{
    router.push('/login')
}
</script> -->
