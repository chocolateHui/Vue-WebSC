<template>
    <div class="hotel-div">
        <b-input-group class="hotel-search">
            <b-input-group-text slot="append">
                <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input @input="updatevalue" placeholder="请输入查询条件"></b-form-input>
        </b-input-group>
        <hotel-list class="hotel-list" :hotel="hotel" @hotelselect="hotelselect" :hotels="searchhotels" :searchtext="searchtext"></hotel-list>
    </div>
</template>
<script>
    import hotelList from  './hotelList.vue'
    import { mapGetters, mapActions,mapMutations } from 'vuex'
    import pinyin from 'pinyin'

    export default {
        name: 'hotelDiv',
        data () {
            return {
              searchtext:"",
            };
        },
        computed:{
            ...mapGetters({
                hotel: 'hotel',
                hotels: 'hotels'
            }),
            searchhotels:function () {
                if(this.searchtext==='' || !this.searchtext){
                    return this.hotels;
                }else{
                    var search = this.searchtext.toUpperCase();
                    return this.hotels.filter(function (item) {
                        if (item.hotelid.indexOf(search) >= 0) {
                            return true;
                        } else if (item.descript.indexOf(search) >= 0) {
                            return true;
                        }else {
                          let pydes = pinyin(item.descript,{style:pinyin.STYLE_NORMAL}).toString().replace(new RegExp(/(,)/g),'').toUpperCase();
                          let flpydes = pinyin(item.descript,{style:pinyin.STYLE_FIRST_LETTER}).toString().replace(new RegExp(/(,)/g),'').toUpperCase();

                          return pydes.indexOf(search) >= 0 ||flpydes.indexOf(search) >= 0;
                        }
                    });
                }
            }
        },
        methods:{
            updatevalue:function (value) {
                this.searchtext=value;
            },
            hotelselect:function (hotel) {
              this.$store.commit('setHotel',hotel);
              this.$store.commit('setHotelChange',true);
            }
        },
        components: {
            hotelList
        }
    }
</script>
<style lang="scss">
  .hotel-div{
    top: 0; right: -260px;width: 250px; margin: 0 !important; z-index: 1000; position: absolute;background-color: white;border-radius:5px
  }
  .hotel-search{
    padding: 20px;
  }
  .hotel-list{
    margin: 20px;
    margin-top: -10px;
  }
</style>
