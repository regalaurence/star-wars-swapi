import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { renderComponent } from '../../util'

export const CharVehiclesList = (props) => {

    return (
        <>
            {props.areThereVehicles &&
            <>
            <hr/>
                <Row className="text-left">
                    <Col><p><strong>Vehicles</strong></p></Col>
                    <Col> {/* lets check the loading status and render accordingly */}
                        {renderComponent(props.areVehiclesLoading, props.areVehiclesError,
                            props.vehicles.map(v => <li>{v.name}</li>)
                        )}
                    </Col>
                </Row>
            </>
            }
        </>
    )
}