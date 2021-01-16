import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { render } from '../../util'

export const CharSpecies = (props) => {

    return (
        <>
            {props.areThereSpecies && <Row className="text-left">
                <Col><p><strong>Species</strong></p></Col>
                <Col> {/* lets check the loading status and render accordingly */}
                    {render(props.areSpeciesLoading, props.areSpeciesError,
                        props.species.map(s => <p>{s.name}</p>)
                    )}
                </Col>
            </Row>
            }
        </>
    )
}