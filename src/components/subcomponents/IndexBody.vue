<!-- VideoPlayer.vue -->
<template>
  <div class="video-container">
    <video controls autoplay  :src="url" type="video/mp4">
      <source>
      您的浏览器不支持视频播放。
    </video>
  </div>
</template>

<script>
import authService from '../../utils/authService';

export default {
  data() {
    return {
      url: '',

    }
  },
  name: 'VideoPlayer',
  methods: {
    async getVideo() {
    const videoId = 3
    this.url =await authService.videoURL(videoId)
    }
  },
  mounted() {
    this.getVideo()
  }
};
</script>

<style scoped>
/* .video-container {
  width: 100%;
  max-width: 800px;
 
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
} */

video {
  width: 100%;
  height: 500px;
}
</style>
