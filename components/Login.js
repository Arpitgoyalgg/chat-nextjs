export default function Login(props) {

    function handleLogin(name) {
        props.handleLogIn(name)
    }

    return (
        <>
            <div className = "UserListContainer">
                <div className = "ListWrapper">
                    <h3> L O G I N </h3>

                    <button className="UserWrapper" onClick={() => handleLogin('Arpit')}><span>Arpit</span></button>
                    <button className="UserWrapper" onClick={() => handleLogin('Vaibhav')}><span>Vaibhav</span></button>
                    <button className="UserWrapper" onClick={() => handleLogin('Tushar')}><span>Tushar</span></button>
                    <button className="UserWrapper" onClick={() => handleLogin('Utkarsh')}><span>Utkarsh</span></button>

                </div>
            </div>
        </>
    )
}
