import React, { Component } from 'react';

import Badge from 'react-bootstrap/Badge'

import { Link, withRouter } from 'react-router-dom';

class ResourceTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //TO DO
        };
      }
    
    render() {
        
        return(
            <Link> 
              <h4> 
                <Badge pill variant = {this.props.variant || 'primary'} className = 'mx-1'> 
                  {/*<h6> <Badge pill variant = 'light'> {this.props.option} </Badge>  </h6>*/}
                  { this.props.text }
                </Badge>
              </h4>
            </Link>
        );
    };
}

export default withRouter(ResourceTag);