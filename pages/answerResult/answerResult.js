Page({
    data:{
        userName:"",//用户名字
        userPic:"",//用户头像
        myGrade:''
    },
    onLoad: function (options) {
       this.setData({
           myGrade:options.myGrade
       });

        wx.setNavigationBarTitle({
            title: '对战结果'
        });

        //获取用户的头像与名字
        let that = this;
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName  //用户名
                let avatarUrl = userInfo.avatarUrl  //头像链接
                that.setData({
                    userName: nickName,
                    userPic:avatarUrl
                })
            }
        });
    },
    getClose:function () {
        wx.navigateTo({
            url:'../index/index'
        })
    },
    onShareAppMessage: function (res) {
        return{
            title:"哎呀，宝宝输啦！求求你帮我赢金币，给你一个么么哒！",
            path:"/pages/index/index"
        }
    }
});