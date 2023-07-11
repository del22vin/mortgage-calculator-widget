var banksData;

(function ($) {

    $.fn.HousingLoanCalculator = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            theme: "bluehorizon",
            themeResourcesCustomLink: "",
            amountOfLoan: 0,
            title: "Housing Loan Calculator",
            width: 550,
            defaultPaymentTerms: 180,
            lockPaymentTerms: false,
            hidePaymentTerms: false,
            defaultBank: "Bank of Commerce",
            lockBank: false,
            hideBank: false,
            defaultDownpayment: 20,
            lockDownpayment: false,
            hideDownpayment: false,
            hideMarketing: true,
            marketingImgURL: "",
            productId: "",
            productURL: "",
            productImageURL: "",
            promo: false,
            promoExpiry: 0

        }, options);

        // Greenify the collection based on the settings variable.
        //return this.css({
        //    color: settings.color,
        //    backgroundColor: settings.backgroundColor
        //});



        return this.each( function() {

            $(this).html('<div id="calculatorLoad" style="  border: 16px solid #f3f3f3; border-radius: 50%;border-top: 16px solid #3498db;width: 120px;height: 120px;-webkit-animation: spin 2s linear infinite;animation: spin 2s linear infinite;margin: auto;"></div>');

            $(this).css("max-width", settings.width + "px");
        //var theme= window.frameElement.getAttribute('calculatortheme');
        //var theme = getAllUrlParams().calculatortheme;
        if (settings.theme == '' || settings.theme == null) {
            settings.theme = "bluehorizon";
        }
        //document.getElementById('HousingLoanCalculatorCss').href = "../Themes/" + theme + ".css";


        var cssId = 'HousingLoanCalculatorCss';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = settings.themeResourcesCustomLink + "themes/" + settings.theme + ".css";
            link.media = 'all';
            head.appendChild(link);
        }

        //var title = getAllUrlParams().title;
        //title = decodeURI(title).toUpperCase();

        var content;

        var head = '';
        var form = '';
        var actionBtns = '';
        var applyBtn = '';
        var last = '';

        var computation = '';

        var paymentTermsValues = [12, 24, 36, 48, 60, 120, 180];
        var downpaymentsValues = [20, 30, 40, 50];
        //var amountOfLoan = getAllUrlParams().amount;

        banksData = GetBanksData();

        head = '<div id="C88ECMHousingLoanCalcuContainer"><div class="loanCalculatorMainContent"><div class="top"><div class="topLeft"> &nbsp;</div> <div class="topCenter"><div> <label id="LoanCalculatorHeaderName" class="loanCalculatortitle">' + settings.title + '</label></div> <div><span>Powered By: </span><span id="CalculatorLogo"></span></div></div><div class="topRight"> &nbsp;</div> </div><div class="middle"> <div class="middleLeft">&nbsp;</div><div class="middleCenter"><div id="LoanCalculatorIcon" class="objectIcon"></div><div id="LoanCalculatorTitle" class="objectTitle">Housing Loan Calculator</div><div id="LoanCalculatorDescription" class="objectDescription">loan Calculator................</div>';

        form = '<form id="LoanCalculatorForm" class="form" method="post" action=""><div id="AddNewLoanCalculatorValidationSummaryErrors" class="validationSummaryErrors"> <span></span><ul> <li></li></ul></div><div id="LoanCalculatorPropertiesTabControl" class="tabControl"> <ul> <li id="GeneralTab" class="selected"><a href="#GeneralTabItem">Housing Loan Calculator</a></li></ul><div id="GeneralTabItem" class="tabItem"><div id="GeneralTabContent" class="tabContent"> ';

        var formItems = '';

        formItems += '<div id="LoanCalculatorIdPropertyDiv" class="propertyDiv">';
        formItems += '<label id="LoanCalculatorIdLabel" class="propertyNameLabel">Loan Calculator Id</label>';
        formItems += '<input type="text" name="LoanCalculatorIdValueTextBox" id="LoanCalculatorIdValueTextBox" class="propertyValueTextBox" />';
        formItems += '<div id="LoanCalculatorIdNotification" class="propertyNotification"><div id="LoanCalculatorIdNotificationIcon" class="propertyNotificationIcon"></div><div id="LoanCalculatorIdNotificationMessage" class="propertyNotificationMessage"></div></div>';
        formItems += '<div id="LoanCalculatorIdPopover" class="propertyPopover"><div id="LoanCalculatorIdPopoverIcon" class="propertyPopoverIcon"></div><div id="LoanCalculatorIdPopoverTitle" class="propertyPopoverTitle">LoanCalculatorId </div><div id="LoanCalculatorIdPopoverDescription" class="propertyPopoverDescription">LoanCalculatorId.. </div></div>';
        formItems += '</div>';

        if (settings.hidePaymentTerms && settings.hideBank && settings.hideDownpayment) {
            formItems += ' <div id="AmountOfLoanPropertyDiv" class="propertyDiv" style="width:100%;">';
        }
        else {
            formItems += ' <div id="AmountOfLoanPropertyDiv" class="propertyDiv">';
        }
        formItems += '<label id="AmountOfLoanLabel" class="propertyNameLabel">Amount Of Loan</label>';
        formItems += '<input type="text" name="AmountOfLoanValueTextBox" id="AmountOfLoanValueTextBox" class="propertyValueTextBox" value="' + settings.amountOfLoan + '" readonly/>';
        formItems += '<div id="AmountOfLoanNotification" class="propertyNotification"><div id="AmountOfLoanNotificationIcon" class="propertyNotificationIcon"></div> <div id="AmountOfLoanNotificationMessage" class="propertyNotificationMessage"></div></div>';
        formItems += '<div id="AmountOfLoanPopover" class="propertyPopover"> <div id="AmountOfLoanPopoverIcon" class="propertyPopoverIcon"></div><div id="AmountOfLoanPopoverTitle" class="propertyPopoverTitle"> ..</div><div id="AmountOfLoanPopoverDescription" class="propertyPopoverDescription">..</div></div>';
        formItems += '</div>';



        if (settings.hideBank != true) {
            formItems += '<div id="BankPropertyDiv" class="propertyDiv">';
        } else {
            formItems += '<div id="BankPropertyDiv" class="propertyDiv" style="display:none;">';
        }
        formItems += '<label id="BankLabel" class="propertyNameLabel">Bank</label>';

            //Banks data
        if (settings.lockBank) {
            formItems += '<select name="BankSelect" id="BankValueSelect" class="propertyValueTextBox disabledSelect" onchange="CalculateLoan();" disabled>';
        }
        else {
            formItems += '<select name="BankSelect" id="BankValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();">';
        }

        for (var i = 0; i < banksData.value.length; i++) {
            if (banksData.value[i].Bank == settings.defaultBank) {
                formItems += '<option value="' + i + '" selected="selected">' + banksData.value[i].Bank + '</option>';
            }
            else {
                formItems += '<option value="' + i + '">' + banksData.value[i].Bank + '</option>';
            }
        }

        formItems += '</select>';

        formItems += '<div id="BankNotification" class="propertyNotification"><div id="BankNotificationIcon" class="propertyNotificationIcon"></div><div id="BankNotificationMessage" class="propertyNotificationMessage"></div></div>';
        formItems += '<div id="BankPopover" class="propertyPopover"><div id="BankPopoverIcon" class="propertyPopoverIcon"></div><div id="BankPopoverTitle" class="propertyPopoverTitle">..</div><div id="BankPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
        formItems += '</div>';



        if (settings.hideDownpayment != true) {
            formItems += '<div id="DownpaymentPropertyDiv" class="propertyDiv">';
        }
        else {
            formItems += '<div id="DownpaymentPropertyDiv" class="propertyDiv" style="display:none;">';
        }
        formItems += '<label id="DownpaymentLabel" class="propertyNameLabel">Downpayment</label>';


        if (settings.lockDownpayment) {
            formItems += '<select name="downpaymentSelect" id="DownpaymentValueSelect" class="propertyValueTextBox disabledSelect" onchange="CalculateLoan();" disabled>';
        }
        else {
            formItems += '<select name="downpaymentSelect" id="DownpaymentValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();">';
        }

        for (i = 0; i < downpaymentsValues.length; i++) {
            if (downpaymentsValues[i] == settings.defaultDownpayment) {
                formItems += '<option value="' + downpaymentsValues[i] + '" selected="selected">' + downpaymentsValues[i] + '%</option>';
            }
            else {
                formItems += '<option value="' + downpaymentsValues[i] + '">' + downpaymentsValues[i] + '%</option>';
            }

        }

        formItems += '</select>';
        formItems += '<div id="DownpaymentNotification" class="propertyNotification"><div id="DownpaymentNotificationIcon" class="propertyNotificationIcon"></div><div id="DownpaymentNotificationMessage" class="propertyNotificationMessage"></div></div>';
        formItems += '<div id="DownpaymentPopover" class="propertyPopover"><div id="DownpaymentPopoverIcon" class="propertyPopoverIcon"></div><div id="DownpaymentPopoverTitle" class="propertyPopoverTitle">..</div><div id="DownpaymentPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
        formItems += '</div>';





        if (settings.hidePaymentTerms != true) {
            formItems += '<div id="PaymentTermPropertyDiv" class="propertyDiv">';
        }
        else {
            formItems += '<div id="PaymentTermPropertyDiv" class="propertyDiv" style="display:none;">';
        }
            formItems += '<label id="PaymentTermLabel" class="propertyNameLabel">Payment Term</label>';

            if (settings.lockPaymentTerms) {
                formItems += '<select name="paymentTermSelect" id="PaymentTermValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();" disabled>';
            }
            else {
                formItems += '<select name="paymentTermSelect" id="PaymentTermValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();" >';
            }
        
            for (i = 0; i < paymentTermsValues.length; i++) {
                if (paymentTermsValues[i] == settings.defaultPaymentTerms) {
                 formItems += '<option value="' + paymentTermsValues[i] + '" selected="selected">' + paymentTermsValues[i] / 12 + ' Year</option>';
                }
                else{
                 formItems += '<option value="' + paymentTermsValues[i] + '">' + paymentTermsValues[i] / 12 + ' Year</option>';
                }
               
            }
            formItems += '</select>';
            formItems += '<div id="PaymentTermNotification" class="propertyNotification"><div id="PaymentTermNotificationIcon" class="propertyNotificationIcon"></div> <div id="PaymentTermNotificationMessage" class="propertyNotificationMessage"></div></div>';
            formItems += ' <div id="PaymentTermPopover" class="propertyPopover"><div id="PaymentTermPopoverIcon" class="propertyPopoverIcon"></div><div id="PaymentTermPopoverTitle" class="propertyPopoverTitle">.. </div><div id="PaymentTermPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
            formItems += '</div>';
        


        //formItems += '<div id="EmailPropertyDiv" class="propertyDiv">';
        //formItems += '<label id="EmailLabel" class="propertyNameLabel">Email</label>';
        //formItems += '<input type="text" id="EmailValue" class="propertyValueTextBox" />';
        //formItems += '<div id="PaymentTermNotification" class="propertyNotification"><div id="PaymentTermNotificationIcon" class="propertyNotificationIcon"></div> <div id="PaymentTermNotificationMessage" class="propertyNotificationMessage"></div></div>';
        //formItems += ' <div id="PaymentTermPopover" class="propertyPopover"><div id="PaymentTermPopoverIcon" class="propertyPopoverIcon"></div><div id="PaymentTermPopoverTitle" class="propertyPopoverTitle">.. </div><div id="PaymentTermPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
        //formItems += '</div>';

        form += formItems;

        form += ' </div></div> </div></form>';


        actionBtns += '<div id="LoanCalculatorActionButtonGroup" class="actionButtonGroup"> <div class="top"><div class="topLeft">&nbsp;</div><div class="topCenter">&nbsp;</div><div class="topRight"> &nbsp;</div></div><div class="middle"> <div class="middleLeft">&nbsp;</div><div class="middleCenter">';
        //actionBtns += '<a href="javascript:void(0);" id="CalculateLoanCalculatorButton" onclick="CalculateLoanCalculatorButton_Clicked()" class="button" onmousedown="className=\'button pressed\';" onmouseup="className=\'button hovered\';" onmouseout="className=\'button\';" title="" data-disabled="enabled" ><img alt="" src="" height="1px" width="1px" /><span>Calculate</span></a>';
        actionBtns += '<a href="javascript:void(0);" id="ClearLoanCalculatorButton" onclick="ClearLoanCalculatorButton_Clicked()" class="button" onmousedown="className=\'button pressed\';" onmouseup="className=\'button hovered\';" onmouseout="className=\'button\';" title="" data-disabled="enabled" ><img alt="" src="" height="1px" width="1px" /><span>Clear</span></a>';
        actionBtns += '</div>';

        var computationHeaderMsg;
        var monthlyPrice;
        var downpayment;
        var amountFinanced;


        //class dependent
        computationHeaderMsg = 'Fulfill your dream to own a house!';


            /*--------------------------------------------------------*/

        if (settings.productImageURL != "" && settings.productImageURL != null) {
            computation += '<div id="ProductImageCalculator"><img src=" ' + settings.productImageURL + ' " alt="" /></div>';
        }

        computation += '<div id="ComputationContainer" style="display:none;">';
            //Marketing Img ---(optional)
        if (!settings.hideMarketing) {
            computation += ' <div id="ComputationHeader"> ';

            if (settings.marketingImgURL == "") {
                computation += '<div id="ComputationHeaderSec1"><span>' + computationHeaderMsg + '</span></div> <div id="ComputationHeaderSec2"><span>You may own this property for only:</span></div> ';
            }
            else {
                computation += '<div id="ComputationHeaderSec1"><img src="' + settings.marketingImgURL + '" /></div> ';
            }
            computation += ' </div> ';
        }
        else {
            computation += '<div id="YouMayOwnLabel">You may own this property for only:</div>';
        }
        computation += '<div id="ComputationContent">';
        computation += '<div id="ComputationMonthlyContent"><div id="MonthlyPriceComputation">  </div><div id="MonthlyLabel">Fixed Period Monthly Payments</div></div>';

        computation += '<div id="ComputationDetailsContent">';
        computation += '<table>';
        computation += '<tr id="DownpaymentComputation"><td class="computationDetailsLabel">Downpayment</td><td id="DownpaymentComputationValue" class="computationDetailsValue">   </td></tr>';
        computation += '<tr id="FinancedComputation"><td class="computationDetailsLabel">Amount Financed</td><td id="FinancedComputationValue" class="computationDetailsValue">   </td></tr>';
        computation += '</table>';
        computation += '<div id="ComputationDisclamer">This computation is based on a 1 year fixed rate. Rates are subject to change without prior notice.</div>';
        computation += '</div>';

        computation += ' </div></div>';
        /*--------------------------------------------------------*/

        applyBtn += '<div><a href="javascript:void(0);" id="ApplyLoanCalculatorButton" onclick="ApplyLoanCalculatorButton_Clicked()" title="" data-disabled="enabled" ><img alt="" src="" height="1px" width="1px" /><span>Get Started</span></a></div>';


        last = '<div class="middleRight"> &nbsp;</div></div><div class="bottom"><div class="bottomLeft"> &nbsp;</div><div class="bottomCenter"> &nbsp;</div><div class="bottomRight">&nbsp;</div> </div></div></div><div class="middleRight"> &nbsp;</div> </div><div class="bottom"><div class="bottomLeft">&nbsp;</div><div class="bottomCenter">&nbsp;</div><div class="bottomRight">&nbsp;</div> </div></div></div>';


        content = head + form + actionBtns + computation + applyBtn + last;
        //$('#C88ECMHousingLoanCalcuContainer').html(content);

      
       
        $(this).html(content);


        if (($(this).width()) < 450) {
            $("#C88ECMHousingLoanCalcuContainer").addClass('minCalcuContainer');
        }

       
        CalculateLoan();
        });
    };

}(jQuery));


