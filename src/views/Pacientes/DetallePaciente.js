import React from 'react'
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import { makeStyles } from '@material-ui/core/styles';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

const DetallePaciente = () => {

    const classes = useStyles();

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color='primary'>
                            <h4 className={classes.cardTitleWhite}>Datos del Paciente</h4>
                            <p className={classes.cardCategoryWhite}>
                                Datos:
                            </p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>

                </GridItem>
            </GridContainer>
        </div>
    )
}

export default DetallePaciente
