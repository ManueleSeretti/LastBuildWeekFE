import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Container, Button, Form, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Clienti = () => {
  const token = useSelector((state) => state.content);
  const [clienti, setClienti] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState("clienteId");
  const [totaleClient, setTotaleClient] = useState([]);
  const [fatturaAnnuale, setFaturaAnnuale] = useState(0);
  const [dataInserimento, setDataInserimento] = useState("");
  const [dataUltimoContatto, setDataUltimoContatto] = useState("");
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  useEffect(() => {
    fetchAllClienti();
  }, [page, size, order]);

  const fetchAllClienti = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/clienti?page=${page}&size=${size}&orderBy=${order}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setClienti(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleClient(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [showFatturaAnnuale, setShowFatturaAnnuale] = useState(false);
  const handleCloseFatturaAnnuale = () => setShowFatturaAnnuale(false);

  const [showDataInserimento, setShowDataInserimento] = useState(false);
  const handleCloseDataInserimento = () => setShowDataInserimento(false);

  const [showDataUltimoContatto, setShowDataUltimoContatto] = useState(false);
  const handleCloseDataUltimoContatto = () => setShowDataUltimoContatto(false);

  const [showNome, setShowNome] = useState(false);
  const handleCloseNome = () => setShowNome(false);

  const fetchFatturaAnnuale = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/clienti/fatturatoAnnuale?fattura=${fatturaAnnuale}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setClienti(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleClient(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataInserimento = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/clienti/dataInserimento?dataInserimento=${dataInserimento}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setClienti(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleClient(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNome = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/clienti/nome?nomeContatto=${nome}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setClienti(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleClient(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataUltimoContatto = async () => {
    try {
      const resp = await fetch(
        `http://localhost:3001/clienti/dataUltimoContatto?dataUltimoContatto=${dataUltimoContatto}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-type": "application/json",
          },
        }
      );
      const data = await resp.json();
      setClienti(data.content);
      setSize(data.pageable.pageSize);
      setPage(data.pageable.pageNumber);
      setTotaleClient(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-1">
        <h1>Lista Clienti</h1>
        <div className="d-flex justify-content-between">
          <DropdownButton className="mt-2" title="Ordina per" variant="outline-primary">
            <Dropdown.Item onClick={() => setOrder("nomeContatto")}>Nome</Dropdown.Item>
            <Dropdown.Item onClick={() => setOrder("fatturaAnnuale")}>Fattura annuale</Dropdown.Item>
            <Dropdown.Item onClick={() => setOrder("dataInserimento")}>Data di inserimento</Dropdown.Item>
            <Dropdown.Item onClick={() => setOrder("dataUltimoContatto")}>Data ultimo contatto</Dropdown.Item>
            <Dropdown.Item onClick={() => setOrder("sedeLegale")}>Provincia</Dropdown.Item>
          </DropdownButton>
          <DropdownButton title="Filtra per" variant="outline-primary">
            <Dropdown.Item onClick={setShowFatturaAnnuale}>Fattura annuale</Dropdown.Item>
            <Dropdown.Item onClick={setShowDataInserimento}>Data di inserimento</Dropdown.Item>
            <Dropdown.Item onClick={setShowDataUltimoContatto}>Data ultimo contatto</Dropdown.Item>
            <Dropdown.Item onClick={setShowNome}>Nome</Dropdown.Item>
          </DropdownButton>
        </div>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cognome</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
              <CTableHeaderCell scope="col">Partita Iva</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ragione Sociale</CTableHeaderCell>
              <CTableHeaderCell scope="col">Provincia</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clienti.map((c, i) => (
              <CTableRow color="light">
                <CTableHeaderCell scope="row">{c.nomeContatto}</CTableHeaderCell>
                <CTableDataCell>{c.cognomeContatto}</CTableDataCell>
                <CTableDataCell>{c.emailContatto}</CTableDataCell>
                <CTableDataCell>{c.telefonoContatto}</CTableDataCell>
                <CTableDataCell>{c.partitaIva}</CTableDataCell>
                <CTableDataCell>{c.ragioneSociale}</CTableDataCell>
                <CTableDataCell>{c.sedeLegale === null ? "/" : c.sedeLegale.comuneId.nomeProvincia}</CTableDataCell>
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
            Risultati da {page * size + 1} a {Math.min((page + 1) * size, totaleClient)} di {totaleClient}
          </div>
          <div>
            <Button
              className="me-2"
              variant="outline-primary"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Indietro
            </Button>
            <Button
              variant="outline-primary"
              disabled={page === totalPage - 1}
              onClick={() => handlePageChange(page + 1)}
            >
              Avanti
            </Button>
          </div>
        </div>
        <Button variant="outline-success" onClick={() => navigate("/addClient")}>
          Aggiungi cliente
        </Button>
      </Container>
      <Modal show={showFatturaAnnuale} onHide={handleCloseFatturaAnnuale}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci fattura annuale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci anno, es: 2023"
                autoFocus
                onChange={(e) => setFaturaAnnuale(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFatturaAnnuale}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseFatturaAnnuale();
              fetchFatturaAnnuale();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDataInserimento} onHide={handleCloseDataInserimento}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci la data di inserimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="minimo"
                autoFocus
                onChange={(e) => setDataInserimento(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDataInserimento}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDataInserimento();
              fetchDataInserimento();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDataUltimoContatto} onHide={handleCloseDataUltimoContatto}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci la data di ultimo contatto</Form.Label>
              <Form.Control
                type="date"
                placeholder="nome"
                autoFocus
                onChange={(e) => setDataUltimoContatto(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDataUltimoContatto}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDataUltimoContatto();
              fetchDataUltimoContatto();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNome} onHide={handleCloseNome}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci il nome (o parte di nome)</Form.Label>
              <Form.Control
                type="text"
                placeholder="EMESSA, PAGATA, SCADUTA, RECUPERO_CREDITI"
                autoFocus
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNome}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseNome();
              fetchNome();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Clienti;
