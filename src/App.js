import { Form, Button, Container, Row, Table} from 'react-bootstrap';
import React,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AppContext,useAppContext} from './context/appContext';
//import moment from 'moment';

function App() {
  const {product,setProduct} = useAppContext(AppContext)
  console.log(product)
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [descrip, setDescrip] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      // Actualizar el registro en product con los nuevos valores (id, nombre, fecha)
      const registroActualizado = {
        id: id,
        nombre: nombre,
        descrip: descrip,
      };
  
      const nuevosDatos = product.map((registro) =>
        registro.id === id ? registroActualizado : registro
      );
  
      // Actualiza el estado product con los nuevos datos
      setProduct(nuevosDatos);
  
      // Restablece los estados y sale del modo de edición
      setId('');
      setNombre('');
      setDescrip('');
      setModoEdicion(false);
    } else {
      // Agregar un nuevo registro a product
      const nuevoRegistro = {
        id: Math.random(), // Generar un ID único (puedes usar otra estrategia)
        nombre: nombre,
        descrip: descrip,
      };
  
      // Actualiza el estado product agregando el nuevo registro
      setProduct([...product, nuevoRegistro]);
  
      // Restablece los estados
      setId('');
      setNombre('');
      setDescrip('');
    }
  };
  
  const handleEditClick = (registro) => {
    // Capturar la fila a editar
    setId(registro.id);
    setNombre(registro.nombre);
    setDescrip(registro.descrip);
    setModoEdicion(true);
  };

  const handleDeleteClick = (registro) => {
    // Filtra la lista product para excluir el registro que coincide con el ID capturado
    const nuevaLista = product.filter((item) => item.id !== registro.id);

    // Actualiza el estado product con la nueva lista filtrada
    setProduct(nuevaLista);
  };

 /* const PrimeraEdicion = (objeto) =>{
    setNombre(objeto.nombre)
    setFecha(objeto.fecha)
    setModoEdicion(true)
  }*/

 /* const EdicionFinal = (e)->{

  }*/
  return (
    
    <Container className='cont'>
      <Row> <Table striped bordered hover>
      <thead>
        <tr>
          <th>Editar</th>
          <th>Producto</th>
          <th>Descripcion del producto</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        { product.map( (products) => (
        <tr key = {products.id}>
          <td>
            <div>
              <button className='btn btn-info'><i className="fa-solid fa-pen-to-square" onClick={() => handleEditClick(products)} /></button>
            </div>
          </td>
          <td>{products.nombre}</td>
          <td>{products.descrip}</td>
          <td>
          <div>
              <button className='btn btn-danger'  onClick={() => handleDeleteClick(products)}><i className="fa-solid fa-xmark" /></button>
            </div>
          </td>
        </tr>
       ))}
      </tbody>
    </Table></Row>
      <Row className="forma"><div className='text'>Informacion del producto</div></Row>
        <Form className='formu' onSubmit={handleSubmit}>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Producto</Form.Label>
            <Form.Control type="text" placeholder="Ingrese producto" value={nombre} 
            onChange={(e)=>setNombre(e.target.value)}/>
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripcion del producto</Form.Label>
            <Form.Control type="text" placeholder="descripción" value={descrip}
            onChange={(e)=>setDescrip(e.target.value)} />
          </Form.Group>
          
          <Button  className='boton' type="submit">
            Agregar
          </Button>
          
          
         
        </Form>
  

    </Container>
  );
}

export default App;