function GetBanksData() {
    //TODO:get banks data rates from DB

    var text = '{"value":[' +
'{"Bank":"Bank of Commerce", "Rate":"5.25" },' +
'{"Bank":"CTBC", "Rate":"5.75" },' +
'{"Bank":"Eastwest Bank", "Rate":"5.50" },' +
'{"Bank":"HSBC", "Rate":"5.0" },' +
'{"Bank":"Maybank", "Rate":"6.0" },' +
'{"Bank":"Metrobank", "Rate":"6.0" },' +
'{"Bank":"PBCom", "Rate":"6.50" },' +
'{"Bank":"Security Bank", "Rate":"5.25" },' +
'{"Bank":"UCPB", "Rate":"6.0" },' +
'{"Bank":"UnionBank", "Rate":"6.50"}]}';

    var data = JSON.parse(text);
    return data;
}

function CalculateLoan() {

    //Get input values

    var amountOfLoan = document.getElementById('AmountOfLoanValueTextBox').value;
    var bankRate = banksData.value[document.getElementById('BankValueSelect').value].Rate;
    var downpayment = document.getElementById('DownpaymentValueSelect').value;
    var paymentTerm = document.getElementById('PaymentTermValueSelect').value;

    CalculateDownpaymentPrice(amountOfLoan, bankRate, downpayment, paymentTerm);
    CalculateAmortizationPayment(amountOfLoan, bankRate, downpayment, paymentTerm);
    CalculateAmountFinanced(amountOfLoan, bankRate, downpayment, paymentTerm);

    var x = document.getElementById('ComputationContainer');
    x.style.display = 'block';
}

