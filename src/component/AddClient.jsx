import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const AddClient = () => {
  const [cliente, setCliente] = useState("");
  const [sedeLegale, setSedeLegale] = useState("");
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
      tipoCliente: "",
      fatturaAnnuale: "",
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
    setCliente({ ...cliente, [name]: value });
  };
  const changeSedeOperativa = (value, name) => {
    setCliente({ ...cliente, [name]: value });
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
                      value={cliente.partitaIva}
                      onChange={(e) => changeCliente(e.target.value, "partitaIva")}
                      placeholder="inserisci la P.Iva"
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
                      value={sedeLegale.via}
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
                      value={sedeLegale.civico}
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
                      value={sedeLegale.cap}
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

                <Button>Registra cliente</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddClient;
