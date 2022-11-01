import {useState,useEffect} from 'react';
import * as React from 'react';
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@mui/material";
import axios from 'axios';
//Importar estilo
import './loader.css';

export default function TestLoad(){
    //Hooks
    const [dirImg, setDirImg] = useState(null);
    const [disable,setDisable] = useState(false);
    const [nombre,setNombre] = useState("");
    const [listaAceptados,setListaAceptados] = useState(null);
    const [listaRechazados,setListaRechazados] = useState(null);
    //Conectandonos a la api
    useEffect(() => {
        setDisable(true);
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setDirImg(res.data.message);
            console.log(res.data);
            setNombre(cadenaAleatoria());
            if(res.data.status === "success"){
                setTimeout(() => { setDisable(false)}, 1000);
            }
        });
    }, []);
    //Función para llamar a otro perro
    const llamarPerro = () =>{
        setDisable(true);
        axios("https://dog.ceo/api/breeds/image/random").then(res => {
            setDirImg(res.data.message);
            setNombre(cadenaAleatoria());
            if(res.data.status === "success"){
                setTimeout(() => { setDisable(false)}, 1000);
            }
        });
    };
    //Funcion generar nombres aleatorios
    const cadenaAleatoria = () => {
        const cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < 6; i++) {
            aleatoria += cadena.charAt(Math.floor(Math.random() * cadena.length));
        }
        return aleatoria;
    };

    return(
        <div>
            <Card sx={{ maxWidth: 345 , margin: '0px auto'}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {nombre}
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image={dirImg}
                    alt="dogs"
                />
            </CardContent>
            <CardActions>
                <Button disabled={disable} size="small" onClick={llamarPerro}>Aceptar</Button>
                <Button disabled={disable} size="small" onClick={llamarPerro}>Rechazar</Button>
            </CardActions>
            </Card>
        </div>
    )
}