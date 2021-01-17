import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const InfoLine = (props) => {
    return (
        <Row className="text-left">
            <Col><p><strong>{props.header}</strong></p></Col>
            <Col>{props.data}</Col>
        </Row>
    )
}
