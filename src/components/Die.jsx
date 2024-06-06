function Die(props)  {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div onClick={props.holdDice} className="die-face" style={styles}>
            <img src={props.diepic} alt="diepic" />
        </div>
    )
}

export default Die