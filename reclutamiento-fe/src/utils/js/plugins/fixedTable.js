(function ($) {
  $.fn.extend({
    FixMe: function (options) {
      this.defaultOptions = {};
      var settings = $.extend({}, this.defaultOptions, options);
      return this.each(function () {
        var $this = $(this);
        $(document).scroll(function () {
          if (!$this.attr('data-top')) {
            if ($this.hasClass('subnav-fixed')) return;
            var offset = $this.offset()
            $this.attr('data-top', offset.top);
          }
          if ($this.attr('data-top') - $this.outerHeight() <= $(this).scrollTop()) {
            $this.AjustarColumnas();

            if ($this.parent().find('.clone').length == 0) {
              $this.parent().append($this.clone().addClass('clone'));
              $this.addClass('table-header-fixed');
            }
          }
          else {
            $this.find('th').width('auto');
            $this.removeClass('table-header-fixed');
            if ($this.parent().find('.clone').length > 0) {
              $this.parent().find('.clone').remove();
            }
          }
        });
        $(window).resize(function () {
          if ($this.hasClass('table-header-fixed')) {
            $this.AjustarColumnas();
          }
        });
      });
    },
    AjustarColumnas: function () {
      var $this = $(this);
      $headerCells = $this.find('th');
      $firstCells = $this.closest('table').find('tr:first-child td');

      for (var i = 0; i < $headerCells.length; i++) {
        if ($($headerCells[i]).attr("colspan")) {
          const colspan = Number($($headerCells[i]).attr("colspan"));
          let totalWidth = $($firstCells[i]).width() + 18;
          $($firstCells[i]).width($($firstCells[i]).width());
          for (var x = i + 1; x < colspan + i; x++) {
            totalWidth += $($firstCells[x]).width() + 18;
            $($firstCells[i]).width($($firstCells[i]).width());
          }
          $($headerCells[i]).width(totalWidth);
          i += colspan;
        } else {
          $($firstCells[i]).width($($firstCells[i]).width());
          $($headerCells[i]).width($($firstCells[i]).width());
        }
      }
    }
  });
})(global.jQuery);
