import { Fragment, useState, useEffect } from "react";
import { Loader, Grid, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Snackbar from "../../components/Snackbar";
import { TransactionAdd } from "./TransactionAdd";
import { TransactionTable } from "./TransactionTable";
import SearchFilter from "../../components/Search";
import DefaultPagination from "../../components/Pagination";

const Transaction = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    status: "",
    isOpen: false,
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const [pageOptions, setPageOptions] = useState({
    activePage: 1,
    totalPages: 1,
  });
  const [initData, setInitData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/${props.type}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInitData(data);
        fetch(`http://localhost:3001/${props.type}?_page=1&_limit=5`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setTransactionData(data);
            setIsLoading(false);
          })
          .catch(() => {
            setAlert({
              message: "Loading data unsuccessful",
              status: "warning",
              isOpen: true,
            });
            setIsLoading(false);
          });
      })
      .catch(() => {
        setAlert({
          message:
            "Server is not running yet. Try running npm run server in different terminal",
          status: "warning",
          isOpen: true,
        });
        setIsLoading(false);
      });
  }, [props]);

  useEffect(() => {
    if (initData) {
      const totalPage = Math.ceil(initData.length / 5);
      setPageOptions({
        ...pageOptions,
        totalPages: totalPage,
      });
      setInitData();
    }
  }, [initData, pageOptions]);

  useEffect(() => {
    if (refresh === true) {
      fetch(`http://localhost:3001/${props.type}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const totalPage = Math.ceil(data.length / 5);
          setPageOptions({
            ...pageOptions,
            totalPages: totalPage,
          });
          fetch(
            `http://localhost:3001/${props.type}?_page=${params.page}&_limit=5`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setTransactionData(data);
              setRefresh(false);
              setIsLoading(false);
            })
            .catch(() => {
              setAlert({
                message: "Loading data unsuccessful",
                status: "warning",
                isOpen: true,
              });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setAlert({
            message: "Loading data unsuccessful",
            status: "warning",
            isOpen: true,
          });
          setIsLoading(false);
        });
    }
  }, [refresh, props, params, pageOptions]);

  const getTransactionSearch = (param, search) => {
    let url = "";
    if (param && param.page > 0) {
      setPageOptions({
        ...pageOptions,
        activePage: param.page,
      });
    }
    setParams(
      param ? { ...params, ...param } : { page: 1, limit: params.limit }
    );
    if (param.page) {
      if (param.q) {
        url = `http://localhost:3001/${props.type}?_page=${param.page}&_limit=${params.limit}&q=${param.q}`;
      } else {
        if (search) {
          fetch(`http://localhost:3001/${props.type}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const totalPage = Math.ceil(data.length / 5);
              setPageOptions({
                ...pageOptions,
                totalPages: totalPage,
              });
            })
            .catch(() => {
              setAlert({
                message: "Loading data unsuccessful",
                status: "warning",
                isOpen: true,
              });
              setIsLoading(false);
            });
        }

        url = `http://localhost:3001/${props.type}?_page=${param.page}&_limit=${params.limit}`;
      }
    }
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactionData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setAlert({
          message: "Loading data unsuccessful",
          status: "warning",
          isOpen: true,
        });
        setIsLoading(false);
      });
  };

  const paginationChange = (_, value) => {
    const page = value.activePage;
    setPageOptions({ ...pageOptions, activePage: value.activePage });

    getTransactionSearch({
      ...params,
      page,
    });
  };

  const normalizeFormData = () => {
    const { formData } = props;
    let payload = { ...formData.values };
    return payload;
  };

  const handleAlert = (data) => {
    if (data?.isOpen) {
      setAlert(data);
    } else {
      setTimeout(() => {
        setAlert(data);
      }, 6000);
    }
  };

  return (
    <Fragment>
      {alert.isOpen && (
        <Snackbar
          onCloseAlert={handleAlert}
          alert={alert}
          animation="fly down"
          duration={1000}
        />
      )}
      <h2>
        Pokémon Cards to{" "}
        <span style={{ textTransform: "capitalize" }}>{props.type}</span>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchFilter onGetList={getTransactionSearch} />

        <TransactionAdd
          props={props}
          transactionData={transactionData}
          setIsLoading={setIsLoading}
          setAlert={setAlert}
          setRefresh={setRefresh}
          normalizeFormData={normalizeFormData}
        />
      </div>
      <br />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <TransactionTable
            props={props}
            transactionData={transactionData}
            setIsLoading={setIsLoading}
            setAlert={setAlert}
            setRefresh={setRefresh}
          />
          {pageOptions && pageOptions.totalPages > 0 && (
            <DefaultPagination
              activePage={pageOptions.activePage}
              totalPages={pageOptions.totalPages}
              onPageChange={paginationChange}
            />
          )}
        </Grid>
      )}
    </Fragment>
  );
};

const createData = reduxForm({
  form: "createData",
  asyncBlurFields: [],
});

function mapStateToProps(state) {
  return {
    formData: state.form.createData,
  };
}

export default connect(mapStateToProps)(createData(Transaction));
