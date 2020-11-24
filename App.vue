<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.getSystemInfo({
      success: function (res) {
      }
    });
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
uni-page-body {
  height: 100%;
}

page {
  height: 100%;
}
</style>
