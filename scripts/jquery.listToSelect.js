(function($) {
  /**
   * Replaces a one-level list with a form conatining a select element with a
   * change listener that 'jumps' to the url contained in the select. Prevents
   * multiple executions of replacement.
   *
   * @author Christopher Torgalson <bedlamhotel@gmail.com>
   * @param object overrides
   *        Overrides for the default plugin settings. Currently contains the
   *        following properties:
   *
   *          -- (string) firstOptionText
   *             The text to show in the first, empty, option in the select
   * @example
   *        Given the following HTML:
   *
   *        <ul id="sample-select">
   *          <li><a href="/foo">consequat</a></li>
   *          <li><a href="/bar">lacinia</a></li>
   *          <li><a href="/fubar">erat arcu</a></li>
   *          <li><a href="/lorem/ipsum">tincidunt</a></li>
   *          <li><a href="/dolor/sit">est</a></li>
   *        </ul>
   *
   *        Call the plugin like this:
   *
   *        $('#sample-select').listToSelect({firstOptionText: 'Choose one:'});
   * @version 1.0
   */
  $.fn.listToSelect = function(overrides) {
    // Default settings:
    var defaults = {
      firstOptionText: 'Choose option'
    };
    // Loop through all of the items in the collection:
    return this.each(function(i,e){
      // Set up defaults:
      var settings = $.extend({}, defaults, overrides),
          // Id attribute:
          $selectId = 'listToSelect-' + parseInt(i + 1, 10),
          // Form element, including required attributes:
          $form = $('<form id="' + $selectId + '" />')
            .attr({action: window.location.href}),
          // Select element, including change listener and first (empty) option:
          $select = $('<select class="listToSelect" />')
            .change(function(){
              window.location.href = $select.val();
            })
            .append('<option>' + settings.firstOptionText + '</option>'),
          // Store the current list for this request:
          $currentList = $(e),
          // Ditto for the links:
          $currentLinks = $currentList.find('li > a');
      // We do nothing unless there's at least one item in the current list, AND
      // it hasn't already got the class that says we've been here already:
      if ($currentLinks.size() > 0 && !$currentList.hasClass('listToSelect-processed')) {
        // Loop through the links:
        $currentLinks
          .each(function(i,e){
            // Store the current link for this iteration:
            var $currentLink = $(e),
                // Create a new option element, complete with value and content:
                $option = $('<option />')
                  .attr('value', $currentLink.attr('href'))
                  .html($currentLink.html());
            // append the new option to the select element:
            $select.append($option);
          });
        // Finally, hide the current list, mark it processed, and insert the
        // form element containing the select element:
        $currentList
          .hide()
          .addClass('listToSelect-processed')
          .after(
            $form
              .append($select)
              .wrapInner('<div />')
          );
      }
    });
  }; /* listToSelect */
})(jQuery);