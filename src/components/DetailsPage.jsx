import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// Grid atnd
import { Row, Col, Switch  } from "antd";
import { Pie, } from 'react-chartjs-2';
import {Intensity,PM} from 'react-environment-chart';
ChartJS.register(ArcElement, Tooltip, Legend);
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};


export default function DetailsPage() {
  return (
    <>
        {/* need divine matrix 3x3 */}
        <div className='col '>

        <Row style={{
            height: '300px',
            width: '100%',
            
        }}>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
             <h3>
           Device 1
                    </h3>
            <Switch defaultChecked onChange={onChange} 
            checkedChildren="On" unCheckedChildren="Off" />
            </Col>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
            <h3>
           Device 2
                    </h3>
            {/* set Size Switch Bigger */}
            <Switch 
                size='large'
            defaultChecked onChange={onChange} 
            checkedChildren="On" unCheckedChildren="Off" />
            </Col>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
           <h3>
           Device 3
                    </h3>
            <Switch defaultChecked onChange={onChange} 
            checkedChildren="On" unCheckedChildren="Off" disabled />
            </Col>
        </Row>
        <Row>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            Gas Intensity
            <PM value={20} />  
            </Col>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
           <h3>
                     Light
                    </h3>
            <Switch defaultChecked onChange={onChange} 
            checkedChildren="On" unCheckedChildren="Off" disabled />
            </Col>
            <Col span={8} style={{
                // center all element 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <h3>
                     Movement  Sensor
                    </h3>
            <Switch defaultChecked onChange={onChange} 
            checkedChildren="On" unCheckedChildren="Off" disabled />
            </Col>
        </Row>
        </div>

    </>
  )
}
