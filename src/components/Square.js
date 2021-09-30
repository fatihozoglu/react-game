function Square( props ) {

    return (
        <button onClick={() => props.handleClick(props.id)} className="square">
        { props.value }
        </button>
    );
}

export default Square;