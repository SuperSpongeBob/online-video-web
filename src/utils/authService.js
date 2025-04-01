import axios from "axios";
import { ElMessage } from 'element-plus';

const serverAddress = `http://localhost:8080`      // 你的 API 基础 URL

const http = axios.create({
    baseURL: serverAddress,
    // timeout: 6000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

//  请求拦截器
http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if(error.response){
            //  服务器返回了响应，但是状态码不在 200 - 299 之间
            const status = error.response.status;
            let errorMessage = '';
            switch(status){
                case 400:
                    errorMessage = '请求参数错误';
                    break;
                case 401:
                    errorMessage = '权限不足';
                    error.isUnauthorizedError = true; // 标记为 401 错误
                    break;
                case 403:
                    errorMessage = '禁止访问';
                    break;
                case 404:
                    errorMessage = '请求的资源不存在';
                    break;
                case 429:
                    errorMessage = '请求过于频繁，请稍后再试';
                    break;
                case 500:
                    errorMessage = '服务器内部错误';
                    break;
                default:
                    errorMessage = `未知错误，状态码: ${status}`;
            }
            //  显示错误信息
            ElMessage.error({message:errorMessage,showClose:true})
        }else if(error.request){
            //  请求已经发出，但没有收到服务器响应
            ElMessage.error({message:'没有收到服务器响应',showClose:true})
        }else{
            //  在设置请求时发生了错误
            ElMessage.error({message:'请求设置发生错误',showClose:true})
        }
        return Promise.reject(error)    //  确保返回的 error 对象结构完整
    }
)

export default {
    //  后端地址
    serverAddress() {
        return serverAddress
    },


    async login(userData,config) {
        // return await http.post('/login', null, { params: userData })
        return await http.post('/login',userData,config )

    },

    async logout() {
        return await http.post('/logout')
    },

    async register(userData) {
        return await http.post('/api/registerUser', userData)
    },

    async getUserInfo() {
        return await http.get(`/api/getUserInfo`)
    },

    async verify(videoId) {
        return await http.get(`/api/verify?videoId=${videoId}`)
    },

    async updateUserInfo(userData) {
        return await http.post('/api/updateUserInfo', userData);
    },

    //  uploadVideo

    async uploadVideo(videoDate, config) {
        return await http.post('/upload', videoDate, config)
    },

    async updateUserPassword(userData) {
        return await http.post('/api/updateUserPassword', userData);
    },

    //  Video

    async videoURL(videoId) {
        return `${serverAddress}/static/video?videoId=${videoId}`
    },

    async getIndexVideos(VideoDate) {
        return await http.post('/api/IndexVideos', VideoDate)
    },

    async getVideos(videoDate) {
        return await http.post('/api/videos', videoDate)
    },

    async searchVideo(condition) {
        return await http.post('/api/searchVideo', condition)
    },

    async updateVideo(video) {
        return await http.post(`/api/updateVideo`,video)
    },

    async deleteVideo(video) {
        return await http.delete(`/api/deleteVideo`,{data:video})
    },

    async existsVideo(video) {
        return await http.post('/api/existsVideo', video)
    },

    //  Album

    async getVideoAlbums(videoAlbum) {
        return await http.post(`/api/videoAlbums`, videoAlbum)
    },

    async getAlbumByUserId(userId) {
        return await http.get(`/api/videoAlbum/${userId}`)
    },

    async updateAlbum(albumData) {
        return await http.post('/api/updateAlbum', albumData)
    },

    async deleteAlbum(videoAlbum) {
        return await http.post('/api/deleteAlbum', videoAlbum)
    },

    async increasePlayNum(videoId){
        return await http.post('/api/increasePlayNum',{videoId:videoId})
    },

    // Comment

    async videoComment(reqComment) {
        return await http.post('/api/videoComment', reqComment)
    },

    async addComment(addComment) {
        return await http.post('/api/addComment', addComment)
    },


    //  Danmaku
    async getDanmakus(danmaku) {
        return await http.post('/api/getDanmaku', danmaku)
    },

    async addDanmaku(addDanmaku) {
        return await http.post('/api/addDanmaku', addDanmaku)

    },

    //  history
    async detailHistory(history){
        return await http.post('/api/detailHistory',history)
    },

    async historyByHistoryId(history){
        return await http.post('/api/historyByHistoryId',history)
    },

    async deleteHistory(history){
        return await http.delete('/api/deleteHistory',{data:history})
    },

    //  admin

    async adminUsers(queryUser) {
        return await http.post(`/admin/users`, queryUser)
    },

    async adminInsertUser(userData) {
        return await http.post('/admin/insertUser', userData);
    },

    async adminUpdateUser(userData) {
        return await http.post('/admin/updateUser', userData)
    },

    async adminDeleteUser(userId) {
        return await http.delete(`/admin/deleteUser/${userId}`)
    },

    async adminFindVideos(videoDate) {
        return await http.post('/admin/videos', videoDate)
    },

    async adminUpdateVideo(videoDate) {
        return await http.post('/admin/updateVideo', videoDate)
    },

    async adminFindAlbum(albumData) {
        return await http.post('/admin/Albums', albumData)
    },

    async adminUpdateAlbum(albumData) {
        return await http.post('/admin/updateAlbum', albumData)
    },
};
