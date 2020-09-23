import React, { useState, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import TextField from '@material-ui/core/TextField';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from 'components/Loading/Loading';

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



const NuevoPaciente = () => {

    const [cargando, setcargando] = useState(false);

    const [paciente, setPaciente] = useState({
        dni: "",
        cuil: "",
        nombre: "",
        apellido: "",
        email: "",
        fechaNacimiento: "",
        telefono: "",
        localidad: null,
        direccion: "",
        fichero: "",
        fechaUltimaConsulta: "",
        medicoUltimaConsulta: "",
        observacion: "",
        nombreTutor: "",
        telefonoTutor: "",
        nombreAcompanante: "",
        telefonoAcompanante: "",
        obraSocial: "",
        planObraSocial: "",
        numeroAfiliado: "",
        legajo: "",
    });

    const [localidades, setlocalidades] = useState([])

    const [edad, setEdad] = useState(0)

    useEffect(() => {

        const getLocalidades = async () => {
            const resultado = await clienteAxios.get('/localidades');
            console.log(resultado.data);
            setlocalidades(resultado.data)
        }

        getLocalidades();

    }, [])

    const leerDatosBusqueda = (e) => {
        //setPaciente(...paciente);
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
        if (e.target.name === "fechaNacimiento") {
            getEdad(e.target.value)
        }
    };

    const classes = useStyles();

    const ver = (e) => {
        e.preventDefault();
    }

    // agregar nuevo paciente a la BD
    const agregarPaciente = async (e) => {
        e.preventDefault();
        //Destructuring
        const { dni, nombre, apellido, localidad } = paciente;
        setcargando(true);



        //revisar que las propiedades del state tengan contenido
        if (nombre.length > 0 || apellido.length > 0 || dni.length > 0) {
            // almacenarlo en la BD
            try {

                const res = await clienteAxios.post(`/pacientes`, paciente);
                //lanzar una alerta
                if (res.status === 200) {
                    if (res.data.errors) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: res.data.message,
                        });
                    } else {
                        if (res.data.code === 11000) {
                            console.log(res.data);
                            Swal.fire({
                                icon: 'error',
                                title: 'Hubo un error al agregar un nuevo paciente',
                                text: " Ya existe un paciente con esos valores  " + res.data.errmsg,
                            });
                        } else {
                            limpiarStatePaciente()
                            Swal.fire('Agregado Correctamente', res.data.mensaje, 'success');
                            console.log(res.data);
                            //redireccionar
                            //history.push('/productos');

                        }
                    }

                } else {
                    console.log(res.data);
                    // lanzar la alerta
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: res.data.message,
                    });
                }
            } catch (error) {
                console.log(error);
                // lanzar la alerta
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error en el Servidor',
                    text: error.message,
                });
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Falta completar algunos datos',
            });
        }

        setcargando(false);
    };

    const guadarLocalidad = (value) => {
        if (value) {
            paciente.localidad = value._id
        } else {
            paciente.localidad = ""
        }

    }

    const limpiarStatePaciente = () => {

        setPaciente({
            dni: "",
            cuil: "",
            nombre: "",
            apellido: "",
            email: "",
            fechaNacimiento: "",
            telefono: "",
            localidad: null,
            direccion: "",
            fichero: "",
            fechaUltimaConsulta: "",
            medicoUltimaConsulta: "",
            observacion: "",
            nombreTutor: "",
            telefonoTutor: "",
            nombreAcompanante: "",
            telefonoAcompanante: "",
            obraSocial: "",
            planObraSocial: "",
            numeroAfiliado: "",
            legajo: "",
        });
    }

    const getEdad = (fechaNacimiento) => {
        var years = new Date(new Date() - new Date(fechaNacimiento)).getFullYear() - 1970;
        setEdad(years)
    }

    return (
        <div>

            {
                cargando ? <Loading /> : null
            }

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form onSubmit={agregarPaciente}>
                            <CardHeader color="success">
                                <h4 className={classes.cardTitleWhite}>Agregar Nuevo Paciente</h4>
                                <p className={classes.cardCategoryWhite}>Completar los campos</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                            labelText="Documento"
                                            id="documento"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "dni",
                                                type: "number",
                                                onChange: (leerDatosBusqueda),
                                                required: true,
                                                value: paciente.dni
                                            }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Nombres"
                                            id="nombre"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "nombre",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                required: true,
                                                value: paciente.nombre
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Apellido"
                                            id="apellido"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "apellido",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                required: true,
                                                value: paciente.apellido
                                            }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <CustomInput
                                            labelText="Fecha Nacimiento"
                                            id="fechaNacimiento"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "fechaNacimiento",
                                                type: "date",
                                                required: true,
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.fechaNacimiento
                                            }}
                                            labelProps={{
                                                shrink: true,
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={1}>
                                        <CustomInput
                                            labelText="Edad"
                                            id="edad"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: true,
                                                name: "edad",
                                                type: "text",
                                                value: edad
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="CUIL"
                                            id="cuil"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "cuil",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.cuil
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="E-mail"
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "email",
                                                type: "email",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.email
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Telefono"
                                            id="telefono"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "telefono",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.telefono
                                            }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>


                                    <GridItem xs={12} sm={12} md={4}>

                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={localidades}
                                            getOptionLabel={(option) => option.nombre + " - " + option.provincia.nombre}
                                            style={{ width: 300 }}
                                            onChange={(event, value) => guadarLocalidad(value)}
                                            renderInput={(params) => <TextField {...params} label="Localidad"
                                                name="localidad"
                                                type="text"

                                            />}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Direccion"
                                            id="direccion"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "direccion",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.direccion
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <CustomInput
                                            labelText="Fichero"
                                            id="fichero"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "fichero",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.fichero
                                            }} />


                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Fecha Ultima Consulta"
                                            id="fechaUltimaConsulta"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "fechaUltimaConsulta",
                                                type: "date",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.fechaUltimaConsulta
                                            }}
                                            labelProps={{
                                                shrink: true,
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Medico Ultima Consulta"
                                            id="medicoUltimaConsulta"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "medicoUltimaConsulta",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.medicoUltimaConsulta
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <CustomInput
                                            labelText="Observacion"
                                            id="observacion"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "observacion",
                                                type: "text",
                                                multiline: true,
                                                rows: 3,
                                                onChange: (leerDatosBusqueda),
                                                value: paciente.observacion
                                            }} />
                                    </GridItem>
                                </GridContainer>

                                {/* mostrar si es menor a 18 años */}
                                {(edad < 18 && edad !== 0) ?
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>

                                            <CustomInput
                                                labelText="Tutor"
                                                id="nombreTutor"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: false,
                                                    name: "nombreTutor",
                                                    type: "text",
                                                    onChange: (leerDatosBusqueda),
                                                    required: false,
                                                    value: paciente.nombreTutor
                                                }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>

                                            <CustomInput
                                                labelText="Telefono Tutor"
                                                id="telefonoTutor"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: false,
                                                    name: "telefonoTutor",
                                                    type: "text",
                                                    onChange: (leerDatosBusqueda),
                                                    required: false,
                                                    value: paciente.telefonoTutor
                                                }} />
                                        </GridItem>
                                    </GridContainer>
                                    : null}

                                {/* mostrar si es mayor a 65 años */}
                                {(edad > 65 && edad !== 0) ?
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>

                                            <CustomInput
                                                labelText="Acompañante"
                                                id="nombreAcompanante"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: false,
                                                    name: "nombreAcompanante",
                                                    type: "text",
                                                    onChange: (leerDatosBusqueda),
                                                    required: false,
                                                    value: paciente.nombreAcompanante
                                                }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>

                                            <CustomInput
                                                labelText="Telefono Acompañante"
                                                id="telefonoAcompanante"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: false,
                                                    name: "telefonoAcompanante",
                                                    type: "text",
                                                    onChange: (leerDatosBusqueda),
                                                    required: false,
                                                    value: paciente.telefonoAcompanante
                                                }} />
                                        </GridItem>
                                    </GridContainer>
                                    : null}

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Obra Social"
                                            id="obraSocial"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "obraSocial",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                required: false,
                                                value: paciente.obraSocial
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Plan Obra Social"
                                            id="planObraSocial"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "planObraSocial",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                required: false,
                                                value: paciente.planObraSocial
                                            }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Afiliado N°"
                                            id="numeroAfiliado"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                disabled: false,
                                                name: "numeroAfiliado",
                                                type: "text",
                                                onChange: (leerDatosBusqueda),
                                                required: false,
                                                value: paciente.numeroAfiliado
                                            }} />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                {<Button color="info" type="submit" >Guardar</Button>}
                                <Button color="info" onClick={() => limpiarStatePaciente()} type="button" >Cancelar</Button>

                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default NuevoPaciente;