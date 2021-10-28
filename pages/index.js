import Login from "../components/Login";
import io from 'socket.io-client';
import {useEffect, useState} from "react";
import Messenger from "../components/Messenger";

export default function Home() {

    const socket = io('http://localhost:1337')
    const [renderLogin, setRenderLogin] = useState(true)
    const [myName, setMyName] = useState('')
    const [database, setDatabase] = useState('')
    const [curChatUser, setCurChatUser] = useState('')
    const [curChatRoom, setCurChatRoom] = useState('')
    const [alert, setAlert] = useState({'Arpit': 0, 'Vaibhav': 0, 'Tushar': 0, 'Big': 0})


    useEffect(() => {
        console.log('first useEffect')
        callApi()
            .then(res => setDatabase(res.data))
            .catch(err => console.log(err));
        },[]);

    useEffect(() => {
        // action here
        socket.on('realtime chatting', handleNewMsg);
        console.log('useEffect called realtime')

    }, [socket]);

    function handleNewMsg(author, authorRoom, msg) {

        // this.setState({
        //     database: {...this.state.database, [authorRoom]: [ ...this.state.database[authorRoom], msg]},
        //     alert: {...this.state.alert, [author]: 1}
        // })
        console.log('handleNewMsg')
        console.log(database)
        // setDatabase({...database, [authorRoom]: [ ...database[authorRoom], msg]})

        setDatabase(prevState => (
            {
                ...prevState,[authorRoom]: [ ...database[authorRoom], msg]
            }
        ))

        console.log(database)

        setAlert({...alert, [author]: 1})
    }



    async function callApi() {
        const response = await fetch('http://localhost:1337/data/all-chats');
        const body = await response.json();
        console.log(body)
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    function handleLogIn(myName) {
        socket.emit('login', myName);
        const targetRoom = Object.keys(database).filter(key => key.includes(myName));
        // this.setState({
        //     renderLogin: 0,
        //     myName: myName,
        //     curChatRoom: targetRoom[0],
        //     curChatUser: targetRoom[0].replace(myName, "").replace(":",""),
        // })

        setRenderLogin(false)
        setMyName(myName)
        setCurChatRoom(targetRoom[0])
        setCurChatUser(targetRoom[0].replace(myName, "").replace(":",""))
    }


    function setChatUser(curUsr) {

        const Keys = Object.keys(database);
        const roomName = Keys.includes(`${curUsr}:${myName}`) ? `${curUsr}:${myName}` : `${myName}:${curUsr}`;


        // this.setState({
        //     curChatRoom: roomName,
        //     curChatUser: roomName.replace(this.state.myName,"").replace(":",""),
        //     alert: {...this.state.alert, [curUsr]: 0}
        // })

        setCurChatRoom(roomName)
        setCurChatUser(roomName.replace(myName,"").replace(":",""))
        setAlert({...alert, [curUsr]: 0})
    }

    function addTextMsg(author, msg) {

        // create msg array
        let newMsg = {author:author, text: msg};
        const curUser = curChatRoom;

        // this.setState({
        //     database: {...this.state.database, [curUser]: [ ...this.state.database[curUser], newMsg]},
        // })

        setDatabase({...database, [curUser]: [ ...database[curUser], newMsg]})


        // refiltered
        socket.emit('add msg', curChatRoom, curChatUser, newMsg);
    }

  return (
    <>
        <div className="app-wrapper">
            {(renderLogin)? <Login handleLogIn={handleLogIn}
                />:
                (
                    <Messenger myName={myName} database={database}
                               setChatUser={setChatUser} alert={alert} curChatUser={curChatUser}
                               curChatRoom={curChatRoom} addTextMsg={addTextMsg} />
                )}
        </div>
    </>
  )
}
