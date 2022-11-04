import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

function CommentForm(args) {
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button outline onClick={toggle}>
            Summit Comment
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Summit Comment</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label for="ratingSelect">
                    Rating
                </Label>
                <Input id="ratingSelect" name="select" type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="name">Your Name</Label>
                <Input id="name" name="name" placeholder="Your Name" type="name"/>
            </FormGroup>
            <FormGroup>
                <Label for="comment">Comment</Label>
                <Input id="comment" name="comment" type="textarea"/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Summit
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }

function RenderDish({dish}) {
        if (dish != null){
            return(
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>       
            );
        }          
        else{
            return(
                <div></div>
            );
        }           
}

function RenderComments({comments}) {
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
                        <CommentForm />
                    </div>
                </div>
                </div>
            );
        }
}


export default DishDetail;