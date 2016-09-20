(function() {
    var mainIntrv = setInterval(function() {
        $.ajax("/homejson", {
            success: function(data) {
                console.log(data);

                var now = new Date();
                // var timeOrder = new Date();

                if(!window.Notification) {
                    alert("Извините, ваш браузер не разрешает отправлять вам уведомления... Советуем его")
                } else {
                    console.log('it work');
                }

                var intrvOfMoney = setInterval(function() {
                    for (var i=0; i < data.subscriberArr.length; i++){
                        var paid = data.subscriberArr[i].subscriber[i].paid;
                        console.log(paid);

                        if((Notification.permission === "granted") && (paid == true)) {
                            var msg = new Notification("Мы узнали, что вы молодец!", {
                                body: "Спасибо, что сдали деньги за заказ! Такие люди как вы - делают наш мир лучше :)",
                                icon: "../images/notification/icon.png"
                            });
                            clearInterval(intrvOfMoney);
                        };

                        if ((Notification.permission === "granted") && (paid == false) && (diffTime <=0)) {
                            var msg = new Notification("А кто это не отдал деньги!?", {
                                body: "Мы тут узнали, что вы до сих пор не отдали деньги за заказ который делал " + data.subscriberArr[i].owner.name + "\n" + "Поберегите карму, скиньте кэш!", 
                                icon: "../images/notification/icon.png"
                        });
                        } else if(Notification.permission !== "denied") {
                            Notification.requestPermission(function(permission) {
                                if((permission === "granted") && (diffTime <=20) && (diffTime > 10)) {
                                    var msg = new Notification("А кто это до сих пор не отдал деньги!", {
                                body: "Мы тут узнали, что вы до сих пор не отдали деньги за заказ который делал " + data.subscriberArr[i].owner.name + "\n" + "Поберегите карму, скиньте кэш!",
                                icon: "../images/notification/icon.png"
                            });
                                } else {
                                    console.log("Разрешение не получено или время еще не пришло...");
                                }
                            });
                        } else {
                            console.log('Человек решил не отвечать!');
                        }
                    }
                }, 10000);

                var intrvOfOwners = setInterval(function() {


                    for(var i=0; i < data.ownerArr.length; i++) {                   

                        var timeOrderString = data.ownerArr[i].time;
                        var timeOrder = new Date(timeOrderString);

                        console.log(timeOrder);

                        var nowMLS = now.getTime();
                        var timeOrderMLS = timeOrder.getTime();

                        var diffr = timeOrderMLS - nowMLS;
                        var diffTime = diffr/60000;  

                        console.log(diffTime);

                        if((Notification.permission === "granted") && (diffTime <= 0)) {
                            var msg = new Notification("Заказ выехал!", {
                                body: "Ваш заказ в " + data.ownerArr[i].service.title + " выехал и прибудет примерно через " + data.ownerArr[i].service.departureTime,
                                icon: "../images/notification/icon.png"
                            });
                            clearInterval(intrvOfOwners);
                        };

                        if ((Notification.permission === "granted") && (diffTime <=20) && (diffTime > 10)) {
                            console.log('work');
                            var msg = new Notification("Скоро дэдлайн!", {
                                body: "Ваш заказ в " + data.ownerArr[i].service.title + " нужно будет оформлять через " + diffTime + " минут" + "\n" + "Пора собирать деньги :)",
                                icon: "../images/notification/icon.png"
                        });
                        } else if(Notification.permission !== "denied") {
                            Notification.requestPermission(function(permission) {
                                if((permission === "granted") && (diffTime <=20) && (diffTime > 10)) {
                                    var msg = new Notification("Скоро дэдлайн!", {
                                body: "Ваш заказ в " + data.ownerArr[i].service.title + " нужно будет оформлять через " + diffTime + " минут" + "\n" + "Пора собирать деньги :)",
                                icon: "../images/notification/icon.png"
                            });
                                } else {
                                    console.log("Разрешение не получено или время еще не пришло...");
                                }
                            });
                        } else {
                            console.log('Человек решил не отвечать!');
                        }   
                    }
                    clearInterval(intrvOfOwners);
                }, 10000);


                var intrvOfSubscriber = setInterval(function() {

                    for(var i=0; i < data.subscriberArr.length; i++) {

                        var timeOrderString = data.subscriberArr[i].time;
                        var timeOrder = new Date(timeOrderString);

                        var nowMLS = now.getTime();
                        var timeOrderMLS = timeOrder.getTime();

                        var diffr = timeOrderMLS - nowMLS;
                        var diffTime = diffr/60000;  

                        console.log(diffTime);

                        if((Notification.permission === "granted") && (diffTime <= 0)) {
                            var msg = new Notification("Заказ выехал!", {
                                body: "Заказ в " + data.subscriberArr[i].service.title + " выехал и прибудет примерно через " + data.subscriberArr[i].service.departureTime,
                                icon: "../images/notification/icon.png"
                            });
                            clearInterval(intrvOfSubscriber);
                        };

                        if ((Notification.permission === "granted") && (diffTime <=20) && (diffTime > 10)) {
                            var msg = new Notification("Скоро дэдлайн!", {
                                body: "Заказ, который создал " + data.subscriberArr[i].owner.name + ", к которому вы присоеденились, будут оформлять через " + diffTime + " минут" + "\n" + "Пора скидывать кэш",
                                icon: "../images/notification/icon.png"
                        });
                        } else if(Notification.permission !== "denied") {
                            Notification.requestPermission(function(permission) {
                                if((permission === "granted") && (diffTime <=20) && (diffTime > 10)) {
                                    var msg = new Notification("Скоро дэдлайн!", {
                                body: "Заказ, который создал " + data.subscriberArr[i].owner.name + ", к которому вы присоеденились, будут оформлять через " + diffTime + " минут" + "\n" + "Пора скидывать кэш",
                                icon: "../images/notification/icon.png"

                            });
                                } else {
                                    console.log("Разрешение не получено или время еще не пришло...");
                                }
                            });
                        } else {
                            console.log('Человек решил не отвечать!');
                        }
                    }
                    clearInterval(intrvOfSubscriber);
                }, 10000);
        }
    })
}, 120000);
})();