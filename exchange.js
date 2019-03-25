
function exchange() {
	// pjs.setConnectAttr() is used here to turn off commitment control for this module
	//   to make it easier to use as a proof of concept example
  pjs.setConnectAttr(SQL_ATTR_COMMIT,SQL_TXN_NO_COMMIT);
  
  // define the Rich Display json file
  pjs.defineDisplay("display", "exchange.json");
  
  // defining a strongly typed variable for rate
  pjs.define("rate", {type: "packed decimal", length: 15, decimals: 5 });
  
  base = 'USD';  // default value
  while (!close) {

    // Get exchange rate data from web service
    var response = pjs.sendRequest({
      method: "get",
      uri: "https://api.exchangeratesapi.io/latest?base=" + base
    });
    
    // Format data for grid
    var gridData = [];
    for (var curr in response.rates) {

    	 
    	rate = response.rates[curr];
    	// Call Program
    	// The variable rate was defined above in order to demonstrate both using a strongly typed variable
    	//   and using JavaScript variables with pjs.parm()
    	// All three variables could be passed by either method
    	pjs.call("EXCHANGER", 
    			pjs.parm(base, { type: 'char', length: 10 }), 
    			pjs.parm(curr, { type: 'char', length: 10 }), 
    			rate);

    	// add data to array
      gridData.push({
        currency: curr,
        rate: response.rates[curr]
      })
    }
    
    // replace the data in the display grid with the new array
    display.currencygrid.replaceRecords(gridData);
    
    //display the screen 
    display.exchangedialog.execute();
  }

}

exports.run = exchange;
