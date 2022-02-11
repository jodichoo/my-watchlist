function AddRemoveButton({ onClick, type }) {
    const style = {
        backgroundColor: type === "remove" ? "indianred" : "green"
    }
    return (
        <div className="add-remove-button" style={style} onClick={onClick}>
            {type === "remove" ? "Remove" : "Add to List"} 
        </div>
    )
}

export default AddRemoveButton; 