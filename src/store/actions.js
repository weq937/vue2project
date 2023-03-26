//负责响应组件分发的动作
//注意:actions模块不能够直接更新状态数据
import {GETSHOPS,GETUSERNAME,GETCOOKIE,LOGOUTS,UPDATEFOODCOUNTADD,UPDATEFOODCOUNTJIAN,CLEARCARTS} from './mutation-types'
import {getShoplists,getcookieuser,userlogout} from '../api/index'
export default{
    //响应添加的动作
    //commit=》提交
    async getshops({commit}){
        // console.log('这是actions模块响应的方法')
        // console.log(o)
        //调用后端获取商家列表的数据的方法
        let shoplists=await getShoplists()
        // console.log(shoplists)
        //把动作提交给mutations模块
        //提交参数必须是对象格式
        commit(GETSHOPS,{shoplists})
    },
    //获取用户登录或者注册的名字
    getusername({commit},name){
        // console.log(name)
        //提交给mutation模块
        commit(GETUSERNAME,{name})
    },
    //获取登录或者注册用户的cookie信息
    async getcookie({commit}){
        //调用接口
        let username=await getcookieuser();
        // console.log(username)
        let usernames=username.msg;
        //提交给mutations
        commit(GETCOOKIE,{usernames})
    },
    //执行退出
   async logouts({commit}){
        // 调用接口
     let res= await  userlogout()
     if(res.msg===0){
        //cookie信息清除了
        // console.log('退出了');
        // 提交给mutaions
        commit(LOGOUTS)
     }
    },
    updateFoodCount({commit},{isadd,food}){
        if(isadd){
            // console.log('加操作');
            commit(UPDATEFOODCOUNTADD,{food})
        }else{
            commit(UPDATEFOODCOUNTJIAN,{food})
        }
    },
    //清空购物车
    clearcarts({commit}){
        commit(CLEARCARTS)
    }

}