Page({
    onShareAppMessage: function (res) {
        return{
            title:"我刚刚兑换了奖品哦，你也来兑换吧！",
            path:"/pages/index/index"
        }
    },
    getClose:function () {
        wx.navigateTo({
            url:'../index/index'
        })
    }
})