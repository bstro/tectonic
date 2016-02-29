'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sources from './sources';

/**
 * Load is our decorator which accepts an object of queries or a function which
 * takes (state, params) as arguments and returns an object of queries.
 *
 */
export default function load(queries) {
  // TODO: 
  // 3. Call the thunk with store.getState() and this.props
  // 4. Take result of thunk and transform into an array (if it's not already)
  // 5. Iterate through array and figure out how to call and load data

  return (WrappedComponent) =>

    @connect((state) => ({ state }))
    class LoadComponent extends Component {

      constructor(props) {
        super(...arguments);

        this.queries = queries;
        // If the queries is a function we need to evaulate it with the current
        // redux state and component props passed in to get our query object.
        if (typeof queries === 'function') {
          const { state, ...props } = props;
          this.queries = queries(state, props);
        }
      }

      static contextTypes = {
        sources: PropTypes.instanceOf(Sources)
      }

      /**
       * Each component stores its resolved queries from each render. This
       * allows us to check whether queries have changed when the component
       * receives new props; if they change we need to enqueue the new queries
       * to load new data.
       *
       */
      queries = {}

      componentWillMount() {
        // Resolve the queries and load the data.
        console.log(this.context.sources);
      }

      render() {
        return <WrappedComponent { ...this.props } />
      }
    }

}