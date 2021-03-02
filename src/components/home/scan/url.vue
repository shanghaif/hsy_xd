<template>
  <div>
			<mt-button icon="back" slot="left" @click="$router.push({ name: 'HomeIndex'  })"></mt-button>
    <div>
      <iframe 
        :src="$route.params.url"
        :style="urlWH"
        id="bdIframe" 
        scrolling="no" 
        frameborder="0" 
        ></iframe>

    </div>
  </div>
</template>

<script>
export default {
  computed:{
    urlWH:function(){
      const oIframe = document.getElementById('bdIframe');
      var deviceWidth = document.documentElement.clientWidth;
      var deviceHeight = document.documentElement.clientHeight;
      deviceWidth = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      // deviceWidth = '100%'; //数字是页面布局宽度差值
      deviceHeight = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
      return {
        width:deviceWidth,height:deviceHeight
      }
      console.log(oIframe.html());
    }
  }

  
}
</script>

<style>

</style>