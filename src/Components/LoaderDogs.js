import {useState,useEffect} from 'react';
import * as React from 'react';
import { Grid } from '@mui/material';
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@mui/material";
//Importar estilo
import './loader.css';
import axios from 'axios';
export default function LoaderDogs(){
    //HOOKS
    const [disable,setDisable] = useState(false);
    const [nombre,setNombre] = useState("");
    const [nombreAceptados,setNombreAceptados] = useState([]);
    const [nombreRechazados, setNombreRechazados] = useState([]);
    const [listado,setListado] = useState([]);
    const [listaAceptados,setListaAceptados] = useState([]);
    const [listaRechazados,setListaRechazados] = useState([]);
    useEffect(() => {
        setDisable(true);
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setListado(res.data.message);
            setTimeout(() => {
                setDisable(false);
                setNombre(cadenaAleatoria());
            }, 1000);
        });
    }, []);
    const llamarPerro = () =>{
        setDisable(true);
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setListado(res.data.message);
            if(res.data.status === "success"){
                setTimeout(() => {
                    setDisable(false);
                    setNombre(cadenaAleatoria());
                }, 1000);
            }
        });
    };
    const aceptar = (itemExterno,nombreExterno) =>{
        setListaAceptados((listaAceptados) => [...listaAceptados,itemExterno]);
        setNombreAceptados((nombreAceptados) => [...nombreAceptados,nombreExterno]);
        llamarPerro();
        console.log(listaAceptados);
    }
    const rechazar = (itemExterno,nombreExterno) => {
        setListaRechazados((listaRechazados) => [...listaRechazados,itemExterno]);
        setNombreRechazados((nombreRechazados) => [...nombreRechazados,nombreExterno]);
        llamarPerro();
        console.log(listaRechazados);
    }
    const mover_a_aceptados = (itemExterno,nombreExterno,key) =>{
        setListaAceptados((listaAceptados) => [...listaAceptados,itemExterno]);
        setNombreAceptados((nombreAceptados) => [...nombreAceptados, nombreExterno]);
        // delete listaRechazados[key];
        // delete nombreRechazados[key];
        listaRechazados.splice(key);
        nombreRechazados.splice(key);
    }
    const mover_a_rechazados = (itemExterno,nombreExterno,key) => {
        setListaRechazados((listaRechazados) => [...listaRechazados,itemExterno]);
        setNombreRechazados((nombreRechazados) => [...nombreRechazados, nombreExterno]);
        // delete listaRechazados[key];
        // delete nombreRechazados[key];
        listaAceptados.splice(key);
        nombreAceptados.splice(key);
    }
    //Funcion generar nombres aleatorios
    const cadenaAleatoria = () => {
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < 6; i++) {
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
    };
    return(
        <div className="Contenedor">
            <h1>Tinder Dogs</h1>
            <Grid container spacing={0.5}>
                <Grid item xs={6} md={4}>
                    <h1>Rechazados</h1>
                    {/* Stack rechazados */}
                    {listaRechazados.map((element,index) =>(
                        <Card sx={{ maxWidth: 345 , margin: '0px auto'}}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {/* Perro_Name */}
                            {nombreRechazados[index]}
                            </Typography>
                            {/* <img src={dirImg} alt="Imagen de perro procastinado"/> */}
                            <CardMedia
                                component="img"
                                height="300"
                                image={element}
                                alt="dogs"
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>mover_a_aceptados(element,nombreRechazados[index],index)}>Ahora me gusta!</Button>
                        </CardActions>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={6} md={4}>
                    <h1>Candidato</h1>
                    <div className='Contenedor'>
                        {/* <img src={dirImg} alt="Imagen de perro procastinado"/> */}
                        <Card sx={{ maxWidth: 345 , margin: '0px auto'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {/* Perro_Name */}
                            {nombre}
                            </Typography>
                            {/* <img src={dirImg} alt="Imagen de perro procastinado"/> */}
                            <CardMedia
                                component="img"
                                height="300"
                                image={listado}
                                alt="dogs"
                            />
                        </CardContent>
                        <CardActions>
                            <Button disabled={disable} size="small" onClick={() => aceptar(listado,nombre)}>Aceptar</Button>
                            <Button disabled={disable} size="small" onClick={() => rechazar(listado,nombre)}>Rechazar</Button>
                        </CardActions>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={6} md={4}>
                    <h1>Aceptados</h1>
                    {/* Stack aceptados */}
                    {listaAceptados.map((element,index)=>(
                        <Card sx={{ maxWidth: 345 , margin: '0px auto'}}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {/* Perro_Name */}
                            {nombreAceptados[index]}
                            </Typography>
                            {/* <img src={dirImg} alt="Imagen de perro procastinado"/> */}
                            <CardMedia
                                component="img"
                                height="300"
                                image={element}
                                alt="dogs"
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>mover_a_rechazados(element,nombreAceptados[index],index)}>Ahora NO me gusta!</Button>
                        </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}