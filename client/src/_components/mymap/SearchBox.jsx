import React from "react";
import {connect} from "react-redux";

/**
 * Search Item Class
 */
class SearchBox extends React.Component {
  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  /**
   * Set the search text data into the state object
   * @param event
   */
  searchByText(event) {
    this.state[event.target.query] = event.target.value;
    //this.props.SearchItems(this.state);
  }

  /**
   * Render the Search filter options.
   * @returns {XML}
   */
  render() {
    return (
       <div className="col-md-8 pull-left">
              <div className="form-group form-control-by-1">
                <input type="text" className="form-control-search search-input-box" id="name" name="name" value={this.state.name} onChange={(e) => this.searchByText(e)} placeholder="Search "/>
              </div>
            </div>
    );
  }
}

/**
 * Call the Search action function with search data.
 * @param dispatch
 * @returns {{SearchItems: (function(*=))}}
 */
function mapDispatchToProps(state) {
  return {
      state
    }
  };


/**
 * attach  both Reducer and Action into the Search component.
 */
export default connect(mapDispatchToProps)(SearchBox);