import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Container, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavBar from "./navBar";

const Clienti = () => {
  const token = useSelector((state) => state.content);
  const [clienti, setClienti] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState("clienteId");
  const [totaleFatt, setTotaleFatt] = useState([]);

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
      setTotaleFatt(data.totalElements);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <NavBar />
      <Container>
        <DropdownButton id="dropdown-basic-button" title="Filtra">
          <Dropdown.Item onClick={() => setOrder("nomeContatto")}>Nome</Dropdown.Item>
          <Dropdown.Item onClick={() => setOrder("fatturaAnnuale")}>Fattura annuale</Dropdown.Item>
          <Dropdown.Item onClick={() => setOrder("dataInserimento")}>Data di inserimento</Dropdown.Item>
          <Dropdown.Item onClick={() => setOrder("dataUltimoContatto")}>Data ultimo contatto</Dropdown.Item>
          <Dropdown.Item onClick={() => setOrder("sedeLegale")}>Provincia</Dropdown.Item>
        </DropdownButton>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cognome</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
              <CTableHeaderCell scope="col">Partita Iva</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ragione Sociale</CTableHeaderCell>
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
    </>
  );
};

export default Clienti;
