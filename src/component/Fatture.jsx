import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Col, Container, Button, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Fatture = () => {
  const [fatture, setFatture] = useState([]);
  const token = useSelector((state) => state.content);

  const fetchAllFatture = async () => {
    try {
      const resp = await fetch("http://localhost:3001/fatture", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      setFatture(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllFatture();
  }, []);

  return (
    <Container>
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
          <Form.Select className="mb-3  text-start" aria-label="Default select example">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </Form.Select>
        </div>
        <div>Risultati da 1 a 10 di 50</div>
        <div>
          <Button>avanti</Button>
          <Button>indietro</Button>
        </div>
      </div>
    </Container>
  );
};
export default Fatture;
