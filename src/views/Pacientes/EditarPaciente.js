import React, { useState, useEffect } from 'react'
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import { makeStyles } from '@material-ui/core/styles';
import CardBody from 'components/Card/CardBody.js';
import TextField from '@material-ui/core/TextField';
import CustomInput from "components/CustomInput/CustomInput.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Swal from 'sweetalert2';

//import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
//import clienteAxios from '../../config/axios';
import clienteAxios from 'config/axios'
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
    const { idPersona } = props.match.params;

    // paciente = state, y funcion para actualizar
    const [paciente, setPaciente] = useState({

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
        persona: null
    });

    // paciente = state, y funcion para actualizar
    const [persona, setPersona] = useState({
        dni: "",
        cuil: "",
        nombre: "",
        apellido: "",
        email: "",
        fechaNacimiento: "",
        telefono: "",
        localidad: null,
        direccion: ""
    });

    const [localidades, setlocalidades] = useState([])
    const [value, setValue] = useState()

    // consultar la api para traer el prodcuto a editar



    // cuando el componente carga
    useEffect(() => {

        const getLocalidades = async () => {
            const resultado = await clienteAxios.get('/localidades');
            console.log(resultado.data);
            setlocalidades(resultado.data)
            console.log("object")
        }

        const consultarAPI = async () => {
            //console.log("hola")
            //console.log(idPaciente)
            const pacienteConsulta = await clienteAxios.get(`/pacientes/busqueda/Persona/${idPersona}`);
            console.log(pacienteConsulta.data)
            const datos = pacienteConsulta.data
            setPersona(pacienteConsulta.data.persona);
            setPaciente(pacienteConsulta.data)

        };



        getLocalidades();

        consultarAPI();
    }, []);

    const actualizarPaciente = async (e) => {
        e.preventDefault();
        //Destructuring
        const { dni, nombre, apellido } = persona;
        //console.log(paciente)


        //revisar que las propiedades del state tengan contenido
        if (nombre.length > 0 || apellido.length > 0 || dni.length > 0) {

            setPaciente({ ...paciente, persona: persona });
            // almacenarlo en la BD
            try {

                const res = await clienteAxios.put(`/pacientes/${paciente._id}`, paciente);
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
                                title: 'Hubo un error al alctualizar un  paciente',
                                text: " Ya existe un paciente con esos valores  " + res.data.errmsg,
                            });
                        } else {
                            //limpiarStatePaciente()
                            Swal.fire('Actualizado Correctamente', res.data.mensaje, 'success');
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
                    title: 'Hubo un error',
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
    }

    const leerDatosBusquedaPersona = (e) => {
        //setPaciente(...paciente);
        setPersona({ ...persona, [e.target.name]: e.target.value });
        //console.log(paciente);
    };

    const leerDatosBusquedaPaciente = (e) => {
        //setPaciente(...paciente);
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
        //console.log(paciente);
    };

    const guadarLocalidad = (value) => {
        if (value) {
            persona.localidad = value._id
        } else {
            persona.localidad = ""
        }

    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form onSubmit={actualizarPaciente}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Editar Paciente</h4>
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
                                                onChange: (leerDatosBusquedaPersona),
                                                required: true,
                                                value: persona.dni
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
                                                onChange: (leerDatosBusquedaPersona),
                                                required: true,
                                                value: persona.nombre
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
                                                onChange: (leerDatosBusquedaPersona),
                                                required: true,
                                                value: persona.apellido
                                            }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
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
                                                onChange: (leerDatosBusquedaPersona),
                                                value: (persona.fechaNacimiento).substring(0, 10)
                                            }}
                                            labelProps={{
                                                shrink: true,
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
                                                onChange: (leerDatosBusquedaPersona),
                                                value: persona.cuil
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
                                                onChange: (leerDatosBusquedaPersona),
                                                value: persona.email
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
                                                onChange: (leerDatosBusquedaPersona),
                                                value: persona.telefono
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
                                                onChange: (leerDatosBusquedaPersona),
                                                value: persona.direccion
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
                                                value: (paciente.fechaUltimaConsulta !== null ? (paciente.fechaUltimaConsulta).substring(0, 10) : "")
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
                                                value: paciente.observacion
                                            }} />
                                    </GridItem>
                                </GridContainer>
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
                                                required: false,
                                                value: paciente.telefonoTutor
                                            }} />
                                    </GridItem>
                                </GridContainer>
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
                                                required: false,
                                                value: paciente.telefonoAcompanante
                                            }} />
                                    </GridItem>
                                </GridContainer>
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
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
                                                onChange: (leerDatosBusquedaPaciente),
                                                required: false,
                                                value: paciente.numeroAfiliado
                                            }} />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                {<Button color="primary" type="submit" >Guardar</Button>}

                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default EditarPaciente
