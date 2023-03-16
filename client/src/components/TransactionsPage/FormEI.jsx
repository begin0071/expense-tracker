import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Form, Row, Col, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const FormEI = ({ id, optionData, handleSubmit, handleInput }) => {
  const [dateTime, setDateTime] = useState(null);
  const [validated, setValidated] = useState(false);

  // Send date to parent component
  const onChangeDateTime = useCallback(
    (date) => {
      setDateTime(date);
      handleInput({ target: { name: "date", value: date } });
    },
    [handleInput]
  );

  const handleOnChangeOption = useCallback(
    (e) => {
      const { value } = e.target;
      handleInput({ target: { name: "wallet", value } });
    },
    [handleInput]
  );

  const selectOption = useMemo(
    () => (
      <Form.Select
        className="bg-light"
        aria-label="Default select example"
        name="wallet"
        onChange={handleOnChangeOption}
      >
        <option value="">Select wallet</option>
        {optionData.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    ),
    [handleOnChangeOption, optionData]
  );

  return (
    <Form id={id} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="py-2">
        <Col xs={12} md={12} lg={6}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>From</Form.Label>
            {selectOption}
          </Form.Group>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              placeholder="Amount"
              name="amount"
              onChange={handleInput}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="py-2">
        <Col xs={12} md={12} lg={6}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleInput}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            <div className="">
              <DateTimePicker
                className="bg-light"
                name="date"
                onChange={onChangeDateTime}
                value={dateTime}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          <Button className="btn" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

FormEI.defaultProps = {
  optionData: [],
};

FormEI.propTypes = {
  id: PropTypes.string.isRequired,
  optionData: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default FormEI;
