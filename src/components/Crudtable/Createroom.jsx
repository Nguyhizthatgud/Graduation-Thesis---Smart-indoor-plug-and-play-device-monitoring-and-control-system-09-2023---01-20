import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Bar from '../Dashboard/Bar';
import Information from '../Dashboard/Information';


export default function Createroom() {
  const [createTime, setCreateTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setCreateTime(new Date()), 1000)
  }, []);

  const [roomName, setRoomName] = useState('');
  const [discription, setDiscription] = useState('');
  const [roomNameError, setRoomNameError] = useState(false);
  const [helperText, setHelperText] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomNameError(false)
    if (roomName === '') {
      setRoomNameError(true)
      setHelperText('Hãy nhập tên phòng!')
    }
    if (roomName) {
      fetch("http://localhost:8000/dataroom", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          description: discription,
          timeCreated: createTime.toLocaleString()
        })


      }).then((res) => {
        navigate('/dashboard/room')

      })
    }
  }

  return (
    <div className='container-fluid'>
      <div className="row gy-auto">

        <div className='col bg-body-tertiary'>
          <div className='pt-5 d-flex justify-content-around position-relative border-bottom'>
            <Link to='/dashboard/room'>
              <Button className='mt-3 position-absolute start-0 translate-middle-y' variant="outline-warning fw-bold  btn-sm opacity-75"><i className="bi bi-arrow-left-circle-fill"></i></Button>{' '}
            </Link>
            <span className='text-uppercase fw-bold fs-4'>Tạo liên kết phòng</span>

          </div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <form className='my-4' noValidate autoComplete="off"
                onSubmit={handleSubmit} >
                <div className="mb-3">
                  <TextField id="outlined-basic" label="Phòng" variant="outlined" fullWidth required
                    onChange={
                      (e) => {
                        setRoomName(e.target.value)
                        setRoomNameError(false)
                        setHelperText('')
                      }}
                    sx={{}}
                    helperText={helperText}
                    error={roomNameError} />
                </div>
                <div className="mb-3">
                  <TextField id="outlined-basic" label="Mô tả" variant="outlined" fullWidth onChange={(e) => setDiscription(e.target.value)} sx={{}} />
                </div>

                <Button
                  type='submit'
                  className='me-2 btn-success opacity-80'
                // onClick={() => {
                //   console.log(createTime.toLocaleString());
                // }}
                >
                  <i class="bi bi-save2"></i> Lưu </Button>

              </form>
            </CardContent>
          </Card>
        </div >


      </div>
    </div>

  )
}
