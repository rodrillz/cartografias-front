import React, { useState } from 'react';
import Error from '../../components/Error';
import axios from 'axios';
import { Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { toast } from 'sonner';

const Contacto = () => {
const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [message, setMessage] = useState('');
const [error, setError] = useState({});
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, name, message].includes('')) {
        setError({
            msg: 'Todos los campos son obligatorios',
            error: true,
        });
        return;
    }
    const partes = name.split(' ').map(x => x.trim());
    if (partes.length < 2) {
        setError({
            msg: 'Por favor, ingrese su nombre y apellido',
            error: true,
        });
        return;
    }
    const [nombre,apellido] = partes;
    //console.log(partes)
    const nombreRegex = /^[A-Za-záéíóúÁÉÍÓÚ]{3,}$/;
    const apellidoRegex = /^[A-Za-záéíóúÁÉÍÓÚ]{3,}$/;

    if (!nombreRegex.test(nombre) || !apellidoRegex.test(apellido)) {
        setError({
            msg: 'Por favor, ingrese un nombre y apellido válidos',
            error: true,
        });
        return;
    }

    if (message.length < 10) {
        setError({
            msg: 'El largo del mensaje debe ser mayor a 10 caracteres',
            error: true,
        });
        return;
    }


    try {
        const { data } = await axios.post(
            `backend`,
            { email, name, message }
        );
        setError({
            msg: 'Mensaje enviado correctamente',
            error: false,
        });
    } catch (e) {
        setError({
            msg: 'El usuario no existe',
            error: true,
        });
    }
};
const { msg } = error;



    return (
        <>
            <div className="py-20 bg-sky-700" style={{position: "relative"}}>
                <Container>
                    <h1 className="text-3xl text-white font-medium text-center my-2 uppercase ">
                        Contacto - Dirección de Cultura, Patrimonio y Extensión
                    </h1>
                </Container>
            </div>
            <div className="bg-fondo_contacto">
                <Container>
                    <div className="flex md:flex-row flex-col md:-mb-96 mb-12 justify-between mt-28 h-screen">
                        <div className="flex flex-col w-full mx-auto">
                            <h1 className="text-2xl font-normal text-left my-2  ">
                                Si usted fue víctima o testigo de algún delito en el período de la dictadura militar y quiere compartir sus vivencias con nosotros, no dude en contactarnos.
                            </h1>
                            <div className="flex justify-between  flex-row mt-12 items-center">
                                <div className="flex flex-col  ">
                                    <p className="  text-left font-bold uppercase ">
                                        Email</p>

                                    <p >direccion.extension@uoh.cl</p>
                                </div>
                                <div className="flex flex-col  ">
                                    <p className=" font-bold text-left my-2 uppercase ">
                                        Oficina</p>
                                    <p >Universidad de O'Higgins </p>
                                    <p >Av. Libertador Bernardo O'Higgins, </p>
                                    <p >Rancagua </p>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">

                            <h1 className="text-2xl font-bold px-6 text-center my-2 ">

                                A continuación, rellene los campos para ponerse en contacto con nosotros:

                            </h1>

                            <form
                                className={' bg-white rounded-lg px-6 w-full md:w-10/12 '}
                                onSubmit={handleSubmit}>
                                <div className="flex justify-around flex-col ">
                                    <div className="flex flex-col  ">

                                        <input
                                            type={'text'}
                                            placeholder={'Ingrese su nombre y apellido'}
                                            className={'w-full mt-3 p-3 border rounded-lg bg-gray-100'}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                    </div>
                                    <input
                                        type={'email'}
                                        placeholder={'Escriba su correo'}
                                        className={'w-full  mt-3 p-3 border rounded-lg bg-gray-100'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <textarea name="Text1" cols="40" rows="5"
                                          type={'text'}
                                          placeholder={'Mensaje'}
                                          className={'w-full mt-3 p-3 border rounded-lg bg-gray-100'}
                                          value={message}
                                          onChange={(e) => setMessage(e.target.value)}
                                />
                                <input
                                    type={'submit'}
                                    value={'Enviar'}
                                    className={'bg-sky-700 w-full py-3 mt-6 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'}
                                />

                            </form>
                            {msg && <Error alerta={error}/>}
                        </div>

                    </div>

                </Container>
            </div>


                <div className="flex flex-col w-full h-full">
                    <iframe style={{height: "100%", position: "sticky"}}
                            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Universidad de O'Higgins&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    />
                </div>


        </>
    )
};
export default Contacto;