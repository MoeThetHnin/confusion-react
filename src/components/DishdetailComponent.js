import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    constructor({props}) {
        super({props});

    }
    renderDish(dish) {
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

    renderComments(comments) {
            console.log("Comments ", comments)
            if(comments != null) {
                    return (
                        <div className="col-12 col-md-5">
                            <h4>Comments</h4>
                            <ul className = "list-unstyled">
                                {comments.map((comment) => {
                                    return (
                                        <li key={comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>{comment.arthur}</p>
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
    render(){
        if (this.props.dish != null){
            return(
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
                
            );
        }
    }
}

export default Dishdetail;