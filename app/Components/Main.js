// Include React 
var React = require('react');
var axios = require('axios');

var Results = require('./children/Results');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			beginDate:"",
			endDate:"",
			results: []
		}
	},



	// TODO : Here we create a function for updating the Seymour based on clicks received by the child
	// We will then give the child access to this function
	componentDidMount: function(){
		// console.log("componentDidMount");
	},

	// This lifecycle event will run every single time the Seymour component is updated by the children. 
	componentDidUpdate: function(prevProps, prevState){
		/* TODO alert when the searchTerm state is greater than 500 */
		//console.log("componentDidUpdate", this.state.searchTerm, this.state.results);
	},


	getSearchResults: function(searchTerm, beginDate, endDate){
		const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
		var self = this;
		axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm
			+"&begin_date="+beginDate+"&end_date="+endDate)
		.then(function(httpRes) {
			//console.log(httpRes.data.response);
			var queryArr = httpRes.data.response.docs;
            var newResults = [];
            for(var i=0; i<queryArr.length; i++){
              newResults.push(queryArr[i].lead_paragraph);
              //newResults = queryArr[0].web_url;
              
            }

            self.setState({
              results: newResults
            })
			//self.setState({results: httpRes.data.response.docs});

		}).catch(function(error){
			
    	console.log('Error: ', error);
  	
  	});
	},


	handleChange: function(event){
    	console.log(event.target.value);

    	//this.setState({searchTerm: event.target.value});
    	var newState ={};
    	newState[event.target.id]=event.target.value;
    	this.setState(newState);
	},

	handleClick: function(){
		console.log(this.state.searchTerm);
		if (this.state.searchTerm.trim() == "") this.state.searchTerm="elections";
			
		console.log(this.state.beginDate);
		if (this.state.beginDate.trim() == "") this.state.beginDate="01012016";
			
		console.log(this.state.endDate);
		if (this.state.endDate.trim() == "") this.state.endDate="10012016";
			
		this.getSearchResults(this.state.searchTerm, this.state.beginDate, this.state.endDate);

	},

	render: function(){

		return(

			<div className="container">
				<div className="jumbotron">
					<h2 className="text-center">New York Times Article Scrubber</h2>
					<p className="text-center"><em>Search for and annotate article of interest!</em></p>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center">Search</h3>
					</div>
					<div className="panel-body text-center">
						<h4 className=""><strong>Search Term</strong></h4>
						<input type="text" className="form-control text-center" id="searchTerm" onChange= {this.handleChange} required/>
						<br />
		 				<h4 className="">Begin Date</h4>
						<input type="text" className="form-control text-center" id="beginDate" onChange= {this.handleChange} required/>
						<br />
						<h4 className="">End Date</h4>
						<input type="text" className="form-control text-center" id="endDate" onChange= {this.handleChange} required/>

						<br />
						
						<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>

						
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center">Results</h3>
					</div>
					<div className="panel-body text-center">
						<Results articles={this.state.results} />
					</div>
				</div>


				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center">Saved Articles</h3>
					</div>
					<div className="panel-body text-center">
						
					</div>
				</div>

			</div>
		)
	}
});
module.exports = Main;