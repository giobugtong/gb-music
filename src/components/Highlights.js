import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

export default function Highlights () {
    return(
        <Container>
            <Row>
                <Col lg={4} className="mb-4">
                    <Card className="cardHighlight">
                        <Card.Body>
                            <Card.Title>
                                <h2>Stylish</h2>
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
                                <h2>Best protection in its class</h2>
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
                                <h2>Very affordable</h2>
                            </Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt omnis ex dolore tenetur recusandae libero doloribus saepe sit magnam laboriosam!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}