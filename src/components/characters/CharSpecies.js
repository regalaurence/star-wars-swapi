import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { renderComponent } from '../../util'

export const CharSpecies = (props) => {

    return (
        <>
            {props.areThereSpecies && <Row className="text-left">
                <Col><p><strong>Species</strong></p></Col>
                <Col> {/* lets check the loading status and render accordingly */}
                    {renderComponent(props.areSpeciesLoading, props.areSpeciesError,
                        props.species.map((s, index) => <li key={index}>{s.name}</li>)
                    )}
                </Col>
            </Row>
            }
        </>
    )
}