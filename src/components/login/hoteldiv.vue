<template>
    <div class="hotel-div">
        <b-input-group style="padding: 4px">
            <b-input-group-text slot="append">
                <i class="fa fa-search"></i>
            </b-input-group-text>
            <b-form-input @input="updatevalue" placeholder="请输入查询条件"></b-form-input>
        </b-input-group>
        <hotel-list :hotel="hotel" @hotelselect="hotelselect" :hotels="searchhotels" :searchtext="searchtext"></hotel-list>
    </div>
</template>
<script>
    import hotelList from  './hotelList.vue'
    import { mapGetters, mapActions,mapMutations } from 'vuex'

    export default {
        name: 'hotelDiv',
        data () {
            return {
                searchtext:""
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
                        } else {
                            return false;
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
            }
        },
        components: {
            hotelList
        }
    }
</script>
<style lang="scss">
.hotel-div{top: 0; right: -260px;width: 250px; margin: 0 !important; z-index: 1000; position: absolute;background-color: white;border-radius:5px}
</style>
