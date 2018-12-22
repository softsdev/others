jQuery(document).ready(function() {
    /**
     * Sheet plate calculation
     * @type type
     */
    var steetPlateVar = {'width': '', 'length': '', 'thickness': '', 'quantity': '', 'total': ''};
    jQuery('#sheetCalculator input').on('change', function() {
        if (jQuery(this).attr('name') == 'width') {
            steetPlateVar.width = parseFloat(jQuery(this).val());
        }
        if (jQuery(this).attr('name') == 'thickness') {
            steetPlateVar.thickness = parseFloat(jQuery(this).val());
        }
        if (jQuery(this).attr('name') == 'length') {
            steetPlateVar.length = parseFloat(jQuery(this).val());
        }
        if (jQuery(this).attr('name') == 'quantity') {
            steetPlateVar.quantity = parseFloat(jQuery(this).val());
        }

        if (steetPlateVar.width && steetPlateVar.thickness && steetPlateVar.length && steetPlateVar.quantity) {
            steetPlateVar.total = steetPlateVar.width * steetPlateVar.thickness * steetPlateVar.length * steetPlateVar.quantity * 7.85;
            jQuery('#sheetCalculator .output').html(steetPlateVar.total);
        }
    });
    var steetPlates = [];
    jQuery('.add.sheetPlate').on('click', function() {
        if (steetPlateVar.total) {
            steetPlates.push(steetPlateVar);
            jQuery('.sprow').remove();
            debugger
            jQuery.each(steetPlates, function(index, sprow) {
                console.log(sprow);
                jQuery('table.sheetPlate').append('<tr class="sprow"><td>' + sprow.width + '</td><td>' + sprow.length + '</td><td>' + sprow.thickness + '</td><td>' + sprow.quantity + '</td><td class="total">' + sprow.total + '</td>');
            });

            jQuery('.subtotal.sheetPlate span').html(parseFloat(jQuery('.subtotal.sheetPlate span').html()) + steetPlateVar.total);
            jQuery('#sheetCalculator input').val('');
            steetPlateVar = {'width': '', 'length': '', 'thickness': '', 'quantity': '', 'total': ''};
            jQuery('#sheetCalculator .output').html('0');
        }
        return false;

    });

    function commonCalculator(mainId, calculateClass) {
        /**
         * MS Angle calculation
         * @type type
         */
        var msAngleVar = {'size': '', 'length': '', 'quantity': '', 'total': ''};
        jQuery('#' + mainId + ' input, #' + mainId + ' select').on('change', function() {
            if (jQuery(this).attr('name') == 'size') {
                msAngleVar.size = parseFloat(jQuery(this).val());
            }
            if (jQuery(this).attr('name') == 'length') {
                msAngleVar.length = parseFloat(jQuery(this).val());
            }
            if (jQuery(this).attr('name') == 'quantity') {
                msAngleVar.quantity = parseFloat(jQuery(this).val());
            }

            if (msAngleVar.size && msAngleVar.length && msAngleVar.quantity) {

                msAngleVar.total = parseFloat((msAngleVar.size * msAngleVar.length * msAngleVar.quantity).toFixed(2));
                jQuery('#' + mainId + ' .output').html(msAngleVar.total);
            }
        });
        var msAngles = [];
        jQuery('.add.' + calculateClass).on('click', function() {
            if (msAngleVar.total) {
                msAngles.push(msAngleVar);
                jQuery('table.' + calculateClass + '.sprow').remove();
                jQuery.each(msAngles, function(index, sprow) {
                    console.log(sprow);
                    jQuery('table.' + calculateClass).append('<tr class="sprow"><td>' + sprow.size + '</td><td>' + sprow.length + '</td><td>' + sprow.quantity + '</td><td class="total">' + sprow.total + '</td>');
                });

                jQuery('.subtotal.' + calculateClass + ' span').html(parseFloat(jQuery('.subtotal.' + calculateClass + ' span').html()) + msAngleVar.total);
                jQuery('#' + mainId + ' input, #' + mainId + ' select').val('');
                msAngleVar = {'size': '', 'length': '', 'quantity': '', 'total': ''};
                jQuery('#' + mainId + ' .output').html('0');
            }
            return false;

        });
    }

    commonCalculator('msAngleCalculator', 'msAngle');
    commonCalculator('msChannelCalculator', 'msChannel');
    commonCalculator('iBeamCalculator', 'iBeam');
    commonCalculator('msRoundBarCalculator', 'msRoundBar');
    commonCalculator('msSquareBarCalculator', 'msSquareBar');
    commonCalculator('msFlatCalculator', 'msFlat');
});