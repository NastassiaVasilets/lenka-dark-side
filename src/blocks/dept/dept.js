(function($) {
    $(function() {
        var item;
        $('.dept__paid [type=checkbox]').change(function () {
            if ($(this).is(':checked')) {
                item = {};
                var dept = $(this).parents().parents();
                item.name = dept.children('.dept__name').html();
                var sum = dept.children('.dept__sum').html();
                sum =+sum.substring(0 , sum.indexOf('<'));
                item.sum = sum;
                item.id = dept.children('.dept__order-id').html();
                $.post("/saveDept", {dept: item}, function(item) {
                    dept.children('.dept__name').css("display", "none");
                    dept.children('.dept__sum').css("display", "none");
                    dept.children('.dept__paid').css("display", "none");
                });
            }
        });
    });
})(jQuery);