//Importamos librerias de react y demas...
import {useState,useEffect} from 'react';
import * as React from 'react';
import { Grid } from '@mui/material';
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@mui/material";

//Importar estilo
import './loader.css';
import axios from 'axios';

//Importar loremIpsum
import {loremIpsum} from "lorem-ipsum";

//Declaracion de funcion que exportaremos a "App"
export default function LoaderDogs(){
    //HOOKS
    const [disable,setDisable] = useState(false);   //Habilitar/deshabilitar botones
    const [nombre,setNombre] = useState("");        //Guarda el nombre random en el hook
    const [nombreAceptados,setNombreAceptados] = useState([]);  //Array de nombres aceptados
    const [nombreRechazados, setNombreRechazados] = useState([]);//Array de nombres rechazados
    const [listado,setListado] = useState([]);      //Lista donde guardamos las peticiones de la api dogs
    const [listaAceptados,setListaAceptados] = useState([]);//Lista perros aceptados
    const [listaRechazados,setListaRechazados] = useState([]);// Lista perros rechazados.
    //Use effect para conectarnos a la api a traves de axios. (abriendo por primera vez)
    useEffect(() => {
        setDisable(true);
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setListado(res.data.message); //guardamos el enlace de la imagen en el hook
            //Funcion "asincrona" espera 1 segundo para habilitar el boton y generar el nombre
            setTimeout(() => {
                setDisable(false);
                setNombre(cadenaAleatoria());
            }, 1000);
        });
    }, []);
    //llamar a nuevo perro al aceptar o rechazar
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
    //Funcion para aceptar un perro nuevo
    const aceptar = (itemExterno,nombreExterno) =>{
        //seteamos datos obtenidos del perro candidato de la pagina
        setListaAceptados((listaAceptados) => [...listaAceptados,itemExterno]);
        setNombreAceptados((nombreAceptados) => [...nombreAceptados,nombreExterno]);
        llamarPerro(); //llamamos a otro perro
        console.log(listaAceptados); //console log para ver el array
    }
    //Funcion para rechazar un perro
    const rechazar = (itemExterno,nombreExterno) => {
        //Lo mismo que aceptar solo que seteamos en rechazados
        setListaRechazados((listaRechazados) => [...listaRechazados,itemExterno]);
        setNombreRechazados((nombreRechazados) => [...nombreRechazados,nombreExterno]);
        llamarPerro(); //llamamos a otro perro
        console.log(listaRechazados); //console log
    }
    //Mover de rechazados a aceptados
    const mover_a_aceptados = (itemExterno,nombreExterno,key) =>{ //message, nombre, id(array)
        //setea los valores en la nueva lista (aceptados)
        setListaAceptados((listaAceptados) => [...listaAceptados,itemExterno]);
        setNombreAceptados((nombreAceptados) => [...nombreAceptados, nombreExterno]);
        // delete listaRechazados[key];
        // delete nombreRechazados[key];
        //borramos de la lista anterior (rechazados)
        //PENDIENTE -> ERROR DE ELIMINACION
        listaRechazados.splice(key);
        nombreRechazados.splice(key);
    }
    //Mover de aceptados a rechazados
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
    //Lo que devolvemos a "APP"
    return(
        //Retornamos una tarjeta.
        <div className="Contenedor">
            <h1>Tinder Dogs</h1> {/* Titulo del grid */}
            {/* ACEPTADOS */}
            <Grid container spacing={0.5}>
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
                {/* CANDIDATO */}
                <Grid item xs={6} md={4}>
                    <h1>Candidato</h1>
                    <div className='Contenedor'>
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
                {/* RECHAZADOS */}
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
            </Grid>
        </div>
    )
}