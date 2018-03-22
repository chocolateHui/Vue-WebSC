<template>
    <div class="search_content search_default" style="overflow-y:scroll;height:225px;margin:4px">
        <b-list-group>
            <b-list-group-item class="hotelitem" :class="getselect(item)" @click="clickrow(item)" v-for="item in hotels"
                               :key="item.hotelid">{{item.descript}}
                <i class="fa fa-chevron-right" style="float: left;padding-top: 6px;padding-right: 2px"></i>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<script>
  export default {
    ame: 'hotelList',
    props: {
      hotel: {
        type: Object
      },
      hotels: {
        type: Array
      }
    },
    methods: {
      clickrow: function (item) {
        // 列表点击
        this.$emit('hotelselect', item)
      },
      getselect: function (item) {
        if(this.hotel) {
          var isselect = item.hotelid === this.hotel.hotelid
          return {
            "li-background": isselect
          }
        }
      }
    }
  }
</script>
<style lang="scss">
    .hotelitem{padding: 5px 10px;cursor: pointer}
.li-background{color:#549af7;background-color:#ddd}
</style>
