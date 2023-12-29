import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const {dopen, onQnDeleted, setDopen,q, myqns, setMyqns, questions, setQuestions} = props
  const handleNo = ()=>{
    setDopen(false)
  }
  const handleYes = ()=>{
      axios.post(API_ENDPOINT+'sam/delete-qn-lib', {qid: q._id}, HEADER_TOKEN).then(res=>{
          let d = res.data
          if(d.success){
              removeFromList()
              onQnDeleted(q.category, q.topic)
          }else{
            toast(d.message)
          }
          setDopen(false)
      })
  }
  function removeFromList(){
    let qss1 = [...myqns]
    let qss2 = [...questions]
    let i1 = qss1.findIndex(qs=>qs.question_id === q.question_id)
    let i2 = qss2.findIndex(qs=>qs.question_id === q.question_id)
    if(i1 >= 0){
        qss1.splice(i1, 1)
        setMyqns(qss1)
    }
    if(i2 >= 0){
        qss2.splice(i2, 1)
        setQuestions(qss2)
    }
  }

  return (
    <div>
      <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setDopen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please Confirm!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete this question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}