import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function Highlights () {
    return(

            <Row className="mt-4">
                <Col lg={4} className="mb-4">
                    <Card className="cardHighlight">
                        <Card.Body>
                            <Card.Title>
                                <h2>Sample Text</h2>
                            </Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quaerat dolor voluptate explicabo adipisci tempore.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} className="mb-4">
                    <Card className="cardHighlight">
                        <Card.Body>
                            <Card.Title>
                                <h2>Another Sample Text Here</h2>
                            </Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsa.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} className="mb-4">
                    <Card className="cardHighlight">
                        <Card.Body>
                            <Card.Title>
                                <h2>Text Sample</h2>
                            </Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt omnis ex dolore tenetur recusandae libero doloribus saepe sit magnam laboriosam!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

    )
}