<template>
    <div class="container transport-form">
        <div class="common-header-wrap">
            <mt-header :title="getTitle" class="common-header">
                <mt-button slot="left" icon="back" @click="goBack"></mt-button>
            </mt-header>
        </div>

        <mt-field label="区域名称" v-model="transport_info.transport_title" ></mt-field>
        <mt-cell title="限制配送">
            <mt-switch v-model="transport_info.transport_is_limited"></mt-switch>
        </mt-cell>

        <div @click="parentVisible=true">
            <mt-cell title="设置城市运费" is-link />
        </div>

        <mt-button class="ds-button-large" type="primary"  v-on:click="submit">保存</mt-button>

        <div v-if="parentVisible" position="right" class="my-popup common-popup-wrapper" style="z-index:1000">
            <div class="common-header-wrap">
                <mt-header title="设置城市运费" class="common-header">
                    <mt-button slot="left" icon="back" @click="parentVisible=false"></mt-button>
                    <mt-button slot="right" @click="addTransportExtend">新增</mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content" v-if="transport_extend">
                <div v-if="!transport_info.transport_is_limited">
                    <div>
                        <mt-cell class="label" title="默认运费"/>
                    </div>
                    <mt-field label="首件数量" v-model="transport_extend[default_transportext_id].transportext_snum"></mt-field>
                    <mt-field label="首件费用" v-model="transport_extend[default_transportext_id].transportext_sprice"></mt-field>
                    <mt-field label="续件数量" v-model="transport_extend[default_transportext_id].transportext_xnum"></mt-field>
                    <mt-field label="续件费用" v-model="transport_extend[default_transportext_id].transportext_xprice"></mt-field>
                </div>
                <div v-for="(item,key) in transport_extend" :key="key">

                    <div v-if="item && !item.transportext_is_default">
                        <div @click="showCity(key)">
                            <mt-cell title="运送到" is-link :value="transport_extend[key].transportext_area_name"/>
                        </div>
                        <mt-field label="首件数量" v-model="transport_extend[key].transportext_snum"></mt-field>
                        <mt-field label="首件费用" v-model="transport_extend[key].transportext_sprice"></mt-field>
                        <mt-field label="续件数量" v-model="transport_extend[key].transportext_xnum"></mt-field>
                        <mt-field label="续件费用" v-model="transport_extend[key].transportext_xprice"></mt-field>
                        <mt-button size="large" type="primary" @click="delTransportExtend(key)">删除</mt-button>
                    </div>

                </div>
            </div>

        </div>
        <div v-if="cityVisible" position="right" class="my-popup common-popup-wrapper" style="z-index:1001">
            <div class="common-header-wrap">
                <mt-header title="选择城市" class="common-header">
                    <mt-button slot="left" icon="back" @click="cityVisible=false;getCityName()"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content" v-if="area_list">
                <div class="city-1" v-for="(region,region_name) in area_list.region" :key="region_name">
                    <div class="list-checkbox-wrapper">
                    <div class="list-checkbox">
                    <input
                            type="checkbox"
                            class="checkbox"
                            :id="region_name"
                            v-model="regionChecked[region_name]"
                            @change="changeCityStatu(0,region_name,$event)"
                    />
                    <label :for="region_name"><span class="iconfont">&#xe69b;</span></label>

                    </div>
                    <span class="checkbox-text">{{region_name}}</span>
                    </div>
                    <div class="city-2" v-for="city_id_1 in region" :key="city_id_1">
                        <div class="list-checkbox-wrapper">
                        <div class="list-checkbox">
                        <input
                                type="checkbox"
                                class="checkbox"
                                :id="city_id_1"
                                @change="changeCityStatu(1,city_id_1,$event)"
                                v-model="provinceChecked[city_id_1]"
                                :value="city_id_1"
                        />
                        <label :for="city_id_1"><span class="iconfont">&#xe69b;</span></label>

                        </div>
                        <span class="checkbox-text">{{area_list.name[city_id_1]}}</span>
                        </div>
                        <div class="city-3"  v-for="city_id_2 in area_list.children[city_id_1]" :key="city_id_2">
                            <div class="list-checkbox-wrapper">
                            <div class="list-checkbox">
                            <input
                                    type="checkbox"
                                    class="checkbox"
                                    :id="city_id_2"
                                    @change="changeCityStatu(2,city_id_2,$event)"
                                    v-model="cityChecked[city_id_2]"
                                    :value="city_id_2"
                            />
                            <label :for="city_id_2"><span class="iconfont">&#xe69b;</span></label>

                            </div>
                            <span class="checkbox-text">{{area_list.name[city_id_2]}}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { getAreaList } from '../../../api/area'
