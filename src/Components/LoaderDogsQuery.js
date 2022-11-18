//Importar librerias de react y demas
import {Card,CardActions,CardContent,CardMedia,Button,Typography,Grid} from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';

//Importar estilo propio
import './loader.css';

//Funciones del componente
const fetchDogs = () =>{
    return axios.get('');
}
