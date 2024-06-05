function Die(props)  {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div onClick={props.holdDice} className="die-face" style={styles}>
            <h2 className="die-text">{props.value}</h2>
        </div>
    )
}

export default Die