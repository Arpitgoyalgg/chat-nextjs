import {useState,useEffect} from "react";

export default function Messenger(props) {

    const [height, setHeight] = useState(window.innerHeight)
    const [inputMsg, setInputMsg] = useState('')


    useEffect(() => {
        window.addEventListener('resize', _onResize);
    },[]);

    function _onResize() {
        setHeight(window.innerHeight)
    }

    function addTestMessages() {

        let msg = inputMsg;

        setInputMsg('')

        props.addTextMsg(props.myName, msg);

    }


    function handleChange(e) {
        let text = e.target.value;

        setInputMsg(text)

    }

    function handleKeyPress(e) {

        if(e.key === 'Enter'){
            addTestMessages();
            if(e.preventDefault) {
                e.preventDefault();
            }
        }
    }

    const renderChat = (usr_data) => (

        <div className={`usr-channel${(props.alert[usr_data])? '-alert' : ''}`} onClick={() => props.setChatUser(usr_data)} >
            <div className={`channel-body${(props.curChatUser === usr_data)? '-selected' : ''}`} >
                <div className="channel-img">
                    {/*<img src = {avatar}></img>*/}
                </div>
                <div className="channel-usr">
                    <h5>{usr_data}</h5>

                </div>
            </div>
        </div>
    );

    const renderMsg = (d) => (
        <div className={`${(props.myName===d.author) ? 'my' : 'ur'}-message`}>
            <div className="msg-body">
                <div className="msg-author">{d.author}</div>
                <div className={`msg-txt ${(props.myName===d.author) ? 'my' : 'ur'}`}>{d.text}</div>
            </div>
        </div>
    )


    const style={
        height: height,
    }

    return (
        <div style={style} className="app-messenger">
            <div className="header">
                <div className="header-content">Messages</div>
                <div className="header-right">
                    <div className="usr-img">     {/*<img src = {avatar}></img>*/}    </div>
                    <p>{props.myName}</p>
                </div>
            </div>

            <div className="main">
                <div className="sidebar-left">
                    {
                        Object.keys(props.database).filter(k=>k.includes(props.myName))
                            .map(d => renderChat(d.replace(props.myName, "").replace(":","")))
                    }
                </div>
                <div className="content">
                    <div className="messages">
                        {
                            props.database[props.curChatRoom].map(d => renderMsg(d))
                        }

                    </div>
                    <div className="input-place">
                        <textarea className="input-msg" placeholder="type something..." value={inputMsg} onChange={handleChange} onKeyPress={handleKeyPress}></textarea>
                        <button className="send-btn" onClick={addTestMessages}>Send</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
