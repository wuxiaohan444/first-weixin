Page({
    data: {
        items: [
            {
                title: '“天生我材必有用，千金散尽还复来”出自哪首诗？',
                option: [
                    {name: 'XH', value: '《饮中八仙歌》'},
                    {name: 'XH', value: '《致酒行》'},
                    {name: 'XHH', value: '《将进酒》'},
                    {name: 'XH', value: '《醉翁亭记》'},
                ]
            },
            {
                title: '东汉时期，下列哪个人物既是科学家又是文学家？',
                option: [
                    {name: 'XH', value: '班超'},
                    {name: 'XH', value: '张骞'},
                    {name: 'XH', value: '蔡伦'},
                    {name: 'XHH', value: '张衡'},
                ]
            },
            {
                title: '“己所不欲勿施于人”是孔子对哪个弟子的教诲？',
                option: [
                    {name: 'XHH', value: '颜回'},
                    {name: 'XH', value: '子贡'},
                    {name: 'XH', value: '孟子'},
                    {name: 'XH', value: '子路'},
                ]
            },
            {
                title: '唐朝的《金刚经》是由什么技术印刷完成的？',
                option: [
                    {name: 'XH', value: '活字印刷术'},
                    {name: 'XHH', value: '雕版印刷术'},
                    {name: 'XH', value: '激光印刷术'},
                    {name: 'XH', value: '大唐印刷术'},
                ]
            },
            {
                title: '英国王室凯特王妃与威廉王子宣布，他们的宝宝叫什么王子？',
                option: [
                    {name: 'XHH', value: '乔治王子'},
                    {name: 'XH', value: '查理王子'},
                    {name: 'XH', value: '查尔斯王子'},
                    {name: 'XH', value: '波斯王子'},
                ]
            },
        ],
        subject: "", //题目
        errorIcon: true, //点击后是否显示
        result: true, /*结果*/
        answer: true, //问题
        choose: "", /*回答问题所选项*/
        right: "", /*正确选项*/
        count: '', //用来记录当然元素的id
        bg: 'error', /*背景颜色*/
        falg: true, /*节流阀*/
        record: "", /*遍历题目*/
        number: 0,
        hint: false,//提示
        title: "第一题",
        time: 10,
        timer: "",
        userName: "",//用户名字
        userPic: "", //用户头像
        myWidth:0  ,//进度条
        myGrade:0,//分数
        click:0 //点击
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '对战题目'
        });

        //获取用户的头像与名字
        let that = this;
        wx.getUserInfo({
            success: function (res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName  //用户名
                let avatarUrl = userInfo.avatarUrl  //头像链接
                that.setData({
                    userName: nickName,
                    userPic: avatarUrl
                })
            }
        });
        // 初始渲染题目
        this.setData({
            subject: this.data.items[this.data.number].title,
            record: this.data.items[this.data.number].option
        });
        // 倒计时功能
        setTimeout(_ => {
            this.setData({
                hint: true,
                answer: false,
                timer: setInterval(_ => {
                    this.setData({
                        time: this.data.time - 1
                    });
                    // 当时间为0时
                    if (this.data.time === 0) {
                        this.setData({
                            answer: true
                        });
                        for (let i = 0; i < this.data.record.length; i++) {
                            if (this.data.record[i].name === 'XHH') {
                                this.setData({
                                    result: false,
                                    right: this.data.record[i].value,
                                    time: 10,
                                    number: this.data.number + 1,
                                });
                                if(this.data.number>4){
                                    clearInterval(this.data.timer);
                                    wx.navigateTo({
                                        url: '../answerResult/answerResult'
                                    });
                                    return;
                                }
                                // 题号
                                switch (this.data.number) {
                                    case 1:
                                        this.setData({
                                            title: "第二题",
                                        });
                                        break;
                                    case 2:
                                        this.setData({
                                            title: "第三题",
                                        });
                                        break;
                                    case 3:
                                        this.setData({
                                            title: "第四题",
                                        });
                                        break;
                                    case 4:
                                        this.setData({
                                            title: "第五题",
                                        });
                                        break;
                                    case 5:
                                        this.setData({
                                            title: "第六题",
                                        });
                                        break;
                                    case 6:
                                        this.setData({
                                            title: "第七题",
                                        });
                                        break;
                                    case 7:
                                        this.setData({
                                            title: "第八题",
                                        });
                                        break;
                                    case 8:
                                        this.setData({
                                            title: "第九题",
                                        });
                                        break;
                                    case 9:
                                        this.setData({
                                            title: "第十题",
                                        });
                                        break;
                                }
                                // 第二题开始
                                setTimeout(_ => {
                                    this.setData({
                                        time: 10,
                                        result: true,
                                        hint: false
                                    });
                                    // 提示消失，题目出来
                                    setTimeout(_ => {
                                        this.setData({
                                            time: 10,
                                            hint: true,
                                            answer: false,
                                            subject: this.data.items[this.data.number].title,
                                            record: this.data.items[this.data.number].option
                                        });
                                    }, 1000);
                                }, 1000)
                            }
                        }
                    }
                }, 1000)
            });
        }, 1000)
    },
    // 答题
    affirm: function (e) {

        if (this.data.falg) {
            //点击后停止倒计时
            clearInterval(this.data.timer);
            this.setData({
                falg: false,
                click:this.data.click++
            });
            let id = e.currentTarget.dataset.id;
            this.setData({
                count: id
            });
            for (let i = 0; i < this.data.record.length; i++) {
                if (this.data.record[i].name === 'XHH') {
                    this.setData({
                        right: this.data.record[i].value,
                    });

                    if (this.data.count === i) {
                        this.setData({
                            bg: 'correct',
                            myWidth:this.data.myWidth+26,
                            myGrade:this.data.myGrade+(this.data.time/10)*100
                        })
                    }
                    if (this.data.count !== i) {
                        this.setData({
                            bg: 'error'
                        })
                    }
                }
            }



            setTimeout(_ => {
                this.setData({
                    result: false,
                    answer: true,
                    choose: this.data.record[id].value
                });
                if (this.data.choose === this.data.right) {
                    this.setData({
                        errorIcon: true
                    })
                } else {
                    this.setData({
                        errorIcon: false
                    })
                }

                if (this.data.number < 4) {
                    setTimeout(_ => {
                        this.setData({
                            number: this.data.number + 1,
                            result: true,
                            hint: false,
                            errorIcon: false
                        });
                        switch (this.data.number) {
                            case 1:
                                this.setData({
                                    title: "第二题",
                                });
                                break;
                            case 2:
                                this.setData({
                                    title: "第三题",
                                });
                                break;
                            case 3:
                                this.setData({
                                    title: "第四题",
                                });
                                break;
                            case 4:
                                this.setData({
                                    title: "第五题",
                                });
                                break;
                            case 5:
                                this.setData({
                                    title: "第六题",
                                });
                                break;
                            case 6:
                                this.setData({
                                    title: "第七题",
                                });
                                break;
                            case 7:
                                this.setData({
                                    title: "第八题",
                                });
                                break;
                            case 8:
                                this.setData({
                                    title: "第九题",
                                });
                                break;
                            case 9:
                                this.setData({
                                    title: "第十题",
                                });
                                break;
                        }
                        this.setData({
                            subject: this.data.items[this.data.number].title,
                            record: this.data.items[this.data.number].option,
                            bg: '',
                            falg: true
                        });
                        // 题目出现
                        setTimeout(_ => {
                            this.setData({
                                answer: false,
                                hint: true
                            });
                            //重新开始倒计时
                            this.setData({
                                time: 10
                            });
                            // 点击后自动
                            this.setData({
                                timer: setInterval(_ => {
                                    this.setData({
                                        time: this.data.time - 1
                                    });
                                    // 当时间为0时
                                    if (this.data.time === 0) {
                                        this.setData({
                                            answer: true,
                                            errorIcon: true,
                                        });
                                        for (let i = 0; i < this.data.record.length; i++) {
                                            if (this.data.record[i].name === 'XHH') {
                                                this.setData({
                                                    result: false,
                                                    right: this.data.record[i].value,
                                                    time: 10,
                                                    number: this.data.number + 1,
                                                });
                                                if(this.data.number>4){
                                                    clearInterval(this.data.timer);
                                                    wx.navigateTo({
                                                        url: '../answerResult/answerResult'
                                                    });
                                                    return;
                                                }
                                                // 题号
                                                switch (this.data.number) {
                                                    case 1:
                                                        this.setData({
                                                            title: "第二题",
                                                        });
                                                        break;
                                                    case 2:
                                                        this.setData({
                                                            title: "第三题",
                                                        });
                                                        break;
                                                    case 3:
                                                        this.setData({
                                                            title: "第四题",
                                                        });
                                                        break;
                                                    case 4:
                                                        this.setData({
                                                            title: "第五题",
                                                        });
                                                        break;
                                                    case 5:
                                                        this.setData({
                                                            title: "第六题",
                                                        });
                                                        break;
                                                    case 6:
                                                        this.setData({
                                                            title: "第七题",
                                                        });
                                                        break;
                                                    case 7:
                                                        this.setData({
                                                            title: "第八题",
                                                        });
                                                        break;
                                                    case 8:
                                                        this.setData({
                                                            title: "第九题",
                                                        });
                                                        break;
                                                    case 9:
                                                        this.setData({
                                                            title: "第十题",
                                                        });
                                                        break;
                                                }
                                                // 第二题开始
                                                setTimeout(_ => {
                                                    this.setData({
                                                        time: 10,
                                                        result: true,
                                                        hint: false
                                                    });
                                                    // 提示消失，题目出来
                                                    setTimeout(_ => {
                                                        this.setData({
                                                            time: 10,
                                                            hint: true,
                                                            answer: false,
                                                            subject: this.data.items[this.data.number].title,
                                                            record: this.data.items[this.data.number].option
                                                        });
                                                    }, 900);
                                                }, 900)
                                            }
                                        }
                                    }
                                }, 1000)
                            });

                            this.setData({})
                        }, 1000);
                    }, 2000);

                } else {
                    setTimeout(_ => {
                        wx.navigateTo({
                            url: '../answerResult/answerResult?myGrade='+this.data.myGrade
                        })
                    }, 1000)
                }

            }, 1000)
        }
    }
});
