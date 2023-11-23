import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Col, Container, Button, Form, Row, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const Fatture = () => {
  const [fatture, setFatture] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState("id");
  const [totaleFatt, setTotaleFatt] = useState([]);
  const [anno, setAnno] = useState(2023);
  const token = useSelector((state) => state.content);

  const fetchAllFatture = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/fatture?page=${page}&size=${size}&orderBy=${order}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setFatture(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleFatt(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnno = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/fatture/annoFattura?anno=${anno}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setFatture(data.content);
      // setSize(data.pageable.pageSize);
      // setPage(data.pageable.pageNumber);
      // setTotaleFatt(data.totalElements);
      // setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchAllFatture();
  }, [page, size, order]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showImporto, setShowImporto] = useState(false);
  const handleCloseImporto = () => setShowImporto(false);

  return (
    <>
      <Container>
        <DropdownButton id="dropdown-basic-button" title="Filtra">
          <Dropdown.Item>Cliente</Dropdown.Item>
          <Dropdown.Item>Stato</Dropdown.Item>
          <Dropdown.Item>Data</Dropdown.Item>
          <Dropdown.Item onClick={setShow}>Anno</Dropdown.Item>
          <Dropdown.Item onClick={setShowImporto}>Importo</Dropdown.Item>
        </DropdownButton>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">N° Fattura</CTableHeaderCell>
              <CTableHeaderCell scope="col">Data</CTableHeaderCell>
              <CTableHeaderCell scope="col">Importo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
              <CTableHeaderCell scope="col">Stato</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {fatture.map((f, i) => (
              <CTableRow color="light">
                <CTableHeaderCell scope="row">{f.numeroFattura}</CTableHeaderCell>
                <CTableDataCell>{f.dataFattura}</CTableDataCell>
                <CTableDataCell>{f.importoFattura}</CTableDataCell>
                <CTableDataCell>{f.cliente.nomeContatto}</CTableDataCell>
                <CTableDataCell>{f.statoFattura}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          <div>
            <Form.Select
              className="mb-3  text-start"
              aria-label="Default select example"
              onChange={(e) => {
                setSize(e.target.value);
                setPage(0);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Form.Select>
          </div>
          <div>
            Risultati da {page * size + 1} a {Math.min((page + 1) * size, totaleFatt)} di {totaleFatt}
          </div>
          <div>
            <Button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
              Indietro
            </Button>
            <Button disabled={page === totalPage - 1} onClick={() => handlePageChange(page + 1)}>
              Avanti
            </Button>
          </div>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci anno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci anno, es: 2023"
                autoFocus
                onChange={(e) => setAnno(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              fetchAnno();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImporto} onHide={handleCloseImporto}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci importo minimo</Form.Label>
              <Form.Control type="number" placeholder="es: 12,50" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci importo massimo</Form.Label>
              <Form.Control type="number" placeholder="es: 1750,50" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImporto}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseImporto}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Fatture;
