import axios from "axios";

const serverAddresss = `http://localhost:8080`      // 你的 API 基础 URL

const http = axios.create({
    baseURL: serverAddresss,
    timeout: 6000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export default {
    //  后端地址
    serverAddresss() {
        return serverAddresss
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

    async search(userId) {
        return await http.get(`/api/searchUser?userId=${userId}`)
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
        return `${serverAddresss}/static/video?videoId=${videoId}`
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

    async getVideoUrl(videoId) {
        return await http.get(`/api/video/${videoId}`)
    },

    async deleteVideo(videoId) {
        return await http.delete(`/api/deleteVideo/${videoId}`)
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
    }

};