import { editTransport, saveTransport } from '../../../api/sellerTransport'
export default {
  components: {
  },
  props: {
    ifComponent: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: function () {
        return { action: 'add', transport_id: 0 }
      }
    }
  },
  computed: {
    isAddMode () {
      let mode = this.ifComponent ? this.query.action : this.$route.query.action
      // add: 添加地址，edit: 编辑地址
      if (mode === 'add') {
        return true
      } else {
        return false
      }
    },
    getTitle () {
      if (this.isAddMode) {
        return '新增售卖区域'
      } else {
        return '修改售卖区域'
      }
    }

  },
  data () {
    return {
      area_list: {},
      transport_info: {
        transport_is_limited: false
      },
      default_transportext_id: 0,
      transport_extend: [{
        transport_id: this.ifComponent ? this.query.transport_id : this.$route.query.transport_id,
        transport_title: '',
        transportext_area_id: '',
        transportext_area_name: '',
        transportext_id: 0,
        transportext_is_default: 1,
        transportext_snum: '',
        transportext_sprice: '',
        transportext_top_area_id: '',
        transportext_xnum: '',
        transportext_xprice: ''
      }],
      parentVisible: false,
      cityVisible: false,
      regionChecked: {},
      cityChecked: {},
      provinceChecked: {},
      index: 0,
      transport_id: this.ifComponent ? this.query.transport_id : this.$route.query.transport_id
    }
  },
  created: function () {
    getAreaList().then(res => {
      this.area_list = res.result.area_list
    }).catch(error => {
      Toast(error.message)
    })
    this.initTransport()
  },
  watch: {
    query: function (val) {
      this.transport_id = val.transport_id
      this.initTransport()
    }
  },
  methods: {
    initTransport () {
      if (!this.isAddMode) {
        editTransport(this.transport_id).then(res => {
          var transport_info = res.result.transport_info
          transport_info.transport_is_limited = !!transport_info.transport_is_limited
          this.transport_info = transport_info
          this.transport_extend = res.result.transport_extend
          for (var i in this.transport_extend) {
            if (this.transport_extend[i].transportext_is_default) {
              this.default_transportext_id = i
            }
          }
        }).catch(function (error) {
          Toast(error.message)
        })
      }
    },
    goBack () {
      if (this.ifComponent) {
        this.$emit('closeTransortForm')
      } else {
        this.$router.go(-1)
      }
    },
    submit () {
      saveTransport(this.transport_info, this.transport_extend).then(res => {
        if (this.ifComponent) {
          this.$emit('saveTransport')
        } else {
          this.$router.push({ name: 'SellerTransportList' })
        }
      }).catch(error => {
        Toast(error.message)
      })
    },
    delTransportExtend (key) {
      delete (this.transport_extend[key])
      this.$forceUpdate()
    },
    addTransportExtend () {
      this.transport_extend.push({
        transport_id: this.transport_id,
        transport_title: '',
        transportext_area_id: '',
        transportext_area_name: '',
        transportext_id: 0,
        transportext_is_default: 0,
        transportext_snum: '',
        transportext_sprice: '',
        transportext_top_area_id: '',
        transportext_xnum: '',
        transportext_xprice: ''
      })
    },
    changeCityStatu (layer_id, id, event) {
      var temp = this.regionChecked
      var temp2 = this.cityChecked
      var temp1 = this.provinceChecked
      switch (layer_id) {
        case 0:
          for (var index in this.area_list.region[id]) {
            var city_id_1 = this.area_list.region[id][index]
            if (!this.regionChecked[id]) {
              delete temp1[city_id_1]
            } else {
              temp1[city_id_1] = true
            }
            for (var index2 in this.area_list.children[city_id_1]) {
              var city_id_2 = this.area_list.children[city_id_1][index2]
              if (!this.regionChecked[id]) {
                delete temp2[city_id_2]
              } else {
                temp2[city_id_2] = true
              }
            }
          }

          this.cityChecked = temp2
          this.provinceChecked = temp1
          this.regionChecked = temp
          break
        case 1:
          if (!this.provinceChecked[id]) {
            delete temp1[id]
            for (var region_name in this.area_list.region) {
              for (var index in this.area_list.region[region_name]) {
                if (this.area_list.region[region_name][index] == id) {
                  delete temp[region_name]
                  break
                }
              }
            }
          }
          for (var index2 in this.area_list.children[id]) {
            var city_id_2 = this.area_list.children[id][index2]
            if (!this.provinceChecked[id]) {
              delete temp2[city_id_2]
            } else {
              temp2[city_id_2] = true
            }
          }

          if (!Object.keys(this.provinceChecked).length) {
            temp = {}
          }
          this.cityChecked = temp2
          this.provinceChecked = temp1
          this.regionChecked = temp
          break
        case 2:
          if (!this.cityChecked[id]) {
            delete temp2[id]
            for (var region_name in this.area_list.region) {
              for (var index in this.area_list.region[region_name]) {
                if (this.area_list.region[region_name][index] == this.area_list.parent[id]) {
                  delete temp[region_name]
                  break
                }
              }
            }
          }
          var flag = false
          for (var index in this.provinceChecked[this.area_list.parent[id]]) {
            if (this.cityChecked[this.provinceChecked[this.area_list.parent[id]][index]]) {
              flag = true
              break
            }
          }
          if (!flag) {
            delete temp1[this.area_list.parent[id]]
          }

          if (!Object.keys(this.provinceChecked).length) {
            temp = {}
          }
          this.cityChecked = temp2
          this.provinceChecked = temp1
          this.regionChecked = temp
          break
      }
      this.$forceUpdate()
    },
    getCityName () {
      var city_name = []
      for (var i in this.provinceChecked) {
        city_name.push(this.area_list.name[i])
      }
      for (var j in this.cityChecked) {
        if (!this.provinceChecked[this.area_list.parent[j]]) {
          city_name.push(this.area_list.name[j])
        }
      }
      var city_id_1 = Object.keys(this.provinceChecked)
      var city_id_2 = Object.keys(this.cityChecked)
      var _city_id_2 = city_id_2
      var _city_id_1 = city_id_1
      if (city_id_1 && city_id_1.length) {
        _city_id_2 = city_id_2.concat(city_id_1)
      }
      for (var i in city_id_2) {
        if (_city_id_1.indexOf(this.area_list.parent[city_id_2[i]]) == -1) {
          _city_id_1.push(this.area_list.parent[city_id_2[i]])
        }
      }
      this.transport_extend[this.index].transportext_area_name = city_name.join(',')
      this.transport_extend[this.index].transportext_area_id = ',' + _city_id_2.join(',') + ','
      this.transport_extend[this.index].transportext_top_area_id = ',' + city_id_1.join(',') + ','
    },
    showCity (index) {
      this.regionChecked = {}
      this.provinceChecked = {}
      var provinceChecked = {}
      this.cityChecked = {}
      var cityChecked = {}
      this.cityVisible = true
      this.index = index
      var str
      str = this.transport_extend[index].transportext_top_area_id
      var city_id_1 = str ? str.substr(1, str.length - 2).split(',') : []
      str = this.transport_extend[index].transportext_area_id
      var city_id_2 = str ? str.substr(1, str.length - 2).split(',') : []

      var provinceLength = {}
      for (var i in city_id_1) {
        provinceChecked[city_id_1[i]] = true
        provinceLength[city_id_1[i]] = this.area_list.children[city_id_1[i]].length
      }
      for (var i in city_id_2) {
        if (!provinceChecked[city_id_2[i]]) {
          cityChecked[city_id_2[i]] = true
          provinceLength[this.area_list.parent[city_id_2[i]]]--
          if (provinceLength[this.area_list.parent[city_id_2[i]]] <= 0) {
            delete provinceLength[this.area_list.parent[city_id_2[i]]]
          }
        }
      }
      for (var i in provinceLength) {
        delete provinceChecked[i]
      }
      for (var i in this.area_list.region) {
        var l = 0
        for (var j in this.area_list.region[i]) {
          if (provinceChecked[this.area_list.region[i][j]]) {
            l++
          }
        }
        if (l == this.area_list.region[i].length) {
          this.regionChecked[i] = true
        }
      }
      this.provinceChecked = provinceChecked
      this.cityChecked = cityChecked
    }
  }
}
</script>
<style>
    .transport-form .mint-cell-value{
        max-width: 80%;
    }
