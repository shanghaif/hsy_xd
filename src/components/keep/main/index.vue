<template>
	<div class="main-index">
    <head-title  id="a-top" title="移动监管" :logoutType="true"></head-title>
    <div class="grey-background"></div>
    <!-- 管理员 主体 -->
    <div v-if="keepToken.split('|')[0] == 1" id="main" class="main">
      <a href="#a-top">
        <span class="icon iconfont">&#xe626;</span>
      </a>
      <a href="#button-wrapper">        
        <span class="icon iconfont">&#xe624;</span>
      </a>
      <!-- 商家总数 -->
      <div class="store">
        <div class="top">
          <div>实际商家统计</div>
        </div>
        <ul class="bottom">
          <li
            v-for="(item,index) in dataObj.shiji_count" :key="index"
            :class="{is_active:item.count,positionLeft:index%3==0,positionRight:(index+1)%3==0}"
            >
            <div>
              <span style="font-size:2.557rem" class="icon iconfont">&#xe62d;</span>
              <!-- <svg t="1610853580534" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1238" width="200" height="200"><path d="M795.591194 63.739684 226.198359 63.739684 63.510452 343.589491c0 0 0 95.998913 0 111.940741 3.323858 28.184228 15.217293 56.068613 32.532465 77.631732l0 321.099211c0 61.817823 48.02504 106.019608 111.790308 106.019608l606.125149 0c63.766291 0 102.096063-44.200762 102.096063-106.019608L916.054438 533.161964c19.59009-23.062335 31.508086-40.402067 43.150799-77.631732 0-30.63414 0-111.940741 0-111.940741L795.591194 63.739684zM247.110624 106.416669l517.872013 0 129.480028 234.721885L117.629573 341.138555 247.110624 106.416669zM808.15902 918.254652 203.935265 918.254652c-31.883657 0-64.742572-33.08303-64.742572-63.990406l0.001023 0 0-65.038322 735.729003 0 0.299843 59.116165C875.224608 879.275049 840.01914 918.254652 808.15902 918.254652zM874.923742 746.546891 139.195763 746.546891l-0.001023 0 0.001023 0L139.195763 554.500968c17.865737 14.76804 50.024676 21.362542 64.742572 21.362542 30.082552 0 76.258389-35.206492 96.423605-76.208245 22.637642 39.878109 57.441956 76.208245 97.796948 76.208245 42.651402 0 97.046828-33.780958 112.736912-70.386377 15.69213 35.756034 61.267258 70.386377 103.044714 70.386377 41.427469 0 84.70414-38.828146 106.416669-80.432655 25.388421 42.003618 56.370503 80.432655 109.367003 80.432655 8.197076 0 38.355356-7.046825 45.499399-8.395607L874.923742 746.546891zM813.76803 508.146044c-45.000002-0.023537-97.420353-34.982377-97.420353-63.666002l-21.59075 0c0 28.207765-43.100655 63.666002-86.251454 63.666002-41.380394 0-86.355836-36.330136-86.355836-63.666002l-21.588703 0c0 28.207765-57.670164 63.666002-99.073072 63.666002-43.150799 0-95.149528-27.585565-95.149528-63.666002l-21.563119 0c0 28.134084-45.449255 64.538924-86.926868 64.538924-42.103907 0-85.703959-25.909309-85.703959-64.538924L112.144389 382.508716l798.420771 0 0 61.971326 0.002047 0C910.169121 483.109657 852.773217 508.169581 813.76803 508.146044z" p-id="1239" fill="#515151"></path></svg> -->
              <p>({{item.count}})</p>
              <p>{{item.stc_type_name}}</p>
              <!-- <p>{{item.stc_type_name}}({{item.count}})</p> -->
            </div>
          </li>
        </ul>
      </div>
      <!-- 入驻商家 -->
      <div class="store">
        <div class="top">
          <div>入驻商家</div>
        </div>
        <ul class="bottom">
          <li
            v-for="(item,index) in dataObj.ruzhu_num" :key="index"
            :class="{is_active:item.count,positionLeft:index%3==0,positionRight:(index+1)%3==0}"
            >
            <div>
              <svg t="1610853780729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2089" width="200" height="200"><path d="M851.2 960H179.2c-38.4 0-76.8-19.2-96-44.8-25.6-32-25.6-70.4-12.8-115.2l76.8-243.2c12.8-44.8 70.4-83.2 134.4-83.2h115.2c12.8 0 19.2 6.4 19.2 19.2s-12.8 19.2-19.2 19.2H281.6c-44.8 0-89.6 25.6-96 57.6l-76.8 243.2c-6.4 32-6.4 57.6 6.4 76.8 12.8 19.2 38.4 32 64 32h672c25.6 0 51.2-12.8 64-25.6 12.8-19.2 19.2-51.2 6.4-76.8L832 569.6c-12.8-32-57.6-57.6-102.4-57.6H614.4c-12.8 0-19.2-6.4-19.2-19.2s6.4-19.2 19.2-19.2h121.6c57.6 0 115.2 38.4 134.4 83.2l89.6 243.2c12.8 44.8 12.8 83.2-12.8 115.2s-57.6 44.8-96 44.8z" fill="#2c2c2c" p-id="2090"></path><path d="M480 723.2c-12.8 0-19.2-6.4-19.2-19.2V128c0-12.8 6.4-19.2 19.2-19.2s19.2 6.4 19.2 19.2v576c0 12.8-6.4 19.2-19.2 19.2z" fill="#2c2c2c" p-id="2091"></path><path d="M780.8 384h-320V121.6c0-32 25.6-57.6 57.6-57.6h256c19.2 0 38.4 6.4 44.8 25.6s12.8 32 6.4 51.2l-32 70.4c-6.4 12.8-6.4 19.2 0 32l38.4 70.4c6.4 19.2 6.4 38.4-6.4 51.2s-25.6 19.2-44.8 19.2z m-281.6-32h281.6c6.4 0 12.8 0 12.8-6.4s6.4-12.8 0-12.8L768 256c-6.4-19.2-6.4-38.4 0-57.6l32-70.4v-12.8c0-6.4-6.4-6.4-12.8-6.4h-256c-19.2-12.8-32 0-32 12.8v230.4z" fill="#2c2c2c" p-id="2092"></path></svg>
              <p>({{item.count}})</p>
              <p>{{item.stc_type_name}}</p>
              <!-- <p>{{item.stc_type_name}}({{item.count}})</p> -->
            </div>
          </li>
        </ul>
      </div>
      
      <!-- 商品 -->
      <div class="store">
        <div class="top">
          <div>商品</div>
        </div>
        <ul class="bottom">
          <li
            v-for="(item,index) in dataObj.goods_num" :key="index"
            :class="{is_active:item.count,positionLeft:index%3==0,positionRight:(index+1)%3==0}"
            >
            <div>              
              <span style="font-size:2.557rem" class="icon iconfont">&#xe6e7;</span>
              <!-- <p :class="{is_active:item.count>0}"></p> -->
              <p>({{item.count}})</p>
              <p>{{item.name}}</p>
              <!-- <p>{{item.name}}({{item.count}})</p> -->
            </div>
          </li>
        </ul>
      </div>

      <!-- 商家总数 -->
      <div class="store">
        <div class="top">
          <div>从业人员</div>
        </div>
        <ul class="Employees">
          <li
            v-for="(item,index) in dataObj.lean_arr" :key="index"
            :class="{is_active:item.value,positionLeft:index%3==0,positionRight:(index+1)%3==0}"
            >
            <div>
              <span>{{item.name.slice(0,2)}}</span>
              <span>({{item.count_z}})</span>
            </div>
            <div>
              <span>{{item.name.slice(2,4)}}</span>
              <span>({{item.count_h}})</span>
            </div>
          </li>
        </ul>
      </div>

       <!-- 商家总数 -->
      <div class="store store-list" v-if="keepInfo.type == 1">
        <div class="top">
          <div>区域</div>
        </div>
        <div v-for="(obj,index) in dataObj.quyu_count" :key="index">
          <span>{{obj.name}}</span>
          <ul class="bottom">
            <li :class="{is_active:obj.z_count}" class="positionLeft">
              <div>
                <svg t="1611379285229" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4525" width="200" height="200"><path d="M832 874.474667a21.333333 21.333333 0 0 1-21.376 21.546666H213.376A21.482667 21.482667 0 0 1 192 874.453333v-213.12H149.333333v213.12a64.149333 64.149333 0 0 0 64.042667 64.213334h597.248A64 64 0 0 0 874.666667 874.453333v-213.12h-42.666667v213.12z m-8-303.104a117.056 117.056 0 0 1-137.621333-47.573334l-40.554667-63.872-33.685333 67.712a111.168 111.168 0 0 1-100.096 62.08 111.317333 111.317333 0 0 1-100.138667-62.08l-33.706667-67.712-40.512 63.872a116.778667 116.778667 0 0 1-137.706666 47.573334c-57.429333-26.090667-86.464-93.866667-64.874667-153.685334l40.490667-112.277333 37.418666-147.029333c0.938667-3.797333 7.68-9.045333 11.605334-9.045334h576.405333c4.010667 0 10.645333 5.141333 11.605333 9.045334l38.314667 153.258666 37.930667 105.749334c21.589333 59.861333-7.466667 127.722667-64.874667 153.984m105.002667-168.469334l-36.672-101.610666-38.314667-153.258667C848.32 125.162667 824.576 106.666667 801.024 106.666667h-576.426667c-23.552 0-47.296 18.624-52.992 41.386666L136.746667 287.466667l-1.28 3.434666L94.954667 403.2c-29.333333 81.365333 10.666667 173.184 89.408 207.722667 70.976 25.984 149.76-1.877333 189.354666-64.277334a154.56 154.56 0 0 0 138.325334 85.717334 154.389333 154.389333 0 0 0 138.304-85.717334 159.872 159.872 0 0 0 189.333333 64.277334c78.72-34.730667 118.741333-126.506667 89.322667-208" fill="#515151" p-id="4526"></path><path d="M746.645333 362.666667H277.354667a21.333333 21.333333 0 1 0 0 42.666666h469.290666a21.333333 21.333333 0 1 0 0-42.666666" fill="#515151" p-id="4527"></path></svg>
                <!-- <p>{{obj.r_count}}</p> -->
                <p>商家总数({{obj.z_count}})</p>
              </div>
            </li>
            <li :class="{is_active:obj.r_count}" >
              <div>
                <svg t="1610853970403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8890" width="200" height="200"><path d="M776.1 897.5h-530c-41.7 0-75.7-37.4-75.7-83.4V523.5c0-11.4 9.2-20.6 20.6-20.6s20.6 9.2 20.6 20.6v290.7c0 23.3 15.5 42.2 34.5 42.2h530c11.4 0 20.6 9.2 20.6 20.6s-9.2 20.5-20.6 20.5z" fill="#2c2c2c" p-id="8891"></path><path d="M659.6 539.4c-27.4 0-53.5-9.6-74.3-26.8-20.8 17.2-46.8 26.7-74.1 26.8h-0.3c-27.3-0.1-53.2-9.6-73.9-26.8-20.8 17.2-47 26.8-74.3 26.8-27.4 0-53.5-9.6-74.3-26.8-20.8 17.2-46.9 26.8-74.3 26.8h-0.1c-60.1-0.2-110.5-46.1-117.3-106.6l-0.2-1.8 2-30.3c0.4-4.6 1.4-9.2 3.2-13.5l0.2-0.5 74.2-170.3c1.7-4.4 14.8-35.9 37.7-60.1 18.5-19.6 47.5-29.9 83.8-29.9 5.2 0 9.1 0.2 10.9 0.4l407.2-0.1c2.9-0.2 7.1-0.3 9.2-0.3 25.3 0 60.4 5.2 83.8 29.9 22.3 23.5 35 53.4 37.7 60L920.8 387c1.8 4.3 2.9 8.9 3.3 13.7l2 25.1-0.2 1.9c-6.9 64.8-56.2 111.8-117.4 111.8-27.3 0-53.4-9.6-74.3-26.8-21 17.1-47.1 26.7-74.6 26.7z m-74.3-88.3l15.9 19.2c14.6 17.7 35.9 27.8 58.4 27.8 22.6 0 43.9-10.1 58.4-27.8l15.9-19.2 15.9 19.2c14.6 17.7 35.9 27.8 58.4 27.8 39.1 0 70.9-30.6 76.2-73.1l-1.7-21.2c0-0.6-0.1-0.9-0.2-1L808.3 232l-0.1-0.3c-0.5-1.1-11.3-28.1-29.5-47.2-14-14.8-39.8-17-53.9-17-3.1 0-5.4 0.1-6.3 0.1l-0.8 0.1-411.1 0.1-0.9-0.1s-3.3-0.3-8.3-0.3c-17.2 0-40.6 3-53.9 17-15.5 16.4-26.5 39.5-29.4 47.1l-0.3 0.8-74.2 170.3c-0.1 0.3-0.2 0.7-0.2 1l-1.7 26.1c5.2 38.9 37.7 68.1 76.2 68.3 22.5 0 43.8-10.1 58.3-27.8l15.9-19.2 15.9 19.2c14.6 17.6 35.9 27.8 58.5 27.8s43.9-10.1 58.5-27.7l15.9-19.2 15.9 19.2c14.5 17.5 35.7 27.6 58.1 27.7h0.2c22.4 0 43.7-10.1 58.2-27.7l16-19.2z m133.8-283.6h-0.3 0.3z" fill="#2c2c2c" p-id="8892"></path><path d="M745.1 816c-5.3 0-10.6-2-14.6-6l-91.7-91.7c-8.1-8-8.1-21.1 0-29.2l91.7-91.7c8-8.1 21.1-8.1 29.2 0 8.1 8 8.1 21.1 0 29.2l-77.1 77.1 77.1 77.1c8.1 8 8.1 21.1 0 29.2-4 4-9.3 6-14.6 6z" fill="#2c2c2c" p-id="8893"></path><path d="M655.4 724.7c-11.3 0-20.6-9.2-20.6-20.5 0-11.4 9.2-20.6 20.5-20.7l249.6-0.9h0.1c11.4 0 20.6 9.2 20.6 20.5 0 11.4-9.2 20.6-20.5 20.7l-249.7 0.9z" fill="#2c2c2c" p-id="8894"></path></svg>
                <!-- <p>{{obj.r_x_count}}</p> -->
                <p>入驻商家({{obj.r_count}})</p>
              </div>
            </li>
            <li :class="{is_active:obj.r_x_count}"  class="positionRight">
              <div>
                <svg t="1610853939136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7517" width="200" height="200"><path d="M512 128c51.9 0 102.1 10.1 149.4 30.2 45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.4s-10.1 102.1-30.2 149.4c-19.3 45.7-47 86.8-82.3 122.1s-76.4 63-122.1 82.3c-47.3 20-97.6 30.2-149.4 30.2s-102.1-10.1-149.4-30.2c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.4s10.1-102.1 30.2-149.4c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3C409.9 138.1 460.1 128 512 128m0-64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z" fill="#2c2c2c" p-id="7518"></path><path d="M255.5 411.9v-47.3c34.5 1.5 66 2.3 94.5 2.3h319.5c27 0 59.2-0.7 96.8-2.3v47.3c-37.5-1.5-79.5-2.3-126-2.3-7.5 46.5-21 89.6-40.5 129.4-19.5 39.8-40.5 72.4-63 97.9 28.5 25.5 66 46.1 112.5 61.9 46.5 15.8 87 25.1 121.5 28.1-13.5 10.5-25.5 26.2-36 47.3-25.5-6-58.5-16.5-99-31.5s-84-40.5-130.5-76.5c-61.5 51-135 88.5-220.5 112.5-3-13.5-13.5-28.5-31.5-45 25.5-3 60.4-12.4 104.6-28.1 44.2-15.8 82.1-37.9 113.6-66.4-52.5-54-90-131.2-112.5-231.8h-22.5c-31.5 0-58.5 1.5-81 4.5z m247.5 198c48-58.5 78-125.2 90-200.3H406.3c11.9 81 44.2 147.8 96.7 200.3z m36-267.8c-12 3-25.5 10.5-40.5 22.5-21-39-39.8-71.2-56.3-96.8 10.5-3 23.2-10.5 38.3-22.5 16.5 25.6 36 57.8 58.5 96.8z" fill="#2c2c2c" p-id="7519"></path></svg>
                <!-- <p>{{obj.z_count}}</p> -->
                <p>入驻学校({{obj.r_x_count}})</p>
              </div>
            </li>
          </ul>          
        </div>
      </div>
      <!-- 按钮 跳转 -->
      <div class="button-wrapper" id="button-wrapper">
        <button @click="$router.push( { name: 'KeepSafetyList' } )" class="ds-button-large">安全员管理</button>
        <button @click="$router.push( { name: 'KeepMessage' } )" class="ds-button-large">信息处理</button>
      </div>
      
    </div>

    <!-- 安全员 主体 -->
    <div v-else >        
      <div class="s_text">
        <ul>
          <li
            v-for="(v,i) in list"
            :key="(i)"
            :class="{brand_active: params.status == v.id}" @click="fun_changeSabrand_id(v.id)" >
            {{v.name}}
            <p class="line"></p>
          </li>
        </ul>
      </div>
      <!-- 列表 -->
      <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div v-if="complaintList && complaintList.length">
          <div class="goods-item" v-for="(item, index) in complaintList" :key="index">
            <div class="goods-info"
              @click="$router.push( { name: 'KeepSafetyMsgForm',query:{text_id:item.text_id } } )">
              <div class="p-info">
							<!-- <div class="buyer-info">上报人: {{ item.safety_name }}</div> -->
							<div class="iten-content">上报标题：{{ item.text_title }}</div>
							<div class="buyer-info">上报时间: {{ new Date(item.add_time*1000).toLocaleString() }}</div>
              <span v-if="item.end_time">已处理</span>
              </div>
            </div>
          </div>
        </div>
        <empty-record2 isFrom='content' v-else-if="complaintList && !complaintList.length"></empty-record2>
      </div>
      
      <!-- 按钮 跳转 -->
      <div class="button-wrapper position-bot" >
        <button @click="$router.push( { name: 'KeepSafetyMsgForm' } )" class="ds-button-large">上传信息</button>
      </div>
    </div>
    
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { mapState,mapMutations } from 'vuex';
import HeadTitle from '../HeadTitle';
import EmptyRecord2 from '../EmptyRecord2';
import { getKeepIndex, keepLogout } from '../../../apikeep/login';
import { keepSafetyTextList } from '../../../apikeep/safety';
export default {
	data() {
		return {
      // 管理员数据
      dataObj : {
        shiji_count:[
          {"count":0,"stc_type":0,"stc_type_name":"其他"},
          {"count":0,"stc_type":0,"stc_type_name":"食品生产加工"},
          {"count":0,"stc_type":0,"stc_type_name":"食品经营"},
          {"count":0,"stc_type":0,"stc_type_name":"小餐饮"},
          {"count":0,"stc_type":0,"stc_type_name":"小作坊"},
          {"count":0,"stc_type":0,"stc_type_name":"总数"}
        ],
        ruzhu_num:[
          {"count":0,"stc_type_name":"生产企业"},
          {"count":0,"stc_type_name":"小作坊"},
          {"count":0,"stc_type_name":"食品经营"},
          {"count":0,"stc_type_name":"学校"},
          {"count":0,"stc_type_name":"总数"}
        ],
        goods_num:[
          {"count":0,"name":"商品总数"},
          {"count":0,"name":"在售商品"},
          {"count":0,"name":"当月商品总数"}
        ],
        lean_arr:[
          {"count_h":0,"count_z":0,"name":"执法监管"},
          {"count_h":0,"count_z":0,"name":"食品生产"},
          {"count_h":0,"count_z":0,"name":"食品流通"},
          {"count_h":0,"count_z":0,"name":"餐饮服务"},
          {"count_h":0,"count_z":0,"name":"水产品生产"},
          {"count_h":0,"count_z":0,"name":"畜牧产品生产"},
          {"count_h":0,"count_z":0,"name":"农业生产"},
          {"count_h":0,"count_z":0,"name":"林业生产"},
          {"count_h":0,"count_z":0,"name":"食源性疾病"}
        ],
        quyu_count:[{"r_count":0,"r_x_count":0,"z_count":0,"name":"曹城街道办事处"}]
      },

      list:[
        { name : '待处理', id:'1' },
        { name : '已处理', id:'2' },
      ],
			params: { 
        page      : 0,                              //第几页
        per_page  : 10,                             //每次查询条数
        status: 1,                              //状态审核过 未审核
        safety_id : this.keepToken,   //安全员id
      },
        
			loading      : false,   // 是否加载更多
			isMore       : true,    // 是否有更多
			complaintList: false,   // 商品列表
		}
  },
  components:{
    'head-title'   : HeadTitle,      //头部
    'empty-record2': EmptyRecord2,   //空白页
  },
	computed: {
    ...mapState({
      keepInfo : state => state.keep.keepInfo,    // 获取 登录信息
      keepToken: state => state.keep.keepToken,   // token
    }),

  },
  created(){
    // 如果未登录登录
    if(!this.keepInfo){
      // 返回登陆页
      this.$router.push( { name : 'KeepLogin'} );
      return false;
    }
    // 管理员 查询 当前 列表
    ( this.keepToken.split('|')[0] == 1 )?(
      getKeepIndex().then(res=>{
        this.dataObj = res.result;
      }).catch(err=>{
        Toast(err.message);
      })
    ):(this.params.safety_id = this.keepToken.split('|')[1]);
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {    
		...mapMutations({
			clearkeepInfo: 'clearkeepInfo' //清空seller数据
		}),
    // 切换 标题
    fun_changeSabrand_id(id){
      this.params ={ 
        page: 1,
				per_page: 10,
        status: id,
				store_id: 30,
      },
      this.getComplaintList(false);
    },
    
    // 查询函数
		getComplaintList(ispush) {
      Indicator.open();
			keepSafetyTextList(this.params).then(res => {
        Indicator.close();
				if (res) {
					if (ispush && this.complaintList) {
						this.complaintList = this.complaintList.concat(res.result.safetytext_list);
					} else {
						this.complaintList = res.result.safetytext_list;
					}
          this.isMore = res.result.hasmore;
				}
			}).catch(err=>{
        Indicator.close();
        Toast(err.message);
      })
    },
    // 滑动加载
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getComplaintList(true);
			}
    },
    
    // 退出
    fun_right(){
			MessageBox.confirm('您确定要退出吗？').then(action => {
        Indicator.open();
        var timer = setTimeout(()=>{
          Indicator.close();
          this.clearkeepInfo();
          clearTimeout(timer);
          timer = null;
          this.$router.push({ name: 'KeepLogin' });
        },300)
			});
    },
	}
};
</script>

