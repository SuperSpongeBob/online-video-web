<template>
    <el-main @scroll="handleScroll"
        style=" height: 100vh; position: relative; overflow-y: auto; scrollbar-width: none;">
        <el-row :gutter="20">

            <el-row v-for="movie in movies">
                <el-space direction="vertical" alignment="flex-start">
                    <el-skeleton style="width: 240px" :loading="loading" animated>
                        <template #template>
                            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
                            <div style="padding: 14px">
                                <el-skeleton-item variant="h3" style="width: 50%" />
                                <div
                                    style="display: flex;align-items: center;justify-items: space-between;margin-top: 16px;height: 16px;">
                                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                                    <el-skeleton-item variant="text" style="width: 30%" />
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <el-card :body-style="{ padding: '0px', marginBottom: '1px' }"
                                style="width: 240px; height: 250px; margin: 5px">
                                <div v-if="!loading" :style="{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    color: 'white',
                                    backgroundColor: movie.videoIsVip === 2 ? '#EC2828' : '#33CD00'}">
                                    {{ movie.videoIsVip === 2 ? "VIP" : "免费" }}
                                </div>
                                <img class="image" :src="movie.videoAlbum.videoPostPath"
                                    style="width: 240px; height: 180px" @click="goToMoviePage(movie)" @error="handleError"/>
                                <div style="padding: 4px">
                                    <div class="bottom card-header" style="margin-bottom: 8px;;font-weight: bold;font-size: larger;">
                                        {{ movie.videoName }}
                                    </div>
                                    {{ movie.videoTitle }}
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-space>
            </el-row>
        </el-row>
    </el-main>
</template>

<script>
import fallbackImage from '../../assets/Damaged.png'
import authService from "../../utils/authService";

export default {
    name: 'VideoList',
    props: {
        videoIsVip: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            movies: [],
            req: {
                // videoName:"遮天",
                // videoId:'',
                videoIsVip: this.videoIsVip,             //  父组件传来的值
                pageNum: 1, //  初始化页码
                pageSize: 28, //  设置加载每页大小
                isLoading: false, //  是否真正加载
                videoAlbum: {
                    // videoAlbumId:14,
                    // videoAlbumName:"遮天"
                    // videoChannel:"动漫"
                },
            },
            video: {
                pageNum: 1, //  初始化页码
                pageSize: 28, //  设置加载每页大小
            },
        };
    },
    methods: {
        async fetchMovies() {
            try {
                if (this.req.isLoading) return;
                this.req.isLoading = true;
                // const response = await axios.post(`http://localhost:8080/api/videos`, this.req);
                const response = await authService.getIndexVideos(this.req)
                console.log(response.data)
                if (response.status == 200) {

                    // 为每个元素的 videoAlbum.videoPostPath 属性添加前缀并处理 null 值
                    const newMovies = response.data.map(item => {
                        if (item.videoAlbum) {
                            if (item.videoAlbum.videoPostPath) {
                                return {
                                    ...item,
                                    videoAlbum: {
                                        ...item.videoAlbum,
                                        videoPostPath: `${authService.serverAddresss()}/images/${item.videoAlbum.videoPostPath}`
                                    }
                                };
                            } else {
                                return {
                                    ...item,
                                    videoAlbum: {
                                        ...item.videoAlbum,
                                        videoPostPath: fallbackImage
                                    }
                                };
                            }
                        }
                        return item;
                    });

                    // const newMovies = response.data;
                    this.movies = [...this.movies, ...newMovies];
                    console.log(this.movies)
                    this.req.pageNum++;
                    this.req.isLoading = false;
                } else if (response.status == 204) {
                    this.$message.warning({ message: '到底啦~~~~~', showClose: true })
                    console.log('没有数据了')
                    return
                } else {
                    return
                }

            } catch (error) {
                console.error(error);
            }

            // try {
            //   const response = await axios.get('http://localhost:8080/api/videos')
            //   this.movies = response.data
            //   // console.log(this.movies)
            // } catch (error) {
            //   console.error('Error fetching movies:', error)
            // }
        },

        handleScroll(event) {
            const container = event.target;
            const scrollTop = container.scrollTop;
            const clientHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            // 检查是否滚动到底部
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                this.fetchMovies(); // 加载更多视频
            }
        },

        //跳转视频播放页
        goToMoviePage(movie) {
            //  动态生成跳转链接
            //  新窗口打开，并将视频id传出去
            window.open(`${window.location.origin}/videoPlay?movieId=${movie.videoId}&VIP=${movie.videoIsVip}&videoName=${movie.videoName}&videoTitle=${movie.videoTitle}`);
        },
        handleError(event){
            event.target.src = fallbackImage
            // event.target.onError
        },
    },
    mounted() {
        this.fetchMovies();
    },
};
</script>
