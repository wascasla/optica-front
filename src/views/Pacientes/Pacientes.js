import React, { useState } from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Tasks from 'components/Tasks/Tasks.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import InputLabel from '@material-ui/core/InputLabel';
// core components

import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';

import CardAvatar from 'components/Card/CardAvatar.js';

import { bugs, website, server } from 'variables/general.js';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from 'variables/charts.js';

import TextField from '@material-ui/core/TextField';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Pacientes() {
  const classes = useStyles();

  const [pacientes, setPacientes] = useState([])

  const [busqueda, setBusqueda] = useState({
    dni: '',
    nombre: '',
    apellido: ''
  });


  const leerDatosBusqueda = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
    console.log(busqueda);
  };

  const buscarPaciente = async (e) => {
    e.preventDefault();
    setPacientes([]);

    //obtener los productos de la busqueda
    if (busqueda.dni) {
      var pacientensEncontrados = [];
      const resultadoBusqueda = await clienteAxios.post(`/personas/busqueda/dni`, busqueda);
      console.log(resultadoBusqueda.data);
      if (resultadoBusqueda.data) {
        pacientensEncontrados.push(resultadoBusqueda.data)
        console.log(pacientensEncontrados);
        setPacientes(pacientensEncontrados);
      } else {
        console.log("No existen pacientes con ese dni")
      }

    } else {
      if (busqueda.nombre || busqueda.apellido) {
        const resultadoBusqueda = await clienteAxios.post(`/personas/busqueda/nombre`, busqueda);
        console.log(resultadoBusqueda.data);
        //pacientensEncontrados.push(resultadoBusqueda.data)
        if (resultadoBusqueda.data) {
          setPacientes(resultadoBusqueda.data);
        } else {
          console.log("No existen pacientes con ese nombre y/o apellido")
        }

      } else {
        console.log("debe agregar un parametro de busqueda");
      }

    }




    // si no hay resultados enviar una alerta, contrario agregarlo al state
    /*if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      //agregar la llave prodcuto (copia id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      //ponerlo en el state
      setProductos([...productos, productoResultado]);


    } else {
      //no hay resultados
      Swal.fire({
        icon: 'error',
        title: 'Sin Resultados',
        text: 'No hay resultados',
      });
  }*/

  };

  return (
    <div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Button variant="contained" component={Link} to={'/admin/paciente/nuevo'} color="primary">
            Agregar Nuevo Paciente
          </Button>
          <form onSubmit={buscarPaciente}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Buscar Paciente</h4>
                <p className={classes.cardCategoryWhite}>
                  Ingrese algnos de los siguientes campos:
              </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id="outlined-number"
                      label="Dni"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="dni"
                      onChange={leerDatosBusqueda}
                    />


                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="outlined-number"
                      label="Nombre"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="nombre"
                      onChange={leerDatosBusqueda}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      id="outlined-number"
                      label="Apellido"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="apellido"
                      onChange={leerDatosBusqueda}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color='primary' onClick={buscarPaciente}>Buscar</Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>

        {pacientes.length > 0 ?
          (<GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Pacientes</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a subtitle for this table
              </p>
              </CardHeader>
              <CardBody>
                <Table
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Dni</TableCell>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Apellido</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pacientes.map((paciente) => (
                      <TableRow key={paciente._id}>
                        <TableCell align="right">
                          {paciente.dni}
                        </TableCell>
                        <TableCell align="right">{paciente.nombre}</TableCell>
                        <TableCell align="right">{paciente.apellido}</TableCell>
                        <TableCell align="right">
                          <Button component={Link} to={'/admin/paciente/detalle'} color="primary">
                            Detalle
                          </Button>
                          <Button component={Link} to={`/admin/paciente/editar/${paciente._id}`} color="primary">
                            Editar
                          </Button>

                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>)
          : null}
      </GridContainer>
    </div>
  );
}


