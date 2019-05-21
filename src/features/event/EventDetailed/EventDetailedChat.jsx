import React, { Component } from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ChatForm from "./EventDetailedChatForm";
import { distanceInWords } from "date-fns";

class EventDetailedChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = commentId => () =>
    this.setState(prevState => ({
      ...this.state,
      showReplyForm: !prevState.showReplyForm,
      selectedCommentId: commentId
    }));

  handleCloseReplyForm = () => {
    this.setState({
      ...this.state,
      showReplyForm: false,
      selectedCommentId: null
    });
  };

  render() {
    const { eventId, eventChat, addEventComment } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;

    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    as={Link}
                    to={`/profile/${comment.uid}`}
                    src={comment.photoURL}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{distanceInWords(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReplyForm && selectedCommentId === comment.id && (
                        <ChatForm
                          addEventComment={addEventComment}
                          eventId={eventId}
                          parentId={comment.id}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                     <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            as={Link}
                            to={`/profile/${child.uid}`}
                            src={child.photoURL}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            > 
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {distanceInWords(child.date, Date.now())} ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={this.handleOpenReplyForm(child.id)}
                              >
                                Reply
                              </Comment.Action>
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <ChatForm
                                    addEventComment={addEventComment}
                                    eventId={eventId}
                                    parentId={child.parentId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>

          <ChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            parentId={0}
            form={"newComment"}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailedChat;
