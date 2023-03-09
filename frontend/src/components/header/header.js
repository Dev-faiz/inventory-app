const Header =  () =>{

    return(
        <div className="--pad header">
            <div className="--flex-between">
                <h3>
                    <span className="--fw-thin">Welcome,</span>
                    <span className="--fw-thin">Faiz</span>
                </h3>
                <button className="--btn --btn-danger">LogOut</button>
            </div>
        </div>
    )

}

export default Header;