

function RenderLeader(props){
    return(
        <div className="mb-3 p-3 border rounded">
            <div className="row">
                <div className="col-2">
                    <img src={props.image} />
                </div>
                <div className="col">
                    <h4 className="mb-2">{props.name}</h4>
                    <div className="mb-2">{props.designation}</div>
                    <div>{props.description}</div>
                </div>
            </div>
            
        </div>
    );
}

export default RenderLeader