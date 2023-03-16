import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";

import { createWalletApi, getWalletsApi } from "../../utils/APIs";
import "../../styles/global.css";
import "./styles.css";
import Swal from "sweetalert2";
import auth from "../../utils/auth";

const Profile = ({ user }) => {
  const [userWallets, setUserWallets] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [walletForm, setWalletForm] = useState({
    name: "",
    balance: "",
    user: {},
  });

  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShow(false);
    setWalletForm({ name: "", balance: "", user: {} });
  };
  const handleOpenModal = () => {
    setShow(true);
  };

  const validateFormData = useCallback((formData) => {
    if (formData.name === "" || formData.balance === "") {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (formData.balance <= 0) {
      Swal.fire({
        title: "Warning",
        text: "Balance must be greater than 0!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  }, []);

  const renderWallets = useMemo(
    () =>
      (userWallets || []).map((wallet) => (
        <ListGroup.Item
          key={wallet._id}
          className="d-flex justify-content-between"
        >
          <Card.Text className="bg-transparent">{wallet.name}</Card.Text>
          <Card.Text className="bg-transparent">{wallet.balance}</Card.Text>
        </ListGroup.Item>
      )),
    [userWallets]
  );

  const handleWalletInputChange = (e) => {
    console.log(e.target.value);
    setWalletForm({ ...walletForm, [e.target.name]: e.target.value });
  };

  const handleCreateWallet = useCallback(async () => {
    walletForm.user = { _id: user._id };
    if (!validateFormData(walletForm)) {
      return;
    }

    const response = await createWalletApi(walletForm);

    console.log(response);
    if (!response.ok) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Wallet created!",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleCloseModal();
    }
  }, [user._id, validateFormData, walletForm]);

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.logout();
      }
    });
  }, []);

  useEffect(() => {
    const getWallets = async () => {
      const response = await getWalletsApi(user?._id);
      const data = await response.json();

      // get user's total balance and set state
      const totalBalance = data.reduce(
        (acc, wallet) => acc + wallet.balance,
        0
      );

      setUserBalance(totalBalance);
      setUserWallets(data);
    };
    getWallets();
  }, [user?._id]);

  return (
    <div className="net-worth">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card className="m-3">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="bg-transparent">Information</Card.Title>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <Card.Text className="bg-transparent">Name</Card.Text>
                  <Card.Text className="bg-transparent">{user?.name}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <Card.Text className="bg-transparent">Email</Card.Text>
                  <Card.Text className="bg-transparent">
                    {user?.email}
                  </Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Card className="m-3">
              <Card.Header className="d-flex justify-content-between">
                <Button onClick={handleOpenModal}>New Wallet</Button>
              </Card.Header>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="bg-transparent">Wallet</Card.Title>
                <Card.Title className="bg-transparent">
                  {userBalance}
                </Card.Title>
              </Card.Header>
              <ListGroup variant="flush">{renderWallets}</ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          {/* Create logout button in the right side */}
          <Col xs={12} md={6} lg={6} className="d-flex justify-content-end">
            <Button className="m-3" variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal className="custom-modal" show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create new wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark-subtle">
          <Form className="custom-modal-form">
            <Form.Group className="pb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                autoFocus
                onChange={handleWalletInputChange}
              />
            </Form.Group>
            <Form.Group
              className="pb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="text"
                name="balance"
                placeholder="Balance"
                onChange={handleWalletInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleCreateWallet}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Profile.defaultProps = {
  user: {},
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
