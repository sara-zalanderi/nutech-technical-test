import { useEffect, useState } from "react";
import { Button, Modal, Form, Label, Input, Image } from "semantic-ui-react";
import axios from "axios";

import { StyledModal } from "./index.style";
import PlaceholderImage from "../../images/placeholder-image.jpg";

export const TransactionUpdate = ({
  props,
  transactionData,
  itemData,
  setIsLoading,
  setAlert,
  setRefresh,
  transactionAPI,
}) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [cardImage, setCardImage] = useState("");
  const [updateItem, setUpdateItem] = useState([]);
  const [nameChanged, setNameChanged] = useState(false);

  useEffect(() => {
    setNameChanged(itemData.name);
  }, [itemData]);

  const updateItemData = (item) => {
    setCardImage(item.image);
    setUpdateItem(item);
  };

  const updateTransaction = (itemId) => {
    let item = updateItem;
    item.price = parseInt(updateItem.price);
    item.quantity = parseInt(updateItem.quantity);
    item.image = cardImage;
    item.name =
      updateItem.name.charAt(0).toUpperCase() + updateItem.name.slice(1);

    let findSameName = transactionData.find((o) => o.name === updateItem.name);
    if (
      findSameName &&
      nameChanged.toLowerCase() !== updateItem.name.toLowerCase()
    ) {
      setAlert({
        message: "Name is already used",
        status: "warning",
        isOpen: true,
      });
    } else {
      if (Math.sign(item.price) < 0 || Math.sign(item.quantity) < 0) {
        setAlert({
          message: "Price and quantity cannot be in negative value",
          status: "warning",
          isOpen: true,
        });
      } else {
        fetch(transactionAPI + `/${props.type}/` + itemId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateItem),
        })
          .then(() => {
            setIsLoading(true);
            setAlert({
              message: "Success updating product",
              status: "info",
              isOpen: true,
            });
            setRefresh(true);
          })
          .catch(() => {
            setUpdateItem({
              ...updateItem,
              price: parseInt(updateItem.price),
              quantity: parseInt(updateItem.quantity),
              image: cardImage,
              name:
                updateItem.name.charAt(0).toUpperCase() +
                updateItem.name.slice(1),
            });
            setAlert({
              message: "Updating data unsuccessful",
              status: "warning",
              isOpen: true,
            });
          });
      }
    }
  };

  const checkPokémonImage = () => {
    let pokemonName = updateItem.name.toLowerCase();

    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
    })
      .then(function (response) {
        let other = response.data.sprites.other;
        let official = Object.values(other)[Object.keys(other).length - 1];
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
      onClose={() => setUpdateOpen(false)}
      onOpen={() => setUpdateOpen(true)}
      open={updateOpen}
      trigger={
        <Button
          positive
          content="Update"
          onClick={() => updateItemData(itemData)}
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <h3>Update Card Product</h3>
          <p>
            Update information for the Pokémon card you want to {props.type}
          </p>
          <Image src={cardImage ? cardImage : PlaceholderImage} height="150" />
          <Form.Field>
            <Label>Pokémon Name</Label>
            <Input
              action={{
                content: "Check",
                onClick: () => checkPokémonImage(),
              }}
              value={updateItem.name}
              placeholder="Pokémon Name"
              onChange={(_, newValue) =>
                setUpdateItem({ ...updateItem, name: newValue.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Label>Price</Label>
            <Input
              label="Rp"
              value={updateItem.price}
              placeholder="Price"
              type="number"
              min="0"
              onChange={(_, newValue) =>
                setUpdateItem({ ...updateItem, price: newValue.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Label>Quantity</Label>
            <Input
              value={updateItem.quantity}
              placeholder="Quantity"
              type="number"
              min="0"
              onChange={(_, newValue) =>
                setUpdateItem({ ...updateItem, quantity: newValue.value })
              }
            />
          </Form.Field>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
        <Button
          content="Save"
          onClick={() => updateTransaction(updateItem.id)}
          primary
        />
      </Modal.Actions>
    </StyledModal>
  );
};
