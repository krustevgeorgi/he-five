const React = require('react');
const {Button, ButtonGroup} = require('reactstrap');
const OpenSaveAs = require('./open-save-as');
const io = require('socket.io-client');
const socket = io('http://localhost:3033');

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOpen: false,
            showSaveAs: false,
            fileContent: ''
        };

        this.onLoadClick = this.onOpenClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.setFileText = this.setFileText.bind(this);
    }

    componentDidMount(){

    }

    onOpenClick = () => {
        this.setState({showOpen: true, showSaveAs: false});
    }

    onSaveClick = () => {
        this.setState({showSaveAs: true, showOpen: false});
    }

    setFileText = (text) => {
        this.setState({fileContent: text, showOpen: false, showSaveAs: false});
    }

    renderShow(){
        let randomKey = Math.random().toString();

        if (this.state.showOpen){
            return <OpenSaveAs key={randomKey} mode={'Open'} socket={socket} setFileText={this.setFileText}/>;
        };
        if (this.state.showSaveAs){
            return <OpenSaveAs key={randomKey} mode={'Save'} socket={socket} setFileText={this.setFileText}/>;
        }
    };


    render()
    {
        var text = this.state.fileContent 
            ? this.state.fileContent 
            : 'File empty or no file selected!'

        let showOpenSaveAs = this.renderShow();
        return (
            <div className='Editor'>
                {text.split("\n").map((i,key) => {
                    return <div key={key}>{i}</div>;
                })}
                <div style={{textAlign: 'center'}}>
                    <ButtonGroup>
                        <Button color="secondary" className="iconic" onClick={()=> this.onOpenClick()}>Open</Button>
                        <Button color="primary" className="iconic" onClick={()=> this.onSaveClick()}>Save</Button>
                    </ButtonGroup>
                </div>
                {showOpenSaveAs}
            </div>
        );}
};

module.exports = Editor;