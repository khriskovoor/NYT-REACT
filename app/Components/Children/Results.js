var React = require('react');

var Results = React.createClass({
  render: function(){
    return(
      <div>
  
        {this.props.articles}

      </div>
    )
  }
});

module.exports = Results;