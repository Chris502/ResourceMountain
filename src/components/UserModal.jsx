import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';





class UserModal extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }


    getCount = (id) => {
        axios.get('/allTuts/' + id).then(response => {
            console.log("HERE I AM" + response.data[0])
            let byAdd = response.data
            this.setState({
                tutCount: byAdd[0].count
            })
            console.log(this.state.tutCount)
        })
    }
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

    render() {
        const style = {
            height: 100,
            width: 100,
            textAlign: 'center',
            display: 'inline-block',
            background: 'whitesmoke',
            display:'flex',
            flexDirection:'column',
            marginLeft: 15
          };
        const username = localStorage.getItem("user")
        const picc = localStorage.getItem("user-pic")
        const persID = this.props.userID

        let stats = this.state.tutCount ? <h2><span className="user-span">User Uploads:</span> &nbsp; {this.state.tutCount}</h2> : <a className="user-item" onClick={_ => this.getCount(persID)}>
            Stats</a>





        console.log(persID)
        return (
            <div>
                 <RaisedButton 
                 zDepth={1}
                 style={{'borderRadius': 50,'zIndex':1}}
                 onClick={this.handleTouchTap}
                 label="My Profile"
               />
               <Popover
                 open={this.state.open}
                 anchorEl={this.state.anchorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={this.handleRequestClose}
                 animation={PopoverAnimationVertical}
               >
                 <Menu>
                   <MenuItem style={{'textAlign':'center' }}> 
                        <Paper style={style} zDepth={1} circle={true}>
                        <img style={{'height': 100, 'width':100, 'borderRadius': 50}} src={this.props.authPict}/>
                        </Paper>
                        {this.props.authName}
                        </MenuItem>
                   <MenuItem primaryText="Help &amp; feedback" />
                   <MenuItem primaryText="Settings" />
                  <a className='pop-link' href='http://138.197.196.116:3002/logout'> <MenuItem> Sign Out</MenuItem></a>
                 </Menu>
               </Popover>
             </div>
           );
         }
       }
function mapStateToProps(state) {
    return {
        authName: state.authName,
        authPict: state.authPict,
        userID: state.userID
    }
}
export default connect(mapStateToProps)(UserModal)