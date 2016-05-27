$(function(){               
    $('.menu-item .button').click(function(){
        var dishId = $(this).parent().children('[name=dishId]').val();
        $.post("/addToShoppingCart", {dishId: dishId}, function(dish) {
            $('.orders').prepend("<div class='order'>"+
                "<a class='order__close' href='/removeFromBasket/'" + dish._id + ">"+
                    "<i class='order__icon' order__icon_close></i>" + 
                "</a>" + 
                "<div class='order__info'>" + 
                    "<div>" + dish.name + "</div>" + 
                "</div>" + 
                "<a class='order__less' href='#'>" + 
                    "<i class='order__icon order__icon_less'></i>" + 
                "</a>"+
                "<div class='order__value'>" + 
                    "<input class='order__value' value='1'>" + 
                "</div>"+
                "<a class='order__more' href='#'>" + 
                    "<i class='order__icon order__icon_more'></i>" + 
                "</a>"+
                "<div class='order__cost'>" + 
                    "<span class='order__cost_val'>" + dish.price + "</span>" + 
                    "<span> руб. </span>" + 
                "</div>" + 
                "</div>");
        }); 
    });     
});