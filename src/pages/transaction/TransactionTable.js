import { useState } from "react";
import { Button, Modal, Image, Grid } from "semantic-ui-react";

import { StyledLine, StyledContent, StyledMessage } from "./index.style";
import { TransactionUpdate } from "./TransactionUpdate";

export const TransactionTable = ({
  props,
  transactionData,
  setIsLoading,
  setAlert,
  setRefresh,
  transactionAPI,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteTransaction = (itemId) => {
    fetch(transactionAPI + `/${props.type}/` + itemId, {
      method: "DELETE",
    })
      .then(() => {
        setIsLoading(true);
        setAlert({
          message: "Delete successful",
          status: "info",
          isOpen: true,
        });
        setDeleteOpen({ [itemId]: false });
        setRefresh(true);
      })
      .catch(() => {
        setAlert({
          message: "Deleting data unsuccessful",
          status: "warning",
          isOpen: true,
        });
      });
  };

  return (
    <Grid style={{ width: "100%" }}>
      <Grid.Row>
        <Grid.Column width="3">Pokémon Name</Grid.Column>
        <Grid.Column width="4">Pokémon Image</Grid.Column>
        <Grid.Column width="3">Price</Grid.Column>
        <Grid.Column width="2">Quantity</Grid.Column>
        <Grid.Column width="4">Action</Grid.Column>
      </Grid.Row>
      <StyledLine>
        <Grid.Column width="16">
          <hr />
        </Grid.Column>
      </StyledLine>
      {transactionData.length > 0 ? (
        transactionData.map((item) => {
          return (
            <StyledContent key={transactionData.indexOf(item)}>
              <Grid.Column width="3">{item.name}</Grid.Column>
              <Grid.Column width="4">
                <Image src={item.image} height="80" />
              </Grid.Column>
              <Grid.Column width="3">
                {item.price && `Rp${item.price.toLocaleString("id-ID")}`}
              </Grid.Column>
              <Grid.Column width="2">{item.quantity}</Grid.Column>
              <Grid.Column width="4">
                <TransactionUpdate
                  props={props}
                  transactionData={transactionData}
                  itemData={item}
                  setIsLoading={setIsLoading}
                  setAlert={setAlert}
                  setRefresh={setRefresh}
                  transactionAPI={transactionAPI}
                />
                <Modal
                  onClose={() => setDeleteOpen({ [item.id]: false })}
                  onOpen={() => setDeleteOpen({ [item.id]: true })}
                  open={deleteOpen[item.id]}
                  trigger={<Button negative content="Delete" />}
                  style={{ width: "500px" }}
                >
                  <Modal.Content>
                    <Modal.Description>
                      <h3>Are you sure you want to delete this?</h3>
                      <p>This process cannot be undone</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setDeleteOpen({ [item.id]: false })}>
                      Cancel
                    </Button>
                    <Button
                      content="Yes"
                      onClick={() => deleteTransaction(item.id)}
                      primary
                    />
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </StyledContent>
          );
        })
      ) : (
        <StyledMessage>No data</StyledMessage>
      )}
    </Grid>
  );
};
