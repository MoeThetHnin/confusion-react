import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component  } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
        if (dish != null){
            return(
                <Card>
                    <CardImg width="50%" src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>  
    );
        }          
        else{
            return(
                <div></div>
            );
        }           
}

function RenderComments({comments, addComment, dishId}) {
            // console.log("Comments ", comments)
            if(comments != null) {
                    return (
                        <div className="col-12 col-md-5">
                            <h4>Comments</h4>
                            <ul className = "list-unstyled">
                                {comments.map((comment) => {
                                    return (
                                        <li key={comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>-- {comment.author},
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <CommentForm />
                        </div>
                    )
                    }
            else{
                return(
                    <div></div>
                )
            }
}
const  DishDetail = (props) => {
        if (props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
        }
}
class CommentForm extends Component {
    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSummit = this.handleSummit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSummit(values) {
        this.toggleModal();
        alert("Current state is "+ JSON.stringify(values));

    }

    render() {
        return (
            <div>
              <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil">
                </span>{' '}
                  Summit Comment
              </Button>

              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Summit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSummit}>
                            <Row className="form-group py-1">
                                <Label htmlFor="ratingSelect">Rating</Label>
                                <Col>
                                    <Control.select model=".ratingSelect" id=".ratingSelect" rows="12" className="form-control" >
                                        <option value="rate1">1</option>
                                        <option value="rate2">2</option>
                                        <option value="rate3">3</option>
                                        <option value="rate4">4</option>
                                        <option value="rate5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group py-1">
                                <Label htmlFor="name">Your Name</Label>
                                <Col>
                                    <Control.text model=".name" id="firstname" name="firstname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "Field is must",
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group py-1">
                                <Label htmlFor="comment">Your Feedback</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                                <Button type="submit" value="submit" color="primary">Summit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
          );
    }
}

export default DishDetail;