<style lang="scss" scoped>
.main-index{
  // 字体 小
  @mixin fs_small{
    font-size: 3.2vw;
  }
  // 字体 中
  @mixin fs_{
    font-size: 4vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size:4.2668vw;
  }

  // 阴影
  @mixin item_bs{
    // box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);
    // margin: 5.8vw 0;
    // margin-top: 2vw;
  }
  // 弹性布局
  @mixin item_flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  // 边距
  $pmvw: 2.8vw;
  // 圆角
  $bord_radius:6px;  
  @include fs_;
  margin-bottom:3.5rem;
  // 灰色背景
  .grey-background{
    background: #F3F3F3;
    width: 100vw;
    height: 15px;
  }
  // 主体内容
  .main{    
    width: 94vw;
    margin: 0 auto;
    >a{
      position: fixed;right: 1rem;
      .icon{
        color: #666;
        font-size: 8vw;
      }
      &:first-child{
        top: 43vh;
      }
      &:nth-child(2){
        bottom: 43vh;
      }
    }

    // 商家 统计
    .store{
      border-radius: $bord_radius;
      @include item_bs;
      margin: 3.8vw 1vw;
      >div{
        margin: 1rem 0;
        >span{
          font-weight: 600;
          color: #333333;
        }
      }
      .top{
        &::before{
          content:'';
          width:2px;
          height: 13.5px;
          display:inline-block;
          color: #D83A15;
          background: #D83A15,
        }
        @include item_flex();
        justify-content: flex-start;
        align-items: center;
        @include fs_big();
        margin-bottom: 2vw;
        div{
          font-weight: 600;
          margin-left: 5px;
        }
      }
      .bottom{
        @include item_flex();
        justify-content: flex-start;
        padding: 0 3vw;
        .icon{
          width: 7.5vw;
          height: 7.5vw;
        }
        li{
          width : 33.3%;
          margin: 2vw 0 0 0;
          text-align: center;
          color: #B3B9BF;
          display:flex;
          justify-content: center;
          div{
            min-width:  16vw;
            text-align: center;
          }
          img{
            width: 5vw;
            margin: 2vw 0;
          }
          p{
            text-align: center;
            @include fs_();
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;

            &:last-child{
              @include fs_small();
              margin: 1vw 0 4vw;
            }
          }
        }
        
        .is_active{
          color: #2A303C;
        }

        .positionLeft{
          justify-content: flex-start;
        }
        .positionRight{
          justify-content: flex-end;
        }

      }
      .bottom-list{
        margin: 3vw 0 0 0;
      }

      .Employees{        
        @include item_flex();
        li{
          width: 31.6%;
          border: 1px solid #666;
          border-radius: 0.28rem;
          margin: 1.4vw 0;
          padding: 1.4vw;
          box-sizing: border-box;
          display:flex;
          flex-direction: column;
          align-items: center;

          div{
            width: 100%;
            span{
              &:first-child{
                font-weight: 500;
              }
              color: #333;
              @include fs_();
              &:last-child{
                margin-left: 0.8rem;
              }
            }
          }
        }
      }
    }

    .store-list{
      >div{
        &:not(:first-child){
          box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
          padding: .95rem;
          border-radius: .8rem;
        }
      }
      .bottom{
        padding: 0 2vw;
      }
    }

  }


  /*************************************************************** */
  
  // 搜索文本
  .s_text{
    overflow: auto;
    padding: 1rem 1.43rem;
    height: 2.4rem;
    padding-bottom: 0;
    position: fixed;
    top: 3.74rem;
    width: 100%;
    background: #fff;
    z-index: 9;
    ul{
      font-size: 1.56rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      li{
        padding: 0 .22rem;
        text-align: center;
        height: 2.4rem;
        line-height: 2.2rem;
        flex-shrink: 0;
        margin: 0 2vw 0 0;
        color: #A4ABB3;
        p{
          width: 2.36vw;
          height: 0.885vw;
          margin: 0 auto;
          border-radius: 3px;
        }
      }
      
      .brand_active{
        color:#2A303C;
        .line{
          background: linear-gradient(270deg, #FF8F7A 0%, #E73919 100%);
        }
      }
    }
  }

  .list{
    margin-top: 4rem;
    
    .goods-item {
      background: #fff;
      padding: 0.95rem 1.43rem;
      margin-bottom: 0.95rem;
      margin: 0.95rem;
      border-radius: 1rem;
      position: relative;
      box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);
    }
    
    .p-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span{
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #D83A15;
      }
      div {
        font-size: 1.14rem;
        font-weight: 400;
        color: #6F6F6F;
        margin: 1rem 0;
      }
      .iten-content {
        display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
      }
      .name {
        
      }
      .buyer-info {
        
      }
    }
  }
  
  // 按钮
	.button-wrapper {
		padding: 0 1.43rem;
    display: flex;
    justify-content: space-between;
		.ds-button-large {
      width: 48%;
			height: 3.81rem;
			font-size: 1.33rem;
			background: rgba(230, 230, 230, 1);
			border-radius: .6rem;
			color: #fff;
      
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0px 0px 20rpx 0px rgba(251, 104, 84, 0.5);
		}
	}

  .position-bot{
    position: fixed;
    bottom: 6rem;
    width: 100%;
    /* left: 50%; */
    justify-content: center;
    padding: 0;
  }
}
</style>
