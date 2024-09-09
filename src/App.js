import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const supabase = createClient("https://ycgcspglpmptfrxvmgrr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZ2NzcGdscG1wdGZyeHZtZ3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTQ2ODcsImV4cCI6MjA0MTQ3MDY4N30.xLHxmjlNJY44zmpC7KmAH5ybW9MTwjt0PLdtq6FQ7R4");

  function App() {

    //All tasks
    const [tasks, setTasks] = useState([]);

    const [fetchGetAll, setFetchGetAll] = useState(false);

    const handleSendGetAll = () => setFetchGetAll(true);

    useEffect(() => {
      if(fetchGetAll)
        getAllTasks();
    }, [fetchGetAll, setFetchGetAll]);

    async function getAllTasks() {
      const { data } = await supabase.from("tasks").select();
      setTasks(data);
      setFetchGetAll(false)
    }

    //Get By id tasks
    const [taskById, setTaskById] = useState(null);

    const [formId, setFormId] = useState(0);

    const [fetchGetById, setFetchGetById] = useState(false);

    const handleSendGetById = () => setFetchGetById(true);

    useEffect(() => {
      if(fetchGetById)
        getTaskById();
      // eslint-disable-next-line
    }, [fetchGetById, setFetchGetById]);

    async function getTaskById() {
      const { data } = await supabase.from("tasks").select().eq('id', formId);
      setTaskById(data);
      setFetchGetById(false)
    }


    //Create tasks
    const [createdTask, setCreatedTask] = useState(null);

    const [createName, setCreateName] = useState('');

    const [fetchCreate, setFetchCreate] = useState(false);

    const handleSendCreate = () => setFetchCreate(true);

    useEffect(() => {
      if(fetchCreate)
        createTask();
      // eslint-disable-next-line
    }, [fetchCreate, setFetchCreate]);

    async function createTask() {
      const { data } = await supabase.from("tasks").insert({name: createName})
      setCreatedTask(data);
      setFetchCreate(false)
    }


    //Update tasks
    const [updatedTask, setUpdatedTask] = useState(null);

    const [updateId, setUpdateId] = useState(0);
    const [updateName, setUpdateName] = useState('');

    const [fetchUpdate, setFetchUpdate] = useState(false);

    const handleSendUpdate = () => setFetchUpdate(true);

    useEffect(() => {
      if(fetchUpdate)
        updateTask();
      // eslint-disable-next-line
    }, [fetchUpdate, setFetchUpdate]);

    async function updateTask() {
      const { data } = await supabase.from("tasks").update({name: updateName}).eq('id', updateId);
      setUpdatedTask(data);
      setFetchUpdate(false)
    }


    //Delete task
    const [deletedTask, setDeletedTask] = useState(null);

    const [deleteId, setDeleteId] = useState(0);

    const [fetchDelete, setFetchDelete] = useState(false);

    const handleSendDelete = () => setFetchDelete(true);

    useEffect(() => {
      if(fetchDelete)
        deleteTask();
      // eslint-disable-next-line
    }, [fetchDelete, setFetchDelete]);

    async function deleteTask() {
      const { data } = await supabase.from("tasks").delete().eq('id', deleteId);
      setDeletedTask(data);
      setFetchDelete(false)
    }


    return (
      <div style={{margin: '4em'}}>
      <Accordion>
        <AccordionSummary className="d-flex align-items-center" style={{backgroundColor: 'lightblue', borderRadius: '5px'}}
          expandIcon={<ExpandMoreIcon />}
        >
          <Chip label="GET" color="primary" />
          <Typography fontWeight='bold' className="my-auto" style={{marginLeft: '1rem', marginTop: '0.3rem'}}>Obtener todas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" color="success" endIcon={<PlayArrowIcon />} onClick={handleSendGetAll}>
            Ejecutar
          </Button>
          <div style={{border: '1px solid gray', minHeight: '4rem', borderRadius: '10px', marginTop: '1rem'}}>
            <ul>
              {
                tasks && tasks.map((task, id) => (
                  <li key={id}>{`Id: ${task.id} --- Name: ${task.name}`}</li>
                ))
              }
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary className="d-flex align-items-center" style={{backgroundColor: 'lightblue', borderRadius: '5px'}}
          expandIcon={<ExpandMoreIcon />}
        >
          <Chip label="GET" color="primary" />
          <Typography fontWeight='bold' className="my-auto" style={{marginLeft: '1rem', marginTop: '0.3rem'}}>Obtener por ID</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-basic" label="Id" type="number" variant="outlined" value={formId} 
            onChange={(event) => {
              setFormId(event.target.value);
            }}
          />
          <br></br>
          <Button variant="contained" color="success" style={{marginTop: '1rem'}} endIcon={<PlayArrowIcon />} onClick={handleSendGetById}>
            Ejecutar
          </Button>
          <div style={{border: '1px solid gray', minHeight: '4rem', borderRadius: '10px', marginTop: '1rem'}}>
            {
              taskById &&
              <li>{`Id: ${taskById?.id} --- Name: ${taskById?.name}`}</li>
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary className="d-flex align-items-center" style={{backgroundColor: 'lightgreen', borderRadius: '5px'}}
          expandIcon={<ExpandMoreIcon />}
        >
          <Chip label="POST" color="success" />
          <Typography fontWeight='bold' className="my-auto" style={{marginLeft: '1rem', marginTop: '0.3rem'}}>Crear tarea</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-basic" label="Nombre" variant="outlined" value={createName} 
            onChange={(event) => {
              setCreateName(event.target.value);
            }}
          />
          <br></br>
          <Button variant="contained" color="success" style={{marginTop: '1rem'}} endIcon={<PlayArrowIcon />} onClick={handleSendCreate}>
            Ejecutar
          </Button>
          <div style={{border: '1px solid gray', minHeight: '4rem', borderRadius: '10px', marginTop: '1rem'}}>
            {
              createdTask &&
              <li>{`Id: ${createdTask?.id} --- Name: ${createdTask?.name}`}</li>
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary className="d-flex align-items-center" style={{backgroundColor: 'lightsalmon', borderRadius: '5px'}}
          expandIcon={<ExpandMoreIcon />}
        >
          <Chip label="PUT" color="warning" />
          <Typography fontWeight='bold' className="my-auto" style={{marginLeft: '1rem', marginTop: '0.3rem'}}>Editar tarea</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-basic" label="Id" type="number" variant="outlined" value={updateId} 
            onChange={(event) => {
              setUpdateId(event.target.value);
            }}
          />
          <br></br>
          <TextField id="outlined-basic" label="Nombre" variant="outlined" style={{marginTop: '0.5rem'}} value={updateName} 
            onChange={(event) => {
              setUpdateName(event.target.value);
            }}
          />
          <br></br>
          <Button variant="contained" color="success" style={{marginTop: '1rem'}} endIcon={<PlayArrowIcon />} onClick={handleSendUpdate}>
            Ejecutar
          </Button>
          <div style={{border: '1px solid gray', minHeight: '4rem', borderRadius: '10px', marginTop: '1rem'}}>
            {
              updatedTask &&
              <li>{`Id: ${updatedTask?.id} --- Name: ${updatedTask?.name}`}</li>
            }
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary className="d-flex align-items-center" style={{backgroundColor: 'lightpink', borderRadius: '5px'}}
          expandIcon={<ExpandMoreIcon />}
        >
          <Chip label="DELETE" color="error" />
          <Typography fontWeight='bold' className="my-auto" style={{marginLeft: '1rem', marginTop: '0.3rem'}}>Eliminar tarea</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-basic" label="Id" type="number" variant="outlined" value={deleteId} 
            onChange={(event) => {
              setDeleteId(event.target.value);
            }}
          />
          <br></br>
          <Button variant="contained" color="success" style={{marginTop: '1rem'}} endIcon={<PlayArrowIcon />} onClick={handleSendDelete}>
            Ejecutar
          </Button>
          <div style={{border: '1px solid gray', minHeight: '4rem', borderRadius: '10px', marginTop: '1rem'}}>
            {
              deletedTask &&
              <li>{`Id: ${deletedTask?.id} --- Name: ${deletedTask?.name}`}</li>
            }
          </div>
        </AccordionDetails>
      </Accordion>
      </div>
    );
  }

export default App;
