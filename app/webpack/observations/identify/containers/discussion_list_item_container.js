import { connect } from "react-redux";
import DiscussionListItem from "../components/discussion_list_item";
import {
  postIdentification,
  fetchCurrentObservation,
  loadingDiscussionItem
} from "../actions";

function mapStateToProps( state, ownProps ) {
  if ( ownProps.hideAgree === null ) {
    const hideAgree = ownProps.identification &&
      ownProps.identification.current &&
      state.config.currentUser &&
      state.config.currentUser.id === ownProps.identification.user.id;
    return { hideAgree };
  }
  return {};
}

function mapDispatchToProps( dispatch ) {
  return {
    agreeWith: ( params ) => {
      dispatch( loadingDiscussionItem( ) );
      dispatch( postIdentification( params ) )
        .then( ( ) => {
          dispatch( fetchCurrentObservation( ) );
        } );
    }
  };
}

const DiscussionListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( DiscussionListItem );

export default DiscussionListItemContainer;