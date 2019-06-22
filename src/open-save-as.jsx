const React = require('react');
const {Button,ButtonGroup,Modal,ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem} = require('reactstrap');

class OpenSaveAs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            programs: [],
            selected: '',
            selectedContent: ''
        };
        let self = this;

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.socket = this.props.socket;
        this.socket.on('program-list', (data)=>  {
            self.programListFetchedFromServer(data)}
        );
        this.socket.on('program-content', (data)=>  {
            self.programContentFetchedFromServer(data)}
        );

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount(){
        if (this.socket) {
            this.socket.emit('get-program-list');
        }
    }

    programListFetchedFromServer(data) {
        this.setState({programs: data['programs']})
    }

    programContentFetchedFromServer(data) {
        this.props.setFileText(data['content'])
    }

    onOkClick() {
        if(this.props.mode === 'Save'){
            if(this.state.programs.includes(this.state.selected)){
                alert('Filename already exists!')
                return
            }else{
                this.socket.emit('create-file', this.state.selected);
            }
        }
        if(this.props.mode === 'Open'){
            this.socket.emit('get-program-content', this.state.selected);
            return
        }
        this.toggle();
    }

    onCancelClick() {
        this.toggle();
    }

    setSelectedFile(file) {
        this.setState({selected: file})
    }

    handleChange(e) {
        this.setState({selected: e.target.value})
    }


    render()
    {
       return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader 
                        toggle={this.toggle} 
                        className="bg-primary text-light">{this.props.mode}
                    </ModalHeader>
                    <ModalBody>
                        <ListGroup 
                            flush 
                            className="overflow-auto border-secondary border" 
                            style={{height: "200px", resize: "vertical", maxHeight: "70vh", minHeight: "50px"}}>
                            { 
                                this.state.programs.map((program, i) => 
                                    <ListGroupItem 
                                        key={i} 
                                        tag="a" 
                                        href="#" 
                                        action 
                                        onClick={this.setSelectedFile.bind(this, program)}>{program}
                                    </ListGroupItem>
                                )
                            }
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Input 
                            className="border-secondary" 
                            disabled={this.props.mode === 'Open'} 
                            placeholder="File Name..." 
                            value={this.state.selected}
                            onChange={this.handleChange}/>
                        <ButtonGroup>
                            <Button 
                                color="primary" 
                                size="" 
                                className="text-nowrap" 
                                onClick={()=> this.onOkClick()}>{this.props.mode}
                            </Button>
                            <Button 
                                color="secondary" 
                                size="" 
                                className="text-nowrap" 
                                onClick={()=> this.onCancelClick()}>Cancel
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

};

module.exports = OpenSaveAs;
