import React, { useState } from 'react';
import shortid from 'shortid';
import Swal from 'sweetalert2';

const Crud = () => {
    const [track, setTrack] = useState('');
    const [artista, setArtista] = useState('');
    const [genero, setGenero] = useState('');
    const [listaCanciones, setListaCanciones] = useState([]);
    const [modoeditar, setEditar] = useState(false);
    const [id, setId] = useState('');

    const limpiar_for = () => {
        setTrack('');
        setArtista('');
        setGenero('');
        setId('');
    }
    const editart = track => {
        // alert(track.cancion)
        setEditar(true)
        // modificamos los estados de la cancion 
        setTrack(track.cancion)
        setArtista(track.artist)
        setGenero(track.gen)

        setId(track.id)

    }

    const editarTrackok = (evt) => {
        evt.preventDefault()
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones tesji?",
                text: "Debes ingresar el numero del track",
                icon: "error"
              });
            return;
        }
        if (!artista.trim()) {
            alert('Debe ingresar nombre del Artista');
            Swal.fire({
                title: "Canaciones tesji?",
                text: "Debes ingresar el numero del track",
                icon: "error"
              });
            return;
        }
        if (!genero.trim()) {
            alert('Debe ingresar nombre del Género');
            Swal.fire({
                title: "Canaciones tesji?",
                text: "Debes ingresar el numero del track",
                icon: "error"
              });
            return;
        }
        const arrayEditado = listaCanciones.map(
            cancion => cancion.id == id ? {id:id , cancion:track , artist:artista , gen:genero} :cancion
        )
        Swal.fire({
            title: "Deseas editar el Track?",
            text: "Se editara el Track!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Editarlo!!"
          }).then((result) => {
            if (result.isConfirmed) {
                setListaCanciones(arrayEditado)
                setEditar(false)
                limpiar_for()
              Swal.fire({
                title: "Track Editado!",
                text: "Tu track ha sido Editado ",
                icon: "success"
              });
            }
          });   
       

    }

    const eliminar_track = id =>{
        // alert(id)
        // buscar y filtral el id del registro 
        // si lo encuentra lo eliminara de la lista sin afectar a los demas
        Swal.fire({
            title: "Deseas eliminar el track?",
            text: "Eliminando no abra cambios!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!"
          }).then((result) => {
            if (result.isConfirmed) {
                const arrayFiltrado = listaCanciones.filter(cancion => cancion.id !=id)
                setListaCanciones(arrayFiltrado)
              Swal.fire({
                title: "Track eliminado!",
                text: "Tu track ha sido eliminado ",
                icon: "success"
              });
            }
          });   
    }
  
 
    const guardarTrack = (evt) => {
        evt.preventDefault();
        // Validando campos vacíos
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones tesji?",
                text: "Debes ingresar el numero del Track",
                icon: "error"
              });
            return;
        }
        if (!artista.trim()) {
            alert('Debe ingresar nombre del Artista');
            Swal.fire({
                title: "Canaciones tesji?",
                text: "Debes ingresar el numero del Track",
                icon: "error"
              });
            return;
        }
        if (!genero.trim()) {
            alert('Debe ingresar nombre del Género');
            Swal.fire({
                title: "Canaciones tesji?",
                text: "Debes ingresar el numero del track",
                icon: "error"
              });
            return;
        }
        // console.log(Procesando Datos.... ${track} :: ${artista} :: ${genero});
        // Unir datos a la lista de Canciones
        Swal.fire({
            title: "Seguro que desea agregar Track a la lista?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "No Guardar"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Agg Correctamente", "", "success");
              setListaCanciones([
                ...listaCanciones,
                {id:shortid.generate(), cancion:track, artist:artista, gen:genero }
            ]);
            // Limpiando datos
            limpiar_for();
            // evt.target.reset();
            } else if (result.isDenied) {
              Swal.fire("No se guardaron los cambios", "", "info");
            }else{
                Swal.fire("No se guardaron los campos", "", "error");
                limpiar_for();
                // evt.target.reset();
            }
          });
        
    };

    return (
        <>
            <div className="container">
                <h1 class='text-center'>Registro de Canciones</h1>
                <hr />
                <section className='row'>
                    <section className='col-12 col-md-4 col-lg-5'>
                        <h3 class='text-center'>Formulario </h3>
                    <form onSubmit={ modoeditar ? editarTrackok : guardarTrack}>
                    <input
                        type="text"
                        placeholder='Track'
                        className='form-control mb-3'
                        value={track}
                        onChange={(evt) => setTrack(evt.target.value)}
                        
                    />
                    <input
                        type="text"
                        placeholder='Artista'
                        className='form-control mb-3'
                        value={artista}
                        onChange={(evt) => setArtista(evt.target.value)}
                        
                    />
                    <input
                        type="text"
                        placeholder='Género'
                        className='form-control mb-3'
                        value={genero}
                        onChange={(evt) => setGenero(evt.target.value)}
                        
                    />
                    <button type='submit' className= {`btn btn-block ${modoeditar ? 'btn-warning' : 'btn-dark'}`}>
                       {
                        modoeditar ? 'Editar Canción' : 'Agregar canción'

                        }
                           
            
                    </button>
                </form>
                    </section>
                    <section className='col-12 col-md-8 col-lg-7'>
                <h3>Lista Canciones</h3>              
                <ul className='list-group'>
                    {
                    listaCanciones.length == 0 ?
                    (<li className='list-group-item'>No hay track para mostrar</li>)
                    : 
                    (listaCanciones.map((cancion, index) => (
                        <li key={index} className='list-group-item'>
                            <span className='lead'>
                            {cancion.cancion} :: {cancion.artist} :: {cancion.gen}</span>
                            <button onClick={()=>editart(cancion)} className='btn btn-sm btn-warning btn-float-right mx-2'>
                                Editar
                            </button>
                            <button onClick={()=>eliminar_track(cancion.id)} className='btn btn-sm btn-danger btn-float-right'>
                                Eliminar
                            </button>
                            </li>
                    )))}
                </ul>
                    </section>
                </section>
                
            </div>
        </>
    );
};

export default Crud;