// 计算属性 getters

export default{
    //计算总数量

    totalCount(state){
        // reduce 累计器 累计方法
        // cartFoods购物车的数据
        // preTotal 起始数量
        // food 所购食品
        //0 起始数量
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.price*food.count,0)
    }
}