</style>
<style lang="scss" scoped>
    .right-arrow{transform: rotate(-90deg);color:#ddd;font-size: .6rem;display: inline-block;}
    .input-wrap{position: relative;
        i{position: absolute;right:0;top:0;line-height: 2.4rem;display: block;width:2rem;text-align: center;font-size: 1rem}
    }
    .city-2{padding:0 1rem}
    .city-3{padding:0 1rem}
    .list-checkbox-wrapper{display: flex;border-bottom: 1px solid #eee;padding:.5rem}
    .checkbox-text{flex: 1;font-size: .8rem;}
    .list-checkbox {
        width: 1rem;
        height: 1rem;
        flex-basis: 1rem;
        flex-shrink: 0;
        position: relative;
        margin-right:0.25rem;
        label {
            position: absolute;
            left:0;
            top: 0;
            width: 1rem;
            height: 1rem;
            display: inline-block;
            border-radius:50%;
            border:1px solid #333;
            box-sizing:border-box;
            .iconfont{display: none;line-height: 1rem;text-align: center;}
        }
        input {
            position: relative;
            width: 1rem;
            margin: 0;
            opacity: 0;
            background-color: #fff;
            &:checked + label {
                border-color:$primaryColor;
                background-color:$primaryColor;
                .iconfont{display: block;color:#fff}
            }
            &:focus {
                outline-offset: 0;
            }
        }

    }
    .label{background: #eee}
    .my-popup {
    position: fixed;
    background: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s ease-out;
    transition: .2s ease-out;}
</style>