function CalculateAmortizationPayment(amountOfLoan, bankRate, downpayment, paymentTerm) {

    var downpaymentPayment = amountOfLoan * (downpayment / 100);

    var rate = bankRate / 100 / 12, paymentTerm;
    var nper =  paymentTerm;
    var pv =  -Math.round(amountOfLoan - downpaymentPayment);

    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    //-------------------------------------
    //var downpaymentPayment = amountOfLoan * (downpayment / 100);
    //var amount = Math.round((amountOfLoan - downpaymentPayment) / paymentTerm);
    var amount = pmt.toLocaleString("en") + ' PHP';

    //$('#MonthlyPriceComputation').html(amount);
    var theDiv = document.getElementById("MonthlyPriceComputation");
    theDiv.innerHTML = amount;

    //pmt(bankRate / 100 / 12, paymentTerm,  Math.round((amountOfLoan - downpaymentPayment) / paymentTerm)).toFixed(2);
}

function pmt(rate, nper, pv) {
    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    return pmt;
};
function CalculateDownpaymentPrice(amountOfLoan, bankRate, downpayment, paymentTerm) {
    var downpaymentPayment = Math.round(amountOfLoan * (downpayment / 100));
    downpaymentPayment = downpaymentPayment.toLocaleString("en") + ' PHP';

    //$('#DownpaymentComputation > .computationDetailsValue').html(downpaymentPayment);
    var theDiv = document.getElementById("DownpaymentComputationValue");
    theDiv.innerHTML = downpaymentPayment;

}
function CalculateAmountFinanced(amountOfLoan, bankRate, downpayment, paymentTerm) {

    var downpaymentPayment = Math.round(amountOfLoan * (downpayment / 100));
    var amountFinanced = Math.round(amountOfLoan - downpaymentPayment);
    amountFinanced = amountFinanced.toLocaleString("en") + ' PHP';

    //$('#FinancedComputation > .computationDetailsValue').html(amountFinanced);
    var theDiv = document.getElementById("FinancedComputationValue");
    theDiv.innerHTML = amountFinanced;
}

function CalculateLoanCalculatorButton_Clicked() {
    CalculateLoan();
}

function GetAmountFromExternal() {
    return 2970000;
}


//------------------------------

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                    // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
                // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;      //---------https://www.sitepoint.com/get-url-parameters-with-javascript/
}