import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';

class MemoDelete extends Component{
    constructor(props){
        super(props);
        this.state = {
          open : false
        }
    }

    handleClose  = () => {
        this.setState({
            open : false
        })
    }

    handleClickOpen  = () => {
        this.setState({
            open : true
        })
    }

    deleteMemo(id) {
        const url = '/api/memos/'+id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
            <>
            <Button className="delBtn" variant="outlined" color="primary" onClick={this.handleClickOpen} faAlignRight>
              삭제
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"삭제 확인 창"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  삭제하시겠습니까?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  취소
                </Button>
                <Button color="primary" onClick={(e)=>{this.deleteMemo(this.props.id)}} autoFocus>
                    삭제
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
    }
}

               
export default MemoDelete;