Page({
    data:{
        item:"",
        count:""
    },
    onLoad: function (options) {
        // 标题
        wx.setNavigationBarTitle({
            title: '我的兑换'
        });
        // 发送请求
        let that = this;
        wx.request({
            url: "https://dati.51laiding.com/?r=goods/order",
            data: {
                user_id:options.user_id
            },
            method: "GET",
            success: function (res) {
                console.log(res.data);
                that.setData({
                    item:res.data
                })
            }
        });
    },

    getUser:function (e) {
        let id = e.currentTarget.dataset.id;
        this.setData({
            count:id
        })
    }
});