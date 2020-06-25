import React from 'react'
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import { makeStyles } from '@material-ui/core/styles';
import CardBody from 'components/Card/CardBody.js';
import TextField from '@material-ui/core/TextField';

//import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);



const EditarPaciente = (props) => {

    const classes = useStyles();

    // obtener el ID
    const { id } = props.match.params;

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color='primary'>
                            <h4 className={classes.cardTitleWhite}>Editar Paciente</h4>
                            <p className={classes.cardCategoryWhite}>
                                Cambiar los valores necesarios:
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
                                        fullWidth
                                        className={classes.textField}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        id="outlined-number"
                                        label="Nombre"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        name="nombre"
                                        fullWidth

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        id="outlined-number"
                                        label="Apellido"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        name="apellido"
                                        fullWidth

                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        id="outlined-number"
                                        label="Cuil"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        name="cuil"
                                        fullWidth

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        id="outlined-number"
                                        label="Email"
                                        type="email"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        name="email"
                                        fullWidth

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        id="outlined-number"
                                        label="Fecha Nacimiento"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        name="fechaNacimiento"
                                        fullWidth

                                    />
                                </GridItem>
                            </GridContainer>


                        </CardBody>
                    </Card>

                </GridItem>
            </GridContainer>
        </div>
    )
}

export default EditarPaciente
