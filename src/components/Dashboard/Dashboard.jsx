import React, { useState } from 'react'
import Bar from './Bar'
import Information from './Information'
import Room from './Room'
import Controler from './Controler';
import Devices from './Devices';
import Credential from './Credential';
import Createroom from '../Crudtable/Createroom';
import Updateroom from '../Crudtable/Updateroom';
import { Routes, Route } from 'react-router-dom'
function Dashboard({activeState,children, data, setData}) {
    return (
        <div className='container-fluid'>
            <div className="row gy-auto">
                <Bar activeState={activeState}/>
                <Information  data={data} setData={setData}  />
                {children}
                {/* <Routes>
                <Route path="/room" element={<Room />} />
                <Route path="/createroom" element={<Createroom />} />
                <Route path="/updateroom" element={<Updateroom />} />
                <Route path="/controler" element={<Controler />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/credential" element={<Credential />} />
            </Routes> */}

            </div>
        </div>

    )
}

export default Dashboard
