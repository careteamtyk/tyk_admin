import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomCircularP from '../widgets/customCircularP';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants/constants';
import { getHeader } from '../../utils/util';
import { SketchPicker } from 'react-color';
import { toast } from 'react-toastify';
import ConfigItem from '../widgets/ConfigItem';

const AddPlan = ({plan, mode, onActionDone, show}) => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [discount, setDiscount] = useState('');
    const [color, setColor] = useState('white');
    const [validity, setValidity] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      if (plan !== null) {
        setName(plan.name || '');
        setPrice(plan.price || '');
        setCount(plan.count || '');
        setDiscount(plan.discount || '');
        setColor(plan.color || 'white');
        setValidity(plan.validity || '');
        setIsActive(plan.isActive || false);
      }else{
        setName('');
        setPrice('');
        setCount('');
        setDiscount('');
        setColor('white');
        setValidity('');
        setIsActive(false);
      }
    }, [show]);
  

    const onAdd = ()=>{

       if(name === ''){
            toast.error("Please enter name")
       }else if(price === ''){
            toast.error("Please enter price")
       }else if(count === ''){
            toast.error("Please enter count")
       }else if(discount === ''){
         toast.error("Please enter discount")
       }else if(count === ''){
        toast.error("Please enter count")
       }else if(validity === ''){
        toast.error("Please enter validity")
       }else{
            setLoading(true)
            const planO = {
                name: name,
                price: price,
                count: count,
                discount: discount,
                color: color,
                validity: validity,
                isActive: isActive
            }
            let dataObj = {plan: planO}
            if(mode === "view"){
              dataObj.id = plan._id
            }
            setLoading(true)
            axios.post(API_ENDPOINT+`admin/${mode==="add"?"add-plan":"update-plan"}`, dataObj, getHeader()).then(res=>{
                const d = res.data
                setLoading(false)
                if(d.success){
                    toast.success(`${mode==="add"?"Added":"Updated"} successfully`)
                    onActionDone()
                }
            })
       }
    }
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        setShowColorPicker(false);
      };
    
      const handleColorClick = () => {
        setShowColorPicker(!showColorPicker);
      };

    return (
        <div style={{maxWidth: '600px', margin: 'auto', position: 'relative'}}>
        
        <TextField value={name} onChange={e=>setName(e.target.value)} sx={{marginTop: '16px'}} inputMode='text' fullWidth variant='outlined' size='small' label='Plan name'/>
        <TextField value={price} onChange={e=>setPrice(e.target.value)} sx={{marginTop: '16px'}} type='number' fullWidth variant='outlined' size='small' label='Plan Price'/>
        <TextField value={count} onChange={e=>setCount(e.target.value)} sx={{marginTop: '16px'}} type='number' fullWidth variant='outlined' size='small' label='Assessment Count'/>
        <TextField value={discount} onChange={e=>setDiscount(e.target.value)} sx={{marginTop: '16px'}} type='number' fullWidth variant='outlined' size='small' label='Discount'/>
        <TextField value={validity} onChange={e=>setValidity(e.target.value)} sx={{marginTop: '16px'}} type='number' fullWidth variant='outlined' size='small' label='Validity(in days)'/>
        <div 
          style={{height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundColor: color, border: '1px solid #ccc', borderRadius: '6px', margin: '12px 0', userSelect: 'none'}} 
          onClick={handleColorClick}
        >
          current color: {color}. click here to Change
        </div>
        {
          showColorPicker ? 
          <div style={{
            position: 'absolute', 
            bottom: 0,
            zIndex: 50
          }}>

          <SketchPicker color={color} onChangeComplete={handleColorChange} /> 
          </div>
          
          : null
        }
        <ConfigItem text='Is Plan Active?' checked={isActive} setChecked={setIsActive}/>
        <LoadingButton onClick={onAdd} loading={loading} style={{margin: '16px 0'}} variant='contained' fullWidth>Submit</LoadingButton>
      </div>
    );
};

export default AddPlan;