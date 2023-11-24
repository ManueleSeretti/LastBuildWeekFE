import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

const AddClient = () => {
  const [cliente, setCliente] = useState("");
  const [sedeLegaleId, setSedeLegale] = useState("");
  const [sedeOperativa, setSedeOperativa] = useState("");
  const [province, setProvince] = useState([]);
  const [comuni, setComuni] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.content);

  useEffect(() => {
    console.log(token.accessToken);

    const fetchProvincie = async () => {
      try {
        const resp = await fetch("http://localhost:3001/indirizzi/allProvincie", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-type": "application/json",
          },
        });
        const data = await resp.json();
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvincie();
  }, []);

  useEffect(() => {
    setCliente({
      nomeContatto: "",
      cognomeContatto: "",
      telefonoContatto: "",
      emailContatto: "",
      email: "",
      telefono: "",
      pec: "",
      partitaIva: "",
      ragioneSociale: "",
      tipoCliente: null,
      fatturaAnnuale: 0,
      sedeLegaleId: 0,
      logoAziendale: null,
    });
    setSedeLegale({
      via: "",
      civico: "",
      cap: "",
      provincia: "",
      comuneId: "",
    });
    setSedeOperativa({
      via: "",
      civico: "",
      cap: "",
      provincia: "",
      comuneId: "",
    });
  }, []);

  const changeCliente = (value, name) => {
    setCliente({ ...cliente, [name]: value });
  };
  const changeSedeLegale = (value, name) => {
    setSedeLegale({ ...sedeLegaleId, [name]: value });
  };
  const changeSedeOperativa = (value, name) => {
    setSedeOperativa({ ...sedeOperativa, [name]: value });
  };

  const fetchComuni = async (provincia) => {
    try {
      const resp = await fetch("http://localhost:3001/indirizzi/provincie?provincia=" + provincia, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      console.log(data);
      setComuni(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddIndirizzo = async () => {
    try {
      const resp = await fetch("http://localhost:3001/indirizzi", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(sedeLegaleId),
      });
      const data = await resp.json();
      console.log(data.id);
      setCliente({ ...cliente, sedeLegaleId: Number(data.id) });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddCliente = async () => {
    console.log(cliente)
    try {
      const resp = await fetch("http://localhost:3001/clienti", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(cliente),
      });
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if(cliente.sedeLegaleId !== "") {
      fetchAddCliente();
    }
  }, [cliente.sedeLegaleId]);

  const handleSubmit = () => {
    fetchAddIndirizzo();
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1>Aggiungi Cliente</h1>
        <Row className="justify-content-center">
          <Col xs="8">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Row>
                <Col xs="6">
                  <Form.Group className="mb-3 text-start">
                    <Form.Label column sm="2">
                      Nome
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={cliente.nome}
                      onChange={(e) => changeCliente(e.target.value, "nomeContatto")}
                      placeholder="inserisci Nome"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="2">
                      Cognome
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.cognome}
                      onChange={(e) => changeCliente(e.target.value, "cognomeContatto")}
                      placeholder="inserisci Cognome"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="12">
                      Email Contatto
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.emailContatto}
                      onChange={(e) => changeCliente(e.target.value, "emailContatto")}
                      placeholder="inserisci emailContatto"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="12">
                      Email Aziendale
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.email}
                      onChange={(e) => changeCliente(e.target.value, "email")}
                      placeholder="inserisci email Azienda"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="12">
                      Pec
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.pec}
                      onChange={(e) => changeCliente(e.target.value, "pec")}
                      placeholder="inserisci email pec"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="12">
                      Telefono
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.telefono}
                      onChange={(e) => changeCliente(e.target.value, "telefono")}
                      placeholder="inserisci un telefono dell azienda"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column sm="12">
                      Telefono Contatto
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.telefonoContatto}
                      onChange={(e) => changeCliente(e.target.value, "telefonoContatto")}
                      placeholder="inserisci un telefono del contatto"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Partita Iva</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.partitaIva}
                      onChange={(e) => changeCliente(e.target.value, "partitaIva")}
                      placeholder="inserisci la P.Iva"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Ragione Sociale</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={cliente.ragioneSociale}
                      onChange={(e) => changeCliente(e.target.value, "ragioneSociale")}
                      placeholder="inserisci la ragione sociale"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Fattura Annuale</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={cliente.fatturaAnnuale}
                      onChange={(e) => changeCliente(Number(e.target.value), "fatturaAnnuale")}
                      placeholder="inserisci la fattura annuale"
                    />
                  </Form.Group>
                </Col>
                <Col xs="12">
                  <hr />
                  <h5>Sede Legale</h5>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Via</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={sedeLegaleId.via}
                      onChange={(e) => changeSedeLegale(e.target.value, "via")}
                      placeholder="inserisci la via"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Civico</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={sedeLegaleId.civico}
                      onChange={(e) => changeSedeLegale(e.target.value, "civico")}
                      placeholder="inserisci il civico"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3  text-start">
                    <Form.Label column>Cap</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={sedeLegaleId.cap}
                      onChange={(e) => changeSedeLegale(e.target.value, "cap")}
                      placeholder="inserisci il cap"
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Label column>Provincia</Form.Label>
                  <Form.Select
                    className="mb-3  text-start"
                    onChange={(e) => {
                      changeSedeLegale(e.target.value, "provincia");

                      fetchComuni(e.target.selectedOptions[0].text);
                      console.log(e.target.selectedOptions[0].text);
                    }}
                    aria-label="Default select example"
                  >
                    <option>Seleziona Provincia</option>
                    {province.map((province, index) => (
                      <option key={index} value={province.provinciaId}>
                        {province.provincia}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs="6">
                  <Form.Label column>Comune</Form.Label>
                  <Form.Select
                    className="mb-3  text-start"
                    onChange={(e) => changeSedeLegale(e.target.value, "comuneId")}
                    aria-label="Default select example"
                  >
                    <option>Seleziona Comune</option>
                    {comuni.map((comune, index) => (
                      <option key={index} value={comune.comuneId}>
                        {comune.nomeComune}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Button onClick={() => handleSubmit()}>Registra cliente</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddClient;
