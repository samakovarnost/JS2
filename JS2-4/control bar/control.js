(function ($) {

    $.fn.control = function (params) {

        if (params === undefined) {
            params = {}
        }
        return this.each(function () {
            var $tabs = $(this);
            $tabs.find('.tabs .tab')
                .each(function (i) {
                    $(this).on('click', function () {
                        $tabs.find('.containers .container').hide().filter(':eq(' + i + ')').show();
                        $tabs.find('.tabs .tab').removeClass('active').filter(':eq(' + i + ')').addClass('active');
                    });
                })
                .filter(':eq(' + (params.activeTab || 0) + ')').click();
        });
    };

}(jQuery));