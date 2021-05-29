import React from 'react';
import { Link } from 'react-router-dom';
import { seatsNumberStore, isAlongsideStore, seatsSelectedStore } from '../features/stores/store';
import { Typography, Layout, Button, PageHeader, Divider } from 'antd';
const { Text, Title } = Typography;
const { Content } = Layout;


class Select extends React.Component {
    constructor() {
        super();
        this.state = {
            seats: "",
            submit: false,
            selected: parseInt(seatsNumberStore.getState())
        }
    }
    componentDidMount() {
        if (!(seatsNumberStore.getState())) window.location = "/";
        fetch("http://localhost:3000/seats")
            .then(response => response.json())
            .then(data => this.setState({ seats: data }));
        this.eventListener();
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.eventListener);
    }
    eventListener() {
        // events for interactive seats map
        window.addEventListener("click", (e) => {
            if (e.target.classList[0] === "seat--available") {
                e.target.className = "seat--selected seat";
                this.state.selected++;
                if (this.state.selected > 0) this.setState({ submit: false });
                else this.setState({ submit: true });
                console.log(this.state.selected);
            }
            else if (e.target.classList[0] === "seat--selected") {
                e.target.className = "seat--available seat";
                this.state.selected--;
                if (this.state.selected > 0) this.setState({ submit: false });
                else this.setState({ submit: true });
                console.log(this.state.selected);
            }
        });
    }
    displayData() {
        const resetAlongside = () => {
            seatsAlongside = new Array();
            seatsSelected = 0;
        }
        const seatsNumber = parseInt(seatsNumberStore.getState());
        const isAlongside = isAlongsideStore.getState();
        const seats = this.state.seats;
        const seatsArray = new Array();
        const seatsTable = new Array();
        let lastX = 0;
        let seatsSelected = 0;
        let seatsAlongside = new Array();
        let seatsAvailable = 0;

        // check if there are enough seats
        for (let i = 0; i < seats.length; i++) if (!seats[i].reserved) seatsAvailable++;
        if (seatsAvailable < seatsNumber) return (
            <Text type="danger">Brak wystarczającej liczby miejsc</Text>
        )

        // data from api to raw array
        for (let i = 0; i < seats.length; i++) {
            if (i === 0) seatsArray.push(new Array());
            if (lastX !== seats[i].cords.x) {
                seatsArray.push(new Array());
                lastX = seats[i].cords.x;
            }
            seatsArray[lastX][seats[i].cords.y] = seats[i];
        }
        // find seats that are next to each other in one row
        if (isAlongsideStore.getState()) {
            lastX = 0;
            seatsArray.forEach(e => {
                for (let i = 0; i < e.length; i++) {
                    if (seatsSelected === seatsNumber) return;
                    if (e[i] !== undefined && e[i].cords.x !== lastX) resetAlongside();
                    if (e[i] !== undefined && e[i].reserved === false) {
                        seatsAlongside.push(e[i].id);
                        seatsSelected++;
                        lastX = e[i].cords.x;
                    }
                    else resetAlongside();
                }
            });
            if (seatsAlongside.length !== seatsNumber) resetAlongside();
        }

        // raw array to table elements array
        seatsArray.forEach(e => {
            const rowOutput = new Array();
            for (let i = 0; i < e.length; i++) {
                if (e[i] === undefined) rowOutput.push(<td key={i} className="seat--empty seat"></td>);
                else if (e[i].reserved === false) {
                    if (seatsSelected < seatsNumber || seatsAlongside.includes(e[i].id)) {
                        rowOutput.push(<td key={i} className="seat--selected seat" id={e[i].id} value-x={e[i].cords.x} value-y={e[i].cords.y}></td>);
                        seatsSelected++;
                    }
                    else {
                        rowOutput.push(<td key={i} className="seat--available seat" id={e[i].id} value-x={e[i].cords.x} value-y={e[i].cords.y}></td>);
                    }
                }
                else rowOutput.push(<td key={i} className="seat--reserved seat"></td>);
            }
            seatsTable.push(rowOutput);
        })
        return (
            <div>
                <Title style={{ display: "inline-block", marginRight: "10px" }}>Miejsca</Title>
                <Text type="secondary">Szukano: {seatsNumber} Miejsc/a{isAlongside ? ", obok siebie" : null}, Wybrano: {this.state.selected}</Text>
                <br />
                {isAlongside && !(seatsAlongside.length) ? (
                    <Text strong type="danger">Nie znaleziono miejsc w liczbie: {seatsNumber} obok siebie.</Text>
                ) : null}
                <table className="seatsTable">
                    <tbody>
                        {
                            seatsTable.map((e, k) => {
                                return <tr key={k}>{e}</tr>;
                            })
                        }
                    </tbody>
                </table>
                <div className="description">
                    <div>
                        <div className="seat seat--available"></div>
                        <Text className="description__text">Miejsca dostępne</Text>
                    </div>
                    <div>
                        <div className="seat seat--reserved"></div>
                        <Text className="description__text">Miejsca zajęte</Text>
                    </div>
                    <div>
                        <div className="seat seat--selected"></div>
                        <Text className="description__text">Twój wybór</Text>
                    </div>
                </div>
                <Link to="/podsumowanie">
                    <Button onClick={this.submit} style={{ float: "right" }} type="primary" disabled={this.state.submit}>Rezerwuj</Button>
                </Link>
                
            </div>
        )
    }
    submit() {
        const selected = document.querySelectorAll("tr > .seat.seat--selected");
        const selected2 = new Array();
        selected.forEach(e => {
            return selected2.push({id: e.id, x: e.getAttribute("value-x"), y: e.getAttribute("value-y")});
        });
        seatsSelectedStore.dispatch({
            type: 'SET_VALUE',
            value: selected2
        });
        console.log(selected2);
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="form__header"
                    onBack={() => {
                        window.history.back();
                        window.location.reload();
                    }}
                    title="Rezerwacja"
                    subTitle="Wybierz miejsce/a i rezerwuj"
                    style={{
                        backgroundColor: "#FFFFFF"
                    }}
                />
                <Divider style={{ margin: "0px" }} />
                <div className="container">
                    <Content style={{
                        width: "auto",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        overflowX: "scroll",
                    }}>
                        <div className="centerContainer">
                            {this.displayData()}
                        </div>
                    </Content>
                </div>
            </div>
        )
    }
}

export default Select;