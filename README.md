# mortgage-calculator-widget

A mortgage calculator widget I created that can be implemented on different websites which allows users to compare rates from different partner banks.  

You can also implement this widget on your website with pre-made themes.
  <ul>
    <li>blackmatter</li>
    <li>bluehorizon</li>
    <li>browncrown</li>
    <li>grayscale</li>
    <li>greenforest</li>
    <li>redroyale</li>
  </ul>


  To implement, add the files on your project folder and include these on your page:
  
  <code>
  
    <script src="scripts/ClientLibrary-1.2.0.js"></script>
    
    <script type="text/javascript">
        window.onload = function(e){


            $("#HousingLoanCalculatorContainer").HousingLoanCalculator({
                amountOfLoan: 3500000,
                theme: "bluehorizon"
               // themeResourcesCustomLink: "[*link here*]/",  //use this to specify where you included the "themes" folder
            });
        }

    </script>
    
  </code>
Click here for a quick demo:
<a href="https://del22vin.github.io/mortgage-calculator-widget/" target="_blank">Mortgage Calculator Widget Demo</a>
