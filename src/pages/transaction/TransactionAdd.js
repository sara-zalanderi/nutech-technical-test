import { useState } from "react";
import { Button, Modal, Form, Label, Input, Image } from "semantic-ui-react";
import { Field } from "redux-form";
import axios from "axios";

import { StyledModal } from "./index.style";
import PlaceholderImage from "../../images/placeholder-image.jpg";

export const TransactionAdd = ({
  props,
  transactionData,
  setIsLoading,
  setAlert,
  setRefresh,
  normalizeFormData,
  transactionAPI,
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [cardImage, setCardImage] = useState("");

  const addTransaction = () => {
    let payload = normalizeFormData();
    payload.image = cardImage;
    payload.quantity = parseInt(payload.quantity);
    payload.price = parseInt(payload.price);
    payload.name = payload.name.charAt(0).toUpperCase() + payload.name.slice(1);

    let findSameName = transactionData.find((o) => o.name === payload.name);
    if (!findSameName) {
      if (Math.sign(payload.price) < 0 || Math.sign(payload.quantity) < 0) {
        setAlert({
          message: "Price and quantity cannot be in negative value",
          status: "warning",
          isOpen: true,
        });
      } else {
        fetch(transactionAPI + `/${props.type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(() => {
            setIsLoading(true);
            setAlert({
              message: "Success adding new product",
              status: "info",
              isOpen: true,
            });
            setAddOpen(false);
            setRefresh(true);
            setCardImage("");
            props.reset();
          })
          .catch(() => {
            setAlert({
              message: "Saving data unsuccessful",
              status: "warning",
              isOpen: true,
            });
          });
      }
    } else {
      setAlert({
        message: "Name is already used",
        status: "warning",
        isOpen: true,
      });
    }
  };

  const checkPokémonImage = () => {
    let payload = normalizeFormData();
    let pokemonName = payload.name.toLowerCase();

    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
    })
      .then(function (response) {
        let other = response.data.sprites.other;
        let official = Object.values(other)[0];
        setCardImage(official.front_default);
      })
      .catch(() => {
        setAlert({
          message: "Pokémon with this name cannot be found",
          status: "warning",
          isOpen: true,
        });
        setCardImage("");
      });
  };

  return (
    <StyledModal
      onClose={() => setAddOpen(false)}
      onOpen={() => setAddOpen(true)}
      open={addOpen}
      trigger={<Button primary>Add Product</Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <h3>Add New Card Product</h3>
          <p>
            Add some information for the Pokémon card you want to {props.type}
          </p>
          <Image src={cardImage ? cardImage : PlaceholderImage} height="150" />
          <Form.Field>
            <Label>Pokémon Name</Label>
            <Field
              component={Input}
              action={{
                content: "Check",
                onClick: () => checkPokémonImage(),
              }}
              name="name"
              placeholder="Pokémon Name"
            />
          </Form.Field>
          <Form.Field>
            <Label>Price</Label>
            <Field
              component={Input}
              label="Rp"
              name="price"
              placeholder="Price"
              type="number"
              min="0"
            />
          </Form.Field>
          <Form.Field>
            <Label>Quantity</Label>
            <Field
              component={Input}
              name="quantity"
              placeholder="Quantity"
              type="number"
              min="0"
            />
          </Form.Field>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setAddOpen(false)}>Cancel</Button>
        <Button content="Save" onClick={() => addTransaction()} primary />
      </Modal.Actions>
    </StyledModal>
  );
};
