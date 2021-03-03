import React from "react";
import {Network} from "./network";
import {API} from "./constants/api";

import TableView from "./components/Table";
import ModalAddConfig from "./components/ModalAddConfig";
import ModalAddNamespace from "./components/ModalAddNamespace";
import AutoCompleteMultiDropdown from "./components/AutoCompleteMultiDropdown";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import NextStep from "./components/NextSteps";
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {isObjectEmpty} from "./utils/is_empty";

const App = () => {
  const classes = useStyles();
  const [nodeTypes, setNodeTypes] = React.useState([]);
  const [nodeType, setNodeType] = React.useState("");

  const [nodeIds, setNodeIds] = React.useState([]);
  const [nodeId, setNodeId] = React.useState("");

  const [namespaces, setNamespaces] = React.useState([]);
  const [namespace, setNamespace] = React.useState("");

  const [properties, setProperties] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  ///Active Step & Completed Step
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  ///Edit Property
  const [openEdit, setOpenEdit] = React.useState(false);
  const [activeProperty, setActiveProperty] = React.useState({});

  /// Add Namespace
  const [openNamespace, setOpenNamespace] = React.useState(false);
  const handleClickOpenNamespace = (property: any) => {
    setOpenNamespace(true);
  };
  const handleCloseNamespace = () => {
    setOpenNamespace(false);
  };
  const handleClickOpenEdit = (property: any) => {
    setActiveProperty(property);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  ///GET Node Type
  React.useEffect(() => {
    Network.get(API.NODE_TYPE).then((response: any) => {
      setNodeTypes(response.data.data);
    });
    //reset other
    setNodeId("");
    setNodeIds([]);
    setNamespace("");
    setNamespaces([]);
    setActiveStep(0);
  }, []);

  ///GET Node IDs
  React.useEffect(() => {
    if (nodeType)
      Network.get(API.NODE_IDS(nodeType)).then((response: any) => {
        setNodeIds(response.data.data);
      });
    //reset other
    setNodeId("");
    setNamespace("");
    setNamespaces([]);
    setActiveStep(1);
    setCompleted(0);
  }, [nodeType]);

  ///GET NAMESPACE
  React.useEffect(() => {
    fetchNamespace();
  }, [nodeId]);

  ///GET PROPERTIES
  const fetchProperties = () => {
    if (nodeType && nodeId?.length > 0 && namespace) {
      Network.get(API.GET_PROPERTIES(nodeType, nodeId, namespace)).then(
          (response: any) => {
            setProperties(response.data.data);
            setCompleted(3);
          }
      );
    }
  };

  ///GET PROPERTIES
  const fetchNamespace = () => {
    if (nodeType && nodeId?.length > 0) {
      Network.post(API.NAMESPACE, {
        nodeType: nodeType,
        nodeIds: Array.isArray(nodeId) ? nodeId : [nodeId]
      }).then((response: any) => {
        setNamespaces(response?.data?.data);
      });
    }
    setNamespace("");
    setActiveStep(2);
    setCompleted(1);
  };
  React.useEffect(() => {
    fetchProperties();
  }, [namespace]);

  ///Create Table Data
  React.useEffect(() => {
    let tableDataX = [];
    for (let key in properties) {
      if (properties.hasOwnProperty(key)) {
        let value: string = properties[key];
        value = JSON.stringify(value);
        tableDataX.push(createData(key, value));
      }
    }
    // @ts-ignore
    setTableData(tableDataX);
  }, [properties]);

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h5" color="inherit">
              Property Graph
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="center">
          <div style={{width: "80%", marginTop: 16}}>
            <NextStep
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                completed={completed}
                setCompleted={setCompleted}
            />
          </div>
        </Box>
        <div style={{padding: 24}}>
          <Box display="flex" justifyContent="space-between">
            <AutoCompleteMultiDropdown
                title={"Node Type"}
                data={nodeTypes}
                value={nodeType}
                setValue={setNodeType}
            />
            <AutoCompleteMultiDropdown
                multiple={false}
                title={"Node ID"}
                data={nodeIds}
                value={nodeId}
                setValue={setNodeId}
            />
            <AutoCompleteMultiDropdown
                title={"Namespace"}
                data={namespaces}
                value={namespace}
                setValue={setNamespace}
            />
          </Box>
        </div>

        {nodeType && nodeId?.length > 0 && (
            <Box
                display="flex"
                justifyContent="flex-end"
                style={{marginTop: 24, marginLeft: 24}}
            >
              {namespace && (
                  <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      startIcon={<AddIcon/>}
                      onClick={() => handleClickOpenEdit(null)}
                  >
                    Add Property
                  </Button>
              )}
              <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddIcon/>}
                  onClick={() => setOpenNamespace(!openNamespace)}
                  style={{marginRight: 24}}
              >
                Add Namespace
              </Button>
            </Box>
        )}
        {tableData && tableData?.length > 0 && (
            <div style={{padding: 24}}>
              <TableView
                  onEdit={(property: any) => {
                    handleClickOpenEdit(property);
                  }}
                  rows={tableData}
                  onDelete={(listOfProperty: any) => {
                    // console.warn("**** Deleting ****", listOfProperty);
                    let properties: any = {};
                    listOfProperty.forEach(
                        (property: { name: string; property_value: any }) => {
                          properties[property.name] = property.property_value;
                        }
                    );
                    Network.post(API.MODIFY, {
                      isDelete: true,
                      namespace,
                      nodeIds: Array.isArray(nodeId) ? nodeId : [nodeId],
                      nodeType,
                      properties
                    }).then((response: any) => {
                      if (response.status === 200) {
                        fetchProperties();
                      }
                    });
                  }}
              />
            </div>
        )}
        {!isObjectEmpty(activeProperty) && (
            <ModalAddConfig
                title={activeProperty ? "Update Property" : "Add New Property"}
                hint={"Property Key"}
                hint2={"Property Value"}
                property={activeProperty}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleClose={handleCloseEdit}
                onSave={(value: { name: string; property_value: any }) => {
                  let config: any = {};
                  config[value.name] = value.property_value;
                  Network.post(API.MODIFY, {
                    namespace: namespace,
                    nodeIds: Array.isArray(nodeId) ? nodeId : [nodeId],
                    nodeType: nodeType,
                    properties: config
                  }).then((response: any) => {
                    if (response?.status === 200) {
                      fetchProperties();
                    }
                  });
                }}
            />
        )}
        {openNamespace && (
            <ModalAddNamespace
                title={"Add New Namespace"}
                hint={"Type Namespace"}
                open={openNamespace}
                handleClickOpen={handleClickOpenNamespace}
                handleClose={handleCloseNamespace}
                onSave={(value: any) => {
                  Network.post(API.NAMESPACE_ADD, {
                    namespace: value,
                    nodeIds: Array.isArray(nodeId) ? nodeId : [nodeId],
                    nodeType: nodeType
                  }).then((response: any) => {
                    if (response?.status === 200) {
                      fetchNamespace();
                    }
                  });
                }}
            />
        )}
      </div>
  );
};

function createData(name: string, property_value: string) {
  return {name, property_value};
}

export default App;
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}));
