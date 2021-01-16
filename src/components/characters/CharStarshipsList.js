import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { renderComponent } from '../../util'

export const CharStarshipsList = (props) => {

    return (
        <>
            {props.areThereStarships &&
                <>
                    <hr />
                    <Row className="text-left">
                        <Col><p><strong>Starships</strong></p></Col>
                        <Col> {/* lets check the loading status and render accordingly */}
                            {renderComponent(props.areStarshipsLoading, props.areStarshipsError,
                                props.starships.map(s => <li>{s.name}</li>)
                            )}
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}